var $ = require('../../../libs/vendor/zepto/zepto');
require('../../../libs/vendor/zepto/touch');
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

    //页码处理
    if ($('.page a').length > 0){
        $('.page a').each(function(){
            var text = $(this).get(0).innerHTML;
            if (!isNaN(text)){
                $(this).remove();
            }
        })
    }

})