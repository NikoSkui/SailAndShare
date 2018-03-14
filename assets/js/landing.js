'use strict';


import 'materialize-css/dist/js/materialize.min';
import './easingUi';
import './galleryExpand';

document.addEventListener('DOMContentLoaded', function () {

  $('.sidenav').sidenav();
  // variables
  let nav = document.querySelector('nav.head-nav')
  let elem
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

  // parallax
  elems = document.querySelectorAll('.parallax');
  let parallax = []
  i = 0
  for( i=0; i < elems.length; i++ ) {
    parallax = M.Parallax.init(elems[i])
  }

  // gallery materialboxed
  elems = document.querySelectorAll('.materialboxed');
  i = 0
  for( i=0; i < elems.length; i++ ) {
    let materialboxed = M.Materialbox.init(elems[i])
  }

  // Change menu active item scrollspy
  elems = document.querySelectorAll('.scrollspy');
  i = 0
  for( i=0; i < elems.length; i++ ) {
    let scrollspy = M.ScrollSpy.init(elems[i])
  }

  //fixed tabs
  $('.about-tabs').each(function() {
    let $this = $(this);
    let $target = $('#' + $(this).attr('data-target'));
    $this.pushpin({
      top: $target.offset().top,
      bottom: $target.offset().top + $target.outerHeight() - $this.height(),
      offset: nav.clientHeight
    });
  });

})

// $(document).ready(function () {
//   // function to blog animation  onShhow
//   var onShow = (el) => {
//     // let navbar = document.getElementsByClassName('navbar-fixeds');
//     let carousel = el.find('.carousel');
//     carousel.carousel({
//       dist: 0,
//       padding: 10
//     });
//   }
//   // blog animation
//   $('.gallery-expand').galleryExpand({
//       onShow: onShow,
//       fillScreen: true,
//       inDuration: 500,
//       dynamicRouting: false
//   });
// })
