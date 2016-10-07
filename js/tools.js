var sliderPeriod    = 5000;
var sliderTimer     = null;

$(document).ready(function() {

    $('.slider').each(function() {
        var curSlider = $(this);
        curSlider.data('curIndex', 0);
        curSlider.data('disableAnimation', true);
        var curHTML = '';
        curSlider.find('.slider-content li').each(function() {
            curHTML += '<a href="#"></a>';
        });
        $('.slider-ctrl').html(curHTML);
        $('.slider-ctrl a:first').addClass('active');
        sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
    });

    function sliderNext() {
        var curSlider = $('.slider');

        if (curSlider.data('disableAnimation')) {
            var curIndex = curSlider.data('curIndex');
            var newIndex = curIndex + 1;
            if (newIndex >= curSlider.find('.slider-content li').length) {
                newIndex = 0;
            }

            curSlider.data('curIndex', newIndex);
            curSlider.data('disableAnimation', false);

            curSlider.find('.slider-content li').eq(curIndex).css({'z-index': 2});
            curSlider.find('.slider-content li').eq(newIndex).css({'z-index': 1}).show();

            curSlider.find('.slider-ctrl a.active').removeClass('active');
            curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');

            curSlider.find('.slider-content li').eq(curIndex).fadeOut(function() {
                curSlider.data('disableAnimation', true);
                sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
            });
        }
    }

    $('.slider').on('click', '.slider-ctrl a', function(e) {
        if (!$(this).hasClass('active')) {
            window.clearTimeout(sliderTimer);
            sliderTimer = null;

            var curSlider = $('.slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = $('.slider-ctrl a').index($(this));

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);

                curSlider.find('.slider-content li').eq(curIndex).css({'z-index': 2});
                curSlider.find('.slider-content li').eq(newIndex).css({'z-index': 1}).show();

                curSlider.find('.slider-ctrl a.active').removeClass('active');
                curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');

                curSlider.find('.slider-content li').eq(curIndex).fadeOut(function() {
                    curSlider.data('disableAnimation', true);
                    sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                });
            }
        }

        e.preventDefault();
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('.top-search-link').click(function(e) {
        $('.top-search').toggleClass('open');
        if ($('.top-search').hasClass('open')) {
            $('.top-search .form-input input').focus();
        } else {
            $('.top-search .form-input input').blur();
        }
        e.preventDefault();
    });

    $('.top-search .form-input input').focus(function(e) {
        $('.top-search').addClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.top-search').length == 0 && !$(e.target).hasClass('top-search')) {
            $('.top-search').removeClass('open');
            $('.top-search .form-input input').blur();
        }
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            $('.top-search').removeClass('open');
            $('.top-search .form-input input').blur();
        }
    });

    $('.header-callback-link').click(function(e) {
        $('.header-callback').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-callback').length == 0) {
            $('.header-callback').removeClass('open');
        }
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            $('.header-callback').removeClass('open');
        }
    });

    $('.detail-gallery-preview ul li a').click(function(e) {
        var curLink = $(this);
        var curLi = curLink.parent();
        if (!curLink.parent().hasClass('active')) {
            $('.detail-gallery-preview ul li.active').removeClass('active');
            curLi.addClass('active');
            $('.detail-gallery-big img').attr('src', curLink.attr('href'));
        }
        e.preventDefault();
    });

    $('.detail-gallery-next').click(function(e) {
        var curIndex = $('.detail-gallery-preview ul li').index($('.detail-gallery-preview ul li.active'));
        curIndex++;
        if (curIndex > $('.detail-gallery-preview ul li a').length - 1) {
            curIndex = 0;
        }
        $('.detail-gallery-preview ul li').eq(curIndex).find('a').click();
        e.preventDefault();
    });

    $('.detail-gallery-prev').click(function(e) {
        var curIndex = $('.detail-gallery-preview ul li').index($('.detail-gallery-preview ul li.active'));
        curIndex--;
        if (curIndex < 0) {
            curIndex = $('.detail-gallery-preview ul li a').length - 1;
        }
        $('.detail-gallery-preview ul li').eq(curIndex).find('a').click();
        e.preventDefault();
    });

    $('.detail-gallery-max a, .project-inside-gallery-item a').fancybox({
        tpl : {
            closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
            next     : '<a title="Следующая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
            prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
        },
        helpers: {
            overlay : {
                locked : false
            }
        }
    });

    $('.detail-gallery-zoom').click(function(e) {
        var curIndex = $('.detail-gallery-preview ul li').index($('.detail-gallery-preview ul li.active'));
        if (curIndex < 0) {
            curIndex = 0;
        }
        $('.detail-gallery-max a').eq(curIndex).click();
        e.preventDefault();
    });

    $('.detail-list-order-wrap .btn-2').click(function(e) {
        $('.detail-list-order-wrap.open').removeClass('open');
        $(this).parent().addClass('open');
        e.preventDefault();
    });

    $('.detail-list-order-close').click(function(e) {
        $('.detail-list-order-wrap.open').removeClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.detail-list-order-wrap').length == 0) {
            $('.detail-list-order-wrap.open').removeClass('open');
        }
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            $('.detail-list-order-wrap.open').removeClass('open');
        }
    });

    $('.detail-product-order form').submit(function(e) {
        var curForm = $(this);
        $.ajax({
            type: 'POST',
            url: curForm.attr('action'),
            data: curForm.serialize(),
            dataType: 'html',
            cache: false
        }).done(function(html) {
            if ($('.window').length > 0) {
                windowClose();
            }
            windowOpen(html);
        });
        e.preventDefault();
    });

    $('body').on('click', '.window-basket-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.side-menu-current').click(function() {
        $('html').toggleClass('side-menu-open');
        if ($('html').hasClass('side-menu-open')) {
            var dpr = 1;
            if (window.devicePixelRatio !== undefined) {
                dpr = window.devicePixelRatio;
            }
            $('.side-menu-wrap-inner').height($(window).height() * dpr - $('.side-menu-wrap-inner').offset().top * dpr - 59);
            $('.side-menu-wrap-inner').jScrollPane({autoReinitialise: true});
        } else {
            $('.side-menu-wrap-inner').height('auto');
            var apiScroll = $('.side-menu-wrap-inner').data('jsp');
            if (apiScroll) {
                apiScroll.destroy();
            }
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.side').length == 0) {
            $('html').removeClass('side-menu-open');
            $('.side-menu-wrap-inner').height('auto');
            var apiScroll = $('.side-menu-wrap-inner').data('jsp');
            if (apiScroll) {
                apiScroll.destroy();
            }
        }
    });

    $(window).resize(function() {
        $('html').removeClass('side-menu-open');
        $('.side-menu-wrap-inner').height('auto');
        var apiScroll = $('.side-menu-wrap-inner').data('jsp');
        if (apiScroll) {
            apiScroll.destroy();
        }
    });

    $('.mobile-menu-link').click(function(e) {
        $('html').toggleClass('mobile-menu-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.mobile-menu').length == 0 && !$(e.target).hasClass('mobile-menu') && !$(e.target).hasClass('mobile-menu-link')) {
            $('html').removeClass('mobile-menu-open');
        }
    });

    $(window).resize(function() {
        $('html').removeClass('mobile-menu-open');
    });

    $('.mobile-menu-content ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (curLi.find('ul').length > 0) {
            curLi.toggleClass('open');
            e.preventDefault();
        }
    });

    $('.catalogue-recommend').on('click', '.catalogue-recommend-ctrl a', function(e) {
        var curList = $(this).parents().filter('.catalogue-recommend');
        var curIndex = curList.find('.catalogue-recommend-ctrl a').index($(this));
        curList.find('.catalogue-section:first').stop(true, true);
        curList.find('.catalogue-recommend-ctrl a.active').removeClass('active');
        $(this).addClass('active');
        curList.find('.catalogue-section:first').animate({'margin-left': -curIndex * curList.find('.catalogue-section:first').outerWidth()});
        e.preventDefault();
    });

    $('.main-news-list').on('click', '.main-news-ctrl a', function(e) {
        var curList = $(this).parents().filter('.main-news-list');
        var curIndex = curList.find('.main-news-ctrl a').index($(this));
        curList.find('.main-news-item:first').stop(true, true);
        curList.find('.main-news-ctrl a.active').removeClass('active');
        $(this).addClass('active');
        curList.find('.main-news-item:first').animate({'margin-left': -curIndex * curList.find('.main-news-item:first').outerWidth()});
        e.preventDefault();
    });

    $('.basket-count input').on('spinstop', function(event, ui) {
        // значение изменилось
    });

});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

    curForm.find('input[type="number"]').each(function() {
        var curBlock = $(this).parent();
        var curHTML = curBlock.html();
        curBlock.html(curHTML.replace(/type=\"number\"/g, 'type="text"'));
        curBlock.find('input').spinner();
        curBlock.find('input').keypress(function(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 43 || charCode > 57)) {
                return false;
            }
            return true;
        });
    });

    curForm.find('.form-file input').change(function() {
        var curInput = $(this);
        var curField = curInput.parent().parent();
        curField.find('.form-file-name').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curField.find('label.error').remove();
        curField.removeClass('error');
    });

    curForm.validate({
        ignore: '',
        invalidHandler: function(form, validatorcalc) {
            validatorcalc.showErrors();
            checkErrors();
        }
    });
}

function checkErrors() {
    $('.form-checkbox').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
    });

    $('.form-file').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
    });
}

$(window).on('load resize', function() {
    $('.catalogue-section-photo').each(function() {
        $(this).find('.catalogue-section-photo-inner').css({'line-height': $(this).outerHeight() + 'px'});
    });

    $('.catalogue').each(function() {
        var curList = $(this);
        curList.find('.catalogue-section-title').css({'height': 0});

        curList.find('.catalogue-section-title').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.catalogue-section-title').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'height': newHeight});
                    } else {
                        otherBlock.css({'height': curHeight});
                    }
                }
            });
        });
    });

    $('.catalogue-recommend').each(function() {
        var curList = $(this);

        var curPages = curList.find('.catalogue-section').length;
        if (curPages > 1) {
            var curHTML = '';
            for (var i = 0; i < curPages; i++) {
                curHTML += '<a href="#"></a>';
            }
            curList.find('.catalogue-recommend-ctrl').html(curHTML);
            curList.find('.catalogue-recommend-ctrl a:first-child').addClass('active');
        } else {
            curList.find('.catalogue-recommend-ctrl').html('');
        }
        curList.find('.catalogue-section:first').css({'margin-left': 0});
    });

    $('.main-news-list').each(function() {
        var curList = $(this);

        var curPages = curList.find('.main-news-item').length;
        if (curPages > 1) {
            var curHTML = '';
            for (var i = 0; i < curPages; i++) {
                curHTML += '<a href="#"></a>';
            }
            curList.find('.main-news-ctrl').html(curHTML);
            curList.find('.main-news-ctrl a:first-child').addClass('active');
        } else {
            curList.find('.main-news-ctrl').html('');
        }
        curList.find('.main-news-item:first').css({'margin-left': 0});
    });

});

function windowOpen(contentWindow) {
    var windowWidth     = $(window).width();
    var windowHeight    = $(window).height();
    var curScrollTop    = $(window).scrollTop();
    var curScrollLeft   = $(window).scrollLeft();

    var bodyWidth = $('body').width();
    $('body').css({'height': windowHeight, 'overflow': 'hidden'});
    var scrollWidth =  $('body').width() - bodyWidth;
    $('body').css({'padding-right': scrollWidth + 'px'});
    $(window).scrollTop(0);
    $(window).scrollLeft(0);
    $('body').css({'margin-top': -curScrollTop});
    $('body').data('scrollTop', curScrollTop);
    $('body').css({'margin-left': -curScrollLeft});
    $('body').data('scrollLeft', curScrollLeft);

    $('body').append('<div class="window"><div class="window-overlay"></div><div class="window-loading"></div><div class="window-container window-container-load"><div class="window-content">' + contentWindow + '<a href="#" class="window-close"></a></div></div></div>')

    if ($('.window-container img').length > 0) {
        $('.window-container img').each(function() {
            $(this).attr('src', $(this).attr('src'));
        });
        $('.window-container').data('curImg', 0);
        $('.window-container img').load(function() {
            var curImg = $('.window-container').data('curImg');
            curImg++;
            $('.window-container').data('curImg', curImg);
            if ($('.window-container img').length == curImg) {
                $('.window-loading').remove();
                $('.window-container').removeClass('window-container-load');
                windowPosition();
            }
        });
    } else {
        $('.window-loading').remove();
        $('.window-container').removeClass('window-container-load');
        windowPosition();
    }

    $('.window-close').click(function(e) {
        windowClose();
        e.preventDefault();
    });

    $('body').bind('keyup', keyUpBody);

    $('.window form').each(function() {
        initForm($(this));
    });

}

function windowPosition() {
    var dpr = 1;
    if (window.devicePixelRatio !== undefined) {
        dpr = window.devicePixelRatio;
    }

    var windowWidth     = $(window).width() * dpr;
    var windowHeight    = $(window).height() * dpr;

    if ($('.window-container').width() > windowWidth - 40) {
        $('.window-container').css({'left': 20, 'margin-left': 0});
        $('.window-overlay').width($('.window-container').width() + 40);
    } else {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});
        $('.window-overlay').width('100%');
    }

    if ($('.window-container').height() > windowHeight - 40) {
        $('.window-overlay').height($('.window-container').height() + 40);
        $('.window-container').css({'top': 20, 'margin-top': 0});
    } else {
        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2});
        $('.window-overlay').height('100%');
    }
}

function keyUpBody(e) {
    if (e.keyCode == 27) {
        windowClose();
    }
}

function windowClose() {
    $('body').unbind('keyup', keyUpBody);
    $('.window').remove();
    $('body').css({'height': '100%', 'overflow': 'visible', 'padding-right': 0, 'margin': 0});
    $(window).scrollTop($('body').data('scrollTop'));
    $(window).scrollLeft($('body').data('scrollLeft'));
}

$(window).resize(function() {
    if ($('.window').length > 0) {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();
        var curScrollTop    = $(window).scrollTop();
        var curScrollLeft   = $(window).scrollLeft();

        $('body').css({'height': '100%', 'overflow': 'visible', 'padding-right': 0, 'margin': 0});
        var bodyWidth = $('body').width();
        $('body').css({'height': windowHeight, 'overflow': 'hidden'});
        var scrollWidth =  $('body').width() - bodyWidth;
        $('body').css({'padding-right': scrollWidth + 'px'});
        $(window).scrollTop(0);
        $(window).scrollLeft(0);
        $('body').data('scrollTop', 0);
        $('body').data('scrollLeft', 0);

        windowPosition();
    }
});