/* Completely customized version of Trevor Davis' jQuery presentation plugn. You may use this as you wish. It's all yours! */
(function ($) {
    $.fn.createPPT = function (options) {
        var config = {
            slide: '.slide',
            pager: '#pagerSpan'
        };
        $(this).each(function () {

            var $ppt = $(this);
            $ppt.count = 1;

            //Control the changing of the slide
            $ppt.changeSlide = function (newSlide) {
                $ppt.visibleSlide = $ppt.slides.filter(':visible');
                $ppt.slideToShow = $ppt.slides.filter(':nth-child(' + newSlide + ')')
                $ppt.visibleSlide.fadeOut(500);
                $ppt.slideToShow.fadeIn(500);
            };

            //Handle the previous and next functionality
            $ppt.prevNextClick = function (action) {
                if (action === 'prev') {
                    $ppt.count === 1 ? $ppt.count = $ppt.slides.length : $ppt.count--;
                } else {
                    $ppt.count === $ppt.slides.length ? $ppt.count = 1 : $ppt.count++;
                }
                $ppt.changeSlide($ppt.count);
                $ppt.pager.html($ppt.count + '/' + $ppt.numSlides); //update the pager with slide count
            };

            $ppt.addControls = function () {
                $ppt.numSlides = $ppt.slides.length;
                $ppt.pager.html(1 + '/' + $ppt.numSlides);
                $(document).keyup(function (e) {
                    if (e.target.tagName.toUpperCase() !== 'TEXTAREA') {
                        var action = '';
                        if (e.keyCode === 37) { //left arrow
                            action = 'prev';
                        } else if (e.keyCode === 39) {  //right arrow
                            action = 'next';
                        }

                        if (action !== '') {
                            $ppt.prevNextClick(action);
                        } 
                    }
                });
            };

            $ppt.init = function () {
                $ppt.options = $.extend(config, options);
                $ppt.slides = $ppt.find($ppt.options.slide);
                $ppt.pager = $($ppt.options.pager);
                $ppt.slides.filter(':not(:first)').hide();

                $ppt.addControls();
            };
            $ppt.init();
        });
    };
})(jQuery);