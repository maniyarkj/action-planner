var app = angular.module('apApp', [
	'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ui.bootstrap',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'ui.router',
	'oc.lazyLoad',
	'pascalprecht.translate',
	'ngFileUpload',
	'angularMoment',
  // 'tmh.dynamicLocale',

	'baseApp.controllers',
	'apApp.controllers',
	'apApp.directives',
	'apApp.factory',
	'apApp.services',

	// Module wise Controllers & Services
	'apApp.adminModules.controllers',
	'apApp.adminModules.services',
	// Added in v1.3
	//'FBAngular'

    'ui.tree'
]);

angular.module('apApp.controllers', []);
angular.module('apApp.directives', []);
angular.module('apApp.services', []);
angular.module('apApp.factory', []);
angular.module('apApp.adminModules.controllers', []);
angular.module('apApp.adminModules.services', []);
