<?php
/**
 * Adds events widget.
 *
 * @link       philwilliammee.com
 * @since      1.0.0
 *
 * @package    Cwd_Events
 * @subpackage Cwd_Events/includes
 */

/**
 * The widget for displaying events
 */
class Cwd_Events_Widget extends WP_Widget {
	/**
	 * The main constructor.
	 */
	public function __construct() {
		$widget_ops = array(
			'classname'                   => 'cwd_events_widget',
			'description'                 => 'Adds a localist event widget.',
			'customize_selective_refresh' => true,
		);
		parent::__construct(
			'cwd_events_widget',
			__( 'Events Widget', 'text_domain' ),
			$widget_ops
		);
	}

	/**
	 * The widget form (for the backend )
	 *
	 * @param object $instance The widget instance.
	 */
	public function form( $instance ) {
		$heading = ! empty( $instance['heading'] ) ? $instance['heading'] : esc_html__( 'Heading', 'text_domain' );
		?>
		<p>
		<label for="<?php echo esc_attr( $this->get_field_id( 'heading' ) ); ?>">
		<?php esc_attr_e( 'Heading:', 'text_domain' ); ?>
		</label>

		<input
			class="widefat"
			id="<?php echo esc_attr( $this->get_field_id( 'heading' ) ); ?>"
			name="<?php echo esc_attr( $this->get_field_name( 'heading' ) ); ?>"
			type="text"
			value="<?php echo esc_attr( $heading ); ?>">
		</p>
		<?php
	}

	/**
	 * Update widget settings
	 *
	 * @param array $new_instance Settings as submitted by the user.
	 * @param array $old_instance settings as stored in the database.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance          = array();
		$instance['heading'] = ( ! empty( $new_instance['heading'] ) ) ? wp_strip_all_tags( $new_instance['heading'] ) : '';

		return $instance;
	}

	/**
	 * Display the widget.
	 *
	 * @param object $args The args.
	 * @param object $instance The widget instance.
	 */
	public function widget( $args, $instance ) {
		// echo $args['before_widget'];
		// if ( ! empty( $instance['title'] ) ) {
		// 	echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ) . $args['after_title'];
		// } else{
		// 	echo 'title is empty';
		// }
		?>
		<div id="cwd_events_widget"
			class= "events-listing cwd-events-style"
			data-target= "cwd_events_widget"
			data-depts= ""
			data-entries= "3"
			data-daysahead= "-1"
			data-format= "modern_compact"
			data-group= ""
			data-keyword= ""
			data-heading= "<?php echo esc_html( $instance['heading'] ); ?>"
			data-filterby= "none"
			data-calendarurl= "//events.cornell.edu/api/2.1/events"
			data-apikey= ""
			data-hideaddcal= "true"
			data-hidedescription= ""
			data-truncatedescription= "150"
			data-hideimages= "true"
			data-hidepagination= "true"
			data-wrapperclass= ""
			data-listclass= ""
			data-itemclass= ""
			data-readmore= ""
			data-url= ""
		>
		</div>
		<?php
		// echo $args['after_widget'];
	}

}

