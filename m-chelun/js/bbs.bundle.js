/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	__webpack_require__(2);
	//require('./swiper.jquery.js');
	__webpack_require__(5);
	var jsBridge = __webpack_require__(3);
	__webpack_require__(4);

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

/***/ },
/* 1 */
/***/ function(module, exports) {

	;(function (global, factory) {
		if (typeof module === "object" && typeof module.exports === "object") {
			module.exports = factory(global);
		} else {
			factory(global);
		}
	})(typeof window !== "undefined" ? window : this, function (window) {

		var Zepto = (function () {
			var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
				document = window.document,
				elementDisplay = {}, classCache = {},
				cssNumber = {
					'column-count': 1,
					'columns': 1,
					'font-weight': 1,
					'line-height': 1,
					'opacity': 1,
					'z-index': 1,
					'zoom': 1
				},
				fragmentRE = /^\s*<(\w+|!)[^>]*>/,
				singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
				tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
				rootNodeRE = /^(?:body|html)$/i,
				capitalRE = /([A-Z])/g,

			// special attributes that should be get/set via method calls
				methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

				adjacencyOperators = ['after', 'prepend', 'before', 'append'],
				table = document.createElement('table'),
				tableRow = document.createElement('tr'),
				containers = {
					'tr': document.createElement('tbody'),
					'tbody': table, 'thead': table, 'tfoot': table,
					'td': tableRow, 'th': tableRow,
					'*': document.createElement('div')
				},
				readyRE = /complete|loaded|interactive/,
				simpleSelectorRE = /^[\w-]*$/,
				class2type = {},
				toString = class2type.toString,
				zepto = {},
				camelize, uniq,
				tempParent = document.createElement('div'),
				propMap = {
					'tabindex': 'tabIndex',
					'readonly': 'readOnly',
					'for': 'htmlFor',
					'class': 'className',
					'maxlength': 'maxLength',
					'cellspacing': 'cellSpacing',
					'cellpadding': 'cellPadding',
					'rowspan': 'rowSpan',
					'colspan': 'colSpan',
					'usemap': 'useMap',
					'frameborder': 'frameBorder',
					'contenteditable': 'contentEditable'
				},
				isArray = Array.isArray ||
					function (object) {
						return object instanceof Array
					}

			zepto.matches = function (element, selector) {
				if (!selector || !element || element.nodeType !== 1) return false
				var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
					element.oMatchesSelector || element.matchesSelector
				if (matchesSelector) return matchesSelector.call(element, selector)
				// fall back to performing a selector:
				var match, parent = element.parentNode, temp = !parent
				if (temp) (parent = tempParent).appendChild(element)
				match = ~zepto.qsa(parent, selector).indexOf(element)
				temp && tempParent.removeChild(element)
				return match
			}





			function type(obj) {
				return obj == null ? String(obj) :
				class2type[toString.call(obj)] || "object"
			}

			function isFunction(value) {
				return type(value) == "function"
			}

			function isWindow(obj) {
				return obj != null && obj == obj.window
			}

			function isDocument(obj) {
				return obj != null && obj.nodeType == obj.DOCUMENT_NODE
			}

			function isObject(obj) {
				return type(obj) == "object"
			}

			function isPlainObject(obj) {
				return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
			}

			function likeArray(obj) {
				return typeof obj.length == 'number'
			}

			function compact(array) {
				return filter.call(array, function (item) {
					return item != null
				})
			}

			function flatten(array) {
				return array.length > 0 ? $.fn.concat.apply([], array) : array
			}

			camelize = function (str) {
				return str.replace(/-+(.)?/g, function (match, chr) {
					return chr ? chr.toUpperCase() : ''
				})
			}
			function dasherize(str) {
				return str.replace(/::/g, '/')
					.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
					.replace(/([a-z\d])([A-Z])/g, '$1_$2')
					.replace(/_/g, '-')
					.toLowerCase()
			}

			uniq = function (array) {
				return filter.call(array, function (item, idx) {
					return array.indexOf(item) == idx
				})
			}

			function classRE(name) {
				return name in classCache ?
					classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
			}

			function maybeAddPx(name, value) {
				return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
			}

			function defaultDisplay(nodeName) {
				var element, display
				if (!elementDisplay[nodeName]) {
					element = document.createElement(nodeName)
					document.body.appendChild(element)
					display = getComputedStyle(element, '').getPropertyValue("display")
					element.parentNode.removeChild(element)
					display == "none" && (display = "block")
					elementDisplay[nodeName] = display
				}
				return elementDisplay[nodeName]
			}

			function children(element) {
				return 'children' in element ?
					slice.call(element.children) :
					$.map(element.childNodes, function (node) {
						if (node.nodeType == 1) return node
					})
			}

			// `$.zepto.fragment` takes a html string and an optional tag name
			// to generate DOM nodes nodes from the given html string.
			// The generated DOM nodes are returned as an array.
			// This function can be overriden in plugins for example to make
			// it compatible with browsers that don't support the DOM fully.
			zepto.fragment = function (html, name, properties) {
				var dom, nodes, container

				// A special case optimization for a single tag
				if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

				if (!dom) {
					if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
					if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
					if (!(name in containers)) name = '*'

					container = containers[name]
					container.innerHTML = '' + html
					dom = $.each(slice.call(container.childNodes), function () {
						container.removeChild(this)
					})
				}

				if (isPlainObject(properties)) {
					nodes = $(dom)
					$.each(properties, function (key, value) {
						if (methodAttributes.indexOf(key) > -1) nodes[key](value)
						else nodes.attr(key, value)
					})
				}

				return dom
			}

			// `$.zepto.Z` swaps out the prototype of the given `dom` array
			// of nodes with `$.fn` and thus supplying all the Zepto functions
			// to the array. Note that `__proto__` is not supported on Internet
			// Explorer. This method can be overriden in plugins.
			zepto.Z = function (dom, selector) {
				dom = dom || []
				dom.__proto__ = $.fn
				dom.selector = selector || ''
				return dom
			}

			// `$.zepto.isZ` should return `true` if the given object is a Zepto
			// collection. This method can be overriden in plugins.
			zepto.isZ = function (object) {
				return object instanceof zepto.Z
			}

			// `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
			// takes a CSS selector and an optional context (and handles various
			// special cases).
			// This method can be overriden in plugins.
			zepto.init = function (selector, context) {
				var dom
				// If nothing given, return an empty Zepto collection
				if (!selector) return zepto.Z()
				// Optimize for string selectors
				else if (typeof selector == 'string') {
					selector = selector.trim()
					// If it's a html fragment, create nodes from it
					// Note: In both Chrome 21 and Firefox 15, DOM error 12
					// is thrown if the fragment doesn't begin with <
					if (selector[0] == '<' && fragmentRE.test(selector))
						dom = zepto.fragment(selector, RegExp.$1, context), selector = null
					// If there's a context, create a collection on that context first, and select
					// nodes from there
					else if (context !== undefined) return $(context).find(selector)
					// If it's a CSS selector, use it to select nodes.
					else dom = zepto.qsa(document, selector)
				}
				// If a function is given, call it when the DOM is ready
				else if (isFunction(selector)) return $(document).ready(selector)
				// If a Zepto collection is given, just return it
				else if (zepto.isZ(selector)) return selector
				else {
					// normalize array if an array of nodes is given
					if (isArray(selector)) dom = compact(selector)
					// Wrap DOM nodes.
					else if (isObject(selector))
						dom = [selector], selector = null
					// If it's a html fragment, create nodes from it
					else if (fragmentRE.test(selector))
						dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
					// If there's a context, create a collection on that context first, and select
					// nodes from there
					else if (context !== undefined) return $(context).find(selector)
					// And last but no least, if it's a CSS selector, use it to select nodes.
					else dom = zepto.qsa(document, selector)
				}
				// create a new Zepto collection from the nodes found
				return zepto.Z(dom, selector)
			}

			// `$` will be the base `Zepto` object. When calling this
			// function just call `$.zepto.init, which makes the implementation
			// details of selecting nodes and creating Zepto collections
			// patchable in plugins.
			$ = function (selector, context) {
				return zepto.init(selector, context)
			}


			function extend(target, source, deep) {
				for (key in source)
					if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
						if (isPlainObject(source[key]) && !isPlainObject(target[key]))
							target[key] = {}
						if (isArray(source[key]) && !isArray(target[key]))
							target[key] = []
						extend(target[key], source[key], deep)
					}
					else if (source[key] !== undefined) target[key] = source[key]
			}

			// Copy all but undefined properties from one or more
			// objects to the `target` object.
			$.extend = function (target) {
				var deep, args = slice.call(arguments, 1)
				if (typeof target == 'boolean') {
					deep = target
					target = args.shift()
				}
				args.forEach(function (arg) {
					extend(target, arg, deep)
				})
				return target
			}

			// `$.zepto.qsa` is Zepto's CSS selector implementation which
			// uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
			// This method can be overriden in plugins.
			zepto.qsa = function (element, selector) {
				var found,
					maybeID = selector[0] == '#',
					maybeClass = !maybeID && selector[0] == '.',
					nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
					isSimple = simpleSelectorRE.test(nameOnly)
				return (isDocument(element) && isSimple && maybeID) ?
					( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
					(element.nodeType !== 1 && element.nodeType !== 9) ? [] :
						slice.call(
							isSimple && !maybeID ?
								maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
									element.getElementsByTagName(selector) : // Or a tag
								element.querySelectorAll(selector) // Or it's not simple, and we need to query all
						)
			}

			function filtered(nodes, selector) {
				return selector == null ? $(nodes) : $(nodes).filter(selector)
			}

			$.contains = document.documentElement.contains ?
				function (parent, node) {
					return parent !== node && parent.contains(node)
				} :
				function (parent, node) {
					while (node && (node = node.parentNode))
						if (node === parent) return true
					return false
				}

			function funcArg(context, arg, idx, payload) {
				return isFunction(arg) ? arg.call(context, idx, payload) : arg
			}

			function setAttribute(node, name, value) {
				value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
			}

			// access className property while respecting SVGAnimatedString
			function className(node, value) {
				var klass = node.className || '',
					svg = klass && klass.baseVal !== undefined

				if (value === undefined) return svg ? klass.baseVal : klass
				svg ? (klass.baseVal = value) : (node.className = value)
			}

			// "true"  => true
			// "false" => false
			// "null"  => null
			// "42"    => 42
			// "42.5"  => 42.5
			// "08"    => "08"
			// JSON    => parse if valid
			// String  => self
			function deserializeValue(value) {
				try {
					return value ?
					value == "true" ||
					( value == "false" ? false :
						value == "null" ? null :
							+value + "" == value ? +value :
								/^[\[\{]/.test(value) ? $.parseJSON(value) :
									value )
						: value
				} catch (e) {
					return value
				}
			}

			$.type = type
			$.isFunction = isFunction
			$.isWindow = isWindow
			$.isArray = isArray
			$.isPlainObject = isPlainObject

			$.isEmptyObject = function (obj) {
				var name
				for (name in obj) return false
				return true
			}

			$.inArray = function (elem, array, i) {
				return emptyArray.indexOf.call(array, elem, i)
			}

			$.camelCase = camelize
			$.trim = function (str) {
				return str == null ? "" : String.prototype.trim.call(str)
			}

			// plugin compatibility
			$.uuid = 0
			$.support = {}
			$.expr = {}

			$.map = function (elements, callback) {
				var value, values = [], i, key
				if (likeArray(elements))
					for (i = 0; i < elements.length; i++) {
						value = callback(elements[i], i)
						if (value != null) values.push(value)
					}
				else
					for (key in elements) {
						value = callback(elements[key], key)
						if (value != null) values.push(value)
					}
				return flatten(values)
			}

			$.each = function (elements, callback) {
				var i, key
				if (likeArray(elements)) {
					for (i = 0; i < elements.length; i++)
						if (callback.call(elements[i], i, elements[i]) === false) return elements
				} else {
					for (key in elements)
						if (callback.call(elements[key], key, elements[key]) === false) return elements
				}

				return elements
			}

			$.grep = function (elements, callback) {
				return filter.call(elements, callback)
			}

			if (window.JSON) $.parseJSON = JSON.parse

			// Populate the class2type map
			$.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
				class2type["[object " + name + "]"] = name.toLowerCase()
			})

			// Define methods that will be available on all
			// Zepto collections
			$.fn = {
				// Because a collection acts like an array
				// copy over these useful array functions.
				forEach: emptyArray.forEach,
				reduce: emptyArray.reduce,
				push: emptyArray.push,
				sort: emptyArray.sort,
				indexOf: emptyArray.indexOf,
				concat: emptyArray.concat,

				// `map` and `slice` in the jQuery API work differently
				// from their array counterparts
				map: function (fn) {
					return $($.map(this, function (el, i) {
						return fn.call(el, i, el)
					}))
				},
				slice: function () {
					return $(slice.apply(this, arguments))
				},

				ready: function (callback) {
					// need to check if document.body exists for IE as that browser reports
					// document ready when it hasn't yet created the body element
					if (readyRE.test(document.readyState) && document.body) callback($)
					else document.addEventListener('DOMContentLoaded', function () {
						callback($)
					}, false)
					return this
				},
				get: function (idx) {
					return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
				},
				toArray: function () {
					return this.get()
				},
				size: function () {
					return this.length
				},
				remove: function () {
					return this.each(function () {
						if (this.parentNode != null)
							this.parentNode.removeChild(this)
					})
				},
				each: function (callback) {
					emptyArray.every.call(this, function (el, idx) {
						return callback.call(el, idx, el) !== false
					})
					return this
				},
				filter: function (selector) {
					if (isFunction(selector)) return this.not(this.not(selector))
					return $(filter.call(this, function (element) {
						return zepto.matches(element, selector)
					}))
				},
				add: function (selector, context) {
					return $(uniq(this.concat($(selector, context))))
				},
				is: function (selector) {
					return this.length > 0 && zepto.matches(this[0], selector)
				},
				not: function (selector) {
					var nodes = []
					if (isFunction(selector) && selector.call !== undefined)
						this.each(function (idx) {
							if (!selector.call(this, idx)) nodes.push(this)
						})
					else {
						var excludes = typeof selector == 'string' ? this.filter(selector) :
							(likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
						this.forEach(function (el) {
							if (excludes.indexOf(el) < 0) nodes.push(el)
						})
					}
					return $(nodes)
				},
				has: function (selector) {
					return this.filter(function () {
						return isObject(selector) ?
							$.contains(this, selector) :
							$(this).find(selector).size()
					})
				},
				eq: function (idx) {
					return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1)
				},
				first: function () {
					var el = this[0]
					return el && !isObject(el) ? el : $(el)
				},
				last: function () {
					var el = this[this.length - 1]
					return el && !isObject(el) ? el : $(el)
				},
				find: function (selector) {
					var result, $this = this
					if (!selector) result = $()
					else if (typeof selector == 'object')
						result = $(selector).filter(function () {
							var node = this
							return emptyArray.some.call($this, function (parent) {
								return $.contains(parent, node)
							})
						})
					else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
					else result = this.map(function () {
							return zepto.qsa(this, selector)
						})
					return result
				},
				closest: function (selector, context) {
					var node = this[0], collection = false
					if (typeof selector == 'object') collection = $(selector)
					while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
						node = node !== context && !isDocument(node) && node.parentNode
					return $(node)
				},
				parents: function (selector) {
					var ancestors = [], nodes = this
					while (nodes.length > 0)
						nodes = $.map(nodes, function (node) {
							if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
								ancestors.push(node)
								return node
							}
						})
					return filtered(ancestors, selector)
				},
				parent: function (selector) {
					return filtered(uniq(this.pluck('parentNode')), selector)
				},
				children: function (selector) {
					return filtered(this.map(function () {
						return children(this)
					}), selector)
				},
				contents: function () {
					return this.map(function () {
						return slice.call(this.childNodes)
					})
				},
				siblings: function (selector) {
					return filtered(this.map(function (i, el) {
						return filter.call(children(el.parentNode), function (child) {
							return child !== el
						})
					}), selector)
				},
				empty: function () {
					return this.each(function () {
						this.innerHTML = ''
					})
				},
				// `pluck` is borrowed from Prototype.js
				pluck: function (property) {
					return $.map(this, function (el) {
						return el[property]
					})
				},
				show: function () {
					return this.each(function () {
						this.style.display == "none" && (this.style.display = '')
						if (getComputedStyle(this, '').getPropertyValue("display") == "none")
							this.style.display = defaultDisplay(this.nodeName)
					})
				},
				replaceWith: function (newContent) {
					return this.before(newContent).remove()
				},
				wrap: function (structure) {
					var func = isFunction(structure)
					if (this[0] && !func)
						var dom = $(structure).get(0),
							clone = dom.parentNode || this.length > 1

					return this.each(function (index) {
						$(this).wrapAll(
							func ? structure.call(this, index) :
								clone ? dom.cloneNode(true) : dom
						)
					})
				},
				wrapAll: function (structure) {
					if (this[0]) {
						$(this[0]).before(structure = $(structure))
						var children
						// drill down to the inmost element
						while ((children = structure.children()).length) structure = children.first()
						$(structure).append(this)
					}
					return this
				},
				wrapInner: function (structure) {
					var func = isFunction(structure)
					return this.each(function (index) {
						var self = $(this), contents = self.contents(),
							dom = func ? structure.call(this, index) : structure
						contents.length ? contents.wrapAll(dom) : self.append(dom)
					})
				},
				unwrap: function () {
					this.parent().each(function () {
						$(this).replaceWith($(this).children())
					})
					return this
				},
				clone: function () {
					return this.map(function () {
						return this.cloneNode(true)
					})
				},
				hide: function () {
					return this.css("display", "none")
				},
				toggle: function (setting) {
					return this.each(function () {
						var el = $(this)
							;
						(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
					})
				},
				prev: function (selector) {
					return $(this.pluck('previousElementSibling')).filter(selector || '*')
				},
				next: function (selector) {
					return $(this.pluck('nextElementSibling')).filter(selector || '*')
				},
				html: function (html) {
					return 0 in arguments ?
						this.each(function (idx) {
							var originHtml = this.innerHTML
							$(this).empty().append(funcArg(this, html, idx, originHtml))
						}) :
						(0 in this ? this[0].innerHTML : null)
				},
				text: function (text) {
					return 0 in arguments ?
						this.each(function (idx) {
							var newText = funcArg(this, text, idx, this.textContent)
							this.textContent = newText == null ? '' : '' + newText
						}) :
						(0 in this ? this[0].textContent : null)
				},
				attr: function (name, value) {
					var result
					return (typeof name == 'string' && !(1 in arguments)) ?
						(!this.length || this[0].nodeType !== 1 ? undefined :
								(!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
						) :
						this.each(function (idx) {
							if (this.nodeType !== 1) return
							if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
							else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
						})
				},
				removeAttr: function (name) {
					return this.each(function () {
						this.nodeType === 1 && name.split(' ').forEach(function (attribute) {
							setAttribute(this, attribute)
						}, this)
					})
				},
				prop: function (name, value) {
					name = propMap[name] || name
					return (1 in arguments) ?
						this.each(function (idx) {
							this[name] = funcArg(this, value, idx, this[name])
						}) :
						(this[0] && this[0][name])
				},
				data: function (name, value) {
					var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

					var data = (1 in arguments) ?
						this.attr(attrName, value) :
						this.attr(attrName)

					return data !== null ? deserializeValue(data) : undefined
				},
				val: function (value) {
					return 0 in arguments ?
						this.each(function (idx) {
							this.value = funcArg(this, value, idx, this.value)
						}) :
						(this[0] && (this[0].multiple ?
								$(this[0]).find('option').filter(function () {
									return this.selected
								}).pluck('value') :
								this[0].value)
						)
				},
				offset: function (coordinates) {
					if (coordinates) return this.each(function (index) {
						var $this = $(this),
							coords = funcArg(this, coordinates, index, $this.offset()),
							parentOffset = $this.offsetParent().offset(),
							props = {
								top: coords.top - parentOffset.top,
								left: coords.left - parentOffset.left
							}

						if ($this.css('position') == 'static') props['position'] = 'relative'
						$this.css(props)
					})
					if (!this.length) return null
					var obj = this[0].getBoundingClientRect()
					return {
						left: obj.left + window.pageXOffset,
						top: obj.top + window.pageYOffset,
						width: Math.round(obj.width),
						height: Math.round(obj.height)
					}
				},
				css: function (property, value) {
					if (arguments.length < 2) {
						var computedStyle, element = this[0]
						if (!element) return
						computedStyle = getComputedStyle(element, '')
						if (typeof property == 'string')
							return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
						else if (isArray(property)) {
							var props = {}
							$.each(property, function (_, prop) {
								props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
							})
							return props
						}
					}

					var css = ''
					if (type(property) == 'string') {
						if (!value && value !== 0)
							this.each(function () {
								this.style.removeProperty(dasherize(property))
							})
						else
							css = dasherize(property) + ":" + maybeAddPx(property, value)
					} else {
						for (key in property)
							if (!property[key] && property[key] !== 0)
								this.each(function () {
									this.style.removeProperty(dasherize(key))
								})
							else
								css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
					}

					return this.each(function () {
						this.style.cssText += ';' + css
					})
				},
				index: function (element) {
					return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
				},
				hasClass: function (name) {
					if (!name) return false
					return emptyArray.some.call(this, function (el) {
						return this.test(className(el))
					}, classRE(name))
				},
				addClass: function (name) {
					if (!name) return this
					return this.each(function (idx) {
						if (!('className' in this)) return
						classList = []
						var cls = className(this), newName = funcArg(this, name, idx, cls)
						newName.split(/\s+/g).forEach(function (klass) {
							if (!$(this).hasClass(klass)) classList.push(klass)
						}, this)
						classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
					})
				},
				removeClass: function (name) {
					return this.each(function (idx) {
						if (!('className' in this)) return
						if (name === undefined) return className(this, '')
						classList = className(this)
						funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {
							classList = classList.replace(classRE(klass), " ")
						})
						className(this, classList.trim())
					})
				},
				toggleClass: function (name, when) {
					if (!name) return this
					return this.each(function (idx) {
						var $this = $(this), names = funcArg(this, name, idx, className(this))
						names.split(/\s+/g).forEach(function (klass) {
							(when === undefined ? !$this.hasClass(klass) : when) ?
								$this.addClass(klass) : $this.removeClass(klass)
						})
					})
				},
				scrollTop: function (value) {
					if (!this.length) return
					var hasScrollTop = 'scrollTop' in this[0]
					if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
					return this.each(hasScrollTop ?
						function () {
							this.scrollTop = value
						} :
						function () {
							this.scrollTo(this.scrollX, value)
						})
				},
				scrollLeft: function (value) {
					if (!this.length) return
					var hasScrollLeft = 'scrollLeft' in this[0]
					if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
					return this.each(hasScrollLeft ?
						function () {
							this.scrollLeft = value
						} :
						function () {
							this.scrollTo(value, this.scrollY)
						})
				},
				position: function () {
					if (!this.length) return

					var elem = this[0],
					// Get *real* offsetParent
						offsetParent = this.offsetParent(),
					// Get correct offsets
						offset = this.offset(),
						parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? {top: 0, left: 0} : offsetParent.offset()

					// Subtract element margins
					// note: when an element has margin: auto the offsetLeft and marginLeft
					// are the same in Safari causing offset.left to incorrectly be 0
					offset.top -= parseFloat($(elem).css('margin-top')) || 0
					offset.left -= parseFloat($(elem).css('margin-left')) || 0

					// Add offsetParent borders
					parentOffset.top += parseFloat($(offsetParent[0]).css('border-top-width')) || 0
					parentOffset.left += parseFloat($(offsetParent[0]).css('border-left-width')) || 0

					// Subtract the two offsets
					return {
						top: offset.top - parentOffset.top,
						left: offset.left - parentOffset.left
					}
				},
				offsetParent: function () {
					return this.map(function () {
						var parent = this.offsetParent || document.body
						while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
							parent = parent.offsetParent
						return parent
					})
				}
			}

			// for now
			$.fn.detach = $.fn.remove

				// Generate the `width` and `height` functions
			;
			['width', 'height'].forEach(function (dimension) {
				var dimensionProperty =
					dimension.replace(/./, function (m) {
						return m[0].toUpperCase()
					})

				$.fn[dimension] = function (value) {
					var offset, el = this[0]
					if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
						isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
						(offset = this.offset()) && offset[dimension]
					else return this.each(function (idx) {
						el = $(this)
						el.css(dimension, funcArg(this, value, idx, el[dimension]()))
					})
				}
			})

			function traverseNode(node, fun) {
				fun(node)
				for (var i = 0, len = node.childNodes.length; i < len; i++)
					traverseNode(node.childNodes[i], fun)
			}

			// Generate the `after`, `prepend`, `before`, `append`,
			// `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
			adjacencyOperators.forEach(function (operator, operatorIndex) {
				var inside = operatorIndex % 2 //=> prepend, append

				$.fn[operator] = function () {
					// arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
					var argType, nodes = $.map(arguments, function (arg) {
							argType = type(arg)
							return argType == "object" || argType == "array" || arg == null ?
								arg : zepto.fragment(arg)
						}),
						parent, copyByClone = this.length > 1
					if (nodes.length < 1) return this

					return this.each(function (_, target) {
						parent = inside ? target : target.parentNode

						// convert all methods to a "before" operation
						target = operatorIndex == 0 ? target.nextSibling :
							operatorIndex == 1 ? target.firstChild :
								operatorIndex == 2 ? target :
									null

						var parentInDocument = $.contains(document.documentElement, parent)

						nodes.forEach(function (node) {
							if (copyByClone) node = node.cloneNode(true)
							else if (!parent) return $(node).remove()

							parent.insertBefore(node, target)
							if (parentInDocument) traverseNode(node, function (el) {
								if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
									(!el.type || el.type === 'text/javascript') && !el.src)
									window['eval'].call(window, el.innerHTML)
							})
						})
					})
				}

				// after    => insertAfter
				// prepend  => prependTo
				// before   => insertBefore
				// append   => appendTo
				$.fn[inside ? operator + 'To' : 'insert' + (operatorIndex ? 'Before' : 'After')] = function (html) {
					$(html)[operator](this)
					return this
				}
			})

			zepto.Z.prototype = $.fn

			// Export internal API functions in the `$.zepto` namespace
			zepto.uniq = uniq
			zepto.deserializeValue = deserializeValue
			$.zepto = zepto

			return $
		})()

		window.Zepto = Zepto
		window.$ === undefined && (window.$ = Zepto)

		;
		(function ($) {
			var _zid = 1, undefined,
				slice = Array.prototype.slice,
				isFunction = $.isFunction,
				isString = function (obj) {
					return typeof obj == 'string'
				},
				handlers = {},
				specialEvents = {},
				focusinSupported = 'onfocusin' in window,
				focus = {focus: 'focusin', blur: 'focusout'},
				hover = {mouseenter: 'mouseover', mouseleave: 'mouseout'}

			specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

			function zid(element) {
				return element._zid || (element._zid = _zid++)
			}

			function findHandlers(element, event, fn, selector) {
				event = parse(event)
				if (event.ns) var matcher = matcherFor(event.ns)
				return (handlers[zid(element)] || []).filter(function (handler) {
					return handler
						&& (!event.e || handler.e == event.e)
						&& (!event.ns || matcher.test(handler.ns))
						&& (!fn || zid(handler.fn) === zid(fn))
						&& (!selector || handler.sel == selector)
				})
			}

			function parse(event) {
				var parts = ('' + event).split('.')
				return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
			}

			function matcherFor(ns) {
				return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
			}

			function eventCapture(handler, captureSetting) {
				return handler.del &&
					(!focusinSupported && (handler.e in focus)) || !!captureSetting
			}

			function realEvent(type) {
				return hover[type] || (focusinSupported && focus[type]) || type
			}

			function add(element, events, fn, data, selector, delegator, capture) {
				var id = zid(element), set = (handlers[id] || (handlers[id] = []))
				events.split(/\s/).forEach(function (event) {
					if (event == 'ready') return $(document).ready(fn)
					var handler = parse(event)
					handler.fn = fn
					handler.sel = selector
					// emulate mouseenter, mouseleave
					if (handler.e in hover) fn = function (e) {
						var related = e.relatedTarget
						if (!related || (related !== this && !$.contains(this, related)))
							return handler.fn.apply(this, arguments)
					}
					handler.del = delegator
					var callback = delegator || fn
					handler.proxy = function (e) {
						e = compatible(e)
						if (e.isImmediatePropagationStopped()) return
						e.data = data
						var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
						if (result === false) e.preventDefault(), e.stopPropagation()
						return result
					}
					handler.i = set.length
					set.push(handler)
					if ('addEventListener' in element)
						element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
				})
			}

			function remove(element, events, fn, selector, capture) {
				var id = zid(element)
					;
				(events || '').split(/\s/).forEach(function (event) {
					findHandlers(element, event, fn, selector).forEach(function (handler) {
						delete handlers[id][handler.i]
						if ('removeEventListener' in element)
							element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
					})
				})
			}

			$.event = {add: add, remove: remove}

			$.proxy = function (fn, context) {
				var args = (2 in arguments) && slice.call(arguments, 2)
				if (isFunction(fn)) {
					var proxyFn = function () {
						return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments)
					}
					proxyFn._zid = zid(fn)
					return proxyFn
				} else if (isString(context)) {
					if (args) {
						args.unshift(fn[context], fn)
						return $.proxy.apply(null, args)
					} else {
						return $.proxy(fn[context], fn)
					}
				} else {
					throw new TypeError("expected function")
				}
			}

			$.fn.bind = function (event, data, callback) {
				return this.on(event, data, callback)
			}
			$.fn.unbind = function (event, callback) {
				return this.off(event, callback)
			}
			$.fn.one = function (event, selector, data, callback) {
				return this.on(event, selector, data, callback, 1)
			}

			var returnTrue = function () {
					return true
				},
				returnFalse = function () {
					return false
				},
				ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
				eventMethods = {
					preventDefault: 'isDefaultPrevented',
					stopImmediatePropagation: 'isImmediatePropagationStopped',
					stopPropagation: 'isPropagationStopped'
				}

			function compatible(event, source) {
				if (source || !event.isDefaultPrevented) {
					source || (source = event)

					$.each(eventMethods, function (name, predicate) {
						var sourceMethod = source[name]
						event[name] = function () {
							this[predicate] = returnTrue
							return sourceMethod && sourceMethod.apply(source, arguments)
						}
						event[predicate] = returnFalse
					})

					if (source.defaultPrevented !== undefined ? source.defaultPrevented :
							'returnValue' in source ? source.returnValue === false :
							source.getPreventDefault && source.getPreventDefault())
						event.isDefaultPrevented = returnTrue
				}
				return event
			}

			function createProxy(event) {
				var key, proxy = {originalEvent: event}
				for (key in event)
					if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

				return compatible(proxy, event)
			}

			$.fn.delegate = function (selector, event, callback) {
				return this.on(event, selector, callback)
			}
			$.fn.undelegate = function (selector, event, callback) {
				return this.off(event, selector, callback)
			}

			$.fn.live = function (event, callback) {
				$(document.body).delegate(this.selector, event, callback)
				return this
			}
			$.fn.die = function (event, callback) {
				$(document.body).undelegate(this.selector, event, callback)
				return this
			}

			$.fn.on = function (event, selector, data, callback, one) {
				var autoRemove, delegator, $this = this
				if (event && !isString(event)) {
					$.each(event, function (type, fn) {
						$this.on(type, selector, data, fn, one)
					})
					return $this
				}

				if (!isString(selector) && !isFunction(callback) && callback !== false)
					callback = data, data = selector, selector = undefined
				if (isFunction(data) || data === false)
					callback = data, data = undefined

				if (callback === false) callback = returnFalse

				return $this.each(function (_, element) {
					if (one) autoRemove = function (e) {
						remove(element, e.type, callback)
						return callback.apply(this, arguments)
					}

					if (selector) delegator = function (e) {
						var evt, match = $(e.target).closest(selector, element).get(0)
						if (match && match !== element) {
							evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
							return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
						}
					}

					add(element, event, callback, data, selector, delegator || autoRemove)
				})
			}
			$.fn.off = function (event, selector, callback) {
				var $this = this
				if (event && !isString(event)) {
					$.each(event, function (type, fn) {
						$this.off(type, selector, fn)
					})
					return $this
				}

				if (!isString(selector) && !isFunction(callback) && callback !== false)
					callback = selector, selector = undefined

				if (callback === false) callback = returnFalse

				return $this.each(function () {
					remove(this, event, callback, selector)
				})
			}

			$.fn.trigger = function (event, args) {
				event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
				event._args = args
				return this.each(function () {
					// handle focus(), blur() by calling them directly
					if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
					// items in the collection might not be DOM elements
					else if ('dispatchEvent' in this) this.dispatchEvent(event)
					else $(this).triggerHandler(event, args)
				})
			}

			// triggers event handlers on current element just as if an event occurred,
			// doesn't trigger an actual event, doesn't bubble
			$.fn.triggerHandler = function (event, args) {
				var e, result
				this.each(function (i, element) {
					e = createProxy(isString(event) ? $.Event(event) : event)
					e._args = args
					e.target = element
					$.each(findHandlers(element, event.type || event), function (i, handler) {
						result = handler.proxy(e)
						if (e.isImmediatePropagationStopped()) return false
					})
				})
				return result
			}

				// shortcut methods for `.bind(event, fn)` for each event type
			;
			('focusin focusout focus blur load resize scroll unload click dblclick ' +
			'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' +
			'change select keydown keypress keyup error').split(' ').forEach(function (event) {
				$.fn[event] = function (callback) {
					return (0 in arguments) ?
						this.bind(event, callback) :
						this.trigger(event)
				}
			})

			$.Event = function (type, props) {
				if (!isString(type)) props = type, type = props.type
				var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
				if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
				event.initEvent(type, bubbles, true)
				return compatible(event)
			}

		})(Zepto)

		;
		(function ($) {
			var jsonpID = 0,
				document = window.document,
				key,
				name,
				rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
				scriptTypeRE = /^(?:text|application)\/javascript/i,
				xmlTypeRE = /^(?:text|application)\/xml/i,
				jsonType = 'application/json',
				htmlType = 'text/html',
				blankRE = /^\s*$/,
				originAnchor = document.createElement('a')

			originAnchor.href = window.location.href

			// trigger a custom event and return false if it was cancelled
			function triggerAndReturn(context, eventName, data) {
				var event = $.Event(eventName)
				$(context).trigger(event, data)
				return !event.isDefaultPrevented()
			}

			// trigger an Ajax "global" event
			function triggerGlobal(settings, context, eventName, data) {
				if (settings.global) return triggerAndReturn(context || document, eventName, data)
			}

			// Number of active Ajax requests
			$.active = 0

			function ajaxStart(settings) {
				if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
			}

			function ajaxStop(settings) {
				if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
			}

			// triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
			function ajaxBeforeSend(xhr, settings) {
				var context = settings.context
				if (settings.beforeSend.call(context, xhr, settings) === false ||
					triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
					return false

				triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
			}

			function ajaxSuccess(data, xhr, settings, deferred) {
				var context = settings.context, status = 'success'
				settings.success.call(context, data, status, xhr)
				if (deferred) deferred.resolveWith(context, [data, status, xhr])
				triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
				ajaxComplete(status, xhr, settings)
			}

			// type: "timeout", "error", "abort", "parsererror"
			function ajaxError(error, type, xhr, settings, deferred) {
				var context = settings.context
				settings.error.call(context, xhr, type, error)
				if (deferred) deferred.rejectWith(context, [xhr, type, error])
				triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
				ajaxComplete(type, xhr, settings)
			}

			// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
			function ajaxComplete(status, xhr, settings) {
				var context = settings.context
				settings.complete.call(context, xhr, status)
				triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
				ajaxStop(settings)
			}

			// Empty function, used as default callback
			function empty() {
			}

			$.ajaxJSONP = function (options, deferred) {
				if (!('type' in options)) return $.ajax(options)

				var _callbackName = options.jsonpCallback,
					callbackName = ($.isFunction(_callbackName) ?
							_callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
					script = document.createElement('script'),
					originalCallback = window[callbackName],
					responseData,
					abort = function (errorType) {
						$(script).triggerHandler('error', errorType || 'abort')
					},
					xhr = {abort: abort}, abortTimeout

				if (deferred) deferred.promise(xhr)

				$(script).on('load error', function (e, errorType) {
					clearTimeout(abortTimeout)
					$(script).off().remove()

					if (e.type == 'error' || !responseData) {
						ajaxError(null, errorType || 'error', xhr, options, deferred)
					} else {
						ajaxSuccess(responseData[0], xhr, options, deferred)
					}

					window[callbackName] = originalCallback
					if (responseData && $.isFunction(originalCallback))
						originalCallback(responseData[0])

					originalCallback = responseData = undefined
				})

				if (ajaxBeforeSend(xhr, options) === false) {
					abort('abort')
					return xhr
				}

				window[callbackName] = function () {
					responseData = arguments
				}

				script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
				document.head.appendChild(script)

				if (options.timeout > 0) abortTimeout = setTimeout(function () {
					abort('timeout')
				}, options.timeout)

				return xhr
			}

			$.ajaxSettings = {
				// Default type of request
				type: 'GET',
				// Callback that is executed before request
				beforeSend: empty,
				// Callback that is executed if the request succeeds
				success: empty,
				// Callback that is executed the the server drops error
				error: empty,
				// Callback that is executed on request complete (both: error and success)
				complete: empty,
				// The context for the callbacks
				context: null,
				// Whether to trigger "global" Ajax events
				global: true,
				// Transport
				xhr: function () {
					return new window.XMLHttpRequest()
				},
				// MIME types mapping
				// IIS returns Javascript as "application/x-javascript"
				accepts: {
					script: 'text/javascript, application/javascript, application/x-javascript',
					json: jsonType,
					xml: 'application/xml, text/xml',
					html: htmlType,
					text: 'text/plain'
				},
				// Whether the request is to another domain
				crossDomain: false,
				// Default timeout
				timeout: 0,
				// Whether data should be serialized to string
				processData: true,
				// Whether the browser should be allowed to cache GET responses
				cache: true
			}

			function mimeToDataType(mime) {
				if (mime) mime = mime.split(';', 2)[0]
				return mime && ( mime == htmlType ? 'html' :
						mime == jsonType ? 'json' :
							scriptTypeRE.test(mime) ? 'script' :
							xmlTypeRE.test(mime) && 'xml' ) || 'text'
			}

			function appendQuery(url, query) {
				if (query == '') return url
				return (url + '&' + query).replace(/[&?]{1,2}/, '?')
			}

			// serialize payload and append it to the URL for GET requests
			function serializeData(options) {
				if (options.processData && options.data && $.type(options.data) != "string")
					options.data = $.param(options.data, options.traditional)
				if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
					options.url = appendQuery(options.url, options.data), options.data = undefined
			}

			$.ajax = function (options) {
				var settings = $.extend({}, options || {}),
					deferred = $.Deferred && $.Deferred(),
					urlAnchor
				for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

				ajaxStart(settings)

				if (!settings.crossDomain) {
					urlAnchor = document.createElement('a')
					urlAnchor.href = settings.url
					urlAnchor.href = urlAnchor.href
					settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
				}

				if (!settings.url) settings.url = window.location.toString()
				serializeData(settings)

				var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
				if (hasPlaceholder) dataType = 'jsonp'

				if (settings.cache === false || (
						(!options || options.cache !== true) &&
						('script' == dataType || 'jsonp' == dataType)
					))
					settings.url = appendQuery(settings.url, '_=' + Date.now())

				if ('jsonp' == dataType) {
					if (!hasPlaceholder)
						settings.url = appendQuery(settings.url,
							settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
					return $.ajaxJSONP(settings, deferred)
				}

				var mime = settings.accepts[dataType],
					headers = {},
					setHeader = function (name, value) {
						headers[name.toLowerCase()] = [name, value]
					},
					protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
					xhr = settings.xhr(),
					nativeSetHeader = xhr.setRequestHeader,
					abortTimeout

				if (deferred) deferred.promise(xhr)

				if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
				setHeader('Accept', mime || '*/*')
				if (mime = settings.mimeType || mime) {
					if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
					xhr.overrideMimeType && xhr.overrideMimeType(mime)
				}
				if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
					setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

				if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
				xhr.setRequestHeader = setHeader

				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
						xhr.onreadystatechange = empty
						clearTimeout(abortTimeout)
						var result, error = false
						if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
							dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
							result = xhr.responseText

							try {
								// http://perfectionkills.com/global-eval-what-are-the-options/
								if (dataType == 'script')    (1, eval)(result)
								else if (dataType == 'xml')  result = xhr.responseXML
								else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
							} catch (e) {
								error = e
							}

							if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
							else ajaxSuccess(result, xhr, settings, deferred)
						} else {
							ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
						}
					}
				}

				if (ajaxBeforeSend(xhr, settings) === false) {
					xhr.abort()
					ajaxError(null, 'abort', xhr, settings, deferred)
					return xhr
				}

				if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

				var async = 'async' in settings ? settings.async : true
				xhr.open(settings.type, settings.url, async, settings.username, settings.password)

				for (name in headers) nativeSetHeader.apply(xhr, headers[name])

				if (settings.timeout > 0) abortTimeout = setTimeout(function () {
					xhr.onreadystatechange = empty
					xhr.abort()
					ajaxError(null, 'timeout', xhr, settings, deferred)
				}, settings.timeout)

				// avoid sending empty string (#319)
				xhr.send(settings.data ? settings.data : null)
				return xhr
			}

			// handle optional data/success arguments
			function parseArguments(url, data, success, dataType) {
				if ($.isFunction(data)) dataType = success, success = data, data = undefined
				if (!$.isFunction(success)) dataType = success, success = undefined
				return {
					url: url
					, data: data
					, success: success
					, dataType: dataType
				}
			}

			$.get = function (/* url, data, success, dataType */) {
				return $.ajax(parseArguments.apply(null, arguments))
			}

			$.post = function (/* url, data, success, dataType */) {
				var options = parseArguments.apply(null, arguments)
				options.type = 'POST'
				return $.ajax(options)
			}

			$.getJSON = function (/* url, data, success */) {
				var options = parseArguments.apply(null, arguments)
				options.dataType = 'json'
				return $.ajax(options)
			}

			$.fn.load = function (url, data, success) {
				if (!this.length) return this
				var self = this, parts = url.split(/\s/), selector,
					options = parseArguments(url, data, success),
					callback = options.success
				if (parts.length > 1) options.url = parts[0], selector = parts[1]
				options.success = function (response) {
					self.html(selector ?
						$('<div>').html(response.replace(rscript, "")).find(selector)
						: response)
					callback && callback.apply(self, arguments)
				}
				$.ajax(options)
				return this
			}

			var escape = encodeURIComponent

			function serialize(params, obj, traditional, scope) {
				var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
				$.each(obj, function (key, value) {
					type = $.type(value)
					if (scope) key = traditional ? scope :
					scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
					// handle data in serializeArray() format
					if (!scope && array) params.add(value.name, value.value)
					// recurse into nested objects
					else if (type == "array" || (!traditional && type == "object"))
						serialize(params, value, traditional, key)
					else params.add(key, value)
				})
			}

			$.param = function (obj, traditional) {
				var params = []
				params.add = function (key, value) {
					if ($.isFunction(value)) value = value()
					if (value == null) value = ""
					this.push(escape(key) + '=' + escape(value))
				}
				serialize(params, obj, traditional)
				return params.join('&').replace(/%20/g, '+')
			}
		})(Zepto)

		;
		(function ($) {
			$.fn.serializeArray = function () {
				var name, type, result = [],
					add = function (value) {
						if (value.forEach) return value.forEach(add)
						result.push({name: name, value: value})
					}
				if (this[0]) $.each(this[0].elements, function (_, field) {
					type = field.type, name = field.name
					if (name && field.nodeName.toLowerCase() != 'fieldset' && !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
						((type != 'radio' && type != 'checkbox') || field.checked))
						add($(field).val())
				})
				return result
			}

			$.fn.serialize = function () {
				var result = []
				this.serializeArray().forEach(function (elm) {
					result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
				})
				return result.join('&')
			}

			$.fn.submit = function (callback) {
				if (0 in arguments) this.bind('submit', callback)
				else if (this.length) {
					var event = $.Event('submit')
					this.eq(0).trigger(event)
					if (!event.isDefaultPrevented()) this.get(0).submit()
				}
				return this
			}

		})(Zepto)

		;
		(function ($) {
			// __proto__ doesn't exist on IE<11, so redefine
			// the Z function to use object extension instead
			if (!('__proto__' in {})) {
				$.extend($.zepto, {
					Z: function (dom, selector) {
						dom = dom || []
						$.extend(dom, $.fn)
						dom.selector = selector || ''
						dom.__Z = true
						return dom
					},
					// this is a kludge but works
					isZ: function (object) {
						return $.type(object) === 'array' && '__Z' in object
					}
				})
			}

			// getComputedStyle shouldn't freak out when called
			// without a valid element as argument
			try {
				getComputedStyle(undefined)
			} catch (e) {
				var nativeGetComputedStyle = getComputedStyle;
				window.getComputedStyle = function (element) {
					try {
						return nativeGetComputedStyle(element)
					} catch (e) {
						return null
					}
				}
			}
		})(Zepto);

		return window.Zepto = Zepto;

	});




/***/ },
/* 2 */
/***/ function(module, exports) {

	//     Zepto.js
	//     (c) 2010-2015 Thomas Fuchs
	//     Zepto.js may be freely distributed under the MIT li

	(function($){
	    var touch = {},
	        touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
	        longTapDelay = 750,
	        gesture

	    function swipeDirection(x1, x2, y1, y2) {
	        return Math.abs(x1 - x2) >=
	        Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
	    }

	    function longTap() {
	        longTapTimeout = null
	        if (touch.last) {
	            touch.el.trigger('longTap')
	            touch = {}
	        }
	    }

	    function cancelLongTap() {
	        if (longTapTimeout) clearTimeout(longTapTimeout)
	        longTapTimeout = null
	    }

	    function cancelAll() {
	        if (touchTimeout) clearTimeout(touchTimeout)
	        if (tapTimeout) clearTimeout(tapTimeout)
	        if (swipeTimeout) clearTimeout(swipeTimeout)
	        if (longTapTimeout) clearTimeout(longTapTimeout)
	        touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
	        touch = {}
	    }

	    function isPrimaryTouch(event){
	        return (event.pointerType == 'touch' ||
	            event.pointerType == event.MSPOINTER_TYPE_TOUCH)
	            && event.isPrimary
	    }

	    function isPointerEventType(e, type){
	        return (e.type == 'pointer'+type ||
	        e.type.toLowerCase() == 'mspointer'+type)
	    }

	    $(function(){
	        var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

	        if ('MSGesture' in window) {
	            gesture = new MSGesture()
	            gesture.target = document.body
	        }

	        $(document)
	            .bind('MSGestureEnd', function(e){
	                var swipeDirectionFromVelocity =
	                    e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
	                if (swipeDirectionFromVelocity) {
	                    touch.el.trigger('swipe')
	                    touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
	                }
	            })
	            .on('touchstart MSPointerDown pointerdown', function(e){
	                if((_isPointerType = isPointerEventType(e, 'down')) &&
	                    !isPrimaryTouch(e)) return
	                firstTouch = _isPointerType ? e : e.touches[0]
	                if (e.touches && e.touches.length === 1 && touch.x2) {
	                    // Clear out touch movement data if we have it sticking around
	                    // This can occur if touchcancel doesn't fire due to preventDefault, etc.
	                    touch.x2 = undefined
	                    touch.y2 = undefined
	                }
	                now = Date.now()
	                delta = now - (touch.last || now)
	                touch.el = $('tagName' in firstTouch.target ?
	                    firstTouch.target : firstTouch.target.parentNode)
	                touchTimeout && clearTimeout(touchTimeout)
	                touch.x1 = firstTouch.pageX
	                touch.y1 = firstTouch.pageY
	                if (delta > 0 && delta <= 250) touch.isDoubleTap = true
	                touch.last = now
	                longTapTimeout = setTimeout(longTap, longTapDelay)
	                // adds the current touch contact for IE gesture recognition
	                if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
	            })
	            .on('touchmove MSPointerMove pointermove', function(e){
	                if((_isPointerType = isPointerEventType(e, 'move')) &&
	                    !isPrimaryTouch(e)) return
	                firstTouch = _isPointerType ? e : e.touches[0]
	                cancelLongTap()
	                touch.x2 = firstTouch.pageX
	                touch.y2 = firstTouch.pageY

	                deltaX += Math.abs(touch.x1 - touch.x2)
	                deltaY += Math.abs(touch.y1 - touch.y2)
	            })
	            .on('touchend MSPointerUp pointerup', function(e){
	                if((_isPointerType = isPointerEventType(e, 'up')) &&
	                    !isPrimaryTouch(e)) return
	                cancelLongTap()

	                // swipe
	                if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
	                    (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

	                    swipeTimeout = setTimeout(function() {
	                        touch.el.trigger('swipe')
	                        touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
	                        touch = {}
	                    }, 0)

	                // normal tap
	                else if ('last' in touch)
	                // don't fire tap when delta position changed by more than 30 pixels,
	                // for instance when moving to a point and back to origin
	                    if (deltaX < 30 && deltaY < 30) {
	                        // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
	                        // ('tap' fires before 'scroll')
	                        tapTimeout = setTimeout(function() {

	                            // trigger universal 'tap' with the option to cancelTouch()
	                            // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
	                            var event = $.Event('tap')
	                            event.cancelTouch = cancelAll
	                            touch.el.trigger(event)

	                            // trigger double tap immediately
	                            if (touch.isDoubleTap) {
	                                if (touch.el) touch.el.trigger('doubleTap')
	                                touch = {}
	                            }

	                            // trigger single tap after 250ms of inactivity
	                            else {
	                                touchTimeout = setTimeout(function(){
	                                    touchTimeout = null
	                                    if (touch.el) touch.el.trigger('singleTap')
	                                    touch = {}
	                                }, 250)
	                            }
	                        }, 0)
	                    } else {
	                        touch = {}
	                    }
	                deltaX = deltaY = 0

	            })
	            // when the browser window loses focus,
	            // for example when a modal dialog is shown,
	            // cancel all ongoing events
	            .on('touchcancel MSPointerCancel pointercancel', cancelAll)

	        // scrolling the window indicates intention of the user
	        // to scroll, not tap or swipe, so cancel all ongoing events
	        $(window).on('scroll', cancelAll)
	    })

	    ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
	        'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
	            $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
	        })
	})(Zepto);

	module.exports = Zepto;

/***/ },
/* 3 */
/***/ function(module, exports) {

	;(function (global, factory) {
		if (typeof module === "object" && typeof module.exports === "object") {
			module.exports = factory(global);
		} else {
			factory(global);
		}
	})(typeof window !== "undefined" ? window : this, function (window) {

		var chelunJSBridge = {
			callbackIndex: 0,
			callbackPrefix: '__MCL_CALLBACK_',
			schema: 'chelunJSBridge',
			invoke: function (namespace, api, param) {
				namespace = String(namespace);
				api = String(api);
				var url = this.schema + '://' + namespace + '/' + api;
				if (param && typeof param === 'object') {
					url += this._buildQuery(param);
				}

				this._sendRequest(url);
			},
			_buildQuery: function (param) {
				var seg = [], frag = '', uriSeg = '';
				for (var attr in param) {
					if (param.hasOwnProperty(attr)) {
						if (param[attr] && typeof param[attr] === 'function') {
							var callbackNo = this._createCallbackNo(param[attr]);
							if (attr === 'callback') {
								frag = '#' + callbackNo;
							} else {
								seg.push(encodeURIComponent(attr) + '=' + callbackNo);
							}

						} else {
							var paramValue = String(param[attr]);
							seg.push(encodeURIComponent(attr) + '=' + encodeURIComponent(paramValue));
						}
					}
				}

				seg.length && (uriSeg += '?' + seg.join('&'));
				return uriSeg += frag;

			},
			//生成回调号
			_createCallbackNo: function (fn) {
				var callbackNo = this.callbackIndex;
				window[this.callbackPrefix + callbackNo] = fn;
				this.callbackIndex += 1;
				return callbackNo;
			},
			//发送客户端调用请求
			_sendRequest: function (uri) {
				var i = document.createElement('iframe');
				i.style.display = 'none';
				i.onload = function () {
					i.parentNode.removeChild(i);
				};
				i.src = uri;
				document.body.appendChild(i);
			}
		};

		return window.chelunJSBridge = chelunJSBridge;

	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	;(function (global, factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        module.exports = factory(global, __webpack_require__(3));
	    } else {
	        factory(global);
	    }
	})(typeof window !== "undefined" ? window : this, function (window) {
	    var _const = {
	        SHOW_MENU : 'CHELUN_SHOW_OPTION_MENU',//是否显示右上角菜单按钮
	        MENU_ITEMS: 'CHELUN_SHOW_MENU_ITEMS',//显示的功能按钮列表
	        SHARE_CLMESSAGE : 'HELUN_SHARE_DATA_CLMESSAGE',//车轮车友分享内容
	        SHARE_WXTIMELIN : 'CHELUN_SHARE_DATA_WXTIMELINE',//微信朋友圈分享内容
	        SHARE_WXMESSAGE : 'CHELUN_SHARE_DATA_WXMESSAGE',//微信朋友分享内容
	        SHARE_QQ : 'CHELUN_SHARE_DATA_QQ',//QQ好友分享内容
	        SHARE_SINA : 'CHELUN_SHARE_DATA_SINA',//新浪微博分享内容
	        SHARE_SMS : 'CHELUN_SHARE_DATA_SMS',//发短信内容
	        CUSTOM_CONFIG : 'CHELUN_CUSTOM_CONFIG',//自定义配置
	        DISSYS_URLLIST : 'CHELUN_DISSYS_URLLIST' //禁止拼系统参数的url配置列表
	    };
	    var _api = {
	        consts : _const,
	        getua : function(){//获取ua信息
	            var _ua = navigator.userAgent;
	            if (_ua.indexOf('ChelunWelfare') > -1) {
	                return 'ChelunWelfare';
	            };

	            if (_ua.indexOf('Chelun') > -1) {
	                return 'Chelun';
	            };

	            if (_ua.match(/MicroMessenger/i) == 'micromessenger') {
	                return 'weixin';
	            };

	            return 'others : ' + _ua;
	        },
	        cookie: function(name) {//设置或根据名字获取cookie
	            var ck = document.cookie;
	            if(!ck) {//当前浏览器不支持cookie
	                return '';
	            }
	            var values = ck.split(';');
	            var length = values.length;
	            var attr = {};
	            var value, value_attr;
	            for(var i=0; i < length; i++) {
	                value = values[i];
	                value_attr = value.split('=');
	                value_attr[0] = value_attr[0].replace(/^\s+|\s+$/,"");
	                attr[value_attr[0]] = value_attr[1];
	            }

	            if(arguments.length == 1) {
	                return attr[name] !== undefined ? attr[name] : '';
	            }
	            return attr;
	        },
	        hideMenu: function(){//隐藏右上角菜单
	            window[this.consts.SHOW_MENU] = 0;
	        },
	        showMenu: function(){//显示右上角菜单
	            window[this.consts.SHOW_MENU] = 1;
	        },
	        setMenu:function(args, action){//添加显示的按钮
	            var menu = this.consts.MENU_ITEMS;
	            window[menu] = window[menu] || [];
	            //判断是数组，不是数组就直接返回
	            if(args && Object.prototype.toString.call(args) !== '[object Array]') {
	                return window[menu];
	            }
	            switch (action) {
	                case 1://添加
	                    args.forEach(function(arg) {
	                        if(window[menu].indexOf(arg) >= 0) {
	                                return;
	                        }
	                        window[menu].push(arg);
	                    });

	                    break;
	                case 2://移除
	                    args.forEach(function(arg) {
	                        var position = window[menu].indexOf(arg);
	                        if(position >= 0) {
	                            window[menu].splice(position, 1);
	                        }
	                    });
	                    break;
	                default:
	                    window[menu] = args;
	            }
	            return window[menu];
	        },
	        setShareClMessage: function(attrs) {//设置车轮车友分享
	            window[this.consts.SHARE_CLMESSAGE] = attrs;
	        },
	        setShareWxTimeline: function(attrs) {//设置微信朋友圈分享
	            window[this.consts.SHARE_WXTIMELIN] = attrs;
	        },
	        setShareWxMessage: function(attrs) {//设置微信好友分享
	            window[this.consts.SHARE_WXMESSAGE] = attrs;
	        },
	        setShareQQ: function(attrs) {//设置QQ分享
	            window[this.consts.SHARE_QQ] = attrs;
	        },
	        setShareSina: function(attrs) {//设置新浪微博分享
	            window[this.consts.SHARE_SINA] = attrs;
	        },
	        setShareSms: function(attrs) {//设置短信分享
	            window[this.consts.SHARE_SMS] = attrs;
	        },
	        setCustomConfig: function(attrs) {//设置自定义配置
	            window[this.consts.CUSTOM_CONFIG] = attrs;
	        },
	        setDissysUrlList: function(urls) {//设置禁止拼系统参数的url配置列表 传入数组
	            window[this.consts.DISSYS_URLLIST] = urls;
	        }
	    };
	    return window.chelunApi = _api;
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Swiper 2.7.6
	 * Mobile touch slider and framework with hardware accelerated transitions
	 *
	 * http://www.idangero.us/sliders/swiper/
	 *
	 * Copyright 2010-2015, Vladimir Kharlampidi
	 * The iDangero.us
	 * http://www.idangero.us/
	 *
	 * Licensed under GPL & MIT
	 *
	 * Released on: February 11, 2015
	*/
	var Swiper = function (selector, params) {
	    'use strict';

	    /*=========================
	      A little bit dirty but required part for IE8 and old FF support
	      ===========================*/
	    if (!document.body.outerHTML && document.body.__defineGetter__) {
	        if (HTMLElement) {
	            var element = HTMLElement.prototype;
	            if (element.__defineGetter__) {
	                element.__defineGetter__('outerHTML', function () { return new XMLSerializer().serializeToString(this); });
	            }
	        }
	    }

	    if (!window.getComputedStyle) {
	        window.getComputedStyle = function (el, pseudo) {
	            this.el = el;
	            this.getPropertyValue = function (prop) {
	                var re = /(\-([a-z]){1})/g;
	                if (prop === 'float') prop = 'styleFloat';
	                if (re.test(prop)) {
	                    prop = prop.replace(re, function () {
	                        return arguments[2].toUpperCase();
	                    });
	                }
	                return el.currentStyle[prop] ? el.currentStyle[prop] : null;
	            };
	            return this;
	        };
	    }
	    if (!Array.prototype.indexOf) {
	        Array.prototype.indexOf = function (obj, start) {
	            for (var i = (start || 0), j = this.length; i < j; i++) {
	                if (this[i] === obj) { return i; }
	            }
	            return -1;
	        };
	    }
	    if (!document.querySelectorAll) {
	        if (!window.jQuery) return;
	    }
	    function $$(selector, context) {
	        if (document.querySelectorAll)
	            return (context || document).querySelectorAll(selector);
	        else
	            return jQuery(selector, context);
	    }

	    /*=========================
	      Check for correct selector
	      ===========================*/
	    if (typeof selector === 'undefined') return;

	    if (!(selector.nodeType)) {
	        if ($$(selector).length === 0) return;
	    }

	     /*=========================
	      _this
	      ===========================*/
	    var _this = this;

	     /*=========================
	      Default Flags and vars
	      ===========================*/
	    _this.touches = {
	        start: 0,
	        startX: 0,
	        startY: 0,
	        current: 0,
	        currentX: 0,
	        currentY: 0,
	        diff: 0,
	        abs: 0
	    };
	    _this.positions = {
	        start: 0,
	        abs: 0,
	        diff: 0,
	        current: 0
	    };
	    _this.times = {
	        start: 0,
	        end: 0
	    };

	    _this.id = (new Date()).getTime();
	    _this.container = (selector.nodeType) ? selector : $$(selector)[0];
	    _this.isTouched = false;
	    _this.isMoved = false;
	    _this.activeIndex = 0;
	    _this.centerIndex = 0;
	    _this.activeLoaderIndex = 0;
	    _this.activeLoopIndex = 0;
	    _this.previousIndex = null;
	    _this.velocity = 0;
	    _this.snapGrid = [];
	    _this.slidesGrid = [];
	    _this.imagesToLoad = [];
	    _this.imagesLoaded = 0;
	    _this.wrapperLeft = 0;
	    _this.wrapperRight = 0;
	    _this.wrapperTop = 0;
	    _this.wrapperBottom = 0;
	    _this.isAndroid = navigator.userAgent.toLowerCase().indexOf('android') >= 0;
	    var wrapper, slideSize, wrapperSize, direction, isScrolling, containerSize;

	    /*=========================
	      Default Parameters
	      ===========================*/
	    var defaults = {
	        eventTarget: 'wrapper', // or 'container'
	        mode : 'horizontal', // or 'vertical'
	        touchRatio : 1,
	        speed : 300,
	        freeMode : false,
	        freeModeFluid : false,
	        momentumRatio: 1,
	        momentumBounce: true,
	        momentumBounceRatio: 1,
	        slidesPerView : 1,
	        slidesPerGroup : 1,
	        slidesPerViewFit: true, //Fit to slide when spv "auto" and slides larger than container
	        simulateTouch : true,
	        followFinger : true,
	        shortSwipes : true,
	        longSwipesRatio: 0.5,
	        moveStartThreshold: false,
	        onlyExternal : false,
	        createPagination : true,
	        pagination : false,
	        paginationElement: 'span',
	        paginationClickable: false,
	        paginationAsRange: true,
	        resistance : true, // or false or 100%
	        scrollContainer : false,
	        preventLinks : true,
	        preventLinksPropagation: false,
	        noSwiping : false, // or class
	        noSwipingClass : 'swiper-no-swiping', //:)
	        initialSlide: 0,
	        keyboardControl: false,
	        mousewheelControl : false,
	        mousewheelControlForceToAxis : false,
	        useCSS3Transforms : true,
	        // Autoplay
	        autoplay: false,
	        autoplayDisableOnInteraction: true,
	        autoplayStopOnLast: false,
	        //Loop mode
	        loop: false,
	        loopAdditionalSlides: 0,
	        // Round length values
	        roundLengths: false,
	        //Auto Height
	        calculateHeight: false,
	        //Apply CSS for width and/or height
	        cssWidthAndHeight: false, // or true or 'width' or 'height'
	        //Images Preloader
	        updateOnImagesReady : true,
	        //Form elements
	        releaseFormElements : true,
	        //Watch for active slide, useful when use effects on different slide states
	        watchActiveIndex: false,
	        //Slides Visibility Fit
	        visibilityFullFit : false,
	        //Slides Offset
	        offsetPxBefore : 0,
	        offsetPxAfter : 0,
	        offsetSlidesBefore : 0,
	        offsetSlidesAfter : 0,
	        centeredSlides: false,
	        //Queue callbacks
	        queueStartCallbacks : false,
	        queueEndCallbacks : false,
	        //Auto Resize
	        autoResize : true,
	        resizeReInit : false,
	        //DOMAnimation
	        DOMAnimation : true,
	        //Slides Loader
	        loader: {
	            slides: [], //array with slides
	            slidesHTMLType: 'inner', // or 'outer'
	            surroundGroups: 1, //keep preloaded slides groups around view
	            logic: 'reload', //or 'change'
	            loadAllSlides: false
	        },
	        // One way swipes
	        swipeToPrev: true,
	        swipeToNext: true,
	        //Namespace
	        slideElement: 'div',
	        slideClass: 'swiper-slide',
	        slideActiveClass: 'swiper-slide-active',
	        slideVisibleClass: 'swiper-slide-visible',
	        slideDuplicateClass: 'swiper-slide-duplicate',
	        wrapperClass: 'swiper-wrapper',
	        paginationElementClass: 'swiper-pagination-switch',
	        paginationActiveClass: 'swiper-active-switch',
	        paginationVisibleClass: 'swiper-visible-switch'
	    };
	    params = params || {};
	    for (var prop in defaults) {
	        if (prop in params && typeof params[prop] === 'object') {
	            for (var subProp in defaults[prop]) {
	                if (! (subProp in params[prop])) {
	                    params[prop][subProp] = defaults[prop][subProp];
	                }
	            }
	        }
	        else if (! (prop in params)) {
	            params[prop] = defaults[prop];
	        }
	    }
	    _this.params = params;
	    if (params.scrollContainer) {
	        params.freeMode = true;
	        params.freeModeFluid = true;
	    }
	    if (params.loop) {
	        params.resistance = '100%';
	    }
	    var isH = params.mode === 'horizontal';

	    /*=========================
	      Define Touch Events
	      ===========================*/
	    var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
	    if (_this.browser.ie10) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
	    if (_this.browser.ie11) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];

	    _this.touchEvents = {
	        touchStart : _this.support.touch || !params.simulateTouch  ? 'touchstart' : desktopEvents[0],
	        touchMove : _this.support.touch || !params.simulateTouch ? 'touchmove' : desktopEvents[1],
	        touchEnd : _this.support.touch || !params.simulateTouch ? 'touchend' : desktopEvents[2]
	    };

	    /*=========================
	      Wrapper
	      ===========================*/
	    for (var i = _this.container.childNodes.length - 1; i >= 0; i--) {
	        if (_this.container.childNodes[i].className) {
	            var _wrapperClasses = _this.container.childNodes[i].className.split(/\s+/);
	            for (var j = 0; j < _wrapperClasses.length; j++) {
	                if (_wrapperClasses[j] === params.wrapperClass) {
	                    wrapper = _this.container.childNodes[i];
	                }
	            }
	        }
	    }

	    _this.wrapper = wrapper;
	    /*=========================
	      Slide API
	      ===========================*/
	    _this._extendSwiperSlide = function  (el) {
	        el.append = function () {
	            if (params.loop) {
	                el.insertAfter(_this.slides.length - _this.loopedSlides);
	            }
	            else {
	                _this.wrapper.appendChild(el);
	                _this.reInit();
	            }

	            return el;
	        };
	        el.prepend = function () {
	            if (params.loop) {
	                _this.wrapper.insertBefore(el, _this.slides[_this.loopedSlides]);
	                _this.removeLoopedSlides();
	                _this.calcSlides();
	                _this.createLoop();
	            }
	            else {
	                _this.wrapper.insertBefore(el, _this.wrapper.firstChild);
	            }
	            _this.reInit();
	            return el;
	        };
	        el.insertAfter = function (index) {
	            if (typeof index === 'undefined') return false;
	            var beforeSlide;

	            if (params.loop) {
	                beforeSlide = _this.slides[index + 1 + _this.loopedSlides];
	                if (beforeSlide) {
	                    _this.wrapper.insertBefore(el, beforeSlide);
	                }
	                else {
	                    _this.wrapper.appendChild(el);
	                }
	                _this.removeLoopedSlides();
	                _this.calcSlides();
	                _this.createLoop();
	            }
	            else {
	                beforeSlide = _this.slides[index + 1];
	                _this.wrapper.insertBefore(el, beforeSlide);
	            }
	            _this.reInit();
	            return el;
	        };
	        el.clone = function () {
	            return _this._extendSwiperSlide(el.cloneNode(true));
	        };
	        el.remove = function () {
	            _this.wrapper.removeChild(el);
	            _this.reInit();
	        };
	        el.html = function (html) {
	            if (typeof html === 'undefined') {
	                return el.innerHTML;
	            }
	            else {
	                el.innerHTML = html;
	                return el;
	            }
	        };
	        el.index = function () {
	            var index;
	            for (var i = _this.slides.length - 1; i >= 0; i--) {
	                if (el === _this.slides[i]) index = i;
	            }
	            return index;
	        };
	        el.isActive = function () {
	            if (el.index() === _this.activeIndex) return true;
	            else return false;
	        };
	        if (!el.swiperSlideDataStorage) el.swiperSlideDataStorage = {};
	        el.getData = function (name) {
	            return el.swiperSlideDataStorage[name];
	        };
	        el.setData = function (name, value) {
	            el.swiperSlideDataStorage[name] = value;
	            return el;
	        };
	        el.data = function (name, value) {
	            if (typeof value === 'undefined') {
	                return el.getAttribute('data-' + name);
	            }
	            else {
	                el.setAttribute('data-' + name, value);
	                return el;
	            }
	        };
	        el.getWidth = function (outer, round) {
	            return _this.h.getWidth(el, outer, round);
	        };
	        el.getHeight = function (outer, round) {
	            return _this.h.getHeight(el, outer, round);
	        };
	        el.getOffset = function () {
	            return _this.h.getOffset(el);
	        };
	        return el;
	    };

	    //Calculate information about number of slides
	    _this.calcSlides = function (forceCalcSlides) {
	        var oldNumber = _this.slides ? _this.slides.length : false;
	        _this.slides = [];
	        _this.displaySlides = [];
	        for (var i = 0; i < _this.wrapper.childNodes.length; i++) {
	            if (_this.wrapper.childNodes[i].className) {
	                var _className = _this.wrapper.childNodes[i].className;
	                var _slideClasses = _className.split(/\s+/);
	                for (var j = 0; j < _slideClasses.length; j++) {
	                    if (_slideClasses[j] === params.slideClass) {
	                        _this.slides.push(_this.wrapper.childNodes[i]);
	                    }
	                }
	            }
	        }
	        for (i = _this.slides.length - 1; i >= 0; i--) {
	            _this._extendSwiperSlide(_this.slides[i]);
	        }
	        if (oldNumber === false) return;
	        if (oldNumber !== _this.slides.length || forceCalcSlides) {

	            // Number of slides has been changed
	            removeSlideEvents();
	            addSlideEvents();
	            _this.updateActiveSlide();
	            if (_this.params.pagination) _this.createPagination();
	            _this.callPlugins('numberOfSlidesChanged');
	        }
	    };

	    //Create Slide
	    _this.createSlide = function (html, slideClassList, el) {
	        slideClassList = slideClassList || _this.params.slideClass;
	        el = el || params.slideElement;
	        var newSlide = document.createElement(el);
	        newSlide.innerHTML = html || '';
	        newSlide.className = slideClassList;
	        return _this._extendSwiperSlide(newSlide);
	    };

	    //Append Slide
	    _this.appendSlide = function (html, slideClassList, el) {
	        if (!html) return;
	        if (html.nodeType) {
	            return _this._extendSwiperSlide(html).append();
	        }
	        else {
	            return _this.createSlide(html, slideClassList, el).append();
	        }
	    };
	    _this.prependSlide = function (html, slideClassList, el) {
	        if (!html) return;
	        if (html.nodeType) {
	            return _this._extendSwiperSlide(html).prepend();
	        }
	        else {
	            return _this.createSlide(html, slideClassList, el).prepend();
	        }
	    };
	    _this.insertSlideAfter = function (index, html, slideClassList, el) {
	        if (typeof index === 'undefined') return false;
	        if (html.nodeType) {
	            return _this._extendSwiperSlide(html).insertAfter(index);
	        }
	        else {
	            return _this.createSlide(html, slideClassList, el).insertAfter(index);
	        }
	    };
	    _this.removeSlide = function (index) {
	        if (_this.slides[index]) {
	            if (params.loop) {
	                if (!_this.slides[index + _this.loopedSlides]) return false;
	                _this.slides[index + _this.loopedSlides].remove();
	                _this.removeLoopedSlides();
	                _this.calcSlides();
	                _this.createLoop();
	            }
	            else _this.slides[index].remove();
	            return true;
	        }
	        else return false;
	    };
	    _this.removeLastSlide = function () {
	        if (_this.slides.length > 0) {
	            if (params.loop) {
	                _this.slides[_this.slides.length - 1 - _this.loopedSlides].remove();
	                _this.removeLoopedSlides();
	                _this.calcSlides();
	                _this.createLoop();
	            }
	            else _this.slides[_this.slides.length - 1].remove();
	            return true;
	        }
	        else {
	            return false;
	        }
	    };
	    _this.removeAllSlides = function () {
	        var num = _this.slides.length;
	        for (var i = _this.slides.length - 1; i >= 0; i--) {
	            _this.slides[i].remove();
	            if (i === num - 1) {
	                _this.setWrapperTranslate(0);
	            }
	        }
	    };
	    _this.getSlide = function (index) {
	        return _this.slides[index];
	    };
	    _this.getLastSlide = function () {
	        return _this.slides[_this.slides.length - 1];
	    };
	    _this.getFirstSlide = function () {
	        return _this.slides[0];
	    };

	    //Currently Active Slide
	    _this.activeSlide = function () {
	        return _this.slides[_this.activeIndex];
	    };

	    /*=========================
	     Wrapper for Callbacks : Allows additive callbacks via function arrays
	     ===========================*/
	    _this.fireCallback = function () {
	        var callback = arguments[0];
	        if (Object.prototype.toString.call(callback) === '[object Array]') {
	            for (var i = 0; i < callback.length; i++) {
	                if (typeof callback[i] === 'function') {
	                    callback[i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	                }
	            }
	        } else if (Object.prototype.toString.call(callback) === '[object String]') {
	            if (params['on' + callback]) _this.fireCallback(params['on' + callback], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	        } else {
	            callback(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	        }
	    };
	    function isArray(obj) {
	        if (Object.prototype.toString.apply(obj) === '[object Array]') return true;
	        return false;
	    }

	    /**
	     * Allows user to add callbacks, rather than replace them
	     * @param callback
	     * @param func
	     * @return {*}
	     */
	    _this.addCallback = function (callback, func) {
	        var _this = this, tempFunc;
	        if (_this.params['on' + callback]) {
	            if (isArray(this.params['on' + callback])) {
	                return this.params['on' + callback].push(func);
	            } else if (typeof this.params['on' + callback] === 'function') {
	                tempFunc = this.params['on' + callback];
	                this.params['on' + callback] = [];
	                this.params['on' + callback].push(tempFunc);
	                return this.params['on' + callback].push(func);
	            }
	        } else {
	            this.params['on' + callback] = [];
	            return this.params['on' + callback].push(func);
	        }
	    };
	    _this.removeCallbacks = function (callback) {
	        if (_this.params['on' + callback]) {
	            _this.params['on' + callback] = null;
	        }
	    };

	    /*=========================
	      Plugins API
	      ===========================*/
	    var _plugins = [];
	    for (var plugin in _this.plugins) {
	        if (params[plugin]) {
	            var p = _this.plugins[plugin](_this, params[plugin]);
	            if (p) _plugins.push(p);
	        }
	    }
	    _this.callPlugins = function (method, args) {
	        if (!args) args = {};
	        for (var i = 0; i < _plugins.length; i++) {
	            if (method in _plugins[i]) {
	                _plugins[i][method](args);
	            }
	        }
	    };

	    /*=========================
	      Windows Phone 8 Fix
	      ===========================*/
	    if ((_this.browser.ie10 || _this.browser.ie11) && !params.onlyExternal) {
	        _this.wrapper.classList.add('swiper-wp8-' + (isH ? 'horizontal' : 'vertical'));
	    }

	    /*=========================
	      Free Mode Class
	      ===========================*/
	    if (params.freeMode) {
	        _this.container.className += ' swiper-free-mode';
	    }

	    /*==================================================
	        Init/Re-init/Resize Fix
	    ====================================================*/
	    _this.initialized = false;
	    _this.init = function (force, forceCalcSlides) {
	        var _width = _this.h.getWidth(_this.container, false, params.roundLengths);
	        var _height = _this.h.getHeight(_this.container, false, params.roundLengths);
	        if (_width === _this.width && _height === _this.height && !force) return;

	        _this.width = _width;
	        _this.height = _height;

	        var slideWidth, slideHeight, slideMaxHeight, wrapperWidth, wrapperHeight, slideLeft;
	        var i; // loop index variable to avoid JSHint W004 / W038
	        containerSize = isH ? _width : _height;
	        var wrapper = _this.wrapper;

	        if (force) {
	            _this.calcSlides(forceCalcSlides);
	        }

	        if (params.slidesPerView === 'auto') {
	            //Auto mode
	            var slidesWidth = 0;
	            var slidesHeight = 0;

	            //Unset Styles
	            if (params.slidesOffset > 0) {
	                wrapper.style.paddingLeft = '';
	                wrapper.style.paddingRight = '';
	                wrapper.style.paddingTop = '';
	                wrapper.style.paddingBottom = '';
	            }
	            wrapper.style.width = '';
	            wrapper.style.height = '';
	            if (params.offsetPxBefore > 0) {
	                if (isH) _this.wrapperLeft = params.offsetPxBefore;
	                else _this.wrapperTop = params.offsetPxBefore;
	            }
	            if (params.offsetPxAfter > 0) {
	                if (isH) _this.wrapperRight = params.offsetPxAfter;
	                else _this.wrapperBottom = params.offsetPxAfter;
	            }

	            if (params.centeredSlides) {
	                if (isH) {
	                    _this.wrapperLeft = (containerSize - this.slides[0].getWidth(true, params.roundLengths)) / 2;
	                    _this.wrapperRight = (containerSize - _this.slides[_this.slides.length - 1].getWidth(true, params.roundLengths)) / 2;
	                }
	                else {
	                    _this.wrapperTop = (containerSize - _this.slides[0].getHeight(true, params.roundLengths)) / 2;
	                    _this.wrapperBottom = (containerSize - _this.slides[_this.slides.length - 1].getHeight(true, params.roundLengths)) / 2;
	                }
	            }

	            if (isH) {
	                if (_this.wrapperLeft >= 0) wrapper.style.paddingLeft = _this.wrapperLeft + 'px';
	                if (_this.wrapperRight >= 0) wrapper.style.paddingRight = _this.wrapperRight + 'px';
	            }
	            else {
	                if (_this.wrapperTop >= 0) wrapper.style.paddingTop = _this.wrapperTop + 'px';
	                if (_this.wrapperBottom >= 0) wrapper.style.paddingBottom = _this.wrapperBottom + 'px';
	            }
	            slideLeft = 0;
	            var centeredSlideLeft = 0;
	            _this.snapGrid = [];
	            _this.slidesGrid = [];

	            slideMaxHeight = 0;
	            for (i = 0; i < _this.slides.length; i++) {
	                slideWidth = _this.slides[i].getWidth(true, params.roundLengths);
	                slideHeight = _this.slides[i].getHeight(true, params.roundLengths);
	                if (params.calculateHeight) {
	                    slideMaxHeight = Math.max(slideMaxHeight, slideHeight);
	                }
	                var _slideSize = isH ? slideWidth : slideHeight;
	                if (params.centeredSlides) {
	                    var nextSlideWidth = i === _this.slides.length - 1 ? 0 : _this.slides[i + 1].getWidth(true, params.roundLengths);
	                    var nextSlideHeight = i === _this.slides.length - 1 ? 0 : _this.slides[i + 1].getHeight(true, params.roundLengths);
	                    var nextSlideSize = isH ? nextSlideWidth : nextSlideHeight;
	                    if (_slideSize > containerSize) {
	                        if (params.slidesPerViewFit) {
	                            _this.snapGrid.push(slideLeft + _this.wrapperLeft);
	                            _this.snapGrid.push(slideLeft + _slideSize - containerSize + _this.wrapperLeft);
	                        }
	                        else {
	                            for (var j = 0; j <= Math.floor(_slideSize / (containerSize + _this.wrapperLeft)); j++) {
	                                if (j === 0) _this.snapGrid.push(slideLeft + _this.wrapperLeft);
	                                else _this.snapGrid.push(slideLeft + _this.wrapperLeft + containerSize * j);
	                            }
	                        }
	                        _this.slidesGrid.push(slideLeft + _this.wrapperLeft);
	                    }
	                    else {
	                        _this.snapGrid.push(centeredSlideLeft);
	                        _this.slidesGrid.push(centeredSlideLeft);
	                    }
	                    centeredSlideLeft += _slideSize / 2 + nextSlideSize / 2;
	                }
	                else {
	                    if (_slideSize > containerSize) {
	                        if (params.slidesPerViewFit) {
	                            _this.snapGrid.push(slideLeft);
	                            _this.snapGrid.push(slideLeft + _slideSize - containerSize);
	                        }
	                        else {
	                            if (containerSize !== 0) {
	                                for (var k = 0; k <= Math.floor(_slideSize / containerSize); k++) {
	                                    _this.snapGrid.push(slideLeft + containerSize * k);
	                                }
	                            }
	                            else {
	                                _this.snapGrid.push(slideLeft);
	                            }
	                        }

	                    }
	                    else {
	                        _this.snapGrid.push(slideLeft);
	                    }
	                    _this.slidesGrid.push(slideLeft);
	                }

	                slideLeft += _slideSize;

	                slidesWidth += slideWidth;
	                slidesHeight += slideHeight;
	            }
	            if (params.calculateHeight) _this.height = slideMaxHeight;
	            if (isH) {
	                wrapperSize = slidesWidth + _this.wrapperRight + _this.wrapperLeft;
	                if (!params.cssWidthAndHeight || params.cssWidthAndHeight === 'height') {
	                    wrapper.style.width = (slidesWidth) + 'px';
	                }
	                if (!params.cssWidthAndHeight || params.cssWidthAndHeight === 'width') {
	                    wrapper.style.height = (_this.height) + 'px';
	                }
	            }
	            else {
	                if (!params.cssWidthAndHeight || params.cssWidthAndHeight === 'height') {
	                    wrapper.style.width = (_this.width) + 'px';
	                }
	                if (!params.cssWidthAndHeight || params.cssWidthAndHeight === 'width') {
	                    wrapper.style.height = (slidesHeight) + 'px';
	                }
	                wrapperSize = slidesHeight + _this.wrapperTop + _this.wrapperBottom;
	            }

	        }
	        else if (params.scrollContainer) {
	            //Scroll Container
	            wrapper.style.width = '';
	            wrapper.style.height = '';
	            wrapperWidth = _this.slides[0].getWidth(true, params.roundLengths);
	            wrapperHeight = _this.slides[0].getHeight(true, params.roundLengths);
	            wrapperSize = isH ? wrapperWidth : wrapperHeight;
	            wrapper.style.width = wrapperWidth + 'px';
	            wrapper.style.height = wrapperHeight + 'px';
	            slideSize = isH ? wrapperWidth : wrapperHeight;

	        }
	        else {
	            //For usual slides
	            if (params.calculateHeight) {
	                slideMaxHeight = 0;
	                wrapperHeight = 0;
	                //ResetWrapperSize
	                if (!isH) _this.container.style.height = '';
	                wrapper.style.height = '';

	                for (i = 0; i < _this.slides.length; i++) {
	                    //ResetSlideSize
	                    _this.slides[i].style.height = '';
	                    slideMaxHeight = Math.max(_this.slides[i].getHeight(true), slideMaxHeight);
	                    if (!isH) wrapperHeight += _this.slides[i].getHeight(true);
	                }
	                slideHeight = slideMaxHeight;
	                _this.height = slideHeight;

	                if (isH) wrapperHeight = slideHeight;
	                else {
	                    containerSize = slideHeight;
	                    _this.container.style.height = containerSize + 'px';
	                }
	            }
	            else {
	                slideHeight = isH ? _this.height : _this.height / params.slidesPerView;
	                if (params.roundLengths) slideHeight = Math.ceil(slideHeight);
	                wrapperHeight = isH ? _this.height : _this.slides.length * slideHeight;
	            }
	            slideWidth = isH ? _this.width / params.slidesPerView : _this.width;
	            if (params.roundLengths) slideWidth = Math.ceil(slideWidth);
	            wrapperWidth = isH ? _this.slides.length * slideWidth : _this.width;
	            slideSize = isH ? slideWidth : slideHeight;

	            if (params.offsetSlidesBefore > 0) {
	                if (isH) _this.wrapperLeft = slideSize * params.offsetSlidesBefore;
	                else _this.wrapperTop = slideSize * params.offsetSlidesBefore;
	            }
	            if (params.offsetSlidesAfter > 0) {
	                if (isH) _this.wrapperRight = slideSize * params.offsetSlidesAfter;
	                else _this.wrapperBottom = slideSize * params.offsetSlidesAfter;
	            }
	            if (params.offsetPxBefore > 0) {
	                if (isH) _this.wrapperLeft = params.offsetPxBefore;
	                else _this.wrapperTop = params.offsetPxBefore;
	            }
	            if (params.offsetPxAfter > 0) {
	                if (isH) _this.wrapperRight = params.offsetPxAfter;
	                else _this.wrapperBottom = params.offsetPxAfter;
	            }
	            if (params.centeredSlides) {
	                if (isH) {
	                    _this.wrapperLeft = (containerSize - slideSize) / 2;
	                    _this.wrapperRight = (containerSize - slideSize) / 2;
	                }
	                else {
	                    _this.wrapperTop = (containerSize - slideSize) / 2;
	                    _this.wrapperBottom = (containerSize - slideSize) / 2;
	                }
	            }
	            if (isH) {
	                if (_this.wrapperLeft > 0) wrapper.style.paddingLeft = _this.wrapperLeft + 'px';
	                if (_this.wrapperRight > 0) wrapper.style.paddingRight = _this.wrapperRight + 'px';
	            }
	            else {
	                if (_this.wrapperTop > 0) wrapper.style.paddingTop = _this.wrapperTop + 'px';
	                if (_this.wrapperBottom > 0) wrapper.style.paddingBottom = _this.wrapperBottom + 'px';
	            }

	            wrapperSize = isH ? wrapperWidth + _this.wrapperRight + _this.wrapperLeft : wrapperHeight + _this.wrapperTop + _this.wrapperBottom;
	            if (parseFloat(wrapperWidth) > 0 && (!params.cssWidthAndHeight || params.cssWidthAndHeight === 'height')) {
	                wrapper.style.width = wrapperWidth + 'px';
	            }
	            if (parseFloat(wrapperHeight) > 0 && (!params.cssWidthAndHeight || params.cssWidthAndHeight === 'width')) {
	                wrapper.style.height = wrapperHeight + 'px';
	            }
	            slideLeft = 0;
	            _this.snapGrid = [];
	            _this.slidesGrid = [];
	            for (i = 0; i < _this.slides.length; i++) {
	                _this.snapGrid.push(slideLeft);
	                _this.slidesGrid.push(slideLeft);
	                slideLeft += slideSize;
	                if (parseFloat(slideWidth) > 0 && (!params.cssWidthAndHeight || params.cssWidthAndHeight === 'height')) {
	                    _this.slides[i].style.width = slideWidth + 'px';
	                }
	                if (parseFloat(slideHeight) > 0 && (!params.cssWidthAndHeight || params.cssWidthAndHeight === 'width')) {
	                    _this.slides[i].style.height = slideHeight + 'px';
	                }
	            }

	        }

	        if (!_this.initialized) {
	            _this.callPlugins('onFirstInit');
	            if (params.onFirstInit) _this.fireCallback(params.onFirstInit, _this);
	        }
	        else {
	            _this.callPlugins('onInit');
	            if (params.onInit) _this.fireCallback(params.onInit, _this);
	        }
	        _this.initialized = true;
	    };

	    _this.reInit = function (forceCalcSlides) {
	        _this.init(true, forceCalcSlides);
	    };

	    _this.resizeFix = function (reInit) {
	        _this.callPlugins('beforeResizeFix');

	        _this.init(params.resizeReInit || reInit);

	        // swipe to active slide in fixed mode
	        if (!params.freeMode) {
	            _this.swipeTo((params.loop ? _this.activeLoopIndex : _this.activeIndex), 0, false);
	            // Fix autoplay
	            if (params.autoplay) {
	                if (_this.support.transitions && typeof autoplayTimeoutId !== 'undefined') {
	                    if (typeof autoplayTimeoutId !== 'undefined') {
	                        clearTimeout(autoplayTimeoutId);
	                        autoplayTimeoutId = undefined;
	                        _this.startAutoplay();
	                    }
	                }
	                else {
	                    if (typeof autoplayIntervalId !== 'undefined') {
	                        clearInterval(autoplayIntervalId);
	                        autoplayIntervalId = undefined;
	                        _this.startAutoplay();
	                    }
	                }
	            }
	        }
	        // move wrapper to the beginning in free mode
	        else if (_this.getWrapperTranslate() < -maxWrapperPosition()) {
	            _this.setWrapperTransition(0);
	            _this.setWrapperTranslate(-maxWrapperPosition());
	        }

	        _this.callPlugins('afterResizeFix');
	    };

	    /*==========================================
	        Max and Min Positions
	    ============================================*/
	    function maxWrapperPosition() {
	        var a = (wrapperSize - containerSize);
	        if (params.freeMode) {
	            a = wrapperSize - containerSize;
	        }
	        // if (params.loop) a -= containerSize;
	        if (params.slidesPerView > _this.slides.length && !params.centeredSlides) {
	            a = 0;
	        }
	        if (a < 0) a = 0;
	        return a;
	    }

	    /*==========================================
	        Event Listeners
	    ============================================*/
	    function initEvents() {
	        var bind = _this.h.addEventListener;
	        var eventTarget = params.eventTarget === 'wrapper' ? _this.wrapper : _this.container;
	        //Touch Events
	        if (! (_this.browser.ie10 || _this.browser.ie11)) {
	            if (_this.support.touch) {
	                bind(eventTarget, 'touchstart', onTouchStart);
	                bind(eventTarget, 'touchmove', onTouchMove);
	                bind(eventTarget, 'touchend', onTouchEnd);
	            }
	            if (params.simulateTouch) {
	                bind(eventTarget, 'mousedown', onTouchStart);
	                bind(document, 'mousemove', onTouchMove);
	                bind(document, 'mouseup', onTouchEnd);
	            }
	        }
	        else {
	            bind(eventTarget, _this.touchEvents.touchStart, onTouchStart);
	            bind(document, _this.touchEvents.touchMove, onTouchMove);
	            bind(document, _this.touchEvents.touchEnd, onTouchEnd);
	        }

	        //Resize Event
	        if (params.autoResize) {
	            bind(window, 'resize', _this.resizeFix);
	        }
	        //Slide Events
	        addSlideEvents();
	        //Mousewheel
	        _this._wheelEvent = false;
	        if (params.mousewheelControl) {
	            if (document.onmousewheel !== undefined) {
	                _this._wheelEvent = 'mousewheel';
	            }
	            if (!_this._wheelEvent) {
	                try {
	                    new WheelEvent('wheel');
	                    _this._wheelEvent = 'wheel';
	                } catch (e) {}
	            }
	            if (!_this._wheelEvent) {
	                _this._wheelEvent = 'DOMMouseScroll';
	            }
	            if (_this._wheelEvent) {
	                bind(_this.container, _this._wheelEvent, handleMousewheel);
	            }
	        }

	        //Keyboard
			function _loadImage(img) {
				var image, src;
				var onReady = function () {
					if (typeof _this === 'undefined' || _this === null) return;
					if (_this.imagesLoaded !== undefined) _this.imagesLoaded++;
					if (_this.imagesLoaded === _this.imagesToLoad.length) {
						_this.reInit();
						if (params.onImagesReady) _this.fireCallback(params.onImagesReady, _this);
					}
				};

				if (!img.complete) {
					src = (img.currentSrc || img.getAttribute('src'));
					if (src) {
						image = new Image();
						image.onload = onReady;
						image.onerror = onReady;
						image.src = src;
					} else {
						onReady();
					}

				} else {//image already loaded...
					onReady();
				}
			}

			if (params.keyboardControl) {
				bind(document, 'keydown', handleKeyboardKeys);
			}
			if (params.updateOnImagesReady) {
				_this.imagesToLoad = $$('img', _this.container);

				for (var i = 0; i < _this.imagesToLoad.length; i++) {
					_loadImage(_this.imagesToLoad[i]);
				}
			}
	    }

	    //Remove Event Listeners
	    _this.destroy = function (removeStyles) {
	        var unbind = _this.h.removeEventListener;
	        var eventTarget = params.eventTarget === 'wrapper' ? _this.wrapper : _this.container;
	        //Touch Events
	        if (! (_this.browser.ie10 || _this.browser.ie11)) {
	            if (_this.support.touch) {
	                unbind(eventTarget, 'touchstart', onTouchStart);
	                unbind(eventTarget, 'touchmove', onTouchMove);
	                unbind(eventTarget, 'touchend', onTouchEnd);
	            }
	            if (params.simulateTouch) {
	                unbind(eventTarget, 'mousedown', onTouchStart);
	                unbind(document, 'mousemove', onTouchMove);
	                unbind(document, 'mouseup', onTouchEnd);
	            }
	        }
	        else {
	            unbind(eventTarget, _this.touchEvents.touchStart, onTouchStart);
	            unbind(document, _this.touchEvents.touchMove, onTouchMove);
	            unbind(document, _this.touchEvents.touchEnd, onTouchEnd);
	        }

	        //Resize Event
	        if (params.autoResize) {
	            unbind(window, 'resize', _this.resizeFix);
	        }

	        //Init Slide Events
	        removeSlideEvents();

	        //Pagination
	        if (params.paginationClickable) {
	            removePaginationEvents();
	        }

	        //Mousewheel
	        if (params.mousewheelControl && _this._wheelEvent) {
	            unbind(_this.container, _this._wheelEvent, handleMousewheel);
	        }

	        //Keyboard
	        if (params.keyboardControl) {
	            unbind(document, 'keydown', handleKeyboardKeys);
	        }

	        //Stop autoplay
	        if (params.autoplay) {
	            _this.stopAutoplay();
	        }
	        // Remove styles
	        if (removeStyles) {
	            _this.wrapper.removeAttribute('style');
	            for (var i = 0; i < _this.slides.length; i++) {
	                _this.slides[i].removeAttribute('style');
	            }
	        }
	        // Plugins
	        _this.callPlugins('onDestroy');

	        // Check jQuery/Zepto data
	        if (window.jQuery && window.jQuery(_this.container).data('swiper')) {
	            window.jQuery(_this.container).removeData('swiper');
	        }
	        if (window.Zepto && window.Zepto(_this.container).data('swiper')) {
	            window.Zepto(_this.container).removeData('swiper');
	        }

	        //Destroy variable
	        _this = null;
	    };

	    function addSlideEvents() {
	        var bind = _this.h.addEventListener,
	            i;

	        //Prevent Links Events
	        if (params.preventLinks) {
	            var links = $$('a', _this.container);
	            for (i = 0; i < links.length; i++) {
	                bind(links[i], 'click', preventClick);
	            }
	        }
	        //Release Form Elements
	        if (params.releaseFormElements) {
	            var formElements = $$('input, textarea, select', _this.container);
	            for (i = 0; i < formElements.length; i++) {
	                bind(formElements[i], _this.touchEvents.touchStart, releaseForms, true);
	                if (_this.support.touch && params.simulateTouch) {
	                    bind(formElements[i], 'mousedown', releaseForms, true);
	                }
	            }
	        }

	        //Slide Clicks & Touches
	        if (params.onSlideClick) {
	            for (i = 0; i < _this.slides.length; i++) {
	                bind(_this.slides[i], 'click', slideClick);
	            }
	        }
	        if (params.onSlideTouch) {
	            for (i = 0; i < _this.slides.length; i++) {
	                bind(_this.slides[i], _this.touchEvents.touchStart, slideTouch);
	            }
	        }
	    }
	    function removeSlideEvents() {
	        var unbind = _this.h.removeEventListener,
	            i;

	        //Slide Clicks & Touches
	        if (params.onSlideClick) {
	            for (i = 0; i < _this.slides.length; i++) {
	                unbind(_this.slides[i], 'click', slideClick);
	            }
	        }
	        if (params.onSlideTouch) {
	            for (i = 0; i < _this.slides.length; i++) {
	                unbind(_this.slides[i], _this.touchEvents.touchStart, slideTouch);
	            }
	        }
	        //Release Form Elements
	        if (params.releaseFormElements) {
	            var formElements = $$('input, textarea, select', _this.container);
	            for (i = 0; i < formElements.length; i++) {
	                unbind(formElements[i], _this.touchEvents.touchStart, releaseForms, true);
	                if (_this.support.touch && params.simulateTouch) {
	                    unbind(formElements[i], 'mousedown', releaseForms, true);
	                }
	            }
	        }
	        //Prevent Links Events
	        if (params.preventLinks) {
	            var links = $$('a', _this.container);
	            for (i = 0; i < links.length; i++) {
	                unbind(links[i], 'click', preventClick);
	            }
	        }
	    }
	    /*==========================================
	        Keyboard Control
	    ============================================*/
	    function handleKeyboardKeys(e) {
	        var kc = e.keyCode || e.charCode;
	        if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
	        if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
	            var inView = false;
	            //Check that swiper should be inside of visible area of window
	            var swiperOffset = _this.h.getOffset(_this.container);
	            var scrollLeft = _this.h.windowScroll().left;
	            var scrollTop = _this.h.windowScroll().top;
	            var windowWidth = _this.h.windowWidth();
	            var windowHeight = _this.h.windowHeight();
	            var swiperCoord = [
	                [swiperOffset.left, swiperOffset.top],
	                [swiperOffset.left + _this.width, swiperOffset.top],
	                [swiperOffset.left, swiperOffset.top + _this.height],
	                [swiperOffset.left + _this.width, swiperOffset.top + _this.height]
	            ];
	            for (var i = 0; i < swiperCoord.length; i++) {
	                var point = swiperCoord[i];
	                if (
	                    point[0] >= scrollLeft && point[0] <= scrollLeft + windowWidth &&
	                    point[1] >= scrollTop && point[1] <= scrollTop + windowHeight
	                ) {
	                    inView = true;
	                }

	            }
	            if (!inView) return;
	        }
	        if (isH) {
	            if (kc === 37 || kc === 39) {
	                if (e.preventDefault) e.preventDefault();
	                else e.returnValue = false;
	            }
	            if (kc === 39) _this.swipeNext();
	            if (kc === 37) _this.swipePrev();
	        }
	        else {
	            if (kc === 38 || kc === 40) {
	                if (e.preventDefault) e.preventDefault();
	                else e.returnValue = false;
	            }
	            if (kc === 40) _this.swipeNext();
	            if (kc === 38) _this.swipePrev();
	        }
	    }

	    _this.disableKeyboardControl = function () {
	        params.keyboardControl = false;
	        _this.h.removeEventListener(document, 'keydown', handleKeyboardKeys);
	    };

	    _this.enableKeyboardControl = function () {
	        params.keyboardControl = true;
	        _this.h.addEventListener(document, 'keydown', handleKeyboardKeys);
	    };

	    /*==========================================
	        Mousewheel Control
	    ============================================*/
	    var lastScrollTime = (new Date()).getTime();
	    function handleMousewheel(e) {
	        var we = _this._wheelEvent;
	        var delta = 0;

	        //Opera & IE
	        if (e.detail) delta = -e.detail;
	        //WebKits
	        else if (we === 'mousewheel') {
	            if (params.mousewheelControlForceToAxis) {
	                if (isH) {
	                    if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)) delta = e.wheelDeltaX;
	                    else return;
	                }
	                else {
	                    if (Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)) delta = e.wheelDeltaY;
	                    else return;
	                }
	            }
	            else {
	                delta = e.wheelDelta;
	            }
	        }
	        //Old FireFox
	        else if (we === 'DOMMouseScroll') delta = -e.detail;
	        //New FireFox
	        else if (we === 'wheel') {
	            if (params.mousewheelControlForceToAxis) {
	                if (isH) {
	                    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) delta = -e.deltaX;
	                    else return;
	                }
	                else {
	                    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) delta = -e.deltaY;
	                    else return;
	                }
	            }
	            else {
	                delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? - e.deltaX : - e.deltaY;
	            }
	        }

	        if (!params.freeMode) {
	            if ((new Date()).getTime() - lastScrollTime > 60) {
	                if (delta < 0) _this.swipeNext();
	                else _this.swipePrev();
	            }
	            lastScrollTime = (new Date()).getTime();

	        }
	        else {
	            //Freemode or scrollContainer:
	            var position = _this.getWrapperTranslate() + delta;

	            if (position > 0) position = 0;
	            if (position < -maxWrapperPosition()) position = -maxWrapperPosition();

	            _this.setWrapperTransition(0);
	            _this.setWrapperTranslate(position);
	            _this.updateActiveSlide(position);

	            // Return page scroll on edge positions
	            if (position === 0 || position === -maxWrapperPosition()) return;
	        }
	        if (params.autoplay) _this.stopAutoplay(true);

	        if (e.preventDefault) e.preventDefault();
	        else e.returnValue = false;
	        return false;
	    }
	    _this.disableMousewheelControl = function () {
	        if (!_this._wheelEvent) return false;
	        params.mousewheelControl = false;
	        _this.h.removeEventListener(_this.container, _this._wheelEvent, handleMousewheel);
	        return true;
	    };

	    _this.enableMousewheelControl = function () {
	        if (!_this._wheelEvent) return false;
	        params.mousewheelControl = true;
	        _this.h.addEventListener(_this.container, _this._wheelEvent, handleMousewheel);
	        return true;
	    };

	    /*=========================
	      Grab Cursor
	      ===========================*/
	    if (params.grabCursor) {
	        var containerStyle = _this.container.style;
	        containerStyle.cursor = 'move';
	        containerStyle.cursor = 'grab';
	        containerStyle.cursor = '-moz-grab';
	        containerStyle.cursor = '-webkit-grab';
	    }

	    /*=========================
	      Slides Events Handlers
	      ===========================*/

	    _this.allowSlideClick = true;
	    function slideClick(event) {
	        if (_this.allowSlideClick) {
	            setClickedSlide(event);
	            _this.fireCallback(params.onSlideClick, _this, event);
	        }
	    }

	    function slideTouch(event) {
	        setClickedSlide(event);
	        _this.fireCallback(params.onSlideTouch, _this, event);
	    }

	    function setClickedSlide(event) {

	        // IE 6-8 support
	        if (!event.currentTarget) {
	            var element = event.srcElement;
	            do {
	                if (element.className.indexOf(params.slideClass) > -1) {
	                    break;
	                }
	                element = element.parentNode;
	            } while (element);
	            _this.clickedSlide = element;
	        }
	        else {
	            _this.clickedSlide = event.currentTarget;
	        }

	        _this.clickedSlideIndex     = _this.slides.indexOf(_this.clickedSlide);
	        _this.clickedSlideLoopIndex = _this.clickedSlideIndex - (_this.loopedSlides || 0);
	    }

	    _this.allowLinks = true;
	    function preventClick(e) {
	        if (!_this.allowLinks) {
	            if (e.preventDefault) e.preventDefault();
	            else e.returnValue = false;
	            if (params.preventLinksPropagation && 'stopPropagation' in e) {
	                e.stopPropagation();
	            }
	            return false;
	        }
	    }
	    function releaseForms(e) {
	        if (e.stopPropagation) e.stopPropagation();
	        else e.returnValue = false;
	        return false;

	    }

	    /*==================================================
	        Event Handlers
	    ====================================================*/
	    var isTouchEvent = false;
	    var allowThresholdMove;
	    var allowMomentumBounce = true;
	    function onTouchStart(event) {
	        if (params.preventLinks) _this.allowLinks = true;
	        //Exit if slider is already was touched
	        if (_this.isTouched || params.onlyExternal) {
	            return false;
	        }

	        // Blur active elements
	        var eventTarget = event.target || event.srcElement;
	        if (document.activeElement && document.activeElement !== document.body) {
	            if (document.activeElement !== eventTarget) document.activeElement.blur();
	        }

	        // Form tag names
	        var formTagNames = ('input select textarea').split(' ');

	        // Check for no swiping
	        if (params.noSwiping && (eventTarget) && noSwipingSlide(eventTarget)) return false;
	        allowMomentumBounce = false;
	        //Check For Nested Swipers
	        _this.isTouched = true;
	        isTouchEvent = event.type === 'touchstart';

	        // prevent user enter with right and the swiper move (needs isTouchEvent)
	        if (!isTouchEvent && 'which' in event && event.which === 3) {
	            _this.isTouched = false;
	            return false;
	        }

	        if (!isTouchEvent || event.targetTouches.length === 1) {
	            _this.callPlugins('onTouchStartBegin');
	            if (!isTouchEvent && !_this.isAndroid && formTagNames.indexOf(eventTarget.tagName.toLowerCase()) < 0) {

	                if (event.preventDefault) event.preventDefault();
	                else event.returnValue = false;
	            }

	            var pageX = isTouchEvent ? event.targetTouches[0].pageX : (event.pageX || event.clientX);
	            var pageY = isTouchEvent ? event.targetTouches[0].pageY : (event.pageY || event.clientY);

	            //Start Touches to check the scrolling
	            _this.touches.startX = _this.touches.currentX = pageX;
	            _this.touches.startY = _this.touches.currentY = pageY;

	            _this.touches.start = _this.touches.current = isH ? pageX : pageY;

	            //Set Transition Time to 0
	            _this.setWrapperTransition(0);

	            //Get Start Translate Position
	            _this.positions.start = _this.positions.current = _this.getWrapperTranslate();

	            //Set Transform
	            _this.setWrapperTranslate(_this.positions.start);

	            //TouchStartTime
	            _this.times.start = (new Date()).getTime();

	            //Unset Scrolling
	            isScrolling = undefined;

	            //Set Treshold
	            if (params.moveStartThreshold > 0) {
	                allowThresholdMove = false;
	            }

	            //CallBack
	            if (params.onTouchStart) _this.fireCallback(params.onTouchStart, _this, event);
	            _this.callPlugins('onTouchStartEnd');

	        }
	    }
	    var velocityPrevPosition, velocityPrevTime;
	    function onTouchMove(event) {
	        // If slider is not touched - exit
	        if (!_this.isTouched || params.onlyExternal) return;
	        if (isTouchEvent && event.type === 'mousemove') return;

	        var pageX = isTouchEvent ? event.targetTouches[0].pageX : (event.pageX || event.clientX);
	        var pageY = isTouchEvent ? event.targetTouches[0].pageY : (event.pageY || event.clientY);

	        //check for scrolling
	        if (typeof isScrolling === 'undefined' && isH) {
	            isScrolling = !!(isScrolling || Math.abs(pageY - _this.touches.startY) > Math.abs(pageX - _this.touches.startX));
	        }
	        if (typeof isScrolling === 'undefined' && !isH) {
	            isScrolling = !!(isScrolling || Math.abs(pageY - _this.touches.startY) < Math.abs(pageX - _this.touches.startX));
	        }
	        if (isScrolling) {
	            _this.isTouched = false;
	            return;
	        }

	        // One way swipes
	        if (isH) {
	            if ((!params.swipeToNext && pageX < _this.touches.startX) || ((!params.swipeToPrev && pageX > _this.touches.startX))) {
	                return;
	            }
	        }
	        else {
	            if ((!params.swipeToNext && pageY < _this.touches.startY) || ((!params.swipeToPrev && pageY > _this.touches.startY))) {
	                return;
	            }
	        }

	        //Check For Nested Swipers
	        if (event.assignedToSwiper) {
	            _this.isTouched = false;
	            return;
	        }
	        event.assignedToSwiper = true;

	        //Block inner links
	        if (params.preventLinks) {
	            _this.allowLinks = false;
	        }
	        if (params.onSlideClick) {
	            _this.allowSlideClick = false;
	        }

	        //Stop AutoPlay if exist
	        if (params.autoplay) {
	            _this.stopAutoplay(true);
	        }
	        if (!isTouchEvent || event.touches.length === 1) {

	            //Moved Flag
	            if (!_this.isMoved) {
	                _this.callPlugins('onTouchMoveStart');

	                if (params.loop) {
	                    _this.fixLoop();
	                    _this.positions.start = _this.getWrapperTranslate();
	                }
	                if (params.onTouchMoveStart) _this.fireCallback(params.onTouchMoveStart, _this);
	            }
	            _this.isMoved = true;

	            // cancel event
	            if (event.preventDefault) event.preventDefault();
	            else event.returnValue = false;

	            _this.touches.current = isH ? pageX : pageY;

	            _this.positions.current = (_this.touches.current - _this.touches.start) * params.touchRatio + _this.positions.start;

	            //Resistance Callbacks
	            if (_this.positions.current > 0 && params.onResistanceBefore) {
	                _this.fireCallback(params.onResistanceBefore, _this, _this.positions.current);
	            }
	            if (_this.positions.current < -maxWrapperPosition() && params.onResistanceAfter) {
	                _this.fireCallback(params.onResistanceAfter, _this, Math.abs(_this.positions.current + maxWrapperPosition()));
	            }
	            //Resistance
	            if (params.resistance && params.resistance !== '100%') {
	                var resistance;
	                //Resistance for Negative-Back sliding
	                if (_this.positions.current > 0) {
	                    resistance = 1 - _this.positions.current / containerSize / 2;
	                    if (resistance < 0.5)
	                        _this.positions.current = (containerSize / 2);
	                    else
	                        _this.positions.current = _this.positions.current * resistance;
	                }
	                //Resistance for After-End Sliding
	                if (_this.positions.current < -maxWrapperPosition()) {

	                    var diff = (_this.touches.current - _this.touches.start) * params.touchRatio + (maxWrapperPosition() + _this.positions.start);
	                    resistance = (containerSize + diff) / (containerSize);
	                    var newPos = _this.positions.current - diff * (1 - resistance) / 2;
	                    var stopPos = -maxWrapperPosition() - containerSize / 2;

	                    if (newPos < stopPos || resistance <= 0)
	                        _this.positions.current = stopPos;
	                    else
	                        _this.positions.current = newPos;
	                }
	            }
	            if (params.resistance && params.resistance === '100%') {
	                //Resistance for Negative-Back sliding
	                if (_this.positions.current > 0 && !(params.freeMode && !params.freeModeFluid)) {
	                    _this.positions.current = 0;
	                }
	                //Resistance for After-End Sliding
	                if (_this.positions.current < -maxWrapperPosition() && !(params.freeMode && !params.freeModeFluid)) {
	                    _this.positions.current = -maxWrapperPosition();
	                }
	            }
	            //Move Slides
	            if (!params.followFinger) return;

	            if (!params.moveStartThreshold) {
	                _this.setWrapperTranslate(_this.positions.current);
	            }
	            else {
	                if (Math.abs(_this.touches.current - _this.touches.start) > params.moveStartThreshold || allowThresholdMove) {
	                    if (!allowThresholdMove) {
	                        allowThresholdMove = true;
	                        _this.touches.start = _this.touches.current;
	                        return;
	                    }
	                    _this.setWrapperTranslate(_this.positions.current);
	                }
	                else {
	                    _this.positions.current = _this.positions.start;
	                }
	            }

	            if (params.freeMode || params.watchActiveIndex) {
	                _this.updateActiveSlide(_this.positions.current);
	            }

	            //Grab Cursor
	            if (params.grabCursor) {
	                _this.container.style.cursor = 'move';
	                _this.container.style.cursor = 'grabbing';
	                _this.container.style.cursor = '-moz-grabbin';
	                _this.container.style.cursor = '-webkit-grabbing';
	            }
	            //Velocity
	            if (!velocityPrevPosition) velocityPrevPosition = _this.touches.current;
	            if (!velocityPrevTime) velocityPrevTime = (new Date()).getTime();
	            _this.velocity = (_this.touches.current - velocityPrevPosition) / ((new Date()).getTime() - velocityPrevTime) / 2;
	            if (Math.abs(_this.touches.current - velocityPrevPosition) < 2) _this.velocity = 0;
	            velocityPrevPosition = _this.touches.current;
	            velocityPrevTime = (new Date()).getTime();
	            //Callbacks
	            _this.callPlugins('onTouchMoveEnd');
	            if (params.onTouchMove) _this.fireCallback(params.onTouchMove, _this, event);

	            return false;
	        }
	    }
	    function onTouchEnd(event) {
	        //Check For scrolling
	        if (isScrolling) {
	            _this.swipeReset();
	        }
	        // If slider is not touched exit
	        if (params.onlyExternal || !_this.isTouched) return;
	        _this.isTouched = false;

	        //Return Grab Cursor
	        if (params.grabCursor) {
	            _this.container.style.cursor = 'move';
	            _this.container.style.cursor = 'grab';
	            _this.container.style.cursor = '-moz-grab';
	            _this.container.style.cursor = '-webkit-grab';
	        }

	        //Check for Current Position
	        if (!_this.positions.current && _this.positions.current !== 0) {
	            _this.positions.current = _this.positions.start;
	        }

	        //For case if slider touched but not moved
	        if (params.followFinger) {
	            _this.setWrapperTranslate(_this.positions.current);
	        }

	        // TouchEndTime
	        _this.times.end = (new Date()).getTime();

	        //Difference
	        _this.touches.diff = _this.touches.current - _this.touches.start;
	        _this.touches.abs = Math.abs(_this.touches.diff);

	        _this.positions.diff = _this.positions.current - _this.positions.start;
	        _this.positions.abs = Math.abs(_this.positions.diff);

	        var diff = _this.positions.diff;
	        var diffAbs = _this.positions.abs;
	        var timeDiff = _this.times.end - _this.times.start;

	        if (diffAbs < 5 && (timeDiff) < 300 && _this.allowLinks === false) {
	            if (!params.freeMode && diffAbs !== 0) _this.swipeReset();
	            //Release inner links
	            if (params.preventLinks) {
	                _this.allowLinks = true;
	            }
	            if (params.onSlideClick) {
	                _this.allowSlideClick = true;
	            }
	        }

	        setTimeout(function () {
	            //Release inner links
	            if (typeof _this === 'undefined' || _this === null) return;
	            if (params.preventLinks) {
	                _this.allowLinks = true;
	            }
	            if (params.onSlideClick) {
	                _this.allowSlideClick = true;
	            }
	        }, 100);

	        var maxPosition = maxWrapperPosition();

	        //Not moved or Prevent Negative Back Sliding/After-End Sliding
	        if (!_this.isMoved && params.freeMode) {
	            _this.isMoved = false;
	            if (params.onTouchEnd) _this.fireCallback(params.onTouchEnd, _this, event);
	            _this.callPlugins('onTouchEnd');
	            return;
	        }
	        if (!_this.isMoved || _this.positions.current > 0 || _this.positions.current < -maxPosition) {
	            _this.swipeReset();
	            if (params.onTouchEnd) _this.fireCallback(params.onTouchEnd, _this, event);
	            _this.callPlugins('onTouchEnd');
	            return;
	        }

	        _this.isMoved = false;

	        //Free Mode
	        if (params.freeMode) {
	            if (params.freeModeFluid) {
	                var momentumDuration = 1000 * params.momentumRatio;
	                var momentumDistance = _this.velocity * momentumDuration;
	                var newPosition = _this.positions.current + momentumDistance;
	                var doBounce = false;
	                var afterBouncePosition;
	                var bounceAmount = Math.abs(_this.velocity) * 20 * params.momentumBounceRatio;
	                if (newPosition < -maxPosition) {
	                    if (params.momentumBounce && _this.support.transitions) {
	                        if (newPosition + maxPosition < -bounceAmount) newPosition = -maxPosition - bounceAmount;
	                        afterBouncePosition = -maxPosition;
	                        doBounce = true;
	                        allowMomentumBounce = true;
	                    }
	                    else newPosition = -maxPosition;
	                }
	                if (newPosition > 0) {
	                    if (params.momentumBounce && _this.support.transitions) {
	                        if (newPosition > bounceAmount) newPosition = bounceAmount;
	                        afterBouncePosition = 0;
	                        doBounce = true;
	                        allowMomentumBounce = true;
	                    }
	                    else newPosition = 0;
	                }
	                //Fix duration
	                if (_this.velocity !== 0) momentumDuration = Math.abs((newPosition - _this.positions.current) / _this.velocity);

	                _this.setWrapperTranslate(newPosition);

	                _this.setWrapperTransition(momentumDuration);

	                if (params.momentumBounce && doBounce) {
	                    _this.wrapperTransitionEnd(function () {
	                        if (!allowMomentumBounce) return;
	                        if (params.onMomentumBounce) _this.fireCallback(params.onMomentumBounce, _this);
	                        _this.callPlugins('onMomentumBounce');

	                        _this.setWrapperTranslate(afterBouncePosition);
	                        _this.setWrapperTransition(300);
	                    });
	                }

	                _this.updateActiveSlide(newPosition);
	            }
	            if (!params.freeModeFluid || timeDiff >= 300) _this.updateActiveSlide(_this.positions.current);

	            if (params.onTouchEnd) _this.fireCallback(params.onTouchEnd, _this, event);
	            _this.callPlugins('onTouchEnd');
	            return;
	        }

	        //Direction
	        direction = diff < 0 ? 'toNext' : 'toPrev';

	        //Short Touches
	        if (direction === 'toNext' && (timeDiff <= 300)) {
	            if (diffAbs < 30 || !params.shortSwipes) _this.swipeReset();
	            else _this.swipeNext(true, true);
	        }

	        if (direction === 'toPrev' && (timeDiff <= 300)) {
	            if (diffAbs < 30 || !params.shortSwipes) _this.swipeReset();
	            else _this.swipePrev(true, true);
	        }

	        //Long Touches
	        var targetSlideSize = 0;
	        if (params.slidesPerView === 'auto') {
	            //Define current slide's width
	            var currentPosition = Math.abs(_this.getWrapperTranslate());
	            var slidesOffset = 0;
	            var _slideSize;
	            for (var i = 0; i < _this.slides.length; i++) {
	                _slideSize = isH ? _this.slides[i].getWidth(true, params.roundLengths) : _this.slides[i].getHeight(true, params.roundLengths);
	                slidesOffset += _slideSize;
	                if (slidesOffset > currentPosition) {
	                    targetSlideSize = _slideSize;
	                    break;
	                }
	            }
	            if (targetSlideSize > containerSize) targetSlideSize = containerSize;
	        }
	        else {
	            targetSlideSize = slideSize * params.slidesPerView;
	        }
	        if (direction === 'toNext' && (timeDiff > 300)) {
	            if (diffAbs >= targetSlideSize * params.longSwipesRatio) {
	                _this.swipeNext(true, true);
	            }
	            else {
	                _this.swipeReset();
	            }
	        }
	        if (direction === 'toPrev' && (timeDiff > 300)) {
	            if (diffAbs >= targetSlideSize * params.longSwipesRatio) {
	                _this.swipePrev(true, true);
	            }
	            else {
	                _this.swipeReset();
	            }
	        }
	        if (params.onTouchEnd) _this.fireCallback(params.onTouchEnd, _this, event);
	        _this.callPlugins('onTouchEnd');
	    }


	    /*==================================================
	        noSwiping Bubble Check by Isaac Strack
	    ====================================================*/
	    function hasClass(el, classname) {
	        return el && el.getAttribute('class') && el.getAttribute('class').indexOf(classname) > -1;
	    }
	    function noSwipingSlide(el) {
	        /*This function is specifically designed to check the parent elements for the noSwiping class, up to the wrapper.
	        We need to check parents because while onTouchStart bubbles, _this.isTouched is checked in onTouchStart, which stops the bubbling.
	        So, if a text box, for example, is the initial target, and the parent slide container has the noSwiping class, the _this.isTouched
	        check will never find it, and what was supposed to be noSwiping is able to be swiped.
	        This function will iterate up and check for the noSwiping class in parents, up through the wrapperClass.*/

	        // First we create a truthy variable, which is that swiping is allowd (noSwiping = false)
	        var noSwiping = false;

	        // Now we iterate up (parentElements) until we reach the node with the wrapperClass.
	        do {

	            // Each time, we check to see if there's a 'swiper-no-swiping' class (noSwipingClass).
	            if (hasClass(el, params.noSwipingClass))
	            {
	                noSwiping = true; // If there is, we set noSwiping = true;
	            }

	            el = el.parentElement;  // now we iterate up (parent node)

	        } while (!noSwiping && el.parentElement && !hasClass(el, params.wrapperClass)); // also include el.parentElement truthy, just in case.

	        // because we didn't check the wrapper itself, we do so now, if noSwiping is false:
	        if (!noSwiping && hasClass(el, params.wrapperClass) && hasClass(el, params.noSwipingClass))
	            noSwiping = true; // if the wrapper has the noSwipingClass, we set noSwiping = true;

	        return noSwiping;
	    }

	    function addClassToHtmlString(klass, outerHtml) {
	        var par = document.createElement('div');
	        var child;

	        par.innerHTML = outerHtml;
	        child = par.firstChild;
	        child.className += ' ' + klass;

	        return child.outerHTML;
	    }


	    /*==================================================
	        Swipe Functions
	    ====================================================*/
	    _this.swipeNext = function (runCallbacks, internal) {
	        if (typeof runCallbacks === 'undefined') runCallbacks = true;
	        if (!internal && params.loop) _this.fixLoop();
	        if (!internal && params.autoplay) _this.stopAutoplay(true);
	        _this.callPlugins('onSwipeNext');
	        var currentPosition = _this.getWrapperTranslate().toFixed(2);
	        var newPosition = currentPosition;
	        if (params.slidesPerView === 'auto') {
	            for (var i = 0; i < _this.snapGrid.length; i++) {
	                if (-currentPosition >= _this.snapGrid[i].toFixed(2) && -currentPosition < _this.snapGrid[i + 1].toFixed(2)) {
	                    newPosition = -_this.snapGrid[i + 1];
	                    break;
	                }
	            }
	        }
	        else {
	            var groupSize = slideSize * params.slidesPerGroup;
	            newPosition = -(Math.floor(Math.abs(currentPosition) / Math.floor(groupSize)) * groupSize + groupSize);
	        }
	        if (newPosition < -maxWrapperPosition()) {
	            newPosition = -maxWrapperPosition();
	        }
	        if (newPosition === currentPosition) return false;
	        swipeToPosition(newPosition, 'next', {runCallbacks: runCallbacks});
	        return true;
	    };
	    _this.swipePrev = function (runCallbacks, internal) {
	        if (typeof runCallbacks === 'undefined') runCallbacks = true;
	        if (!internal && params.loop) _this.fixLoop();
	        if (!internal && params.autoplay) _this.stopAutoplay(true);
	        _this.callPlugins('onSwipePrev');

	        var currentPosition = Math.ceil(_this.getWrapperTranslate());
	        var newPosition;
	        if (params.slidesPerView === 'auto') {
	            newPosition = 0;
	            for (var i = 1; i < _this.snapGrid.length; i++) {
	                if (-currentPosition === _this.snapGrid[i]) {
	                    newPosition = -_this.snapGrid[i - 1];
	                    break;
	                }
	                if (-currentPosition > _this.snapGrid[i] && -currentPosition < _this.snapGrid[i + 1]) {
	                    newPosition = -_this.snapGrid[i];
	                    break;
	                }
	            }
	        }
	        else {
	            var groupSize = slideSize * params.slidesPerGroup;
	            newPosition = -(Math.ceil(-currentPosition / groupSize) - 1) * groupSize;
	        }

	        if (newPosition > 0) newPosition = 0;

	        if (newPosition === currentPosition) return false;
	        swipeToPosition(newPosition, 'prev', {runCallbacks: runCallbacks});
	        return true;

	    };
	    _this.swipeReset = function (runCallbacks) {
	        if (typeof runCallbacks === 'undefined') runCallbacks = true;
	        _this.callPlugins('onSwipeReset');
	        var currentPosition = _this.getWrapperTranslate();
	        var groupSize = slideSize * params.slidesPerGroup;
	        var newPosition;
	        var maxPosition = -maxWrapperPosition();
	        if (params.slidesPerView === 'auto') {
	            newPosition = 0;
	            for (var i = 0; i < _this.snapGrid.length; i++) {
	                if (-currentPosition === _this.snapGrid[i]) return;
	                if (-currentPosition >= _this.snapGrid[i] && -currentPosition < _this.snapGrid[i + 1]) {
	                    if (_this.positions.diff > 0) newPosition = -_this.snapGrid[i + 1];
	                    else newPosition = -_this.snapGrid[i];
	                    break;
	                }
	            }
	            if (-currentPosition >= _this.snapGrid[_this.snapGrid.length - 1]) newPosition = -_this.snapGrid[_this.snapGrid.length - 1];
	            if (currentPosition <= -maxWrapperPosition()) newPosition = -maxWrapperPosition();
	        }
	        else {
	            newPosition = currentPosition < 0 ? Math.round(currentPosition / groupSize) * groupSize : 0;
	            if (currentPosition <= -maxWrapperPosition()) newPosition = -maxWrapperPosition();
	        }
	        if (params.scrollContainer)  {
	            newPosition = currentPosition < 0 ? currentPosition : 0;
	        }
	        if (newPosition < -maxWrapperPosition()) {
	            newPosition = -maxWrapperPosition();
	        }
	        if (params.scrollContainer && (containerSize > slideSize)) {
	            newPosition = 0;
	        }

	        if (newPosition === currentPosition) return false;

	        swipeToPosition(newPosition, 'reset', {runCallbacks: runCallbacks});
	        return true;
	    };

	    _this.swipeTo = function (index, speed, runCallbacks) {
	        index = parseInt(index, 10);
	        _this.callPlugins('onSwipeTo', {index: index, speed: speed});
	        if (params.loop) index = index + _this.loopedSlides;
	        var currentPosition = _this.getWrapperTranslate();
	        if (!isFinite(index) || index > (_this.slides.length - 1) || index < 0) return;
	        var newPosition;
	        if (params.slidesPerView === 'auto') {
	            newPosition = -_this.slidesGrid[index];
	        }
	        else {
	            newPosition = -index * slideSize;
	        }
	        if (newPosition < - maxWrapperPosition()) {
	            newPosition = - maxWrapperPosition();
	        }

	        if (newPosition === currentPosition) return false;

	        if (typeof runCallbacks === 'undefined') runCallbacks = true;
	        swipeToPosition(newPosition, 'to', {index: index, speed: speed, runCallbacks: runCallbacks});
	        return true;
	    };

	    function swipeToPosition(newPosition, action, toOptions) {
	        var speed = (action === 'to' && toOptions.speed >= 0) ? toOptions.speed : params.speed;
	        var timeOld = + new Date();

	        function anim() {
	            var timeNew = + new Date();
	            var time = timeNew - timeOld;
	            currentPosition += animationStep * time / (1000 / 60);
	            condition = direction === 'toNext' ? currentPosition > newPosition : currentPosition < newPosition;
	            if (condition) {
	                _this.setWrapperTranslate(Math.ceil(currentPosition));
	                _this._DOMAnimating = true;
	                window.setTimeout(function () {
	                    anim();
	                }, 1000 / 60);
	            }
	            else {
	                if (params.onSlideChangeEnd) {
	                    if (action === 'to') {
	                        if (toOptions.runCallbacks === true) _this.fireCallback(params.onSlideChangeEnd, _this, direction);
	                    }
	                    else {
	                        _this.fireCallback(params.onSlideChangeEnd, _this, direction);
	                    }

	                }
	                _this.setWrapperTranslate(newPosition);
	                _this._DOMAnimating = false;
	            }
	        }

	        if (_this.support.transitions || !params.DOMAnimation) {
	            _this.setWrapperTranslate(newPosition);
	            _this.setWrapperTransition(speed);
	        }
	        else {
	            //Try the DOM animation
	            var currentPosition = _this.getWrapperTranslate();
	            var animationStep = Math.ceil((newPosition - currentPosition) / speed * (1000 / 60));
	            var direction = currentPosition > newPosition ? 'toNext' : 'toPrev';
	            var condition = direction === 'toNext' ? currentPosition > newPosition : currentPosition < newPosition;
	            if (_this._DOMAnimating) return;

	            anim();
	        }

	        //Update Active Slide Index
	        _this.updateActiveSlide(newPosition);

	        //Callbacks
	        if (params.onSlideNext && action === 'next' && toOptions.runCallbacks === true) {
	            _this.fireCallback(params.onSlideNext, _this, newPosition);
	        }
	        if (params.onSlidePrev && action === 'prev' && toOptions.runCallbacks === true) {
	            _this.fireCallback(params.onSlidePrev, _this, newPosition);
	        }
	        //'Reset' Callback
	        if (params.onSlideReset && action === 'reset' && toOptions.runCallbacks === true) {
	            _this.fireCallback(params.onSlideReset, _this, newPosition);
	        }

	        //'Next', 'Prev' and 'To' Callbacks
	        if ((action === 'next' || action === 'prev' || action === 'to') && toOptions.runCallbacks === true)
	            slideChangeCallbacks(action);
	    }
	    /*==================================================
	        Transition Callbacks
	    ====================================================*/
	    //Prevent Multiple Callbacks
	    _this._queueStartCallbacks = false;
	    _this._queueEndCallbacks = false;
	    function slideChangeCallbacks(direction) {
	        //Transition Start Callback
	        _this.callPlugins('onSlideChangeStart');
	        if (params.onSlideChangeStart) {
	            if (params.queueStartCallbacks && _this.support.transitions) {
	                if (_this._queueStartCallbacks) return;
	                _this._queueStartCallbacks = true;
	                _this.fireCallback(params.onSlideChangeStart, _this, direction);
	                _this.wrapperTransitionEnd(function () {
	                    _this._queueStartCallbacks = false;
	                });
	            }
	            else _this.fireCallback(params.onSlideChangeStart, _this, direction);
	        }
	        //Transition End Callback
	        if (params.onSlideChangeEnd) {
	            if (_this.support.transitions) {
	                if (params.queueEndCallbacks) {
	                    if (_this._queueEndCallbacks) return;
	                    _this._queueEndCallbacks = true;
	                    _this.wrapperTransitionEnd(function (swiper) {
	                        _this.fireCallback(params.onSlideChangeEnd, swiper, direction);
	                    });
	                }
	                else {
	                    _this.wrapperTransitionEnd(function (swiper) {
	                        _this.fireCallback(params.onSlideChangeEnd, swiper, direction);
	                    });
	                }
	            }
	            else {
	                if (!params.DOMAnimation) {
	                    setTimeout(function () {
	                        _this.fireCallback(params.onSlideChangeEnd, _this, direction);
	                    }, 10);
	                }
	            }
	        }
	    }

	    /*==================================================
	        Update Active Slide Index
	    ====================================================*/
	    _this.updateActiveSlide = function (position) {
	        if (!_this.initialized) return;
	        if (_this.slides.length === 0) return;
	        _this.previousIndex = _this.activeIndex;
	        if (typeof position === 'undefined') position = _this.getWrapperTranslate();
	        if (position > 0) position = 0;
	        var i;
	        if (params.slidesPerView === 'auto') {
	            var slidesOffset = 0;
	            _this.activeIndex = _this.slidesGrid.indexOf(-position);
	            if (_this.activeIndex < 0) {
	                for (i = 0; i < _this.slidesGrid.length - 1; i++) {
	                    if (-position > _this.slidesGrid[i] && -position < _this.slidesGrid[i + 1]) {
	                        break;
	                    }
	                }
	                var leftDistance = Math.abs(_this.slidesGrid[i] + position);
	                var rightDistance = Math.abs(_this.slidesGrid[i + 1] + position);
	                if (leftDistance <= rightDistance) _this.activeIndex = i;
	                else _this.activeIndex = i + 1;
	            }
	        }
	        else {
	            _this.activeIndex = Math[params.visibilityFullFit ? 'ceil' : 'round'](-position / slideSize);
	        }

	        if (_this.activeIndex === _this.slides.length) _this.activeIndex = _this.slides.length - 1;
	        if (_this.activeIndex < 0) _this.activeIndex = 0;

	        // Check for slide
	        if (!_this.slides[_this.activeIndex]) return;

	        // Calc Visible slides
	        _this.calcVisibleSlides(position);

	        // Mark visible and active slides with additonal classes
	        if (_this.support.classList) {
	            var slide;
	            for (i = 0; i < _this.slides.length; i++) {
	                slide = _this.slides[i];
	                slide.classList.remove(params.slideActiveClass);
	                if (_this.visibleSlides.indexOf(slide) >= 0) {
	                    slide.classList.add(params.slideVisibleClass);
	                } else {
	                    slide.classList.remove(params.slideVisibleClass);
	                }
	            }
	            _this.slides[_this.activeIndex].classList.add(params.slideActiveClass);
	        } else {
	            var activeClassRegexp = new RegExp('\\s*' + params.slideActiveClass);
	            var inViewClassRegexp = new RegExp('\\s*' + params.slideVisibleClass);

	            for (i = 0; i < _this.slides.length; i++) {
	                _this.slides[i].className = _this.slides[i].className.replace(activeClassRegexp, '').replace(inViewClassRegexp, '');
	                if (_this.visibleSlides.indexOf(_this.slides[i]) >= 0) {
	                    _this.slides[i].className += ' ' + params.slideVisibleClass;
	                }
	            }
	            _this.slides[_this.activeIndex].className += ' ' + params.slideActiveClass;
	        }

	        //Update loop index
	        if (params.loop) {
	            var ls = _this.loopedSlides;
	            _this.activeLoopIndex = _this.activeIndex - ls;
	            if (_this.activeLoopIndex >= _this.slides.length - ls * 2) {
	                _this.activeLoopIndex = _this.slides.length - ls * 2 - _this.activeLoopIndex;
	            }
	            if (_this.activeLoopIndex < 0) {
	                _this.activeLoopIndex = _this.slides.length - ls * 2 + _this.activeLoopIndex;
	            }
	            if (_this.activeLoopIndex < 0) _this.activeLoopIndex = 0;
	        }
	        else {
	            _this.activeLoopIndex = _this.activeIndex;
	        }
	        //Update Pagination
	        if (params.pagination) {
	            _this.updatePagination(position);
	        }
	    };
	    /*==================================================
	        Pagination
	    ====================================================*/
	    _this.createPagination = function (firstInit) {
	        if (params.paginationClickable && _this.paginationButtons) {
	            removePaginationEvents();
	        }
	        _this.paginationContainer = params.pagination.nodeType ? params.pagination : $$(params.pagination)[0];
	        if (params.createPagination) {
	            var paginationHTML = '';
	            var numOfSlides = _this.slides.length;
	            var numOfButtons = numOfSlides;
	            if (params.loop) numOfButtons -= _this.loopedSlides * 2;
	            for (var i = 0; i < numOfButtons; i++) {
	                paginationHTML += '<' + params.paginationElement + ' class="' + params.paginationElementClass + '"></' + params.paginationElement + '>';
	            }
	            _this.paginationContainer.innerHTML = paginationHTML;
	        }
	        _this.paginationButtons = $$('.' + params.paginationElementClass, _this.paginationContainer);
	        if (!firstInit) _this.updatePagination();
	        _this.callPlugins('onCreatePagination');
	        if (params.paginationClickable) {
	            addPaginationEvents();
	        }
	    };
	    function removePaginationEvents() {
	        var pagers = _this.paginationButtons;
	        if (pagers) {
	            for (var i = 0; i < pagers.length; i++) {
	                _this.h.removeEventListener(pagers[i], 'click', paginationClick);
	            }
	        }
	    }
	    function addPaginationEvents() {
	        var pagers = _this.paginationButtons;
	        if (pagers) {
	            for (var i = 0; i < pagers.length; i++) {
	                _this.h.addEventListener(pagers[i], 'click', paginationClick);
	            }
	        }
	    }
	    function paginationClick(e) {
	        var index;
	        var target = e.target || e.srcElement;
	        var pagers = _this.paginationButtons;
	        for (var i = 0; i < pagers.length; i++) {
	            if (target === pagers[i]) index = i;
	        }
	        if (params.autoplay) _this.stopAutoplay(true);
	        _this.swipeTo(index);
	    }
	    _this.updatePagination = function (position) {
	        if (!params.pagination) return;
	        if (_this.slides.length < 1) return;
	        var activePagers = $$('.' + params.paginationActiveClass, _this.paginationContainer);
	        if (!activePagers) return;

	        //Reset all Buttons' class to not active
	        var pagers = _this.paginationButtons;
	        if (pagers.length === 0) return;
	        for (var i = 0; i < pagers.length; i++) {
	            pagers[i].className = params.paginationElementClass;
	        }

	        var indexOffset = params.loop ? _this.loopedSlides : 0;
	        if (params.paginationAsRange) {
	            if (!_this.visibleSlides) _this.calcVisibleSlides(position);
	            //Get Visible Indexes
	            var visibleIndexes = [];
	            var j; // lopp index - avoid JSHint W004 / W038
	            for (j = 0; j < _this.visibleSlides.length; j++) {
	                var visIndex = _this.slides.indexOf(_this.visibleSlides[j]) - indexOffset;

	                if (params.loop && visIndex < 0) {
	                    visIndex = _this.slides.length - _this.loopedSlides * 2 + visIndex;
	                }
	                if (params.loop && visIndex >= _this.slides.length - _this.loopedSlides * 2) {
	                    visIndex = _this.slides.length - _this.loopedSlides * 2 - visIndex;
	                    visIndex = Math.abs(visIndex);
	                }
	                visibleIndexes.push(visIndex);
	            }

	            for (j = 0; j < visibleIndexes.length; j++) {
	                if (pagers[visibleIndexes[j]]) pagers[visibleIndexes[j]].className += ' ' + params.paginationVisibleClass;
	            }

	            if (params.loop) {
	                if (pagers[_this.activeLoopIndex] !== undefined) {
	                    pagers[_this.activeLoopIndex].className += ' ' + params.paginationActiveClass;
	                }
	            }
	            else {
	                if (pagers[_this.activeIndex]) pagers[_this.activeIndex].className += ' ' + params.paginationActiveClass;
	            }
	        }
	        else {
	            if (params.loop) {
	                if (pagers[_this.activeLoopIndex]) pagers[_this.activeLoopIndex].className += ' ' + params.paginationActiveClass + ' ' + params.paginationVisibleClass;
	            }
	            else {
	                if (pagers[_this.activeIndex]) pagers[_this.activeIndex].className += ' ' + params.paginationActiveClass + ' ' + params.paginationVisibleClass;
	            }
	        }
	    };
	    _this.calcVisibleSlides = function (position) {
	        var visibleSlides = [];
	        var _slideLeft = 0, _slideSize = 0, _slideRight = 0;
	        if (isH && _this.wrapperLeft > 0) position = position + _this.wrapperLeft;
	        if (!isH && _this.wrapperTop > 0) position = position + _this.wrapperTop;

	        for (var i = 0; i < _this.slides.length; i++) {
	            _slideLeft += _slideSize;
	            if (params.slidesPerView === 'auto')
	                _slideSize  = isH ? _this.h.getWidth(_this.slides[i], true, params.roundLengths) : _this.h.getHeight(_this.slides[i], true, params.roundLengths);
	            else _slideSize = slideSize;

	            _slideRight = _slideLeft + _slideSize;
	            var isVisibile = false;
	            if (params.visibilityFullFit) {
	                if (_slideLeft >= -position && _slideRight <= -position + containerSize) isVisibile = true;
	                if (_slideLeft <= -position && _slideRight >= -position + containerSize) isVisibile = true;
	            }
	            else {
	                if (_slideRight > -position && _slideRight <= ((-position + containerSize))) isVisibile = true;
	                if (_slideLeft >= -position && _slideLeft < ((-position + containerSize))) isVisibile = true;
	                if (_slideLeft < -position && _slideRight > ((-position + containerSize))) isVisibile = true;
	            }

	            if (isVisibile) visibleSlides.push(_this.slides[i]);

	        }
	        if (visibleSlides.length === 0) visibleSlides = [_this.slides[_this.activeIndex]];

	        _this.visibleSlides = visibleSlides;
	    };

	    /*==========================================
	        Autoplay
	    ============================================*/
	    var autoplayTimeoutId, autoplayIntervalId;
	    _this.startAutoplay = function () {
	        if (_this.support.transitions) {
	            if (typeof autoplayTimeoutId !== 'undefined') return false;
	            if (!params.autoplay) return;
	            _this.callPlugins('onAutoplayStart');
	            if (params.onAutoplayStart) _this.fireCallback(params.onAutoplayStart, _this);
	            autoplay();
	        }
	        else {
	            if (typeof autoplayIntervalId !== 'undefined') return false;
	            if (!params.autoplay) return;
	            _this.callPlugins('onAutoplayStart');
	            if (params.onAutoplayStart) _this.fireCallback(params.onAutoplayStart, _this);
	            autoplayIntervalId = setInterval(function () {
	                if (params.loop) {
	                    _this.fixLoop();
	                    _this.swipeNext(true, true);
	                }
	                else if (!_this.swipeNext(true, true)) {
	                    if (!params.autoplayStopOnLast) _this.swipeTo(0);
	                    else {
	                        clearInterval(autoplayIntervalId);
	                        autoplayIntervalId = undefined;
	                    }
	                }
	            }, params.autoplay);
	        }
	    };
	    _this.stopAutoplay = function (internal) {
	        if (_this.support.transitions) {
	            if (!autoplayTimeoutId) return;
	            if (autoplayTimeoutId) clearTimeout(autoplayTimeoutId);
	            autoplayTimeoutId = undefined;
	            if (internal && !params.autoplayDisableOnInteraction) {
	                _this.wrapperTransitionEnd(function () {
	                    autoplay();
	                });
	            }
	            _this.callPlugins('onAutoplayStop');
	            if (params.onAutoplayStop) _this.fireCallback(params.onAutoplayStop, _this);
	        }
	        else {
	            if (autoplayIntervalId) clearInterval(autoplayIntervalId);
	            autoplayIntervalId = undefined;
	            _this.callPlugins('onAutoplayStop');
	            if (params.onAutoplayStop) _this.fireCallback(params.onAutoplayStop, _this);
	        }
	    };
	    function autoplay() {
	        autoplayTimeoutId = setTimeout(function () {
	            if (params.loop) {
	                _this.fixLoop();
	                _this.swipeNext(true, true);
	            }
	            else if (!_this.swipeNext(true, true)) {
	                if (!params.autoplayStopOnLast) _this.swipeTo(0);
	                else {
	                    clearTimeout(autoplayTimeoutId);
	                    autoplayTimeoutId = undefined;
	                }
	            }
	            _this.wrapperTransitionEnd(function () {
	                if (typeof autoplayTimeoutId !== 'undefined') autoplay();
	            });
	        }, params.autoplay);
	    }
	    /*==================================================
	        Loop
	    ====================================================*/
	    _this.loopCreated = false;
	    _this.removeLoopedSlides = function () {
	        if (_this.loopCreated) {
	            for (var i = 0; i < _this.slides.length; i++) {
	                if (_this.slides[i].getData('looped') === true) _this.wrapper.removeChild(_this.slides[i]);
	            }
	        }
	    };

	    _this.createLoop = function () {
	        if (_this.slides.length === 0) return;
	        if (params.slidesPerView === 'auto') {
	            _this.loopedSlides = params.loopedSlides || 1;
	        }
	        else {
	            _this.loopedSlides = Math.floor(params.slidesPerView) + params.loopAdditionalSlides;
	        }

	        if (_this.loopedSlides > _this.slides.length) {
	            _this.loopedSlides = _this.slides.length;
	        }

	        var slideFirstHTML = '',
	            slideLastHTML = '',
	            i;
	        var slidesSetFullHTML = '';
	        /**
	                loopedSlides is too large if loopAdditionalSlides are set.
	                Need to divide the slides by maximum number of slides existing.

	                @author        Tomaz Lovrec <tomaz.lovrec@blanc-noir.at>
	        */
	        var numSlides = _this.slides.length;
	        var fullSlideSets = Math.floor(_this.loopedSlides / numSlides);
	        var remainderSlides = _this.loopedSlides % numSlides;
	        // assemble full sets of slides
	        for (i = 0; i < (fullSlideSets * numSlides); i++) {
	            var j = i;
	            if (i >= numSlides) {
	                var over = Math.floor(i / numSlides);
	                j = i - (numSlides * over);
	            }
	            slidesSetFullHTML += _this.slides[j].outerHTML;
	        }
	        // assemble remainder slides
	        // assemble remainder appended to existing slides
	        for (i = 0; i < remainderSlides;i++) {
	            slideLastHTML += addClassToHtmlString(params.slideDuplicateClass, _this.slides[i].outerHTML);
	        }
	        // assemble slides that get preppended to existing slides
	        for (i = numSlides - remainderSlides; i < numSlides;i++) {
	            slideFirstHTML += addClassToHtmlString(params.slideDuplicateClass, _this.slides[i].outerHTML);
	        }
	        // assemble all slides
	        var slides = slideFirstHTML + slidesSetFullHTML + wrapper.innerHTML + slidesSetFullHTML + slideLastHTML;
	        // set the slides
	        wrapper.innerHTML = slides;

	        _this.loopCreated = true;
	        _this.calcSlides();

	        //Update Looped Slides with special class
	        for (i = 0; i < _this.slides.length; i++) {
	            if (i < _this.loopedSlides || i >= _this.slides.length - _this.loopedSlides) _this.slides[i].setData('looped', true);
	        }
	        _this.callPlugins('onCreateLoop');

	    };

	    _this.fixLoop = function () {
	        var newIndex;
	        //Fix For Negative Oversliding
	        if (_this.activeIndex < _this.loopedSlides) {
	            newIndex = _this.slides.length - _this.loopedSlides * 3 + _this.activeIndex;
	            _this.swipeTo(newIndex, 0, false);
	        }
	        //Fix For Positive Oversliding
	        else if ((params.slidesPerView === 'auto' && _this.activeIndex >= _this.loopedSlides * 2) || (_this.activeIndex > _this.slides.length - params.slidesPerView * 2)) {
	            newIndex = -_this.slides.length + _this.activeIndex + _this.loopedSlides;
	            _this.swipeTo(newIndex, 0, false);
	        }
	    };

	    /*==================================================
	        Slides Loader
	    ====================================================*/
	    _this.loadSlides = function () {
	        var slidesHTML = '';
	        _this.activeLoaderIndex = 0;
	        var slides = params.loader.slides;
	        var slidesToLoad = params.loader.loadAllSlides ? slides.length : params.slidesPerView * (1 + params.loader.surroundGroups);
	        for (var i = 0; i < slidesToLoad; i++) {
	            if (params.loader.slidesHTMLType === 'outer') slidesHTML += slides[i];
	            else {
	                slidesHTML += '<' + params.slideElement + ' class="' + params.slideClass + '" data-swiperindex="' + i + '">' + slides[i] + '</' + params.slideElement + '>';
	            }
	        }
	        _this.wrapper.innerHTML = slidesHTML;
	        _this.calcSlides(true);
	        //Add permanent transitionEnd callback
	        if (!params.loader.loadAllSlides) {
	            _this.wrapperTransitionEnd(_this.reloadSlides, true);
	        }
	    };

	    _this.reloadSlides = function () {
	        var slides = params.loader.slides;
	        var newActiveIndex = parseInt(_this.activeSlide().data('swiperindex'), 10);
	        if (newActiveIndex < 0 || newActiveIndex > slides.length - 1) return; //<-- Exit
	        _this.activeLoaderIndex = newActiveIndex;
	        var firstIndex = Math.max(0, newActiveIndex - params.slidesPerView * params.loader.surroundGroups);
	        var lastIndex = Math.min(newActiveIndex + params.slidesPerView * (1 + params.loader.surroundGroups) - 1, slides.length - 1);
	        //Update Transforms
	        if (newActiveIndex > 0) {
	            var newTransform = -slideSize * (newActiveIndex - firstIndex);
	            _this.setWrapperTranslate(newTransform);
	            _this.setWrapperTransition(0);
	        }
	        var i; // loop index
	        //New Slides
	        if (params.loader.logic === 'reload') {
	            _this.wrapper.innerHTML = '';
	            var slidesHTML = '';
	            for (i = firstIndex; i <= lastIndex; i++) {
	                slidesHTML += params.loader.slidesHTMLType === 'outer' ? slides[i] : '<' + params.slideElement + ' class="' + params.slideClass + '" data-swiperindex="' + i + '">' + slides[i] + '</' + params.slideElement + '>';
	            }
	            _this.wrapper.innerHTML = slidesHTML;
	        }
	        else {
	            var minExistIndex = 1000;
	            var maxExistIndex = 0;

	            for (i = 0; i < _this.slides.length; i++) {
	                var index = _this.slides[i].data('swiperindex');
	                if (index < firstIndex || index > lastIndex) {
	                    _this.wrapper.removeChild(_this.slides[i]);
	                }
	                else {
	                    minExistIndex = Math.min(index, minExistIndex);
	                    maxExistIndex = Math.max(index, maxExistIndex);
	                }
	            }
	            for (i = firstIndex; i <= lastIndex; i++) {
	                var newSlide;
	                if (i < minExistIndex) {
	                    newSlide = document.createElement(params.slideElement);
	                    newSlide.className = params.slideClass;
	                    newSlide.setAttribute('data-swiperindex', i);
	                    newSlide.innerHTML = slides[i];
	                    _this.wrapper.insertBefore(newSlide, _this.wrapper.firstChild);
	                }
	                if (i > maxExistIndex) {
	                    newSlide = document.createElement(params.slideElement);
	                    newSlide.className = params.slideClass;
	                    newSlide.setAttribute('data-swiperindex', i);
	                    newSlide.innerHTML = slides[i];
	                    _this.wrapper.appendChild(newSlide);
	                }
	            }
	        }
	        //reInit
	        _this.reInit(true);
	    };

	    /*==================================================
	        Make Swiper
	    ====================================================*/
	    function makeSwiper() {
	        _this.calcSlides();
	        if (params.loader.slides.length > 0 && _this.slides.length === 0) {
	            _this.loadSlides();
	        }
	        if (params.loop) {
	            _this.createLoop();
	        }
	        _this.init();
	        initEvents();
	        if (params.pagination) {
	            _this.createPagination(true);
	        }

	        if (params.loop || params.initialSlide > 0) {
	            _this.swipeTo(params.initialSlide, 0, false);
	        }
	        else {
	            _this.updateActiveSlide(0);
	        }
	        if (params.autoplay) {
	            _this.startAutoplay();
	        }
	        /**
	         * Set center slide index.
	         *
	         * @author        Tomaz Lovrec <tomaz.lovrec@gmail.com>
	         */
	        _this.centerIndex = _this.activeIndex;

	        // Callbacks
	        if (params.onSwiperCreated) _this.fireCallback(params.onSwiperCreated, _this);
	        _this.callPlugins('onSwiperCreated');
	    }

	    makeSwiper();
	};

	Swiper.prototype = {
	    plugins : {},

	    /*==================================================
	        Wrapper Operations
	    ====================================================*/
	    wrapperTransitionEnd : function (callback, permanent) {
	        'use strict';
	        var a = this,
	            el = a.wrapper,
	            events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
	            i;

	        function fireCallBack(e) {
	            if (e.target !== el) return;
	            callback(a);
	            if (a.params.queueEndCallbacks) a._queueEndCallbacks = false;
	            if (!permanent) {
	                for (i = 0; i < events.length; i++) {
	                    a.h.removeEventListener(el, events[i], fireCallBack);
	                }
	            }
	        }

	        if (callback) {
	            for (i = 0; i < events.length; i++) {
	                a.h.addEventListener(el, events[i], fireCallBack);
	            }
	        }
	    },

	    getWrapperTranslate : function (axis) {
	        'use strict';
	        var el = this.wrapper,
	            matrix, curTransform, curStyle, transformMatrix;

	        // automatic axis detection
	        if (typeof axis === 'undefined') {
	            axis = this.params.mode === 'horizontal' ? 'x' : 'y';
	        }

	        if (this.support.transforms && this.params.useCSS3Transforms) {
	            curStyle = window.getComputedStyle(el, null);
	            if (window.WebKitCSSMatrix) {
	                // Some old versions of Webkit choke when 'none' is passed; pass
	                // empty string instead in this case
	                transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
	            }
	            else {
	                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
	                matrix = transformMatrix.toString().split(',');
	            }

	            if (axis === 'x') {
	                //Latest Chrome and webkits Fix
	                if (window.WebKitCSSMatrix)
	                    curTransform = transformMatrix.m41;
	                //Crazy IE10 Matrix
	                else if (matrix.length === 16)
	                    curTransform = parseFloat(matrix[12]);
	                //Normal Browsers
	                else
	                    curTransform = parseFloat(matrix[4]);
	            }
	            if (axis === 'y') {
	                //Latest Chrome and webkits Fix
	                if (window.WebKitCSSMatrix)
	                    curTransform = transformMatrix.m42;
	                //Crazy IE10 Matrix
	                else if (matrix.length === 16)
	                    curTransform = parseFloat(matrix[13]);
	                //Normal Browsers
	                else
	                    curTransform = parseFloat(matrix[5]);
	            }
	        }
	        else {
	            if (axis === 'x') curTransform = parseFloat(el.style.left, 10) || 0;
	            if (axis === 'y') curTransform = parseFloat(el.style.top, 10) || 0;
	        }
	        return curTransform || 0;
	    },

	    setWrapperTranslate : function (x, y, z) {
	        'use strict';
	        var es = this.wrapper.style,
	            coords = {x: 0, y: 0, z: 0},
	            translate;

	        // passed all coordinates
	        if (arguments.length === 3) {
	            coords.x = x;
	            coords.y = y;
	            coords.z = z;
	        }

	        // passed one coordinate and optional axis
	        else {
	            if (typeof y === 'undefined') {
	                y = this.params.mode === 'horizontal' ? 'x' : 'y';
	            }
	            coords[y] = x;
	        }

	        if (this.support.transforms && this.params.useCSS3Transforms) {
	            translate = this.support.transforms3d ? 'translate3d(' + coords.x + 'px, ' + coords.y + 'px, ' + coords.z + 'px)' : 'translate(' + coords.x + 'px, ' + coords.y + 'px)';
	            es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = translate;
	        }
	        else {
	            es.left = coords.x + 'px';
	            es.top  = coords.y + 'px';
	        }
	        this.callPlugins('onSetWrapperTransform', coords);
	        if (this.params.onSetWrapperTransform) this.fireCallback(this.params.onSetWrapperTransform, this, coords);
	    },

	    setWrapperTransition : function (duration) {
	        'use strict';
	        var es = this.wrapper.style;
	        es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = (duration / 1000) + 's';
	        this.callPlugins('onSetWrapperTransition', {duration: duration});
	        if (this.params.onSetWrapperTransition) this.fireCallback(this.params.onSetWrapperTransition, this, duration);

	    },

	    /*==================================================
	        Helpers
	    ====================================================*/
	    h : {
	        getWidth: function (el, outer, round) {
	            'use strict';
	            var width = window.getComputedStyle(el, null).getPropertyValue('width');
	            var returnWidth = parseFloat(width);
	            //IE Fixes
	            if (isNaN(returnWidth) || width.indexOf('%') > 0 || returnWidth < 0) {
	                returnWidth = el.offsetWidth - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-left')) - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-right'));
	            }
	            if (outer) returnWidth += parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-left')) + parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-right'));
	            if (round) return Math.ceil(returnWidth);
	            else return returnWidth;
	        },
	        getHeight: function (el, outer, round) {
	            'use strict';
	            if (outer) return el.offsetHeight;

	            var height = window.getComputedStyle(el, null).getPropertyValue('height');
	            var returnHeight = parseFloat(height);
	            //IE Fixes
	            if (isNaN(returnHeight) || height.indexOf('%') > 0 || returnHeight < 0) {
	                returnHeight = el.offsetHeight - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-top')) - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-bottom'));
	            }
	            if (outer) returnHeight += parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-top')) + parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-bottom'));
	            if (round) return Math.ceil(returnHeight);
	            else return returnHeight;
	        },
	        getOffset: function (el) {
	            'use strict';
	            var box = el.getBoundingClientRect();
	            var body = document.body;
	            var clientTop  = el.clientTop  || body.clientTop  || 0;
	            var clientLeft = el.clientLeft || body.clientLeft || 0;
	            var scrollTop  = window.pageYOffset || el.scrollTop;
	            var scrollLeft = window.pageXOffset || el.scrollLeft;
	            if (document.documentElement && !window.pageYOffset) {
	                //IE7-8
	                scrollTop  = document.documentElement.scrollTop;
	                scrollLeft = document.documentElement.scrollLeft;
	            }
	            return {
	                top: box.top  + scrollTop  - clientTop,
	                left: box.left + scrollLeft - clientLeft
	            };
	        },
	        windowWidth : function () {
	            'use strict';
	            if (window.innerWidth) return window.innerWidth;
	            else if (document.documentElement && document.documentElement.clientWidth) return document.documentElement.clientWidth;
	        },
	        windowHeight : function () {
	            'use strict';
	            if (window.innerHeight) return window.innerHeight;
	            else if (document.documentElement && document.documentElement.clientHeight) return document.documentElement.clientHeight;
	        },
	        windowScroll : function () {
	            'use strict';
	            if (typeof pageYOffset !== 'undefined') {
	                return {
	                    left: window.pageXOffset,
	                    top: window.pageYOffset
	                };
	            }
	            else if (document.documentElement) {
	                return {
	                    left: document.documentElement.scrollLeft,
	                    top: document.documentElement.scrollTop
	                };
	            }
	        },

	        addEventListener : function (el, event, listener, useCapture) {
	            'use strict';
	            if (typeof useCapture === 'undefined') {
	                useCapture = false;
	            }

	            if (el.addEventListener) {
	                el.addEventListener(event, listener, useCapture);
	            }
	            else if (el.attachEvent) {
	                el.attachEvent('on' + event, listener);
	            }
	        },

	        removeEventListener : function (el, event, listener, useCapture) {
	            'use strict';
	            if (typeof useCapture === 'undefined') {
	                useCapture = false;
	            }

	            if (el.removeEventListener) {
	                el.removeEventListener(event, listener, useCapture);
	            }
	            else if (el.detachEvent) {
	                el.detachEvent('on' + event, listener);
	            }
	        }
	    },
	    setTransform : function (el, transform) {
	        'use strict';
	        var es = el.style;
	        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = transform;
	    },
	    setTranslate : function (el, translate) {
	        'use strict';
	        var es = el.style;
	        var pos = {
	            x : translate.x || 0,
	            y : translate.y || 0,
	            z : translate.z || 0
	        };
	        var transformString = this.support.transforms3d ? 'translate3d(' + (pos.x) + 'px,' + (pos.y) + 'px,' + (pos.z) + 'px)' : 'translate(' + (pos.x) + 'px,' + (pos.y) + 'px)';
	        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = transformString;
	        if (!this.support.transforms) {
	            es.left = pos.x + 'px';
	            es.top = pos.y + 'px';
	        }
	    },
	    setTransition : function (el, duration) {
	        'use strict';
	        var es = el.style;
	        es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = duration + 'ms';
	    },
	    /*==================================================
	        Feature Detection
	    ====================================================*/
	    support: {

	        touch : (window.Modernizr && Modernizr.touch === true) || (function () {
	            'use strict';
	            return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	        })(),

	        transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
	            'use strict';
	            var div = document.createElement('div').style;
	            return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
	        })(),

	        transforms : (window.Modernizr && Modernizr.csstransforms === true) || (function () {
	            'use strict';
	            var div = document.createElement('div').style;
	            return ('transform' in div || 'WebkitTransform' in div || 'MozTransform' in div || 'msTransform' in div || 'MsTransform' in div || 'OTransform' in div);
	        })(),

	        transitions : (window.Modernizr && Modernizr.csstransitions === true) || (function () {
	            'use strict';
	            var div = document.createElement('div').style;
	            return ('transition' in div || 'WebkitTransition' in div || 'MozTransition' in div || 'msTransition' in div || 'MsTransition' in div || 'OTransition' in div);
	        })(),

	        classList : (function () {
	            'use strict';
	            var div = document.createElement('div');
	            return 'classList' in div;
	        })()
	    },

	    browser : {

	        ie8 : (function () {
	            'use strict';
	            var rv = -1; // Return value assumes failure.
	            if (navigator.appName === 'Microsoft Internet Explorer') {
	                var ua = navigator.userAgent;
	                var re = new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/);
	                if (re.exec(ua) !== null)
	                    rv = parseFloat(RegExp.$1);
	            }
	            return rv !== -1 && rv < 9;
	        })(),

	        ie10 : window.navigator.msPointerEnabled,
	        ie11 : window.navigator.pointerEnabled
	    }
	};

	/*=========================
	  jQuery & Zepto Plugins
	  ===========================*/
	if (window.jQuery || window.Zepto) {
	    (function ($) {
	        'use strict';
	        $.fn.swiper = function (params) {
	            var firstInstance;
	            this.each(function (i) {
	                var that = $(this);
	                var s = new Swiper(that[0], params);
	                if (!i) firstInstance = s;
	                that.data('swiper', s);
	            });
	            return firstInstance;
	        };
	    })(window.jQuery || window.Zepto);
	}

	// CommonJS support
	if (true) {
	    module.exports = Swiper;

	// requirejs support
	} else if (typeof define === 'function' && define.amd) {
	    define([], function () {
	        'use strict';
	        return Swiper;
	    });
	}


/***/ }
/******/ ]);