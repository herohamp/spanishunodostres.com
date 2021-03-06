(function($) {

    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)',
        xxsmall: '(max-width: 360px)'
    });

    $(function() {

        var $window = $(window),
            $body = $('body'),
            $header = $('#header'),
            $banner = $('#banner');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-loading');
            }, 100);
        });

        // Prioritize "important" elements on medium.
        skel.on('+medium -medium', function() {
            $.prioritize(
                '.important\\28 medium\\29',
                skel.breakpoint('medium').active
            );
        });

        // Scrolly.
        $('.scrolly').scrolly({
            offset: function() {
                return $header.height() - 5;
            }
        });

        // Header.
        if ($banner.length > 0 &&
            $header.hasClass('alt')) {

            $window.on('resize', function() {
                $window.trigger('scroll');
            });

            $banner.scrollex({
                bottom: $header.outerHeight(),
                terminate: function() {
                    $header.removeClass('alt');
                    $(".UnoDosTresNav").show();
                },
                enter: function() {
                    $header.addClass('alt');
                    $(".UnoDosTresNav").hide();
                },
                leave: function() {
                    $header.removeClass('alt');
                    $header.addClass('reveal');
                    $(".UnoDosTresNav").show();
                }
            });

        }

        // Dropdowns.
        $('#nav > ul').dropotron({
            alignment: 'right',
            hideDelay: 350,
            baseZIndex: 100000
        });

        // Menu.
        $('<a href="#navPanel" class="navPanelToggle">Menu</a>')
            .appendTo($header);

        $('<div id="navPanel">' +
                '<nav>' +
                $('#nav').navList() +
                '</nav>' +
                '<a href="#navPanel" class="close"></a>' +
                '</div>')
            .appendTo($body)
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                target: $body,
                visibleClass: 'is-navPanel-visible',
                side: 'right'
            });

        if (skel.vars.os == 'wp' &&
            skel.vars.osVersion < 10)
            $('#navPanel')
            .css('transition', 'none');

        // Banner.
        if ($banner.length > 0) {

            // Edge + IE: Workaround for object-fit.
            if (skel.vars.browser == 'edge' ||
                skel.vars.browser == 'ie') {

                var $video = $banner.find('video'),
                    v = $video[0],
                    t, f;

                // Handler function.
                var f = function() {

                    var w = v.videoWidth,
                        h = v.videoHeight,
                        pw = $window.width(),
                        ph = $window.height(),
                        nw, nh, x;

                    // Calculate new width, height.
                    if (pw > ph) {

                        nw = pw;
                        nh = (nw / w) * h;

                    }
                    else {

                        nh = ph;
                        nw = (nh / h) * w;

                    }

                    // Set width, height.
                    if (nw < pw) {

                        v.style.width = '100vw';
                        v.style.height = 'auto';

                    }
                    else
                        v.style.width = nw + 'px';

                    if (nh < ph) {
                        v.style.height = '100vh';
                        v.style.width = 'auto';
                    }
                    else
                        v.style.height = nh + 'px';

                    // Set position (bottom-right).
                    v.style.top = v.style.bottom = v.style.left = v.style.right = 'auto';
                    v.style.bottom = '0';
                    v.style.right = '0';

                };

                // Do an initial call of the handler.
                (f)();

                // Add event listeners.
                $window.on('resize load', function() {

                    clearTimeout(t);

                    t = setTimeout(f, 125);

                });

            }

        }

        // Tabs.
        $('.tabs').selectorr({
            titleSelector: 'h3',
            delay: 250
        });

    });

    $("h1:contains('Our Courses')").parent().find("p").css("height", "1.5em").css("overflow", "hidden").css("cursor", "pointer")
    $("h1:contains('Our Courses')").parent().find("p").click(function() {
        console.log($(this).css('height'))
        if ($(this).css('height') == "24px") {
            var reducedHeight = $(this).height();
            $(this).css('height', 'auto');
            var fullHeight = $(this).height();
            $(this).height(reducedHeight);
            $(this).css("cursor", "auto")

            $(this).animate({
                height: fullHeight
            }, 500);
        }
        else {
            $(this).css("overflow", "hidden").css("cursor", "pointer")

            $(this).animate({
                height: 24
            }, 500);
        }
    });
    jQuery("#UnoDosTresMain").fitText(1.2, {
        minFontSize: '40px',
        maxFontSize: '120px'
    });
})(jQuery);

$('.drop-down-b').click(function() {

    var affected = $(this).parent().parent().parent().children('.drop-text')

    if ($(affected).hasClass("drop-text-d")) {
        var reducedHeight = $(affected).height();
        $(affected).css('height', '3em');
        var fullHeight = $(affected).height();
        $(affected).height(reducedHeight);

        $(affected).animate({
            height: fullHeight
        }, 500);

        $(affected).removeClass("drop-text-d")

    }
    else {

        var reducedHeight = $(affected).height();
        $(affected).css('height', 'auto');
        var fullHeight = $(affected).height();
        $(affected).height(reducedHeight);

        $(affected).animate({
            height: fullHeight
        }, 500);

        $(affected).addClass("drop-text-d")
    }
});
