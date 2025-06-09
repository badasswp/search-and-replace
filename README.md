# search-and-replace
Search and Replace text within the Block Editor quickly and easily.

<img width="446" alt="search-and-replace" src="https://github.com/badasswp/search-and-replace/assets/149586343/c3febf99-e9db-4b7b-82fd-c01e5428123a">

## Download

Download from [WordPress plugin repository](https://wordpress.org/plugins/search-replace-for-block-editor/).

You can also get the latest version from any of our [release tags](https://github.com/badasswp/search-and-replace/releases).

## Why Search and Replace for Block Editor?

This plugin brings the familiar __Search and Replace__ functionality that PC users have grown accustomed to while using __Microsoft Word__ and __Google Docs__ to the Block Editor.

Now you can easily search and replace text right in the Block Editor. Its easy and does exactly what it says. You can also match the text case using the 'Match Case | Expression' toggle.

https://github.com/badasswp/search-and-replace/assets/149586343/d4acfab3-338b-434f-b09c-769df9331095

### Hooks

#### `search-replace-for-block-editor.allowedBlocks`

This custom hook (filter) provides the ability to include the search and replace functionality for your custom block:

```js
import { addFilter } from '@wordpress/hooks';

addFilter(
	'search-replace-for-block-editor.allowedBlocks',
	'yourBlocks',
	( allowedBlocks ) => {
		if ( allowedBlocks.indexOf( 'your/block' ) === -1 ) {
			allowedBlocks.push( 'your/block' );
		}

		return allowedBlocks;
	}
);
```

**Parameters**

- allowedBlocks _`{string[]}`_ List of Allowed Blocks.
<br/>

#### `search-replace-for-block-editor.replaceBlockAttribute`

This custom hook (action) provides the ability to include search and replace functionality for custom blocks with custom properties:

```js
import { addAction } from '@wordpress/hooks';

addAction(
	'search-replace-for-block-editor.replaceBlockAttribute',
	'yourBlock',
	( replaceBlockAttribute, name, args ) => {
		const prop = 'title';

		switch ( name ) {
			case 'namespace/your-block':
				replaceBlockAttribute( args, prop );
				break;
		}
	}
);
```

**Parameters**

- replaceBlockAttribute _`{Function}`_ By default, this is a function that takes in an `args` and `property` as params.
- name _`{string}`_ By default, this is a string containing the `name` of the block.
- args _`{Object}`_ By default, this is an object containing the `element`, `pattern`, `text` and `status`.
<br/>

#### `search-replace-for-block-editor.handleAttributeReplacement`

This custom hook (filter) provides a way to modify how the search and replace functionality works for custom attributes for e.g. non-text attributes or objects.

```js
import { addFilter } from '@wordpress/hooks';

addFilter(
	'search-replace-for-block-editor.handleAttributeReplacement',
	'yourNamespace',
	( oldAttr, args ) => {
		const { name, pattern, handleAttributeReplacement } = args;

		if ( 'your-custom-block' === name ) {
			const newAttr = oldAttr.replace(
				pattern,
				handleAttributeReplacement
			);

			return {
				newAttr,
				isChanged: oldAttr === newAttr,
			};
		}

		return {
			newAttr: oldAttr,
			isChanged: false,
		};
	}
);
```

**Parameters**

- oldAttr _`{any}`_ Old Attribute.
- name _`{string}`_ Name of Block.
- pattern _`{RegExp}`_ Regular Expression pattern.
- handleAttributeReplacement _`{Function}`_ Replace Callback.
<br/>

#### `search-replace-for-block-editor.keyboardShortcut`

This custom hook (filter) provides a way for users to specify their preferred keyboard shortcut option. For e.g to use the 'K' option on your keyboard, you could do like so:

```js
import { addFilter } from '@wordpress/hooks';

addFilter(
	'search-replace-for-block-editor.keyboardShortcut',
	'yourShortcut',
	( shortcut ) => {
		return {
			character: 'k',
			...shortcut,
		};
	}
);
```

**Parameters**

- shortcut _`{Object}`_ By default this is an object, containing `modifier` and `character` properties which together represent the following command `CMD + SHIFT + F`.
<br/>

#### `search-replace-for-block-editor.caseSensitive`

This custom hook (filter) provides a way for users to specify the case sensitivity of each Search & Replace activity. For e.g. to make it case sensitive, you can do like so:

```js
import { addFilter } from '@wordpress/hooks';

addFilter(
	'search-replace-for-block-editor.caseSensitive',
	'yourCaseSensitivity',
	( isCaseSensitive ) => {
		return true;
	}
);
```

**Parameters**

- isCaseSensitive _`{bool}`_ By default, this is a falsy value.

---

## Contribute

Contributions are __welcome__ and will be fully __credited__. To contribute, please fork this repo and raise a PR (Pull Request) against the `master` branch.

### Pre-requisites

You should have the following tools before proceeding to the next steps:

- Composer
- Yarn
- Docker

To enable you start development, please run:

```bash
yarn start
```

This should spin up a local WP env instance for you to work with at:

```bash
http://srbe.localhost:5187
```

You should now have a functioning local WP env to work with. To login to the `wp-admin` backend, please use `admin` for username & `password` for password.

__Awesome!__ - Thanks for being interested in contributing your time and code to this project!
