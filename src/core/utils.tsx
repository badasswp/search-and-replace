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
  return applyFilters( 'search-replace-for-block-editor.allowedBlocks', getTextBlocks() ) as string[];
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
  .filter( ( block ) => {
    return !!(block?.category === 'text');
  } )
  .map( ( block ) => {
    return block?.name;
  } );

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
  return applyFilters( 'search-replace-for-block-editor.keyboardShortcut', options.SHIFT );
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
  return applyFilters( 'search-replace-for-block-editor.caseSensitive', false ) as boolean;
}

/**
 * Get Editor Root.
 *
 * This callback will attempt to grab the Editor root
 * where we will inject our App container.
 *
 * @since 1.2.0
 *
 * @returns Promise<HTMLElement | Error>
 */
export const getEditorRoot = (): Promise<HTMLElement | Error> => {
  let elapsedTime: number = 0;
  const interval: number = 100;

  const selector: string = isWpVersion( '6.6.0' )
    ? '.editor-header__toolbar'
    : '.edit-post-header__toolbar';

  return new Promise( ( resolve, reject ) => {
    const intervalId = setInterval( () => {
      elapsedTime += interval;
      const root = document.querySelector(selector) as HTMLElement | null;

      if ( root ) {
        clearInterval(intervalId);
        resolve( root );
      }

      if ( elapsedTime > ( 600 * interval ) ) {
        clearInterval( intervalId );
        reject( new Error( 'Unable to get Editor root container...' ) );
      }
    }, interval);
  } );
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
export const getAppRoot = ( parent: HTMLElement ): HTMLDivElement => {
  const container: HTMLDivElement = document.createElement( 'div' );
  container.id = 'search-replace';
  parent.appendChild( container );

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
export const getBlockEditorIframe = (): Document => {
  const editor = document.querySelector( 'iframe[name="editor-canvas"]' );

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
 * @returns {boolean}
 */
export const inContainer = ( selector: string ): boolean => {
  const selection = window.getSelection() as Selection | null;
  const targetDiv = document.querySelector( selector ) as HTMLElement | null;

  if ( ! selection?.rangeCount || ! targetDiv ) {
    return false;
  }

  const range: Range = selection.getRangeAt( 0 );

  return targetDiv.contains( range.startContainer ) && targetDiv.contains( range.endContainer );
}

/**
 * Check if it's up to WP version.
 *
 * @since 1.2.2
 *
 * @param {string} version WP Version.
 * @returns {boolean}
 */
export const isWpVersion = ( version: string ): boolean => {
  const { wpVersion } = srfbe as { wpVersion: string };

  const argVersion: number = getNumberToBase10(
    version.split( '.' ).map( Number )
  );

  const sysVersion: number = getNumberToBase10(
    wpVersion.split( '.' ).map( Number )
  );

  return ! ( sysVersion < argVersion );
}

/**
 * Given an array of numbers, get the Radix
 * (converted to base 10). For e.g. [5, 6, 1] becomes
 * 561 or [2, 7, 4] becomes 274.
 *
 * @since 1.2.2
 *
 * @param {number[]} values Array of positive numbers.
 * @returns {number}
 */
export const getNumberToBase10 = ( values: number[] ): number => {
  const radix: number = values.reduce( ( sum: number, value: number, index: number ) => {
    return sum + ( value * Math.pow(10, ( (values.length - 1) - index) ) );
  }, 0 );

  return radix;
}
