/*!
 * bootstrappify v3.3.1 (https://github.com/furplag/bootstrappify/)
 * Copyright 2014 furplag
 * Licensed under MIT (https://github.com/furplag/bootstrappify/blob/master/LICENSE)
 * Bootstrappify is an extension that adding a few features for Bootstrap 3.
 * Based on Bootstrap (http://getbootstrap.com)
 */

/* ========================================================================
 * Bootstrappify: bootstrappify.normalize.js v3.3.1
 * ========================================================================
 * Copyright 2014 furplag
 * Licensed under MIT (https://github.com/furplag/bootstrappify/blob/master/LICENSE)
 * ======================================================================== */

var Sxxk = {};
!(function () {
  'use strict';

  if (!Array.prototype.indexOf) Array.prototype.indexOf = function (e/*,n*/) {
    if (this == null) throw new TypeError()
    var t = Object(this)
    var len = t.length >>> 0
    var n = arguments.length > 0 ? Number(arguments[1]) : 0
    if (len === 0) return -1
    n = n != n ? 0 : n !== 0 && n != Infinity && n != -Infinity ? (n > 0 || -1) * Math.floor(Math.abs(n)) : n
    if (n >= len) return -1
    var k = n >= 0 ? n : Math.max(len - Math.abs(n),0)
    for (; k < len; k++) {
      if (k in t && t[k] === e) {
        return k
      }
      return -1
    }
  }

  if (!String.format) String.prototype.format = function (s) {
    if (typeof s === 'object') return this.replace(/\{(\w+)\}/g, function (e,k) {return s[k]})
    var a = arguments
    var i = 0
    return this.replace(/\{(\w+)\}/g, function () {i++; return '{' + (i - 1) + '}'}).replace(/\{(\w+)\}/g, function (e, k) {return a[k]})
  }

  if (!Array.isArray) Array.isArray = function (a) {
    return Object.prototype.toString.call(a) === '[object Array]'
  }

  if (!Array.forEach) Array.prototype.forEach = function (f, a) {
    var t = a || null
    var k = 0
    var o = Object(this)
    var l = o.length >>> 0
    while (k < l) {
      var kv
      if (k in o) {
        kv = o[k]
        f.call(t, kv, k, o)
      }
      k++
    }
  }

  if (!Array.map) Array.prototype.map = function (f) {
    var r = []
    for (var i = 0; i < this.length; i++) {
      r.push(f(this[i]))
    }
    return r
  }
  if (!Array.filter) Array.prototype.filter = function (fn) {
    if (this == null) throw new TypeError()
    var t = Object(this)
    var len = t.length >>> 0
    if (typeof fn != 'function') throw new TypeError()
    var res = []
    var thisp = arguments[1]
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i]
        if (fn.call(thisp, val, i, t)) res.push(val)
      }
    }
    return res
  }
  if (!Object.flip) Object.flip = function (o) {
    var r = {}
    for (var k in o) {
      if (o.hasOwnProperty(k)) r[o[k]] = k
    }
    return r
  }
  if (!Object.keys) Object.keys = function (o) {
    var r = []
    for (var i in o) {
      if (o.hasOwnProperty(i)) r.push(i)
    }
    return r
  }
  if (!Object.values) Object.values = function (o) {
    return Object.keys(o).map(function (v) {return o[v]})
  }
  if (!Object.extend) Object.extend = function (o) {
    var e = [].slice.call(arguments, 1)
    e.forEach(function (l) {for (var k in l) o[k] = l[k]})
    return o
  }
})(Sxxk)

/*
 * ========================================================================
 * Bootstrappify: bootstrappify.toggles.js v3.3.1
 * ========================================================================
 * Copyright 2014 furplag Licensed under MIT
 * (https://github.com/furplag/bootstrappify/blob/master/LICENSE)
 * ========================================================================
 */

+(function ($) {
  'use strict'

  var Toggles = function (element, options) {

    this.$element = $(element)
    this.options = options

    if (/Microsoft Internet Explorer/i.test(window.navigator.appName) || $('html').is('.lt-ie9')) return
    if (!this.$element.is(Toggles.TARGET_ELEMENT)) return

    this.init()
  }

  Toggles.VERSION = '3.3.1'

  Toggles.TARGET_ELEMENT = [
                            '.flat input[type="checkbox"]',
                            '.switch input[type="checkbox"]',
                            'input[type="checkbox"].flat',
                            'input[type="checkbox"].switch',
                            '.flat input[type="radio"]',
                            '.switch input[type="radio"]',
                            'input[type="radio"].flat',
                            'input[type="radio"].switch'
  ].join(',')

  Toggles.DEFAULTS = {
    injectElement: '<span class="ui-element" />'
  }

  Toggles.prototype = {

    constructor: Toggles,

    init: function () {

      if (!this.$element.next('span.ui-element').size()) {
        this.$element.after(' ' + this.options.injectElement)
        if (this.$element.is('.large, .small') && this.$element.parent().is('label')) this.$element.parent().addClass(this.$element.is('.large') ? 'large' : 'small')
      }

      if (document.arrive) document.arrive (Toggles.TARGET_ELEMENT, function () {$(this).toggles()})
    }
  }

  function Plugin (option) {
    return this.each (function () {
      var $this = $(this)
      var data = $this.data('bs.toggles')
      var options = $.extend({}, Toggles.DEFAULTS, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('bs.toggles', (data = new Toggles(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.toggles

  $.fn.toggles = Plugin
  $.fn.toggles.Constructor = Toggles

  $.fn.toggles.noConflict = function () {
    $.fn.toggles = old
    return this
  }

  $(Toggles.TARGET_ELEMENT).toggles()

})(window.jQuery)
