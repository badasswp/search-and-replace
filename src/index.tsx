/* eslint-disable no-console */
/* eslint-disable react/no-deprecated */
/* eslint-disable import/no-extraneous-dependencies */

import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import './core/toolbar';
import './core/filters';
import SearchReplaceForBlockEditor from './core/app';
import { getAppRoot, getEditorRoot, isWpVersion } from './core/utils';

( async () => {
	try {
		const app = getAppRoot( ( await getEditorRoot() ) as HTMLElement );
		if ( ! isWpVersion( '6.2.0' ) ) {
			ReactDOM.render( <SearchReplaceForBlockEditor />, app );
		} else {
			createRoot( app ).render( <SearchReplaceForBlockEditor /> );
		}
	} catch ( e ) {
		console.error( e );
	}
} )();
