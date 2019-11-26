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
		// Set the default values.
		$heading             = ! empty( $instance['heading'] ) ? $instance['heading'] : esc_html__( 'Localist-Viewer', 'text_domain' );
		$target              = ! empty( $instance['target'] ) ? $instance['target'] : esc_html__( 'cwd_events_id', 'text_domain' );
		$depts               = ! empty( $instance['depts'] ) ? $instance['depts'] : esc_html__( '0', 'text_domain' );
		$entries             = ! empty( $instance['entries'] ) ? $instance['entries'] : esc_html__( '3', 'text_domain' );
		$daysahead           = ! empty( $instance['daysahead'] ) ? $instance['daysahead'] : esc_html__( '365', 'text_domain' );
		$format              = ! empty( $instance['format'] ) ? $instance['format'] : esc_html__( 'modern_compact', 'text_domain' );
		$group               = ! empty( $instance['group'] ) ? $instance['group'] : esc_html__( 'dept', 'text_domain' );
		$keyword             = ! empty( $instance['keyword'] ) ? $instance['keyword'] : esc_html__( '0', 'text_domain' );
		$filterby            = ! empty( $instance['filterby'] ) ? $instance['filterby'] : esc_html__( '0', 'text_domain' );
		$calendarurl         = ! empty( $instance['calendarurl'] ) ? $instance['calendarurl'] : esc_html__( '//events.cornell.edu/api/2.1/events', 'text_domain' );
		$apikey              = ! empty( $instance['apikey'] ) ? $instance['apikey'] : esc_html__( '0', 'text_domain' );
		$hideaddcal          = ! empty( $instance['hideaddcal'] ) ? $instance['hideaddcal'] : esc_html__( '0', 'text_domain' );
		$hidedescription     = ! empty( $instance['hidedescription'] ) ? $instance['hidedescription'] : esc_html__( '0', 'text_domain' );
		$truncatedescription = ! empty( $instance['truncatedescription'] ) ? $instance['truncatedescription'] : esc_html__( '150', 'text_domain' );
		$hideimages          = ! empty( $instance['hideimages'] ) ? $instance['hideimages'] : esc_html__( 'false', 'text_domain' );
		$hidepagination      = ! empty( $instance['hidepagination'] ) ? $instance['hidepagination'] : esc_html__( 'false', 'text_domain' );
		$wrapperclass        = ! empty( $instance['wrapperclass'] ) ? $instance['wrapperclass'] : esc_html__( 'cwd-card-grid three-card', 'text_domain' );
		$listclass           = ! empty( $instance['listclass'] ) ? $instance['listclass'] : esc_html__( 'cards', 'text_domain' );
		$itemclass           = ! empty( $instance['itemclass'] ) ? $instance['itemclass'] : esc_html__( 'card', 'text_domain' );
		$readmore            = ! empty( $instance['readmore'] ) ? $instance['readmore'] : esc_html__( 'Read More »', 'text_domain' );
		$url                 = ! empty( $instance['url'] ) ? $instance['url'] : esc_html__( '/events', 'text_domain' );
		?>
		<!-- Start the form -->
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'target' ) ); ?>">
				<?php esc_attr_e( 'Unique ID:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'target' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'target' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $target ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'heading' ) ); ?>">
				<?php esc_attr_e( 'Heading:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'heading' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'heading' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $heading ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'depts' ) ); ?>">
				<?php esc_attr_e( 'depts:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'depts' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'depts' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $depts ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'entries' ) ); ?>">
				<?php esc_attr_e( 'entries:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'entries' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'entries' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $entries ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'daysahead' ) ); ?>">
				<?php esc_attr_e( 'daysahead:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'daysahead' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'daysahead' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $daysahead ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'format' ) ); ?>">
				<?php esc_attr_e( 'format:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'format' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'format' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $format ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'group' ) ); ?>">
				<?php esc_attr_e( 'group:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'group' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'group' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $group ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'keyword' ) ); ?>">
				<?php esc_attr_e( 'keyword:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'keyword' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'keyword' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $keyword ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'filterby' ) ); ?>">
				<?php esc_attr_e( 'filterby:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'filterby' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'filterby' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $filterby ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'calendarurl' ) ); ?>">
				<?php esc_attr_e( 'calendarurl:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'calendarurl' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'calendarurl' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $calendarurl ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'apikey' ) ); ?>">
				<?php esc_attr_e( 'apikey:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'apikey' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'apikey' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $apikey ); ?>"
			>
		</p>

		<p>
			<input
				id="<?php echo esc_attr( $this->get_field_id( 'hideaddcal' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'hideaddcal' ) ); ?>"
				type="checkbox"
				value="true"
				<?php checked( 'true', $hideaddcal ); ?>
			>
			<label for="<?php echo esc_attr( $this->get_field_id( 'hideaddcal' ) ); ?>">
				<?php esc_attr_e( 'hideaddcal:', 'text_domain' ); ?>
			</label>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'hidedescription' ) ); ?>">
				<?php esc_attr_e( 'hidedescription:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'hidedescription' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'hidedescription' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $hidedescription ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'truncatedescription' ) ); ?>">
				<?php esc_attr_e( 'truncatedescription:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'truncatedescription' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'truncatedescription' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $truncatedescription ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'hideimages' ) ); ?>">
				<?php esc_attr_e( 'hideimages:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'hideimages' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'hideimages' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $hideimages ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'hidepagination' ) ); ?>">
				<?php esc_attr_e( 'hidepagination:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'hidepagination' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'hidepagination' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $hidepagination ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'wrapperclass' ) ); ?>">
				<?php esc_attr_e( 'wrapperclass:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'wrapperclass' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'wrapperclass' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $wrapperclass ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'listclass' ) ); ?>">
				<?php esc_attr_e( 'listclass:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'listclass' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'listclass' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $listclass ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'itemclass' ) ); ?>">
				<?php esc_attr_e( 'itemclass:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'itemclass' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'itemclass' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $itemclass ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'readmore' ) ); ?>">
				<?php esc_attr_e( 'readmore:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'readmore' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'readmore' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $readmore ); ?>"
			>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'url' ) ); ?>">
				<?php esc_attr_e( 'url:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'url' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'url' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $url ); ?>"
			>
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
		$instance                        = array();
		$instance['heading']             = ( ! empty( $new_instance['heading'] ) ) ? wp_strip_all_tags( $new_instance['heading'] ) : '';
		$instance['target']              = ( ! empty( $new_instance['target'] ) ) ? wp_strip_all_tags( $new_instance['target'] ) : '';
		$instance['depts']               = ( ! empty( $new_instance['depts'] ) ) ? wp_strip_all_tags( $new_instance['depts'] ) : '';
		$instance['entries']             = ( ! empty( $new_instance['entries'] ) ) ? wp_strip_all_tags( $new_instance['entries'] ) : '';
		$instance['daysahead']           = ( ! empty( $new_instance['daysahead'] ) ) ? wp_strip_all_tags( $new_instance['daysahead'] ) : '';
		$instance['format']              = ( ! empty( $new_instance['format'] ) ) ? wp_strip_all_tags( $new_instance['format'] ) : '';
		$instance['group']               = ( ! empty( $new_instance['group'] ) ) ? wp_strip_all_tags( $new_instance['group'] ) : '';
		$instance['keyword']             = ( ! empty( $new_instance['keyword'] ) ) ? wp_strip_all_tags( $new_instance['keyword'] ) : '';
		$instance['filterby']            = ( ! empty( $new_instance['filterby'] ) ) ? wp_strip_all_tags( $new_instance['filterby'] ) : '';
		$instance['calendarurl']         = ( ! empty( $new_instance['calendarurl'] ) ) ? wp_strip_all_tags( $new_instance['calendarurl'] ) : '';
		$instance['apikey']              = ( ! empty( $new_instance['apikey'] ) ) ? wp_strip_all_tags( $new_instance['apikey'] ) : '';
		$instance['hideaddcal']          = ( ! empty( $new_instance['hideaddcal'] ) ) ? wp_strip_all_tags( $new_instance['hideaddcal'] ) : '';
		$instance['hidedescription']     = ( ! empty( $new_instance['hidedescription'] ) ) ? wp_strip_all_tags( $new_instance['hidedescription'] ) : '';
		$instance['truncatedescription'] = ( ! empty( $new_instance['truncatedescription'] ) ) ? wp_strip_all_tags( $new_instance['truncatedescription'] ) : '';
		$instance['hideimages']          = ( ! empty( $new_instance['hideimages'] ) ) ? wp_strip_all_tags( $new_instance['hideimages'] ) : '';
		$instance['hidepagination']      = ( ! empty( $new_instance['hidepagination'] ) ) ? wp_strip_all_tags( $new_instance['hidepagination'] ) : '';
		$instance['wrapperclass']        = ( ! empty( $new_instance['wrapperclass'] ) ) ? wp_strip_all_tags( $new_instance['wrapperclass'] ) : '';
		$instance['listclass']           = ( ! empty( $new_instance['listclass'] ) ) ? wp_strip_all_tags( $new_instance['listclass'] ) : '';
		$instance['itemclass']           = ( ! empty( $new_instance['itemclass'] ) ) ? wp_strip_all_tags( $new_instance['itemclass'] ) : '';
		$instance['readmore']            = ( ! empty( $new_instance['readmore'] ) ) ? wp_strip_all_tags( $new_instance['readmore'] ) : '';
		$instance['url']                 = ( ! empty( $new_instance['url'] ) ) ? wp_strip_all_tags( $new_instance['url'] ) : '';

		return $instance;
	}

	/**
	 * Display the widget.
	 *
	 * @param object $args The args.
	 * @param object $instance The widget instance.
	 */
	public function widget( $args, $instance ) {
		// $args['before_widget'] widget is unused.
		// @TODO consider using it.
		?>
		<div id= "<?php echo esc_html( $instance['target'] ); ?>"
			class= "events-listing cwd-events-style"
			data-heading= "<?php echo esc_html( $instance['heading'] ); ?>"
			data-target= "<?php echo esc_html( $instance['target'] ); ?>"
			data-depts= "<?php echo esc_html( $instance['depts'] ); ?>"
			data-entries= "<?php echo esc_html( $instance['entries'] ); ?>"
			data-daysahead= "<?php echo esc_html( $instance['daysahead'] ); ?>"
			data-format= "<?php echo esc_html( $instance['format'] ); ?>"
			data-group= "<?php echo esc_html( $instance['group'] ); ?>"
			data-keyword= "<?php echo esc_html( $instance['keyword'] ); ?>"
			data-filterby= "<?php echo esc_html( $instance['filterby'] ); ?>"
			data-calendarurl= "<?php echo esc_html( $instance['calendarurl'] ); ?>"
			data-apikey= "<?php echo esc_html( $instance['apikey'] ); ?>"
			data-hideaddcal= "<?php echo esc_html( $instance['hideaddcal'] ); ?>"
			data-hidedescription= "<?php echo esc_html( $instance['hidedescription'] ); ?>"
			data-truncatedescription= "<?php echo esc_html( $instance['truncatedescription'] ); ?>"
			data-hideimages= "<?php echo esc_html( $instance['hideimages'] ); ?>"
			data-hidepagination= "<?php echo esc_html( $instance['hidepagination'] ); ?>"
			data-wrapperclass= "<?php echo esc_html( $instance['wrapperclass'] ); ?>"
			data-listclass= "<?php echo esc_html( $instance['listclass'] ); ?>"
			data-itemclass= "<?php echo esc_html( $instance['itemclass'] ); ?>"
			data-readmore= "<?php echo esc_html( $instance['readmore'] ); ?>"
			data-url= "<?php echo esc_html( $instance['url'] ); ?>"
		>
		</div>
		<?php
		// $args['after_widget'] widget is unused.
	}

}

