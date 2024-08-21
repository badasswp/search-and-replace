import {
    __experimentalFullscreenModeClose as FullscreenModeClose,
    __experimentalMainDashboardButton as MainDashboardButton,
} from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
import { search } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { dispatch, select } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import { Modal, TextControl, Button } from '@wordpress/components';

import './styles/app.scss';

import { getAllowedBlocks, isCaseSensitive } from './utils';
import { Shortcut } from './shortcut';

/**
 * Search & Replace for Block Editor.
 *
 * This function returns a JSX component that comprises
 * the WP Main dashboard, FullscreenModeClose, Modal & Search button.
 *
 * @since 1.0.0
 *
 * @returns {JSX.Element}
 */
const SearchReplaceForBlockEditor = () => {
  const [replacements, setReplacements] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [replaceInput, setReplaceInput] = useState('');

  const openModal = () => {
    setIsModalVisible(true);
    setReplacements(0);
  }

  const closeModal = () => {
    setIsModalVisible(false);
    setReplacements(0);
  }

  /**
   * Handle the implementation for when the user
   * clicks the 'Replace' button.
   *
   * @since 1.0.0
   *
   * @returns {void}
   */
  const replace = () => {
    setReplacements(0);

    const pattern = new RegExp(
      `(?<!<[^>]*)${searchInput}(?<![^>]*<)`,
      isCaseSensitive() ? 'g' : 'gi'
    );

    select('core/block-editor').getBlocks().forEach((element) => {
      recursivelyReplace(element, pattern, replaceInput);
    });
  };

  /**
   * Recursively traverse and replace the text in the
   * Block Editor with the user's text. Perform attribute update
   * on a case by case basis based on mutating attribute.
   *
   * @since 1.0.0
   * @since 1.0.1 Handle edge-cases for quote, pullquote & details block.
   *
   * @param {Object} element Gutenberg editor block.
   * @param {string} pattern Search pattern.
   * @param {string} text    Replace pattern.
   *
   * @returns {void}
   */
  const recursivelyReplace = (element, pattern, text) => {
    if (getAllowedBlocks().indexOf(element.name) !== -1) {
      const args = { element, pattern, text };

      switch (element.name) {
        case 'core/quote':
        case 'core/pullquote':
          replaceBlockAttribute(args, 'citation');
          break;

        case 'core/details':
          replaceBlockAttribute(args, 'summary');
          break;

        default:
          replaceBlockAttribute(args, 'content');
          break;
      }
    }

    if (element.innerBlocks.length) {
      element.innerBlocks.forEach((innerElement) => {
        recursivelyReplace(innerElement, pattern, text);
      });
    }
  }

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
   * @returns {void}
   */
  const replaceBlockAttribute = (args, attribute) => {
    const { attributes, clientId } = args.element;

    if (attributes === undefined || attributes[attribute] === undefined) {
      return;
    }

    let oldString: string = attributes[attribute].text || attributes[attribute];
    let newString: string = oldString.replace(args.pattern, () => {
      setReplacements((items) => items + 1);
      return args.text;
    });

    if (newString === oldString) {
      return;
    }

    const property = {};
    property[attribute] = newString;

    (dispatch('core/block-editor') as any).updateBlockAttributes(clientId, property);

    // Handle edge-case ('value') with Pullquotes.
    if (attributes.value) {
      (dispatch('core/block-editor') as any)
        .updateBlockAttributes(clientId, { value: newString });
      setReplacements((items) => items + 1);
    }
  }

  return (
    <MainDashboardButton>
      <FullscreenModeClose />
      <Shortcut onKeyDown={openModal} />
      <Button
        icon={search}
        onClick={openModal}
      />
      {
        isModalVisible && (
          <Modal
            title={__('Search & Replace', 'search-replace-for-block-editor')}
            onRequestClose={closeModal}
            className="search-replace-modal"
          >
            <div id="search-replace-modal__text-group">
              <TextControl
                type="text"
                label={__('Search')}
                value={searchInput}
                onChange={(value)=>setSearchInput(value)}
                placeholder="Lorem ipsum..."
              />
              <TextControl
                type="text"
                label={__('Replace')}
                value={replaceInput}
                onChange={(value)=>setReplaceInput(value)}
              />
            </div>

            {replacements ? (<p><strong>{replacements}</strong> {__('items replaced successfully', 'search-replace-for-block-editor')}.</p>) : ''}

            <div id="search-replace-modal__button-group">
              <Button
                variant="primary"
                onClick={replace}
              >
                {__('Replace')}
              </Button>
              <Button
                variant="secondary"
                onClick={closeModal}
              >
                {__('Done')}
              </Button>
            </div>
          </Modal>
        )
      }
    </MainDashboardButton>
  );
};

registerPlugin('search-replace-for-block-editor', {
  render: SearchReplaceForBlockEditor,
});
