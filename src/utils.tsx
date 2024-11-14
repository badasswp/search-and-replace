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
 * Get Root.
 *
 * This function is responsible for returning
 * the Root Element.
 *
 * @since 1.2.0
 *
 * @param {string} id HTML Element Id.
 * @returns Promise<HTMLElement>
 */
export const getRoot = (id: string): Promise<HTMLElement> => {
  let elapsedTime = 0;
  let interval = 25;

  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      elapsedTime += interval;
      const root = document.getElementById(id);

      if (root) {
        clearInterval(intervalId)
        resolve(root as HTMLElement);
      }

      if (elapsedTime > (10 * interval)) {
        clearInterval(intervalId)
        reject(new Error('Unable to get root container...'));
      }
    }, interval);
  });
}
