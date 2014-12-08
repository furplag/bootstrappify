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
