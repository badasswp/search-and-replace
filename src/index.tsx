import { createRoot } from 'react-dom/client';

import SearchReplaceForBlockEditor from './app';
import { getAppRoot, getEditorRoot } from './utils'

(async () => {
  try {
    const container = await getEditorRoot();
    const app = getAppRoot(container);
    createRoot(app).render(<SearchReplaceForBlockEditor />);
  } catch (e) {
    console.error(e);
  }
})();
