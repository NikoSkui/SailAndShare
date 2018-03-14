
require('materialize-css/dist/js/materialize.min')

const ImagesLoaded  = require('imagesloaded'),
      jQueryBridget = require('jquery-bridget'),
      Masonry       = require('masonry-layout')

jQueryBridget( 'masonry', Masonry, $ )
jQueryBridget( 'imagesLoaded', ImagesLoaded, $ )

$(function() {
    let $containerBlog = $("#item-posts");
    $containerBlog.imagesLoaded(function() {
        $containerBlog.masonry({
            itemSelector: ".item",
            columnWidth: ".item-sizer",
        });
    });
});
