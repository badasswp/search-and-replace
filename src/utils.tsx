import { applyFilters } from '@wordpress/hooks';
import { getBlockTypes } from '@wordpress/blocks';

/**
 * Allowed Blocks.
 *
 * This function filters the list of text blocks
 * using the `allowedBlocks` hook.
 *
 * @since 1.0.0
 *
 * @returns {string[]}
 */
export const getAllowedBlocks = (): string[] => {
  /**
   * Allow Text Blocks.
   *
   * Filter and allow only these Specific blocks
   * for the Search & Replace.
   *
   * @since 1.0.0
   *
   * @param {string[]} blocks List of Blocks.
   * @returns {string[]}
   */
  return applyFilters('search-replace-for-block-editor.allowedBlocks', getTextBlocks()) as string[];
}

/**
 * Get Text Blocks.
 *
 * This function grabs the list of text blocks
 * and returns the block names.
 *
 * @since 1.0.0
 *
 * @returns {string[]}
 */
export const getTextBlocks = (): string[] => getBlockTypes()
  .filter((block) => {
    return !!(block?.category === 'text');
  })
  .map((block) => {
    return block?.name;
  });

/**
 * Get ShortCut.
 *
 * This function filters the user's preferred
 * shortcut option.
 *
 * @since 1.0.1
 *
 * @returns {Object}
 */
export const getShortcut = () => {
  const options = {
    CMD: {
      modifier: 'primary',
      character: 'f',
    },
    SHIFT: {
      modifier: 'primaryShift',
      character: 'f',
    },
    ALT: {
      modifier: 'primaryAlt',
      character: 'f',
    },
  }

  /**
   * Filter Keyboard Shortcut.
   *
   * By default the passed option would be SHIFT which
   * represents `CMD + SHIFT + F`.
   *
   * @since 1.0.1
   *
   * @param {Object} Shortcut Option.
   * @returns {Object}
   */
  return applyFilters('search-replace-for-block-editor.keyboardShortcut', options.SHIFT);
}

/**
 * Determine if a Search & Replace activity is case-sensitive
 * and treat accordingly.
 *
 * @since 1.0.2
 *
 * @returns {boolean}
 */
export const isCaseSensitive = (): boolean => {
  /**
   * Filter Case Sensitivity.
   *
   * By default this would be a falsy value.
   *
   * @since 1.0.2
   *
   * @param {boolean} Case Sensitivity.
   * @returns {boolean}
   */
  return applyFilters('search-replace-for-block-editor.caseSensitive', false) as boolean;
}

/**
 * Get Editor Root.
 *
 * This callback will attempt to grab the Editor root
 * where we will inject our App container.
 *
 * @since 1.2.0
 *
 * @returns Promise<HTMLElement>
 */
export const getEditorRoot = () => {
  let elapsedTime = 0;
  const interval = 100;

  const selector = isWpVersion('6.7.0')
    ? '.editor-header__toolbar'
    : '.edit-post-header__toolbar';

  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      elapsedTime += interval;
      const root = document.getElementById('editor').querySelector(selector);

      if (root) {
        clearInterval(intervalId);
        resolve(root);
      }

      if (elapsedTime > (600 * interval)) {
        clearInterval(intervalId);
        reject(new Error('Unable to get Editor root container...'));
      }
    }, interval);
  });
};

/**
 * Get App Container.
 *
 * Create an DIV container within the Editor root where
 * we will inject our React app.
 *
 * @since 1.2.0
 *
 * @param {HTMLElement} parent - The Parent DOM element.
 * @returns {HTMLDivElement}
 */
export const getAppRoot = (parent) => {
  const container = document.createElement('div');
  container.id = 'search-replace';
  parent.appendChild(container);

  return container;
};

/**
 * Get iFrame Document.
 *
 * Retrieves the document object of the Block Editor
 * iframe with the name "editor-canvas".
 *
 * @since 1.2.1
 *
 * @returns {Document}
 */
export const getBlockEditorIframe = () => {
  const editor = document.querySelector('iframe[name="editor-canvas"]');

  return editor && editor instanceof HTMLIFrameElement
    ? editor.contentDocument || editor.contentWindow?.document
    : document;
}

/**
 * Check if the selection is made inside a Container,
 * for e.g. the `search-replace-modal`.
 *
 * @since 1.2.1
 *
 * @param {string} selector Target selector.
 *
 * @returns {boolean}
 */
export const inContainer = (selector) => {
  const selection = window.getSelection();
  const targetDiv = document.querySelector(selector);

  if (!selection.rangeCount || !targetDiv) {
    return false;
  }

  const range = selection.getRangeAt(0);

  return targetDiv.contains(range.startContainer) && targetDiv.contains(range.endContainer);
}

/**
 * Check if is WP version.
 *
 * @since 1.3.0
 *
 * @param {string} version WP Version.
 * @returns {boolean}
 */
const isWpVersion = (version) => {
  const { wpVersion } = srfbe;

  return parseInt(version) * 100 >= parseInt(wpVersion) * 100;
}
