<?php
/**
 * Plugin Name: Search and Replace for Block Editor
 * Plugin URI:  https://github.com/badasswp/search-and-replace
 * Description: Search and Replace text within the Block Editor.
 * Version:     1.1.1
 * Author:      badasswp
 * Author URI:  https://github.com/badasswp
 * License:     GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: search-replace-for-block-editor
 * Domain Path: /languages
 *
 * @package SearchReplaceForBlockEditor
 */

namespace badasswp\SearchReplaceForBlockEditor;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Load Search & Replace Script for Block Editor.
 *
 * @since 1.0.0
 * @since 1.0.2 Load asset via plugin directory URL.
 *
 * @wp-hook 'enqueue_block_editor_assets'
 */
add_action( 'enqueue_block_editor_assets', function() {
	wp_enqueue_script(
		'search-replace-for-block-editor',
		trailingslashit( plugin_dir_url( __FILE__ ) ) . 'dist/app.js',
		[
			'wp-i18n',
			'wp-element',
			'wp-blocks',
			'wp-components',
			'wp-editor',
			'wp-hooks',
			'wp-compose',
			'wp-plugins',
			'wp-edit-post',
			'wp-edit-site',
		],
		'1.1.0',
		false,
	);

	wp_set_script_translations(
		'search-replace-for-block-editor',
		'search-replace-for-block-editor',
		plugin_dir_path( __FILE__ ) . 'languages'
	);
} );

/**
 * Add Plugin text translation.
 *
 * @since 1.0.0
 *
 * @wp-hook 'init'
 */
add_action( 'init', function() {
	load_plugin_textdomain(
		'search-replace-for-block-editor',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
} );
