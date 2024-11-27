import { __ } from '@wordpress/i18n';
import { search } from '@wordpress/icons';
import { dispatch, select } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { Modal, TextControl, ToggleControl, Button } from '@wordpress/components';

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
  const [caseSensitive, setCaseSensitive] = useState(false);

  const openModal = (): void => {
    setIsModalVisible(true);
    setReplacements(0);
  }

  const closeModal = (): void => {
    setIsModalVisible(false);
    setReplacements(0);
  }

  /**
   * On Selection.
   *
   * Populate the find field when the user selects
   * a text range in the Block Editor.
   *
   * @since 1.2.0
   *
   * @returns {void}
   */
  const onSelection = () => {
    const selectedText = window.getSelection().toString();
    const modalSelector = '.search-replace-modal';

    if (selectedText && !inContainer(modalSelector)) {
      setSearchInput(selectedText);
    }
  };

  /**
   * Check if the selection is made inside target container,
   * for e.g. the `search-replace-modal`.
   * 
   * @since 1.2.1
   * 
   * @param {string} selector Target selector.
   * 
   * @returns {boolean}
   */
  const inContainer = (selector) => {
    const selection = window.getSelection();
    const targetDiv = document.querySelector(selector);
    
    if (!selection.rangeCount || !targetDiv) {
      return false;
    }
    
    const range = selection.getRangeAt(0);
    return targetDiv.contains(range.startContainer) && targetDiv.contains(range.endContainer);
  }

  /**
   * Listen for Selection.
   *
   * Constantly listen for when the user selects a
   * a text in the Block Editor.
   *
   * @since 1.2.0
   *
   * @returns {void}
   */
  useEffect(() => {
    document.addEventListener(
      'selectionchange', onSelection
    );

    return () => {
      document.removeEventListener(
        'selectionchange', onSelection
      );
    };
  }, []);

  /**
   * Handle case sensitive toggle feature
   * to enable user perform case-sensitive search
   * and replacements.
   *
   * @since 1.1.0
   *
   * @param {boolean} newValue
   */
  const handleCaseSensitive = (newValue: boolean): void => {
    setCaseSensitive( newValue );
  }

  /**
   * Handle the implementation for when the user
   * clicks the 'Replace' button.
   *
   * @since 1.0.0
   *
   * @returns {void}
   */
  const replace = (): void => {
    setReplacements(0);

    if (!searchInput) {
      return;
    }

    const pattern = new RegExp(
      `(?<!<[^>]*)${searchInput}(?<![^>]*<)`,
      isCaseSensitive() || caseSensitive ? 'g' : 'gi'
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

        case 'core/table':
          replaceTableContent(args);
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

    if (undefined === attributes || undefined === attributes[attribute]) {
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

  /**
   * Do the actual job of replacing the string in table block
   * by dispatching the change using the block's clientId
   * as reference.
   *
   * @since 1.2.1
   *
   * @param {Object} args Args object containing element, pattern and text.
   *
   * @returns {void}
   */
  const replaceTableContent = (args) => {
    const { attributes, clientId } = args.element;
  
    // Handle Table Caption Replacement
    if (attributes && attributes.caption) {
      let oldCaptionString = attributes.caption.originalHTML || attributes.caption;
      let newCaptionString = oldCaptionString.replace(args.pattern, () => {
        setReplacements((items) => items + 1);
        return args.text;
      });
  
      if (newCaptionString !== oldCaptionString) {
        const captionProperty = { caption: newCaptionString };
        (dispatch('core/block-editor') as any).updateBlockAttributes(clientId, captionProperty);
      }
    }

    // Replace body cells content
    if (attributes.body) {
      const updatedBody = attributes.body.map(row => {
        if (row.cells) {
          
          row.cells = row.cells.map(cell => {
            if (cell.content && cell.content.originalHTML) {
              let oldCellContent = cell.content.originalHTML;
              
              let newCellContent = oldCellContent.replace(args.pattern, () => {
                setReplacements((items) => items + 1);
                return args.text;
              });
              
              if (newCellContent !== oldCellContent) {
                cell.content = newCellContent;
              }
            }
            return cell;
          });
        }
        return row;
      });

      // If any cell content was updated, dispatch the update
      if (JSON.stringify(updatedBody) !== JSON.stringify(attributes.body)) {
        const bodyProperty = { body: updatedBody };
        (dispatch('core/block-editor') as any).updateBlockAttributes(clientId, bodyProperty);
      }
    }

    // Replace head cells content
    if (attributes.head) {
      const updatedHead = attributes.head.map(row => {
        if (row.cells) {
          row.cells = row.cells.map(cell => {
            if (cell.content && cell.content.originalHTML) {
              let oldCellContent = cell.content.originalHTML;
              let newCellContent = oldCellContent.replace(args.pattern, () => {
                setReplacements((items) => items + 1);
                return args.text;
              });

              if (newCellContent !== oldCellContent) {
                cell.content = newCellContent; 
              }
            }
            return cell;
          });
        }
        return row;
      });

      // If any head cell content was updated, dispatch the update
      if (JSON.stringify(updatedHead) !== JSON.stringify(attributes.head)) {
        const headProperty = { head: updatedHead };
        (dispatch('core/block-editor') as any).updateBlockAttributes(clientId, headProperty);
      }
    }

    // Replace foot cells content
    if (attributes.foot) {
      const updatedFoot = attributes.foot.map(row => {
        if (row.cells) {
          row.cells = row.cells.map(cell => {
            if (cell.content && cell.content.originalHTML) {
              let oldCellContent = cell.content.originalHTML;
              let newCellContent = oldCellContent.replace(args.pattern, () => {
                setReplacements((items) => items + 1);
                return args.text;
              });

              if (newCellContent !== oldCellContent) {
                cell.content = newCellContent; 
              }
            }
            return cell;
          });
        }
        return row;
      });

      // If any foot cell content was updated, dispatch the update
      if (JSON.stringify(updatedFoot) !== JSON.stringify(attributes.foot)) {
        const footProperty = { foot: updatedFoot };
        (dispatch('core/block-editor') as any).updateBlockAttributes(clientId, footProperty);
      }
    }
  }
  
  return (
    <>
      <Shortcut onKeyDown={openModal} />
      <Button
        icon={ search }
        label={__('Search & Replace', 'search-replace-for-block-editor')}
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
                onChange={(value) => setSearchInput(value)}
                placeholder="Lorem ipsum..."
                __nextHasNoMarginBottom
              />
              <TextControl
                type="text"
                label={__('Replace')}
                value={replaceInput}
                onChange={(value) => setReplaceInput(value)}
                __nextHasNoMarginBottom
              />
            </div>

            <div id="search-replace-modal__toggle">
              <ToggleControl
                label={__('Match Case | Expression', 'search-replace-for-block-editor')}
                checked={caseSensitive}
                onChange={handleCaseSensitive}
                __nextHasNoMarginBottom
              />
            </div>

            {
              replacements ? (
                <div id="search-replace-modal__notification">
                  <p>
                    <strong>{replacements}</strong> {__('item(s) replaced successfully', 'search-replace-for-block-editor')}.
                  </p>
                </div>
              ) : ''
            }

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
    </>
  );
};

export default SearchReplaceForBlockEditor;
