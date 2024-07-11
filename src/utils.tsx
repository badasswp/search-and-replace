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
export const getAllowedBlocks = () => {
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
export const getTextBlocks = () => getBlockTypes()
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
 * @since 1.0.0
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
   * Filter the user's preferred Shortcut option
   * for plugin use.
   *
   * @since 1.0.0
   *
   * @param {Object} Shortcut Option.
   * @returns {Object}
   */
  return applyFilters('search-replace-for-block-editor.keyboardShortcut', options.CMD);
}
