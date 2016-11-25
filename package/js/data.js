'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var $ = require('./zepto.js');

var data = {
	ajax: function ajax(url, data, _success, type, method) {
		if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
			data = {};
		}
		if (!type || type !== 'string') {
			type = 'json';
		}
		if (!method || typeof method !== 'string') {
			method = "GET";
		}

		$.ajax({
			type: method,
			url: url,
			data: data,
			dataType: type,
			success: function success(res) {
				_success && typeof _success == 'function' && _success(res);
			},
			timeout: 10000,
			error: function error(res, status, _error) {
				console.log(res + status + _error);
			}

		});
	},
	getTest: function getTest(success) {
		this.ajax('../src/test.json', { "data1": "1", "data2": "2" }, success);
	}
};

// module.exports=data;
module.exports = data;