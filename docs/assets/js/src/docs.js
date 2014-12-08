!function ($) {

  'use strict';

  $(function () {
    if (['fullpage'] || $.fn.fullpage) {
      var menuAnchors = []
      $('[data-menuanchor]').each(function () {menuAnchors.push($(this).data('menuanchor'))})
      $('#header-navigation [data-menuanchor]:first').addClass('active')
      $('#content').fullpage({
        anchors: menuAnchors,
        css3: true,
        menu: '#header-navigation, #footer-navigation',
        resize: false,
        scrollOverflow: true,
        sectionsColor: ['#348bac', '#7db500', '#00a1cb', '#f18d05', '#7db500', '#00a1cb', '#f18d05', '#7db500', '#00a1cb', '#f18d05'],
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        verticalCentered: true
      })
    }
  })
}(jQuery)
