import { __ } from '@wordpress/i18n';
import { search } from '@wordpress/icons';
import { dispatch, select } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import {
	Modal,
	TextControl,
	ToggleControl,
	Button,
	Tooltip,
} from '@wordpress/components';

import { Shortcut } from './shortcut';
import {
	getAllowedBlocks,
	getBlockEditorIframe,
	isCaseSensitive,
	isSelectionInModal,
	isWpVersion,
} from './utils';

import '../styles/app.scss';

/**
 * Search & Replace for Block Editor.
 *
 * This function returns a JSX component that comprises
 * the Tooltip, Search Icon, Modal & Shortcut.
 *
 * @since 1.0.0
 *
 * @return {JSX.Element} Search & Replace for Block Editor.
 */
const SearchReplaceForBlockEditor = (): JSX.Element => {
	const [ replacements, setReplacements ] = useState( 0 );
	const [ isModalVisible, setIsModalVisible ] = useState( false );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ replaceInput, setReplaceInput ] = useState( '' );
	const [ caseSensitive, setCaseSensitive ] = useState( false );
	const [ context, setContext ] = useState( false );

	/**
	 * Open Modal.
	 *
	 * @since 1.0.0
	 *
	 * @return {void}
	 */
	const openModal = (): void => {
		setIsModalVisible( true );
		setReplacements( 0 );
	};

	/**
	 * Close Modal.
	 *
	 * @since 1.0.0
	 *
	 * @return {void}
	 */
	const closeModal = (): void => {
		setIsModalVisible( false );
		setReplacements( 0 );
	};

	/**
	 * Handle case sensitive toggle feature
	 * to enable user perform case-sensitive search
	 * and replacements.
	 *
	 * @since 1.1.0
	 *
	 * @param {boolean} newValue
	 * @return {void}
	 */
	const handleCaseSensitive = ( newValue: boolean ): void => {
		setCaseSensitive( newValue );
	};

	/**
	 * Listen for changes in Search Input & Case Sensitivity.
	 *
	 * By passing in a FALSY context to the replace callback, we only
	 * search for matched strings, we DO NOT replace matched strings.
	 *
	 * @since 1.3.0
	 *
	 * @return {void}
	 */
	useEffect( () => {
		replace();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ searchInput, caseSensitive ] );

	/**
	 * Handle the implementation for when the user
	 * clicks the 'Replace' button.
	 *
	 * @since 1.0.0
	 * @since 1.3.0 Pass in context param to determine if it is Search or Replace.
	 *
	 * @param {boolean} context True (Replace), False (Search).
	 * @return {void}
	 */
	const replace = ( context: boolean = false ): void => {
		setContext( context );
		setReplacements( 0 );

		if ( ! searchInput ) {
			return;
		}

		const pattern: RegExp = new RegExp(
			`(?<!<[^>]*)${ searchInput }(?<![^>]*<)`,
			isCaseSensitive() || caseSensitive ? 'g' : 'gi'
		);

		select( 'core/block-editor' )
			.getBlocks()
			.forEach( ( element: any ) => {
				recursivelyReplace( element, pattern, replaceInput, status );
			} );
	};

	/**
	 * Recursively traverse and replace the text in the
	 * Block Editor with the user's text. Perform attribute update
	 * on a case by case basis based on mutating attribute.
	 *
	 * @since 1.0.0
	 * @since 1.0.1 Handle edge-cases for quote, pullquote & details block.
	 * @since 1.3.0 Pass in context param to determine if it is Search or Replace.
	 *
	 * @param {Object}  element Gutenberg editor block.
	 * @param {RegExp}  pattern Search pattern.
	 * @param {string}  text    Replace pattern.
	 * @param {boolean} context True (Replace), False (Search).
	 *
	 * @return {void}
	 */
	const recursivelyReplace = (
		element: any,
		pattern: RegExp,
		text: string,
		status: boolean
	): void => {
		const { name, innerBlocks } = element;

		if ( getAllowedBlocks().indexOf( name ) !== -1 ) {
			const args = { element, pattern, text, status };

			switch ( name ) {
				case 'core/quote':
				case 'core/pullquote':
					replaceBlockAttribute( args, 'citation' );
					break;

				case 'core/details':
					replaceBlockAttribute( args, 'summary' );
					break;

				default:
					replaceBlockAttribute( args, 'content' );
					break;
			}
		}

		if ( innerBlocks.length ) {
			innerBlocks.forEach( ( innerElement: any ) => {
				recursivelyReplace( innerElement, pattern, text, status );
			} );
		}
	};

	/**
	 * Do the actual job of replacing the string
	 * by dispatching the change using the block's clientId
	 * as reference.
	 *
	 * @since 1.0.1
	 *
	 * @param {Object} args      Args object containing element, pattern and text.
	 * @param {string} attribute The attribute to be mutated e.g. content.
	 *
	 * @return {void}
	 */
	const replaceBlockAttribute = ( args: any, attribute: string ): void => {
		const { pattern, text, element, status } = args;
		const { attributes, clientId } = element;

		if (
			undefined === attributes ||
			undefined === attributes[ attribute ]
		) {
			return;
		}

		const oldString: string =
			attributes[ attribute ].text || attributes[ attribute ];
		const newString: string = oldString.replace( args.pattern, () => {
			setReplacements( ( items ) => items + 1 );
			return args.text;
		} );

		if ( newString === oldString ) {
			return;
		}

		const property = {};
		property[ attribute ] = newString;

		if ( args.context ) {
			( dispatch( 'core/block-editor' ) as any ).updateBlockAttributes(
				clientId,
				property
			);
		}

		// Handle edge-case ('value') with Pullquotes.
		if ( attributes.value ) {
			if ( args.context ) {
				(
					dispatch( 'core/block-editor' ) as any
				 ).updateBlockAttributes( clientId, { value: newString } );
			}
			setReplacements( ( items ) => items + 1 );
		}
	};

	/**
	 * Listen for Selection.
	 *
	 * Constantly listen for when the user selects a
	 * a text in the Block Editor.
	 *
	 * @since 1.2.0
	 *
	 * @return {void}
	 */
	useEffect( () => {
		const editor = getBlockEditorIframe();

		editor.addEventListener( 'selectionchange', handleSelection );

		return () => {
			editor.removeEventListener( 'selectionchange', handleSelection );
		};
	}, [] );

	/**
	 * Safe Shortcut.
	 *
	 * Check if the current WordPress version is greater than or equal to 6.4.0
	 * before rendering the Shortcut component.
	 *
	 * @since 1.3.1
	 * @return {JSX.Element|null} Shortcut.
	 */
	const SafeShortcut = (): JSX.Element | null =>
		isWpVersion( '6.4.0' ) ? <Shortcut onKeyDown={ openModal } /> : null;

	return (
		<>
			<SafeShortcut />
			<Tooltip
				text={ __(
					'Search & Replace',
					'search-replace-for-block-editor'
				) }
			>
				<Button
					icon={ search }
					label={ __(
						'Search & Replace',
						'search-replace-for-block-editor'
					) }
					onClick={ openModal }
				/>
			</Tooltip>
			{ isModalVisible && (
				<Modal
					title={ __(
						'Search & Replace',
						'search-replace-for-block-editor'
					) }
					onRequestClose={ closeModal }
					className="search-replace-modal"
				>
					<div id="search-replace-modal__text-group">
						<TextControl
							type="text"
							label={ __( 'Search' ) }
							value={ searchInput }
							onChange={ ( value ) => setSearchInput( value ) }
							placeholder="Lorem ipsum..."
							__nextHasNoMarginBottom
						/>
						<TextControl
							type="text"
							label={ __( 'Replace' ) }
							value={ replaceInput }
							onChange={ ( value ) => setReplaceInput( value ) }
							__nextHasNoMarginBottom
						/>
					</div>

					<div id="search-replace-modal__toggle">
						<ToggleControl
							label={ __(
								'Match Case | Expression',
								'search-replace-for-block-editor'
							) }
							checked={ caseSensitive }
							onChange={ handleCaseSensitive }
							__nextHasNoMarginBottom
						/>
					</div>

					{ replacements ? (
						<div id="search-replace-modal__notification">
							<p>
								{ context ? (
									<>
										<strong>{ replacements }</strong>{ ' ' }
										{ __(
											'item(s) replaced successfully',
											'search-replace-for-block-editor'
										) }
										.
									</>
								) : (
									<>
										<strong>{ replacements }</strong>{ ' ' }
										{ __(
											'item(s) found',
											'search-replace-for-block-editor'
										) }
										.
									</>
								) }
							</p>
						</div>
					) : (
						''
					) }

					<div id="search-replace-modal__button-group">
						<Button
							variant="primary"
							onClick={ () => replace( true ) }
						>
							{ __( 'Replace' ) }
						</Button>
						<Button variant="secondary" onClick={ closeModal }>
							{ __( 'Done' ) }
						</Button>
					</div>
				</Modal>
			) }
		</>
	);
};

export default SearchReplaceForBlockEditor;
