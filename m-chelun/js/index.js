var $ = require('../../../libs/vendor/zepto/zepto');
require('../../../libs/vendor/zepto/touch');
//var Swiper = require('./swiper.js');
require('./idangerous.swiper.js');
var jsBridge = require('../../../libs/jsBridge/api-2.0');
require('../../../libs/jsBridge/api-2.0-component');

$(function(){

    //var mySwiper = new Swiper ('.swiper-container', {
    //    // Optional parameters
    //    //direction: 'horizontal',
    //    //speed: 500,
    //    //autoplay: 3000,
    //    //effect: 'fade',
    //    pagination: '.swiper-pagination',
    //    paginationClickable: true,
    //    //observer:true,//修改swiper自己或子元素时，自动初始化swiper
    //    //observeParents:true,//修改swiper的父元素时，自动初始化swiper
    //    loop: true
    //})
    
    var mySwiper = $('.swiper-container').swiper({
        speed: 400,
        autoplay: 3000,
        mode:'horizontal',
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplayDisableOnInteraction: false,
        loop: true
    });

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

    var $el = $('.product > li');
    var buffer = $el.height()/4;

    var chaPos = $('.product-cha').offset().top + buffer - $(window).height();
    var kaoPos = $('.product-kao').offset().top + buffer - $(window).height();
    var bbsPos = $('.product-bbs').offset().top + buffer - $(window).height();

    $(window).scroll(function(){
        if ($(window).scrollTop() > chaPos){
            $('.product-cha').addClass('fadeInUp')
        }

        if ($(window).scrollTop() > kaoPos){
            $('.product-kao').addClass('fadeInUp')
        }

        if ($(window).scrollTop() > bbsPos){
            $('.product-bbs').addClass('fadeInUp')
        }
    });

    //var $el = $('.product > li');
    //var buffer = $el.height()/4;
    //var pos = [];
    //$('.product-cha').addClass('fadeInUp')
})