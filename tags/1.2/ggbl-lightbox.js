jQuery(document).ready(function($) {
	// global variables for script
	var current, size;
	$('.wp-block-gallery a').click(function(e) {
		// prevent default click event
		e.preventDefault();
		// scroll to the top of the page if they've scrolled down
var scroll = $(window).scrollTop();
console.log("windowscroll is " + scroll);
if(scroll !== 0) {
	$(window).scrollTop(0);
}
		// get href from clicked element
		var image_href = $(this).attr("href");  
		console.log(image_href);
		// determine the index of clicked trigger
		var slideNum = $('.wp-block-gallery a').index(this);
				console.log(slideNum);

		// find out if #ggbl_lightbox exists
		if ($('#ggbl_lightbox').length > 0) {        
			// if it does
			$('#ggbl_lightbox').fadeIn(300);
			// otherwise
		} else {                                
			// create HTML markup for lightbox window
			var lightbox =
					'<div id="ggbl_lightbox">' +
					'<a href="#" class="ggbl_close"></a>' +
					'<ul id="ggbl_slider"></ul>' +        
										'<div class="ggbl_nav">' +
					'<a href="#" class="ggbl_prev ggbl_slide-nav"></a>' +
					'<a href="#" class="ggbl_next ggbl_slide-nav"></a>' +
					'</div><!-- .ggbl_nav -->' +
					'</div><!-- #ggbl_lightbox -->';
			// add lightbox HTML to the DOM
			$('body').append(lightbox);
			// make sure the user can't scroll while the lightbox is showing
			$('body').addClass("ggbl_noscroll");
			// fill lightbox with .blocks-gallery-grid a hrefs
			$('.wp-block-gallery').find('.wp-block-image a').each(function() {
				var $href = $(this).attr('href');
				$('#ggbl_slider').append(
					'<li>' +
					'<img src="' + $href + '">' +
					'</li>'
				);
			});
		}
		// set the slider size based on number of objects in slideshow
		size = $('#ggbl_slider > li').length;
		// hide all slides, then show the selected slide
		$('#ggbl_slider > li').hide();
		$('#ggbl_slider > li:eq(' + slideNum + ')').show();
		// set current to selected slide
		current = slideNum;
	});
	// click anywhere on the page to get rid of lightbox window
	$('body').on('click', '#ggbl_lightbox', function() { // using .on() instead of .live(). more modern, and fixes event bubbling issues
		$('#ggbl_lightbox').fadeOut(300);
					$('body').removeClass("ggbl_noscroll");
	});
	// navigation prev/next
	$('body').on('click', '.ggbl_slide-nav', function(e) {
		// prevent link from firing and lightbox from accidentally closing
		e.preventDefault();
		e.stopPropagation();
		var $this = $(this);
		var dest;
		// check if prev arrow was clicked
		if ($this.hasClass('ggbl_prev')) {
			dest = current - 1;
			if (dest < 0) {
				dest = size - 1;
			}
		} else {
			// otherwise they clicked next
			dest = current + 1;
			if (dest > size - 1) {
				dest = 0;
			}
		}
		// fadeOut current slide, fadeIn next/prev slide
		$('#ggbl_slider > li:eq(' + current + ')').fadeOut(750);
		$('#ggbl_slider > li:eq(' + dest + ')').fadeIn(750);
		// update current slide
		current = dest;
	});
});