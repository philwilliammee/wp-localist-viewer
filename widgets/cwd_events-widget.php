<?php

// The widget class
class Cwd_Events_Widget extends WP_Widget {

	// Main constructor
	public function __construct() {
        parent::__construct(
            'cwd_events_widget',
            __( 'Events Widget', 'text_domain' ),
            array(
                'customize_selective_refresh' => true,
            )
        );
	}

	// The widget form (for the backend )
	public function form( $instance ) {
		/* ... */
	}

	// Update widget settings
	public function update( $new_instance, $old_instance ) {
		/* ... */
	}

	// Display the widget
	public function widget( $args, $instance ) {
        // @todo move configuration to form
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
            data-heading= ""
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
	}

}

// Register the widget
// function my_register_custom_widget() {
// 	register_widget( 'Cwd_Events_Widget' );
// }
//add_action( 'widgets_init', 'my_register_custom_widget' );