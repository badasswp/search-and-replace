import { addAction } from '@wordpress/hooks';

/**
 * Replace Block Attribute.
 *
 * This function replaces the block attribute
 * based on the block name.
 *
 * @since 1.4.0
 *
 * @param {Function} replaceBlockAttribute Replace Block Attribute.
 * @param {string}   name                  Block Name.
 * @param {any}      args                  Block Arguments.
 *
 * @return {void}
 */
addAction(
	'search-replace-for-block-editor.replaceBlockAttribute',
	'yourBlock',
	( replaceBlockAttribute, name, args ) => {
		switch ( name ) {
			case 'core/quote':
				replaceBlockAttribute( args, 'citation' );
				break;

			case 'core/pullquote':
				replaceBlockAttribute( args, 'value' );
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
);
