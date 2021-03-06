<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       philwilliammee.com
 * @since      1.0.0
 *
 * @package    Cwd_Events
 * @subpackage Cwd_Events/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Cwd_Events
 * @subpackage Cwd_Events/admin
 * @author     Philwilliammee <philwilliammee@gmail.com>
 */
class Cwd_Events_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string $plugin_name       The name of this plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Cwd_Events_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Cwd_Events_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/cwd-events-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Cwd_Events_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Cwd_Events_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/cwd-events-admin.js', array( 'jquery' ), $this->version, false );

	}

	/**
	 * Create our custom events widget.
	 *   Cwd_Events_Custom_Widget required by class-cwd-events-widget
	 *
	 * @since    1.0.0
	 */
	public function register_widgets() {

		register_widget( 'Cwd_Events_Widget' );

	}

	/**
	 * Create a widget area that can be used in template.
	 *
	 * @todo this can be moved to the users theme.
	 */
	public function register_sidebars() {

		register_sidebar(
			array(
				'name'          => __( 'Events After Content', 'cwd-events' ),
				'id'            => 'cwd-events-page-after-content-widget-area',
				'before_widget' => '<div id="%1$s" class="widget %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<h3 class="widgettitle">',
				'after_title'   => '</h3>',
			)
		);

	}
}
