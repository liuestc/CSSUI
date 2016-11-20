'use strict';

var $ = require('zepto.js');
var Pop = {
	alerts: [],
	alert: '',
	isExist: false,
	push: function push(title, subTitle, callBack, animation) {
		var _title = title ? title : '',
		    _subTitle = subTitle ? subTitle : '';
		if (!_title && !_subTitle) return;
		this.alerts.push({
			title: _title,
			subTitle: _subTitle,
			callBack: callBack,
			animation: !!animation
		});
		this.exec();
	},
	exec: function exec() {
		if (this.alerts.length == 0) return;
		if (this.isExist) return;
		var data = this.alerts.shift();
		var cls = data.animation ? 'class=animation' : '';
		var str = ' <div class="alertMask">\
				<div class="alert">\
					<div ' + cls + '>\
						<span class="subTitle" id="subTitle">' + data.subTitle + '</span>\
						<span class="title">' + data.title + '</span>\
						<span class="ok">好</span>\
					</div>\
				</div>\
			</div>';
		this.alert = $(str);
		this.isExist = true;
		this.callBack = data.callBack;
		var ok = this.alert.find(".ok"),
		    me = this;
		ok.on("click", function () {
			me.isExist = false;
			me.alert.remove();
			if (me.callBack && typeof me.callBack == "function") {
				me.callBack();
			}
			setTimeout(function () {
				me.exec();
			}, 300);
		});
		$(document.body).append(me.alert);
	}
};

module.exports = Pop;