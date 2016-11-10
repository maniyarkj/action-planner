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
	'ui.tree',

	'baseApp.controllers',
	'apApp.controllers',
	'apApp.directives',
	'apApp.factory',
	'apApp.services',
	// Added in v1.3
	//'FBAngular'
]);

angular.module('apApp.controllers', []);
angular.module('apApp.directives', []);
angular.module('apApp.services', []);
angular.module('apApp.factory', []);