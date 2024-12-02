import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import SearchReplaceForBlockEditor from './app';
import { getAppRoot, getEditorRoot, isWpVersion } from './utils'

(async () => {
  try {
    const app = getAppRoot(await getEditorRoot() as HTMLElement);
    if (!isWpVersion('6.2.0')) {
      ReactDOM.render(<SearchReplaceForBlockEditor />, app);
    } else {
      createRoot(app).render(<SearchReplaceForBlockEditor />);
    }
  } catch (e) {
    console.error(e);
  }
})();
