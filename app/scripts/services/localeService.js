angular.module('apApp.services').
  service('LocaleService', function ($translate, LOCALES) {
    'use strict';
    // PREPARING LOCALES INFO
    var localesObj = LOCALES.locales;
    var currentLocale = Object.keys(LOCALES.preferredLocale)[0];

    // locales and locales display names
    var _LOCALES = Object.keys(localesObj);
    var _LOCALES_DISPLAY_NAMES = [];

    _LOCALES.forEach(function (locale) {
      _LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
    });

    var setLocale = function (locale) {
      currentLocale = locale;// updating current locale
      $translate.use(locale);
    };

    return {
      getLocaleDisplayName: function () {
        return localesObj[currentLocale];
      },
      setLocaleByDisplayName: function (localeDisplayName) {
        setLocale(
          _LOCALES[
            _LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)// get locale index
            ]
        );
      },
      getLocalesDisplayNames: function () {
        return _LOCALES_DISPLAY_NAMES;
      }
    };
});
