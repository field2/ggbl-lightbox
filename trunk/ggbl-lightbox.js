jQuery(document).ready(function($) {
	// global variables for script
	var current, size;
	$('.wp-block-gallery a').click(function(e) {
		// prevent default click event
		e.preventDefault();
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
				'<div class="ggbl_close"></div>' +
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
	var swipeInProgress = false;

	// navigation prev/next
	$('body').on('click', '.ggbl_slide-nav', function(e) {
	    e.preventDefault();
	    e.stopPropagation();
	    var $this = $(this);
	    var dest;
	    if ($this.hasClass('ggbl_prev')) {
	        dest = current - 1;
	        if (dest < 0) dest = size - 1;
	    } else {
	        dest = current + 1;
	        if (dest > size - 1) dest = 0;
	    }
	    if (!swipeInProgress) {
	        $('#ggbl_slider > li:eq(' + current + ')').fadeOut(750);
	        $('#ggbl_slider > li:eq(' + dest + ')').fadeIn(750);
	    } else {
	        swipeInProgress = false; // Move this line BEFORE .show()
	        $('#ggbl_slider > li:eq(' + current + ')').hide();
	        $('#ggbl_slider > li:eq(' + dest + ')').show();
	    }
	    current = dest;
	});

	// navigation left/right arrow keys, esc to close
	document.onkeydown = function(e) {
	    e = e || window.event;
	    var dest;
	    if (e.keyCode == '37') {
	        e.preventDefault();
	        e.stopPropagation();
	        dest = current - 1;
	        if (dest < 0) dest = size - 1;
	        if (!swipeInProgress) {
	            $('#ggbl_slider > li:eq(' + current + ')').fadeOut(750);
	            $('#ggbl_slider > li:eq(' + dest + ')').fadeIn(750);
	        } else {
	            swipeInProgress = false; // Move this line BEFORE .show()
	            $('#ggbl_slider > li:eq(' + current + ')').hide();
	            $('#ggbl_slider > li:eq(' + dest + ')').show();
	        }
	        current = dest;
	    } else if (e.keyCode == '39') {
	        e.preventDefault();
	        e.stopPropagation();
	        dest = current + 1;
	        if (dest > size - 1) dest = 0;
	        if (!swipeInProgress) {
	            $('#ggbl_slider > li:eq(' + current + ')').fadeOut(750);
	            $('#ggbl_slider > li:eq(' + dest + ')').fadeIn(750);
	        } else {
	            swipeInProgress = false; // Move this line BEFORE .show()
	            $('#ggbl_slider > li:eq(' + current + ')').hide();
	            $('#ggbl_slider > li:eq(' + dest + ')').show();
	        }
	        current = dest;
	    } else if (e.keyCode == '27') {
	        $('#ggbl_lightbox').fadeOut(300);
	        $('body').removeClass("ggbl_noscroll");
	    }
	};

	// Swipe navigation for mobile with slide animation
	var touchStartX = null;
	var touchEndX = null;
	var swipeThreshold = 50; // Minimum px distance for swipe

	$('body').on('touchstart', '#ggbl_slider', function(e) {
	    if (e.originalEvent.touches.length === 1) {
	        touchStartX = e.originalEvent.touches[0].clientX;
	    }
	});

	$('body').on('touchmove', '#ggbl_slider', function(e) {
	    if (e.originalEvent.touches.length === 1) {
	        touchEndX = e.originalEvent.touches[0].clientX;
	    }
	});

	$('body').on('touchend', '#ggbl_slider', function(e) {
	    if (touchStartX !== null && touchEndX !== null) {
	        var diff = touchStartX - touchEndX;
	        if (Math.abs(diff) > swipeThreshold) {
	            var $slides = $('#ggbl_slider > li');
	            var $currentSlide = $slides.eq(current);
	            var dest, direction;
	            if (diff > 0) {
	                dest = current + 1;
	                if (dest > size - 1) dest = 0;
	                direction = 'left';
	            } else {
	                dest = current - 1;
	                if (dest < 0) dest = size - 1;
	                direction = 'right';
	            }
	            var $nextSlide = $slides.eq(dest);

	            // Set up parent for sliding
	            $('#ggbl_slider').css({position: 'relative', overflow: 'hidden'});

	            // Prepare next slide position
	            $nextSlide.css({
	                display: 'block',
	                position: 'absolute',
	                left: (direction === 'left' ? '100%' : '-100%'),
	                top: 0,
	                width: '100%'
	            });

	            // Animate slides
	            $currentSlide
	                .css({position: 'absolute', left: 0, top: 0, width: '100%'})
	                .animate({left: (direction === 'left' ? '-100%' : '100%')}, 400, function() {
	                    $(this).hide().css({position: '', left: '', top: '', width: ''});
	                });
	            $nextSlide
	                .animate({left: '0%'}, 400, function() {
	                    $(this).css({position: '', left: '', top: '', width: ''});
	                    // Hide all other slides just in case
	                    $slides.not($(this)).hide();
	                });

	            current = dest;
	            swipeInProgress = true;
	        }
	    }
	    // Reset
	    touchStartX = null;
	    touchEndX = null;
	});
});
