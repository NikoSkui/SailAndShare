'use strict';

require('materialize-css/dist/js/materialize.min')
require('./easingUi')
require('./galleryExpand')

const ImagesLoaded  = require('imagesloaded'),
      jQueryBridget = require('jquery-bridget'),
      Masonry       = require('masonry-layout')

jQueryBridget( 'masonry', Masonry, $ )
jQueryBridget( 'imagesLoaded', ImagesLoaded, $ )

document.addEventListener('DOMContentLoaded', function () {

  // variables
  let elems
  let i = 0

  // dropdown menu
  elems = document.querySelectorAll('.dropdown-button');
  let dropdown = []
  i = 0
  for( i=0; i < elems.length; i++ ) {
    dropdown = M.Dropdown.init(elems[i],{
      hover:true,
      constrainWidth:true,
      coverTrigger:false
    })
  }
})

$(function(){
    // Navbar
    $(".button-collapse").sidenav();
    var categories = $('nav .categories-container');
    if (categories.length) {
      categories.pushpin({ top: categories.offset().top });
      var $links = categories.find('li');
      $links.each(function() {
        var $link = $(this);
        $link.on('click', function() {
          $links.find('a').removeClass('active');
          $link.find('a').addClass('active');
          var hash = $link.find('a').first()[0].hash.substr(1);
          var $galleryItems = $('.gallery .gallery-item');

          $galleryItems.stop().addClass('gallery-filter').fadeIn(100);

          if (hash !== 'all') {
            var $galleryFilteredOut = $galleryItems.not('.' + hash).not('.all');
            $galleryFilteredOut.removeClass('gallery-filter').hide();
          }

          // transition layout
          $masonry.masonry({
            transitionDuration: '.3s'
          });
          // only animate on layout
          $masonry.one( 'layoutComplete', function( event, items ) {
            $masonry.masonry({
              transitionDuration: 0
            });
          });
          setTimeout(function() {

          $masonry.masonry('layout');
          }, 1000);
        });
      });
    }


	  // Home
	  $('.carousel:not(.carousel-slider)').carousel({
      dist: 0,
      padding: 10
    });
    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true,
      onCycleTo: function(el) {
        $('.nav-background img').removeClass('active');
        $('.nav-background img').eq(el.index()).addClass('active');
      }
    });


    // Masonry Grid
    var $masonry = $('.gallery');
    $masonry.masonry({
      // set itemSelector so .grid-sizer is not used in layout
      itemSelector: '.gallery-filter',
      // use element for option
      columnWidth: '.gallery-filter',
      // no transitions
      transitionDuration: 0
    });
    // layout Masonry after each image loads
    $masonry.imagesLoaded(function() {
      $masonry.masonry('layout');
    });
    $('a.filter').click(function (e) {
      e.preventDefault();
    });



    // Contact Form Icon
    $("form .form-control").focus(function() {
      $(this).siblings("label").first().children("i").first().css({"color": "#aaa", "left": 0});
    });
    $("form .form-control").blur(function() {
      $(this).siblings("label").first().children("i").first().css({"color": "transparent", "left": "-20px"});
    });


    var onShow = function(el) {
      var carousel = el.find('.carousel.initialized');
      carousel.carousel({
        dist: 0,
        padding: 10
      });
    };
    $('.gallery-expand').galleryExpand({
      onShow: onShow
    });

    $('#blog .gallery-expand').galleryExpand({
      onShow: onShow,
      fillScreen: true,
      inDuration: 500,
      dynamicRouting: true
    });

}); // end of document ready
