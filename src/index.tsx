import {
    __experimentalFullscreenModeClose as FullscreenModeClose,
    __experimentalMainDashboardButton as MainDashboardButton,
} from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Modal, TextControl, Button } from '@wordpress/components';
import { dispatch, select } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import { search } from '@wordpress/icons';

import './styles.scss';

import getRestrictedBlocks from './utils/getRestrictedBlocks';

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
      'gi'
    );

    select('core/block-editor').getBlocks().forEach((element) => {
      recursivelyReplace(element, pattern, replaceInput);
    });
  };

  /**
   * Recursively traverse and replace the text in the
   * Block Editor with the user's text.
   *
   * @since 1.0.0
   *
   * @param {Object} element Gutenberg editor block.
   * @param {string} pattern Search pattern.
   * @param {string} text    Replace pattern.
   *
   * @returns {void}
   */
  const recursivelyReplace = (element, pattern, text) => {
    if (getRestrictedBlocks().indexOf(element.name) === -1) {
      replaceString(element, pattern, text);
    }

    if (element.innerBlocks.length) {
      element.innerBlocks.forEach((innerElement) => {
        recursivelyReplace(innerElement, pattern, text);
      });
    }
  }

  /**
   * Do the actual job of replacing the string
   * by dispatching the change using the block's clientID
   * as reference.
   *
   * @since 1.0.0
   *
   * @param {Object} element Gutenberg editor block.
   * @param {string} pattern Search pattern.
   * @param {string} text    Replace pattern.
   *
   * @returns {void}
   */
  const replaceString = (element, pattern, text) => {
    const { attributes, clientId } = element;

    // Bail out if undefined...
    if (
      attributes === undefined ||
      attributes.content === undefined ||
      attributes.content.text === undefined
    ) {
      return;
    }

    let oldString: string = attributes.content.text;
    let newString: string = oldString.replace(pattern, () => {
      setReplacements((items) => items + 1);
      return text;
    });

    if (newString === oldString) {
      return;
    }

    (dispatch('core/block-editor') as any)
      .updateBlockAttributes(
        clientId,
        {
          content: newString,
        }
      );
  };

  return (
    <MainDashboardButton>
      <FullscreenModeClose />
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
