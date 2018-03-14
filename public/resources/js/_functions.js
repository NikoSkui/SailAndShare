/*
    Window Size
    Window Tablet
    Tabs Smooth Scroll
    Create Parallax
    jQuery Slider
    jQuery simple Slideshow
    Hide on Touch
    Preloader
*/

// Window Size
var $window = $(window);

function windowSize(windowWidth) {
    var windowSize;
    if (windowWidth <= 640) {
        windowSize = "s";
    } else if (windowWidth <= 1024) {
        windowSize = "m";
    } else if (windowWidth <= 1600) {
        windowSize = "l";
    } else if (windowWidth <= 1920) {
        windowSize = "xl";
    }
    return windowSize
}

function windowTablet(windowWidth) {
    var windowSize;
    if (windowWidth > 992) {
        windowSize = "large";
    } else {
        windowSize = "small";
    }
    return windowSize
}

    //Tabs Smooth Scroll

    // $(function () {
    //     $('a[href*=#]:not([href=#])').click(function () {
    //         //Validate if it has .no-smooth-scroll
    //         if (!$(this).hasClass('no-smooth-scroll')) {
    //             if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    //                 var target = $(this.hash);
    //                 target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    //                 if (target.length) {
    //                     $('html,body').animate({
    //                         scrollTop: target.offset().top + 1
    //                     }, 1000);
    //                     return false;
    //                 }
    //             }
    //         }
    //     });
    // });

    //jQuery Slider
    (function ($) {
        $.fn.makeSlider = function (options) {

            var slideCount,
                slideWidth,
                currentSlide = 1,
                sliderUlWidth,
                $this = this;

            $this.linkedDivs = [];

            $this.data('keydownActive', true);

            function onResize() {
                slideCount = $this.find('ul>li').length;
                slideWidth = $(window).width();
                sliderUlWidth = slideCount * slideWidth;
                $this.css({
                    width: slideWidth
                });

                $this.find('ul').css({
                    width: sliderUlWidth
                });

                $this.find('ul li').css({
                    width: slideWidth
                });

                $this.find('ul').css('transform', 'translateX(' + ((-$this.data('currentSlide') + 1) * slideWidth) + 'px)');
            }

            $this.find('ul>li.link').each(function (index) {
                $this.linkedDivs[index] = $(this);
                $(this).remove();
            });
            $this.data('linkedDivs', $this.linkedDivs);

            onResize();

            $window.on('resize', onResize);

            $links = $('<a href="javascript:void(0)" class="control_next btn-floating btn-small waves-effect waves-dark grey-text white"><i class="fal fa-long-arrow-right"></i></a><a href="javascript:void(0)" class="control_prev btn-floating btn-small waves-effect waves-dark grey-text white"><i class="fal fa-long-arrow-left"></i></a>')

            $this.append($links);

            $this.find('a.control_prev').click(function () {
                moveLeft();
            });

            $this.find('a.control_next').click(function () {
                moveRight();
            });


            $this.data('currentSlide', currentSlide);
            $this.find('ul>:nth-of-type(' + currentSlide + ')').addClass('current');

            function moveRight() {
                var currentSlide = $this.data('currentSlide');
                if (currentSlide < slideCount) {
                    currentSlide = currentSlide + 1;
                } else {
                    currentSlide = 1;
                }
                $this.moveToSlide(currentSlide);
            };

            function moveLeft() {
                var currentSlide = $this.data('currentSlide');
                if (currentSlide > 1) {
                    currentSlide = currentSlide - 1;
                } else {
                    currentSlide = slideCount;
                }
                $this.moveToSlide(currentSlide);
            };

            function isInViewport() {
                var scrollPos = $window.scrollTop();
                if ($this.offset().top <= scrollPos + 500 && $this.offset().top + $this.height() > scrollPos + 300) {
                    return true;
                } else {
                    return false;
                }
            }

            $(document).keydown(function (e) {
                switch (e.which) {
                case 27: // left
                    if (isInViewport() && $this.data('keydownActive')) $this.moveToSlide(1);;
                    break;

                case 37: // left
                    if (isInViewport() && $this.data('keydownActive')) moveLeft();
                    break;

                case 39: // right
                    if (isInViewport() && $this.data('keydownActive')) moveRight();
                    break;

                default:
                    return; // exit this handler for other keys
                }
                e.preventDefault(); // prevent the default action (scroll / move caret)
            });


            return this;
        };

        $.fn.moveToSlide = function (slide) {
            var slideWidth = $('body').width(),
                $this = this;
            $this.data('currentSlide', slide);

            $this.data('currentIsLink', false);

            $this.find('ul>li.current').removeClass('current');
            $this.find('ul>:nth-of-type(' + slide + ')').addClass('current');
            /*$this.css({
                height: $this.find('ul>:nth-of-type(' + slide + ')').height()
            });*/
            $this.find('ul').css('transform', 'translateX(' + ((-slide + 1) * slideWidth) + 'px)');
            return this;
        }

        $.fn.moveToLink = function (link) {

            //Set Variables
            var slideCount,
                slideWidth,
                sliderUlWidth,
                $this = this,
                currentSlide = $this.data('currentSlide');

            //Append after the linked li
            $this.linkedDivs = $this.data('linkedDivs');
            var currentLink = $this.linkedDivs[link];
            $this.find('ul>:nth-of-type(' + currentSlide + ')').after(currentLink);

            //Reset Properties
            slideCount = $this.find('ul>li').length;
            slideWidth = $(document).width();
            sliderUlWidth = slideCount * slideWidth;
            $this.css({
                width: slideWidth
            });

            $this.find('ul').css({
                width: sliderUlWidth
            });

            $this.find('ul li').css({
                width: slideWidth
            });
            //Hide controls
            $this.find('a.control_prev').css('opacity', 0);
            $this.find('a.control_next').css('opacity', 0);

            $this.moveToSlide(currentSlide + 1);

            $this.data('currentIsLink', true);

            $this.data('keydownActive', false);

            return this;
        }

        $.fn.backToSlide = function () {
            //Set Variables
            var slideCount,
                slideWidth,
                sliderUlWidth,
                $this = this,
                currentSlide = $this.data('currentSlide');

            $this.moveToSlide(1);
            //Remove the linked li
            setTimeout(function () {
                $this.find('ul>li.link').remove();
                $this.data('keydownActive', true);
            }, 400);

            //Reset Properties
            slideCount = $this.find('ul>li').length;
            slideWidth = $(document).width();
            sliderUlWidth = slideCount * slideWidth;
            $this.css({
                width: slideWidth
            });

            $this.find('ul').css({
                width: sliderUlWidth
            });

            $this.find('ul li').css({
                width: slideWidth
            });

            //Show controls
            if (!$this.hasClass('hideButtons')) {
                $this.find('a.control_prev').css('opacity', 1);
                $this.find('a.control_next').css('opacity', 1);
            }

            return this;
        }
    }(jQuery));
//jQuery simple Slideshow
$(function () {
    $('.fadein img:gt(0)').hide();
    setInterval(function () {
            $('.fadein :first-child').fadeOut()
                .next('img').fadeIn()
                .end().appendTo('.fadein');
        },
        3000);
});

$(function () {
    $.fn.createSlideshow = function () {
        $this = $(this);
        $this.height($this.find('img:first-child').height());
        $this.css('overflow', 'hidden');
        setInterval(function () {
                $this.find(':first-child').fadeOut()
                    .next('img').fadeIn()
                    .end().appendTo($this);
            },
            3000);
    }
});

function goToSlide(num) {
    $('.fadein :first-child').fadeOut();
    $('.fadein img[data="1"]').fadeIn();
}

//Preloader
$('.endSeparator').imagesLoaded(function () {
    $('ip-header').css({
        'opacity': '0',
        'display': 'none'
    });
});