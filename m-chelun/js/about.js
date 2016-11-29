var $ = require('../../../libs/vendor/zepto/zepto');
require('../../../libs/vendor/zepto/touch');
//var IScroll = require('./iscroll.js');
var jsBridge = require('../../../libs/jsBridge/api-2.0');
require('../../../libs/jsBridge/api-2.0-component');

$(function(){

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

    //iscroll
    //new IScroll(".about-tab-scroll", {
    //    scrollX: true,
    //    scrollY: false,
    //    eventPassthrough: true,
    //    preventDefault: false
    //});

    //tab
    $('.about-tab li').on('tap',function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.about-tab-content div').removeClass('active').eq($(this).index()).addClass('active');

    })

})