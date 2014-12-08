$(function () {
  'use strict';

  module('toggles plugin')

  test('should be defined on jquery object', function () {
    ok($(document.body).toggles, 'toggles method is defined')
  })

  module('toggles', {
    setup: function () {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapToggles = $.fn.toggles.noConflict()
    },
    teardown: function () {
      $.fn.toggles = $.fn.bootstrapToggles
      delete $.fn.bootstrapToggles
    }
  })

  test('should provide no conflict', function () {
    strictEqual($.fn.toggles, undefined, 'tooltip was set back to undefined (org value)')
  })

  test('should return jquery collection containing the element', function () {
    var $el = $('<input type="radio" class="flat" />')
    var $toggles = $el.bootstrapToggles()
    ok($toggles instanceof $, 'returns jquery collection')
    strictEqual($toggles[0], $el[0], 'collection contains element')
  })

})
