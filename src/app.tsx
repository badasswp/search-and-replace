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
  const [matchCount, setMatchCount] = useState(0);

  const openModal = (): void => {
    setIsModalVisible(true);
    setReplacements(0);
    setMatchCount(0);
  }

  const closeModal = (): void => {
    setIsModalVisible(false);
    setReplacements(0);
    setMatchCount(0);
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

    if (selectedText) {
      setSearchInput(selectedText);
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
   * Listen for case-sensitivity change.
   *
   * Constantly listen for when the user changes the
   * case-sensitivity.
   *
   * @since 1.3.0
   *
   * @returns {void}
   */
  useEffect(() => {
    searchFn(searchInput);
  }, [caseSensitive]);

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
   * Handle the implementation for when the user
   * search for a string.
   *
   * @since 1.3.0
   *
   * @returns {void}
   */
  const searchFn = (value): void => {
    setMatchCount(0);
    setSearchInput(value);

    if (!value) {
      return;
    }

    const pattern = new RegExp(
      `(?<!<[^>]*)${value}(?<![^>]*<)`,
      isCaseSensitive() || caseSensitive ? 'g' : 'gi'
    );

    select('core/block-editor').getBlocks().forEach((element) => {
      recursivelySearch(element, pattern);
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
   * Recursively traverse and search the text in the
   * Block Editor with the user's text.
   *
   * @since 1.3.0
   * @since 1.0.1 Handle edge-cases for quote, pullquote & details block.
   *
   * @param {Object} element Gutenberg editor block.
   * @param {string} pattern Search pattern.
   *
   * @returns {void}
   */
  const recursivelySearch = (element, pattern) => {
    if (getAllowedBlocks().indexOf(element.name) !== -1) {
      const args = { element, pattern};
      switch (element.name) {
        case 'core/quote':
        case 'core/pullquote':
          searchBlockAttribute(args, 'citation');
          break;
        case 'core/details':
          searchBlockAttribute(args, 'summary');
          break;
        
        case 'core/table':
          searchTableContent(args);
          break;
        default:
          searchBlockAttribute(args, 'content');
          break;
      }
    }
    if (element.innerBlocks.length) {
      element.innerBlocks.forEach((innerElement) => {
        recursivelySearch(innerElement, pattern);
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
   * Do the actual job of searching the string
   * in the block editor.
   *
   * @since 1.3.0
   *
   * @param {Object} args      Args object containing element, pattern and text.
   * @param {string} attribute The attribute to be mutated e.g. content.
   *
   * @returns {void}
   */
  const searchBlockAttribute = (args, attribute) => {
    const { attributes } = args.element;
    if (undefined === attributes || undefined === attributes[attribute]) {
      return;
    }
    let oldString: string = attributes[attribute].text || attributes[attribute];
    let matches = (oldString.match(args.pattern) || []).length;
    if(matches){
      setMatchCount(prevCount => prevCount + 1);
    }
  }

  /**
   * Do the actual job of searching the string in table block
   * in the block editor.
   *
   * @since 1.3.0
   *
   * @param {Object} args Args object containing element, pattern and text.
   *
   * @returns {void}
   */
  const searchTableContent = (args) => {
    const { attributes } = args.element;

    // Handle Table Caption Replacement
    if (attributes && attributes.caption) {
      let oldCaptionString = attributes.caption.text || attributes.caption;
      let matches = (oldCaptionString.match(args.pattern) || []).length;
      if(matches){
        setMatchCount(prevCount => prevCount + 1);
      }
    }

    // Replace body cells content
    if (attributes.body) {
      const updatedBody = attributes.body.map(row => {
        if (row.cells) {
          row.cells = row.cells.map(cell => {
            if (cell.content) {
              let oldCellContent = cell.content.text || cell.content;
              let matches = (oldCellContent.match(args.pattern) || []).length;
              if(matches){
                setMatchCount(prevCount => prevCount + 1);
              }
            }
            return cell;
          });
        }
        return row;
      });
    }

    // Replace head cells content
    if (attributes.head) {
      const updatedHead = attributes.head.map(row => {
        if (row.cells) {
          row.cells = row.cells.map(cell => {
            if (cell.content) {
              let oldCellContent = cell.content.text || cell.content;
              let matches = (oldCellContent.match(args.pattern) || []).length;
              if(matches){
                setMatchCount(prevCount => prevCount + 1);
              }
            }
            return cell;
          });
        }
        return row;
      });
    }

    // Replace foot cells content
    if (attributes.foot) {
      const updatedFoot = attributes.foot.map(row => {
        if (row.cells) {
          row.cells = row.cells.map(cell => {
            if (cell.content) {
              let oldCellContent = cell.content.text || cell.content;
              let matches = (oldCellContent.match(args.pattern) || []).length;
              if(matches){
                setMatchCount(prevCount => prevCount + 1);
              }
            }
            return cell;
          });
        }
        return row;
      });
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
                onChange={(value) => searchFn(value)}
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

            {
              matchCount && !replacements ? (
                <div id="search-replace-modal__notification">
                  <p>
                    <strong>{matchCount}</strong> {__('item(s) found', 'search-replace-for-block-editor')}.
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
