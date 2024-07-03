import { applyFilters } from '@wordpress/hooks';

/**
 * Allowed Blocks.
 *
 * This function grabs the list of allowed blocks
 * and returns a list of the items.
 *
 * @since 1.0.0
 *
 * @returns {string[]}
 */
const getAllowedBlocks = () => {
  /**
   * Allow Blocks.
   *
   * Filter and include these Specific blocks
   * for the Search & Replace.
   *
   * @since 1.0.0
   *
   * @param {string[]} blocks List of Blocks.
   * @returns {string[]}
   */
  return applyFilters(
    'search-replace-for-block-editor.allowedBlocks',
    [
      'core/paragraph',
      'core/heading',
      'core/list',
      'core/quote',
      'core/code',
      'core/details',
      'core/preformatted',
      'core/pullquote',
      'core/verse',
      'core/table',
      'core/freeform',
    ]
  ) as string[];
}

export default getAllowedBlocks;
