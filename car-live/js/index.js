'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = require('./zepto');
var React = require('react');
var ReactDOM = require('react-dom');

var test = document.getElementById('test');
var host = /h5.chelun.com/.test(window.location.host) ? '//chelun.eclicks.cn' : '//community.dev.chelun.com';

var Test = function (_React$Component) {
    _inherits(Test, _React$Component);

    function Test() {
        _classCallCheck(this, Test);

        var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this));

        _this.state = {
            topic: "",
            user: ""
        };
        return _this;
    }

    // get Param


    _createClass(Test, [{
        key: 'getParam',
        value: function getParam(name) {
            var maps = {};
            var cookArr = window.location.search.substr(1).split('&');
            for (var i in cookArr) {
                var tmp = cookArr[i].replace(/^\s*/, '');
                if (tmp) {
                    var nv = tmp.split('=');
                    maps[nv[0]] = nv[1] || '';
                }
            }
            return maps[name] || '';
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            $.ajax({
                url: 'https://dev-promotion.chelun.com/GuangzhouCarShow/index?id=1',
                type: 'GET',
                success: function success(res) {

                    var id = 1;
                    var tid = res.data.tid;

                    $.ajax({
                        type: 'GET',
                        url: host + '/topic/topic_get',
                        data: {
                            platform: 'web',
                            ac_token: "",
                            tid: tid,
                            desc: 1
                        },
                        dataType: 'json',
                        success: function success(res) {

                            _this2.setState({
                                topic: res.data.topic,
                                user: res.data.user
                            });
                            console.log(res);
                            // console.log(this.state.DATA.data.forum.affiche);
                        }
                    });
                },
                error: function error() {
                    console(hahh);
                }
            });
        }
        // env.fid = res.data.topic.fid;
        //             env.tid = res.data.topic.tid;
        //              // console.log(res);
        //             var topic = res.data.topic;
        //             var posts = res.data.topic.posts;
        //             let _user = res.data.user;
        //             var nick = _user.nick;
        //             var level = '•'+_user.level + "级";
        //             if (topic.img){
        //                 let img = topic.img;
        //                 img.forEach(function (item, index) {
        //                     $("#topic_img").append("<img src='" + item.url + "' />");
        //                 });
        //             }
        //             var time = getDateDiff(topic.ctime);
        //             $(".title").text(res.data.topic.title);
        //             $("#nick").text(nick);
        //             $(".lev").text(level);
        //             $(".car-img.topic").attr("src", _user.small_logo);
        //             $(".head-img.topic").attr("src", _user.avatar);

        //             let content = topic.content.replace(/\n/ig, '<br>');
        //             $("#topic_content").html(content);
        //             $("#topic_time").text(time);
        //             $("#topic_address").text(topic.city_name?topic.city_name:'');
        //             $("#add_icon").append("<span class='posts'>" + posts + "</span>");
        //             $(".active").text(res.data.forum.name);

        //             //获取用户信息
        //             if (res.data.current){
        //                 let cur_user = res.data.current;
        //                 user.avatar = cur_user.avatar;
        //                 user.name = cur_user.nick;
        //                 user.level = cur_user.level;
        //                 user.logo = cur_user.small_logo;
        //             }

        //             initShare({
        //                 title: res.data.topic.title || '广州车展分享',
        //                 link: window.location.toString(),
        //                 img: _user.avatar,
        //                 desc: res.data.topic.content
        //             });
        //         },


    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.topic.uid
            );
        }
    }]);

    return Test;
}(React.Component);

ReactDOM.render(React.createElement(Test, null), test);
// export default function()


// var chelunJSBridge = require('../../../libs/jsBridge/api-2.0');
// let share = require('../../../libs/common/js/share.js');

// const host = /h5.chelun.com/.test(window.location.host)?'//chelun.eclicks.cn':'//community.dev.chelun.com';
// const tid =  /h5.chelun.com/.test(window.location.host)?'': '';
// const hostid =  /h5.chelun.com/.test(window.location.host)?'//promotion.chelun.com/index.php?c=GuangzhouCarShow&v=index&id=': '//dev-promotion.chelun.com/index.php?c=GuangzhouCarShow&v=index&id=';
// // const tid='';
// let env = {
//     env: '',
//     is_login: false,
//     fid: '',
//     tid: tid,
//     oid: '',
//     pos: 0,
//     ac_token: '',
//     height: 0,
//     postState: true,
//     expand: false,
//     live_url:''
// };
// let user = {

// };
// function initShare(shareData) {
//     //分享到朋友圈
//     window['CHELUN_SHARE_DATA_WXTIMELINE'] = {
//         title: shareData.title, // 分享标题
//         link: shareData.link, // 分享链接
//         imgUrl: shareData.img // 分享图标
//     };
//     // 发送给微信好友
//     window['CHELUN_SHARE_DATA_WXMESSAGE'] = {
//         title: shareData.title, // 分享标题
//         desc: shareData.desc, // 分享描述
//         link: shareData.link, // 分享链接
//         imgUrl: shareData.img // 分享图标
//     };

//     //配置微信分享
//     share.addWeiXinConfigAndJWeixin();
//     share.setWeiXinShare(shareData.img, shareData.title, shareData.desc, shareData.link);
//     share.setWeiXinCallback = function(){
//      _hmt.push(['_trackEvent', '广州车展直播活动', 'tap', '微信内分享'+this.getEnv()+'_'+string]);
//     };
// }
// function getCookie(name) {
//     var maps = {};
//     var cookArr = document.cookie.split(';');
//     for (var i in cookArr) {
//         var tmp = cookArr[i].replace(/^\s*/, '');
//         if (tmp) {
//             var nv = tmp.split('=');
//             maps[nv[0]] = nv[1] || '';
//         }
//     }
//     return maps[name];
// }

// // get Param
// function getParam(name){
//     var maps = {};
//     var cookArr = window.location.search.substr(1).split('&')
//     for (var i in cookArr) {
//         var tmp = cookArr[i].replace(/^\s*/, '');
//         if (tmp) {
//             var nv = tmp.split('=');
//             maps[nv[0]] = nv[1] || '';
//         }
//     }
//     return maps[name] || '';
// }

// (function () {
//     var app_name = getCookie('chelun_appName');
//     env.ac_token = getCookie('chelun_acToken');

//     if (app_name) {
//         env.env = 'chelun';
//         env.is_login = env.ac_token ? true : false;
//         //展示输入框

//         $("#commit").show();
//         $(".more").show();
//         //获取用户所在城市

//         chelunJSBridge.invoke('device', 'getLocation', {
//             locationCallBackName: function(res){
//                 if (res.result == 1){
//                     $(".cityname").text(res.data.city);
//                 }
//             }
//         });
//     } else {
//         //展示下载链接
//         $(".download").show();
//         $(".open-chelun").show();
//         env.env = 'web';
//     }

//     let id = getParam('id');

//     //动态拉去图片url
//     $.ajax({
//             type: 'GET',
//             url: hostid+id,
//             dataType: 'json',
//             success:function(res){ 
//             var img=res.data.focus_img;
//             var img1=res.data.img2;
//             var img2=res.data.img3;
//             env.live_url=res.data.video_link;
//             env.tid=res.data.tid;


//             $('#live').attr("src",img)
//             $("#live_left").attr("src",img1);
//             $("#live_right").attr("src",img2);
//             getMain(env.tid);
//             getPost(8,env.tid);
//          },
//         error: function error(xhr, type) {
//             // console.log(type)
//         }
//     });
// })();

// function getDateDiff(dateTimeStamp) {
//     var minute = 1000 * 60;
//     var hour = minute * 60;
//     var day = hour * 24;
//     var halfamonth = day * 15;
//     var month = day * 30;
//     var now = new Date().getTime();
//     var diffValue = now - dateTimeStamp*1000;
//     if (diffValue < 0) {
//         return;
//     }
//     var monthC = diffValue / month;
//     var weekC = diffValue / (7 * day);
//     var dayC = diffValue / day;
//     var hourC = diffValue / hour;
//     var minC = diffValue / minute;
//     if (monthC >= 1) {
//         result = "" + parseInt(monthC) + "月前";
//     } else if (weekC >= 1) {
//         result = "" + parseInt(weekC) + "周前";
//     } else if (dayC >= 1) {
//         result = "" + parseInt(dayC) + "天前";
//     } else if (hourC >= 1) {
//         result = "" + parseInt(hourC) + "小时前";
//     } else if (minC >= 1) {
//         result = "" + parseInt(minC) + "分钟前";
//     } else var result = "刚刚";
//     return result;
// }

// //获取主贴
// function getMain(tid){
//     $.ajax({
//         type: 'GET',
//         url: host+'/topic/topic_get',
//         data: {
//             platform: 'web',
//             ac_token: env.ac_token,
//             tid: tid,
//             desc:1
//         },
//         dataType: 'json',
//         success: function success(res) {
//             env.fid = res.data.topic.fid;
//             env.tid = res.data.topic.tid;
//              // console.log(res);
//             var topic = res.data.topic;
//             var posts = res.data.topic.posts;
//             let _user = res.data.user;
//             var nick = _user.nick;
//             var level = '•'+_user.level + "级";
//             if (topic.img){
//                 let img = topic.img;
//                 img.forEach(function (item, index) {
//                     $("#topic_img").append("<img src='" + item.url + "' />");
//                 });
//             }
//             var time = getDateDiff(topic.ctime);
//             $(".title").text(res.data.topic.title);
//             $("#nick").text(nick);
//             $(".lev").text(level);
//             $(".car-img.topic").attr("src", _user.small_logo);
//             $(".head-img.topic").attr("src", _user.avatar);

//             let content = topic.content.replace(/\n/ig, '<br>');
//             $("#topic_content").html(content);
//             $("#topic_time").text(time);
//             $("#topic_address").text(topic.city_name?topic.city_name:'');
//             $("#add_icon").append("<span class='posts'>" + posts + "</span>");
//             $(".active").text(res.data.forum.name);

//             //获取用户信息
//             if (res.data.current){
//                 let cur_user = res.data.current;
//                 user.avatar = cur_user.avatar;
//                 user.name = cur_user.nick;
//                 user.level = cur_user.level;
//                 user.logo = cur_user.small_logo;
//             }

//             initShare({
//                 title: res.data.topic.title || '广州车展分享',
//                 link: window.location.toString(),
//                 img: _user.avatar,
//                 desc: res.data.topic.content
//             });
//         },
//         error: function error(xhr, type) {
//             alert('请检查当前网络环境!');
//         }
//     });

// }


// let live = $(".live-video");
// //直播点击逻辑
// live.on('click', function(){
//     toggleClick();
// });
// live.on('dblclick', function(){
//     toggleClick();
// });
// function toggleClick(){

//     window.location = env.live_url;
// }
// //首次获取回帖
// // getPost(8);

// //所有交互逻辑
// $("#writeMes").on("focus", function () {
//     if (!env.ac_token){
//         chelunJSBridge.invoke('app', 'login', {
//             loginCallBackName: function(res){
//                 if (res.result == 1){
//                     env.ac_token = res.data.token;
//                 }
//             }
//         });
//         return;
//     }
//     showInput();
// });

// $(".cancel").on("click", function () {
//     env.oid = '';
//     hideInput();
// });
// $(".more").on("click", function () {

//     getPost(10, env.tid,env.pos);
// });
// $("#share").on('click', function(){
//     chelunJSBridge.invoke('ui', 'shareMessage');
// });
// $("#close").on('click', function(){
//     $(".download").hide();
// });
// //回复帖子
// $(".push").on("click", function () {
//     var postVal = $("#writeText").val();
//     if (!postVal){
//         hideInput();
//         return;
//     }
//     let param = {
//         ac_token: env.ac_token,
//         platform: 'web',
//         fid: env.fid,
//         tid: env.tid,
//         content: postVal,
//     };
//     let oid = env.oid;
//     oid?param.quote=oid:'';
//     $.ajax({
//         type: 'POST',
//         url: host+'/post/newpost',
//         data: param,
//         dataType: 'json',
//         success: function success(res) {
//             let oid = res.data.post[0].oid, post = res.data.post[0];
//             //记录楼层在本地
//             env.height = oid;
//             //给回帖数+1
//             $(".posts").text(parseInt($(".posts").text())+1);
//             //修改查看更多按钮可用
//             $(".more").text('查看更多');
//             env.postState = true;
//             //todo 展示回复成功的动
//             showSucc();
//             let time = getDateDiff(post.mtime), html='';
//             let quote = '';

//             if (post.quote_pid != 0){
//                 let quote = res.data.quote,
//                     users = res.data.user;
//                 let quoteContent = quote[post.quote_pid].content;
//                 let uid = quote[post.quote_pid].uid;
//                 let oid = quote[post.quote_pid].oid
//                 let quoteName = users[uid].nick;
//                 // let m=user.avatar;

//                 quote = `<p class="quote">
//                         回复<span>${getFloor(oid, true)}</span><span>${quoteName}</span>: ${quoteContent}
//                     </p>`;
//                 html += `<li class="comment-content " id="${post.oid}">
//                     <div class="bar">
//                         <img class="head-img" src="${user.avatar}"/>
//                         <span class="name">${user.name}</span>
//                         <span class="lev">•${user.level}级</span>
//                         <img class="car-img" class="car_small_logo"  src="${user.logo}"/>
//                          <span class="oid">${getFloor(post.oid)}</span>
//                     </div>
//                     ${quote}
//                     <p class="say">${post.content}</p>
//                     <p class="footer">
//                         <span class="time">${time}</span>
//                         <span class="local">${post.city}</span>
//                         <span class="res" data-floor=${post.oid} data-pid=${post.pid}>回复</span>
//                     </p>
//                 </li>`;

//                 $(html).insertBefore($('ul li:first-child'));
//                 $(".res").off('click').on("click", function () {
//                 // if (env.env == 'web'){
//                 //      什么也不做
//                 // }else{
//                     if (!env.ac_token){
//                         chelunJSBridge.invoke('app', 'login', {
//                             loginCallBackName: function(res){
//                                 if (res.result == 1){
//                                     env.ac_token = res.data.token;
//                                 }
//                             }
//                         });
//                         return;
//                     }
//                     let oid = $(this).data('floor');
//                     env.oid = $(this).data('pid');
//                     $("#reply_floor").empty().append("回复" + oid + '楼');
//                     showInput();
//                 // }
//                 });

//                 hideInput();
//             }
//             // quote = `<p class="quote">
//             //             回复<span>${getFloor(oid, true)}</span><span>${quoteName}</span>: ${quoteContent}
//             //         </p>`
//             // if (oid<=8){

//                 else{
//                     html += `<li class="comment-content " id="${post.oid}">
//                         <div class="bar">
//                             <img class="head-img" src="${user.avatar}"/>
//                             <span class="name">${user.name}</span>
//                             <span class="lev">•${user.level}级</span>
//                             <img class="car-img" class="car_small_logo"  src="${user.logo}"/>
//                              <span class="oid">${getFloor(post.oid)}</span>
//                         </div>
//                         ${quote}
//                         <p class="say">${post.content}</p>
//                         <p class="footer">
//                             <span class="time">${time}</span>
//                             <span class="local">${post.city}</span>
//                             <span class="res" data-floor=${post.oid} data-pid=${post.pid}>回复</span>
//                         </p>
//                     </li>`;


//                 $(html).insertBefore($('ul li:first-child'));

//                 $(".res").off('click').on("click", function () {
//                 // if (env.env == 'web'){
//                 //     // 什么也不做
//                 // }else{
//                     if (!env.ac_token){
//                         chelunJSBridge.invoke('app', 'login', {
//                             loginCallBackName: function(res){
//                                 if (res.result == 1){
//                                     env.ac_token = res.data.token;
//                                 }
//                             }
//                         });
//                         return;
//                     }
//                     let oid = $(this).data('floor');
//                     env.oid = $(this).data('pid');
//                     $("#reply_floor").empty().append("回复" + oid + '楼');
//                     showInput();
//                 // }
//             });

//             // }else{
//             // }
//             hideInput();
//             }
//         },
//         error: function error(xhr, type) {
//             alert('请检查当前网络环境!');
//         }
//     });
// });

// function getFloor(oid, flag){
//     let html = flag?' ':'';
//     if (oid == 1){
//         return `沙${html}发`;
//     }else if(oid == 2){
//         return `板${html}凳`;
//     }else{
//         return `${oid+html}楼`;
//     }
// }

// function showSucc(){
//     let succ = $(".success");
//     succ.addClass('show');
//     setTimeout(function(){
//         succ.removeClass('show');
//     }, 2000);
// }
// function showInput(){
//     $("#commit").hide();
//     let reply = $(".reply");
//     reply.show();
//     $("#writeText").focus();
//     // reply.addClass('show').on('webkitTransitionEnd', function(){
//     //     reply.off('webkitTransitionEnd');
//         // $("#writeText").focus();
//     // });
// }
// function hideInput(){
//     let reply = $(".reply");
//     reply.hide();
//     $("#commit").show();
//     $("#writeText").val('');

//     // reply.removeClass('show').on('webkitTransitionEnd', function(){
//     //     reply.off('webkitTransitionEnd');
//     //
//     // });
// }
// function getPost(limit,tid, pos){
//     if (!env.postState)
//         return;
//     env.postState = false;
//     let param = {
//         platform: 'web',
//         ac_token: env.ac_token,
//         tid: env.tid,
//         limit: limit,
//         desc:1
//     };
//     pos?param.pos=pos:'';
//     $.ajax({
//         type: 'POST',
//         url: host+'/post/byctime',
//         data: param,
//         dataType: 'json',
//         success: function(res) {
//             //todo 拉取分页数据填充列表
//             env.postState = true;
//             let posts = res.data.post || [],
//                 users = res.data.user || [],
//                 quotes = res.data.quote || [];
//             res.data.pos?env.pos = res.data.pos:env.postState = false;
//             let html = '';
//             for (let i=0,len=posts.length; i<len; i++){
//                 if (env.height && posts[i].oid <= env.height && env.height<=8)
//                     continue;
//                 let uid = posts[i].uid;
//                 let time = getDateDiff(posts[i].mtime);
//                 let quote = '';
//                 if (posts[i].quote_pid != '0'){
//                     let quoteContent = quotes[posts[i].quote_pid].content;
//                     let uid = quotes[posts[i].quote_pid].uid;
//                     let oid = quotes[posts[i].quote_pid].oid
//                     let quoteName = users[uid].nick;
//                     quote = `<p class="quote">
//                         回复<span>${getFloor(oid, true)}</span><span> ${quoteName}</span>: ${quoteContent}
//                     </p>`;
//                 }

//                 html += `<li class="comment-content" id="${posts[i].oid}">
//                     <div class="bar">
//                         <img class="head-img" src="${users[uid].avatar}">
//                         <span class="name">${users[uid].nick}</span>
//                         <span class="lev">•${users[uid].level}级</span>
//                         <img class="car-img" class="car_small_logo"  src="${users[uid].small_logo}">
//                         <span class="oid">${getFloor(posts[i].oid)}</span>
//                     </div>
//                      ${quote}
//                     <p class="say">${posts[i].content}</p>
//                     <p class="footer">
//                         <span class="time">${time}</span>
//                         <span class="local">${posts[i].city_name?posts[i].city_name:''}</span>
//                         <span class="res"  data-floor=${posts[i].oid} data-pid=${posts[i].pid}>回复</span>
//                     </p>
//                 </li>`;
//             }

//             $("#comment_list").append(html);
//             if (!env.postState){
//                 $(".more").text('到底啦!');
//             }
//             $(".res").off('click').on("click", function () {
//                 if (env.env == 'web'){
//                     // 什么不做
//                 }else{
//                     if (!env.ac_token){
//                         chelunJSBridge.invoke('app', 'login', {
//                             loginCallBackName: function(res){
//                                 if (res.result == 1){
//                                     env.ac_token = res.data.token;
//                                 }
//                             }
//                         });
//                         return;
//                     }
//                     let oid = $(this).data('floor');
//                     env.oid = $(this).data('pid');
//                     $("#reply_floor").empty().append("回复" + oid + '楼');
//                     showInput();
//                 }
//             });
//         },
//         error: function(xhr, type) {
//             alert('请检查当前网络环境!');
//         }
//     });
// }