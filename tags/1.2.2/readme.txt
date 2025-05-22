=== Gutenberg Gallery Blocks Lightbox  ===
Contributors: Ben Dunkle (@empireoflight)
Tags: Gutenberg Gallery Block, gallery, lightbox, slider, photography, images
Requires at least: 5.0
Tested up to: 6.0
Stable tag: 1.2.2
License: GPL-2.0
License URI: http://www.gnu.org/licenses/gpl-2.0.html

== Description ==

This plugin transforms the Gutenberg gallery block into a lightbox with previous/next navigation. It was built to offer those who wish to present a series of images in lightbox/slider format with a simple, lightweight solution.

= Installation =

* Install the plugin through the Install Plugins interface or by uploading the `ggbl-lightbox` folder to your `/wp-content/plugins/` directory.
* Activate the plugin.
* Make sure you select "Media File" in the Link To dropdown menu for your galleries


= Why did you make this plugin? =

I haven't found a lightbox that is optimized for Gutenberg galleries. Many generate their own gallery formats or contain unneccesary options. I wanted to build one that was as minimal as possible, while offering a functional and elegant experience.
 
 == Changelog ==

=1.2.2 =
* Changed lightbox to position:fixed to prevent unwanted scrolling. Props @Antahai

=1.2.1 =
* test for wp 6.0. Adds support for left/right arrow key navigation. Adds support for ESC key to close gallery.

=1.2 =
* test for wp 5.9. Works with updated wp-blocks-gallery class

=1.1 =
* Ensure that lightbox is above all other elements on the page

=1.0 =
* Initial Release.
