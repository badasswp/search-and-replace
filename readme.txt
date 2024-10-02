=== Search and Replace for Block Editor ===
Contributors: badasswp
Tags: search, replace, text, block, editor.
Requires at least: 4.0
Tested up to: 6.6.1
Stable tag: 1.0.4
Requires PHP: 7.4
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Search and Replace text within the Block Editor.

== Installation ==

1. Go to 'Plugins > Add New' on your WordPress admin dashboard.
2. Search for 'Search and Replace for Block Editor' plugin from the official WordPress plugin repository.
3. Click 'Install Now' and then 'Activate'.
4. Create a new Post or Open an existing Post.
5. You should now see the 'Search and Replace' icon at the top left.

== Description ==

This plugin brings the familiar Search and Replace functionality that PC users have grown accustomed to in Microsoft Word and Google Docs to the block editor. It enhances user efficiency by allowing quick text searches and bulk changes throughout content, saving time and ensuring consistency. It also reduces the risk of manual errors, streamlining workflows for content creators and site administrators, ultimately improving the overall management of WordPress sites.

== Screenshots ==

1. Search & Replace for Block Editor icon - Locate the top left of the Block Editor.
2. Search & Replace for Block Editor modal - Search and Replace text in the Block Editor.

== Changelog ==

= 1.1.0 =
* Feat: Case Sensitive checkbox.
* Update asset images and screenshots.
* Fix Bugs and Linting issues.
* Update README.txt file.
* Update Translation files.
* Tested up to WP 6.6.2.

= 1.0.4 =
* Update README.txt file.

= 1.0.3 =
* Implement Build Workflow
* Replace `mt_rand` with `string` for asset enqueuing.
* Fix Bugs and Linting issues.
* Tested up to WP 6.6.1.

= 1.0.2 =
* Fix styling issues observed on search icon.
* Implement case sensitivity feature for search and replace.
* Add custom hook - `search-replace-for-block-editor.caseSensitive`.
* Load assets via plugin directory URL.
* Address bugs and linting issues.
* Tested up to WP 6.6.1.

= 1.0.1 =
* Handle edge cases with quote, pullquote & details block.
* Add custom hook - `search-replace-for-block-editor.keyboardShortcut`.
* Fix Bugs & linting issues.
* Updated Unit Tests & README notes.
* Tested up to WP 6.6.

= 1.0.0 =
* Ability to Search & Replace text within the Block Editor.
* Custom Hooks - `search-replace-for-block-editor.allowedBlocks`.
* Provided support for Arabic, Chinese, Hebrew, Hindi, Russian, German, Italian, Croatian, Spanish & French languages.
* Unit Tests coverage.
* Tested up to WP 6.5.5.

== Contribute ==

If you'd like to contribute to the development of this plugin, you can find it on [GitHub](https://github.com/badasswp/search-and-replace).

To build, clone repo and run `npm install && npm run build`
