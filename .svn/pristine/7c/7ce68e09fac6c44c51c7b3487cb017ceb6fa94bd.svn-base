<?php 
/**
 * Plugin Name: GGBL Lightbox
 * Plugin URI: https://github.com/field2/ggblb_lightbox
 * Description: A simple lightbox and slider built specifically for the Gutenberg Gallery block
 * Author: Ben Dunkle
 * Version: 1.2.3
 * Author URI: https://bendunkle.com/
 * License: GPL2
 */

/*
 * Enqueue items.
 *
 * @since 0.1
 */

function ggbl_lightbox_activation() {
}

register_activation_hook(__FILE__, 'ggbl_lightbox_activation');
function ggbl_lightbox_deactivation() {
}

register_deactivation_hook(__FILE__, 'ggbl_lightbox_deactivation');

function ggbl_lightbox_scripts() {
		wp_enqueue_style( 'ggbl_lightbox_css', plugin_dir_url( __FILE__ ) . 'ggbl-lightbox.css', array(), 1 );
	wp_enqueue_script( 'ggbl_lightbox_js', plugin_dir_url( __FILE__ ) . 'ggbl-lightbox.js', array( 'jquery' ), 1, true );
}

add_action( 'wp_enqueue_scripts', 'ggbl_lightbox_scripts' );