var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?da7f088a4eb2e82aedfea2ed6ce0c634";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);

    var script = document.createElement("script");
    script.src = "http://service.eclicks.cn:8080/service_utility/weixin/new_share_bridge.js?id=" +  Date.now();
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(script);

    var shareLink = '',
        shareImg = 'http://m.chelun.com/image/share.jpg';
        shareTitle = document.getElementsByTagName('title')[0].innerHTML;
        //shareImg = 'http://h5.chelun.com/2016/m-chelun/image/share.jpg';

    if (window.location.href == 'http://h5.chelun.com/2016/m-chelun/' || window.location.href == 'http://h5.chelun.com/2016/m-chelun/index.html'){
        shareLink = 'http://m.chelun.com';
    } else {
        shareLink = window.location.href;
    }

    // app share
    //分享给车轮好友
    window['CHELUN_SHARE_DATA_CLMESSAGE'] = {
        title: shareTitle, // 分享标题
        desc: '', // 分享描述
        link: shareLink, // 分享链接
        imgUrl: shareImg, // 分享图标
    };
    //分享到微信朋友圈
    window['CHELUN_SHARE_DATA_WXTIMELINE'] = {
        title: shareTitle,//分享标题
        link: shareLink,//分享链接
        imgUrl: shareImg,//分享图标 //注意，iOS老版拼错了，拼成imageUrl，如果对老版本支持请多复制一个key
    };
    //发送给微信好友
    window['CHELUN_SHARE_DATA_WXMESSAGE'] = {
        title: shareTitle, // 分享标题
        desc: '', // 分享描述
        link: shareLink, // 分享链接
        imgUrl: shareImg, // 分享图标
    };
    //分享到QQ
    window['CHELUN_SHARE_DATA_QQ'] = {
        title: shareTitle, // 分享标题
        desc: '', // 分享描述
        link: shareLink, // 分享链接
        imgUrl: shareImg // 分享图标
    };
    //分享到新浪微博
    window['CHELUN_SHARE_DATA_SINA'] = {
        title: shareTitle, // 分享标题
        desc: '', // 分享描述
        link: shareLink, // 分享链接
        imgUrl: shareImg // 分享图标
    };
    //分享到短信
    window['CHELUN_SHARE_DATA_SMS'] = {
        title: shareTitle // 短信内容
    };

    // weixin share
    window.shareData = {
        "tLink": shareLink,   // 分享到朋友圈的链接
        "tImgUrl": shareImg, // 分享到朋友圈的图片
        "tTitle": shareTitle,  // 分享到朋友圈的标题
        "tContent": "有车，就有车轮！", // 分享到朋友圈的正文
        "fLink": shareLink,    // 分享给单个朋友的链接
        "fImgUrl": shareImg,  // 分享给单个朋友的图片
        "fTitle": shareTitle,   // 分享给单个朋友的标题
        "fContent": "车主掌上生活第一平台" + "\n" + "有车，就有车轮！"  // 分享给单个朋友的正文
    };

})();
