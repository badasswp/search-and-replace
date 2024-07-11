# search-and-replace
Search and Replace text within the Block Editor quickly and easily.

<img width="446" alt="search-and-replace" src="https://github.com/badasswp/search-and-replace/assets/149586343/c3febf99-e9db-4b7b-82fd-c01e5428123a">

## Why Search and Replace for Block Editor?

This plugin brings the familiar __Search and Replace__ functionality that PC users have grown accustomed to while using __Microsoft Word__ and __Google Docs__ to the block editor. It enhances user efficiency by allowing quick text searches and bulk changes throughout content, saving time and ensuring consistency.

It also reduces the risk of manual errors, streamlining workflows for editors, content creators and site administrators, ultimately improving the overall management of WordPress sites.

https://github.com/badasswp/search-and-replace/assets/149586343/d4acfab3-338b-434f-b09c-769df9331095

### Hooks

#### `search-replace-for-block-editor.allowedBlocks`

This custom hook (filter) provides the ability to include the search and replace functionality for your custom block:

```js
import { addFilter } from '@wordpress/hooks';

addFilter(
  'search-replace-for-block-editor.allowedBlocks',
  'yourBlocks',
  (allowedBlocks) => {
    if (allowedBlocks.indexOf('your/block') === -1) {
      allowedBlocks.push('your/block');
    }

    return allowedBlocks;
  }
);
```

**Parameters**

- allowedBlocks _`{string[]}`_ List of Allowed Blocks.

#### `search-replace-for-block-editor.keyboardShortcut`

This custom hook (filter) provides a way for users to specify their preferred keyboard shortcut option. For e.g to use the 'K' option on your keyboard, you could do like so:

```js
import { addFilter } from '@wordpress/hooks';

addFilter(
  'search-replace-for-block-editor.keyboardShortcut',
  'yourShortcut',
  (option) => {
    return {
      character: 'k',
      ...option,
    }
  }
);
```

**Parameters**

- option _`{Object}`_ By default this is an object, containing `modifier` and `character` properties which together represent the following command `CMD + SHIFT + F`.
