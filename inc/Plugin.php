<?php
/**
 * Plugin Class.
 *
 * Register Plugin actions and filters within this
 * class for plugin use.
 *
 * @package SearchReplaceForBlockEditor
 */

namespace SearchReplaceForBlockEditor;

class Plugin {
	/**
	 * Plugin Instance.
	 *
	 * @since 1.9.0
	 *
	 * @var Plugin
	 */
	protected static $instance;

	/**
	 * Plugin Slug.
	 *
	 * @since 1.9.0
	 *
	 * @var string
	 */
	public const SLUG = 'search-replace-for-block-editor';

	/**
	 * Set up Instance.
	 *
	 * @since 1.9.0
	 *
	 * @return Plugin
	 */
	public static function get_instance(): Plugin {
		if ( is_null( static::$instance ) ) {
			static::$instance = new self();
		}

		return static::$instance;
	}

	/**
	 * Run Plugin.
	 *
	 * @since 1.9.0
	 *
	 * @return void
	 */
	public function run(): void {
		add_action( 'init', [ $this, 'register_text_domain' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'register_assets' ] );
	}

	/**
	 * Add Plugin text translation.
	 *
	 * @since 1.0.0
	 *
	 * @wp-hook 'init'
	 */
	public function register_text_domain(): void {
		load_plugin_textdomain(
			self::SLUG,
			false,
			dirname( plugin_basename( __FILE__ ) ) . '../languages'
		);
	}

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
	public function register_assets(): void {
		global $wp_version;

		$assets = $this->get_assets( plugin_dir_path( __FILE__ ) . '../dist/app.asset.php' );

		wp_enqueue_script(
			self::SLUG,
			trailingslashit( plugin_dir_url( __FILE__ ) ) . '../dist/app.js',
			$assets['dependencies'],
			$assets['version'],
			false,
		);

		wp_set_script_translations(
			self::SLUG,
			self::SLUG,
			plugin_dir_path( __FILE__ ) . '../languages'
		);

		wp_localize_script(
			self::SLUG,
			'srfbe',
			[
				'wpVersion' => $wp_version,
			]
		);
	}

	/**
	 * Get Asset dependencies.
	 *
	 * @since 1.7.0
	 *
	 * @param string $path Path to webpack generated PHP asset file.
	 * @return array
	 */
	protected function get_assets( string $path ): array {
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
}
