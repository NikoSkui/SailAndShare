//Document Ready
$(document).ready(function () {
    var $nav = $('nav'),
        $body = $('body'),
        $windowWidth = $window.width(),
        $windowSize,
        navOffsetTop = $nav.offset().top,
        navOffsetTop = $window.height() - $nav.height(),
        $document = $(document),
        entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };
    if ($('body').width() < 992 || Modernizr.touch) {
        isDesktop = false;
    } else {
        isDesktop = true;
    }

    function init() {
        //nav-wrapper, footer visible
        if (!isDesktop) {
            $('.header-container').css('display', 'none');
            $body.addClass('has-docked-nav');
        } else {
            $('#dropdownSkills').css('transform', 'translateX(' + $('nav .container').css('margin-left') + ')');
            $window.on('scroll', onScroll);
            onScroll();
        }
        $window.resize(function () {
            setTimeout(function () {
                if (!Modernizr.touch) {
                    location.reload();
                }
            }, 400);
        });
    }

    function onScroll() {
        //Fix dropdown position because of container
        $('#dropdownSkills').css('transform', 'translateX(' + $('nav .container').css('margin-left') + ')');
        //Set ScrollPos
        var scrollPos = $window.scrollTop();
        //Desktop only functions
        if (navOffsetTop < $window.scrollTop() && !$body.hasClass('has-docked-nav')) {
            $body.addClass('has-docked-nav');
        }
        if (navOffsetTop > $window.scrollTop() && $body.hasClass('has-docked-nav')) {
            $body.removeClass('has-docked-nav');
        } else {
            //Header Text Parallax Effect
            //Nav change
            $headerContainer = $('.header-container');
            if ($window.height() > 600) {
                var percentage, elementHeight, elementOpacity;
                if (scrollPos < $window.height()) {
                    percentage = scrollPos / ($window.height() - $nav.height());
                    elementHeight = (percentage * 50) + 30;
                    $headerContainer.css({
                        'top': elementHeight + '%',
                        'opacity': 1 - 1.3 * percentage
                    });
                    $headerContainer.find('.nextLinkFirst').css('opacity', 1);
                    $('nav .backgroundImage').css('opacity', percentage);
                    $nav.css('background', 'rgba(43, 43, 43,' + percentage + ')');
                }
            } else {
                if (scrollPos < 600) {
                    percentage = scrollPos / (600 - $nav.height());
                    elementHeight = (percentage * 50) + 30;
                    $headerContainer.css({
                        'top': elementHeight + '%',
                        'opacity': 1 - percentage
                    });
                    $headerContainer.find('.nextLinkFirst').css('opacity', 1);
                    $('nav .backgroundImage').css('opacity', percentage);
                    $nav.css('background', 'rgba(43, 43, 43,' + percentage + ')');
                }
            }
        }
        //Change Menu Active item
        $('#nav-mobile a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.length > 0) {
                if (refElement.offset().top <= (scrollPos + 300) && refElement.offset().top + refElement.height() > (scrollPos + 300)) {
                    if (currLink.attr("href") != '#asso')
                        refElement.addClass("visible");
                }
            }
        });
        $('.about-tabs a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.offset().top <= (scrollPos + 300) && refElement.offset().top + refElement.height() > (scrollPos + 300)) {
                $('.about-tabs div div ul li a').removeClass("current");
                currLink.addClass("current");
                refElement.addClass("visible");
            } else {
                currLink.removeClass("current");
            }
        });

        var refElement = $('#footer');
        if (refElement.offset().top <= (scrollPos + 300) && refElement.offset().top + refElement.height() > (scrollPos + 300)) {
            $('.nav-wrapper').addClass("footerVisible");
        } else {
            $('.nav-wrapper').removeClass("footerVisible");
        }
    }
    init();

    $(".button-collapse").sideNav();
    $('.actuSlider').makeSlider();
    $('.associationSlider').makeSlider();
    $('.equipeSlider').makeSlider();
    $('.stagesSlider').makeSlider();
    $('.valeursSlider').makeSlider();
    $('.simpleSlideshow').createSlideshow();

    $(document).ready(function () {
        $(".ip-header").css({
            "opacity": 0,
            "transform": "scale(1.1)"
        });
        setTimeout(function () {
            $(".ip-header").hide();
        }, 400);

    })
});