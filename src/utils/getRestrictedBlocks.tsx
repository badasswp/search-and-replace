import { applyFilters } from '@wordpress/hooks';

/**
 * Restricted Blocks.
 *
 * This function grabs the list of restricted blocks
 * and returns a list of the items.
 *
 * @since 1.0.0
 *
 * @returns {string[]}
 */
const getRestrictedBlocks = () => {
  /**
   * Restrict Blocks.
   *
   * Filter and exclude these Specific blocks
   * away from the Search & Replace.
   *
   * @since 1.0.0
   *
   * @param {string[]} blocks List of Blocks.
   * @returns {string[]}
   */
  return applyFilters('search-replace-for-block-editor.restrictedBlocks', []) as string[];
}

export default getRestrictedBlocks;
