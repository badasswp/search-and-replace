<?php
/**
 * Plugin Name: Search and Replace for Block Editor
 * Plugin URI:  https://github.com/badasswp/search-and-replace
 * Description: Search and Replace text within the Block Editor.
 * Version:     1.8.0
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

define( 'SRFBE', 'search-replace-for-block-editor' );

/**
 * Load Search & Replace Script for Block Editor.
 *
 * @since 1.0.0
 * @since 1.0.2 Load asset via plugin directory URL.
 * @since 1.2.2 Localise WP version.
 * @since 1.7.0 Use webpack generated PHP asset file.
 *
 * @wp-hook 'enqueue_block_editor_assets'
 */
add_action( 'enqueue_block_editor_assets', function() {
	global $wp_version;

	$assets = get_assets( plugin_dir_path( __FILE__ ) . './dist/app.asset.php' );

	wp_enqueue_script(
		SRFBE,
		trailingslashit( plugin_dir_url( __FILE__ ) ) . 'dist/app.js',
		$assets['dependencies'],
		$assets['version'],
		false,
	);

	wp_set_script_translations(
		SRFBE,
		SRFBE,
		plugin_dir_path( __FILE__ ) . 'languages'
	);

	wp_localize_script(
		SRFBE,
		'srfbe',
		[
			'wpVersion' => $wp_version,
		]
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
		SRFBE,
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
} );

/**
 * Get Asset dependencies.
 *
 * @since 1.7.0
 *
 * @param string $path Path to webpack generated PHP asset file.
 * @return array
 */
function get_assets( string $path ): array {
	$assets = [
		'version'      => strval( time() ),
		'dependencies' => [],
	];

	if ( ! file_exists( $path ) ) {
		return $assets;
	}

	// phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
	$assets = require_once $path;

	return $assets;
}
