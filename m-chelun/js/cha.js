var $ = require('../../../libs/vendor/zepto/zepto');
require('../../../libs/vendor/zepto/touch');
//require('./swiper.jquery.js');
require('./idangerous.swiper.js');
var jsBridge = require('../../../libs/jsBridge/api-2.0');
require('../../../libs/jsBridge/api-2.0-component');

$(function(){

    //首屏高度
    function reHeight() {
        var headHeight = $('.header').height();
        var bannerHeight = $(window).height() - headHeight;
        $('.banner').height(bannerHeight);
    }
    reHeight();

    //通用菜单
    function menuOpen(){
        $('html,body').addClass('scroll-disable');
        $('.logo a, .menu-btn, .menu-list').addClass('active');
    };
    function menuClose(){
        $('html, body').removeClass('scroll-disable');
        $('.logo a, .menu-btn, .menu-list').removeClass('active');
    }
    $('.menu-btn').on('tap',function(){
        if ($('.menu-btn').hasClass('active')) {
            menuClose();
        } else {
            menuOpen();
        }
    });
    //$('.menu-list a').on('tap',function(){
    //    menuClose();
    //});

    //var swiper = new Swiper ('.swiper-container', {
    //    // Optional parameters
    //    direction: 'horizontal',
    //    speed: 400,
    //    autoplay: 2000,
    //    prevButton: '.swiper-button-prev',
    //    nextButton: '.swiper-button-next',
    //    loop: true
    //})

    var swiper = $('.swiper-container').swiper({
        speed: 400,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        mode:'horizontal',
        loop: true,
        onSlideChangeEnd: function(){
            var index = $('.swiper-slide-active > img').data('index');
            $('.slide-title > li').removeClass('active').eq(index).addClass('active');
        }
    });

    $('.swiper-button-prev').on('tap',function(e){
        e.preventDefault();
        swiper.swipePrev();
    });

    $('.swiper-button-next').on('tap',function(e){
        e.preventDefault();
        swiper.swipeNext();
    });

})