import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { useShortcut } from '@wordpress/keyboard-shortcuts';

import { getShortcut } from './utils';

/**
 * Shortcut for Block Editor.
 *
 * This method implements the custom shortcut
 * functionality for this plugin.
 *
 * @since 1.0.1
 *
 * @param {Object}   Props.
 * @param {function} OpenModal Function.
 *
 * @returns {JSX.Element|null}
 */
export const Shortcut = ({ onKeyDown }): JSX.Element | null => {
  const dispatch = useDispatch();

  dispatch( 'core/keyboard-shortcuts' ).registerShortcut( {
    name: 'search-replace-for-block-editor/search-replace',
    keyCombination: getShortcut(),
    category: 'global',
    description: 'Search & Replace',
  } );

  useShortcut(
    'search-replace-for-block-editor/search-replace',
    useCallback( () => {
      onKeyDown();
    }, [] )
  );

  return null;
};
