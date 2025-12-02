(function($) {

	"use strict";


	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();

        var carousel = function() {
                $('.carousel-testimony').owlCarousel({
                        center: true,
                        loop: true,
                        items:1,
                        margin: 30,
                        stagePadding: 0,
                        nav: false,
                        navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
                        responsive:{
                                0:{
                                        items: 1
                                },
                                600:{
                                        items: 2
                                },
                                1000:{
                                        items: 3
                                }
                        }
                });

                $('.carousel-seasonal').owlCarousel({
                        center: true,
                        loop: true,
                        items:1,
                        margin: 30,
                        stagePadding: 0,
                        nav: false,
                        navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
                        responsive:{
                                0:{
                                        items: 1
                                },
                                600:{
                                        items: 2
                                },
                                1000:{
                                        items: 3
                                }
                        }
                });

                $('.gallery-carousel').owlCarousel({
                        items: 3,
                        margin: 16,
                        loop: true,
                        nav: true,
                        dots: true,
                        navText: ['<span class="ion-ios-arrow-back" aria-label="Previous"></span>', '<span class="ion-ios-arrow-forward" aria-label="Next"></span>'],
                        responsive:{
                                0:{
                                        items:1
                                },
                                600:{
                                        items:2
                                },
                                992:{
                                        items:3
                                }
                        }
                });


        };
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


		$('.nav-services .nav-caret').on('click keydown', function(e){
		if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			e.stopPropagation();

			var $parent = $(this).closest('.nav-services');
			var $menu = $parent.find('.dropdown-menu');
			var $toggle = $parent.find('.nav-services-toggle');
			var isOpen = $parent.hasClass('show');

			$('.nav-services').removeClass('show');
			$('.nav-services .dropdown-menu').removeClass('show');
			$('.nav-services .nav-services-toggle').attr('aria-expanded', false);

			if (!isOpen) {
				$parent.addClass('show');
				$menu.addClass('show');
				$toggle.attr('aria-expanded', true);
			}
		}
	});

	$(document).on('click touchstart', function(e) {
		if (!$(e.target).closest('.nav-services').length) {
			$('.nav-services').removeClass('show');
			$('.nav-services .dropdown-menu').removeClass('show');
			$('.nav-services .nav-services-toggle').attr('aria-expanded', false);
		}
	});

$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });



	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();



})(jQuery);

