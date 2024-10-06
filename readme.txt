=== Search and Replace for Block Editor ===
Contributors: badasswp
Tags: search, replace, text, block, editor.
Requires at least: 4.0
Tested up to: 6.6.2
Stable tag: 1.1.1
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

This plugin brings the familiar Search and Replace functionality that PC users have grown accustomed to in <strong>Microsoft Word</strong> and <strong>Google Docs</strong> to the Block Editor.

Now you can easily search and replace text right in the Block Editor. Its easy and does exactly what it says. You can also match the text case using the 'Match Case | Expression' toggle.

= ✨ Getting Started =

Create a new Post or open an existing Post. Locate the 'Search and Replace' icon at the <strong>top left</strong> corner of the Block Editor and click on it. Proceed to type in the text you wish to replace and click on 'Replace'.

You can get a taste of how this works, by using the [demo](https://tastewp.com/create/NMS/8.0/6.6.2/search-replace-for-block-editor/twentytwentythree?ni=true&origin=wp) link.

= 🔌🎨 Plug and Play or Customize =

The Search & Replace for Block Editor plugin is built to work right out of the box. Simply install, activate and start using.

Want to add your personal touch? All of our documentation can be found [here](https://github.com/badasswp/search-and-replace). You can override the plugin's behaviour with custom logic of your own using [hooks](https://github.com/badasswp/search-and-replace?tab=readme-ov-file#hooks).

== Screenshots ==

1. Search & Replace for Block Editor icon - Locate the top left of the Block Editor.
2. Search & Replace for Block Editor modal - Search and Replace text in the Block Editor.
3. Match Case in Search & Replace - Now you can match the case of the text and Search and Replace.

== Changelog ==

= 1.1.1 =
* Update README notes.
* Update asset icons & screenshots.
* Tested up to WP 6.6.2.

= 1.1.0 =
* Feat: Case Sensitive toggle.
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
