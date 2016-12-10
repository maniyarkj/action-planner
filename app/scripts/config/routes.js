'use strict';

app.run(function()
{
	// Page Loading Overlay
	public_vars.$pageLoadingOverlay = jQuery('.page-loading-overlay');

	jQuery(window).load(function()
	{
		public_vars.$pageLoadingOverlay.addClass('loaded');
	})
});


app.config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, ASSETS){

	$urlRouterProvider.otherwise('/admin-role');

	$stateProvider.
		// Main Layout Structure
		state('app', {
			abstract: true,
			url: '',
			templateUrl: 'views/layout/app-body.html',
			controller: function($rootScope){
				$rootScope.isLoginPage        = false;
				$rootScope.isLightLoginPage   = false;
				$rootScope.isLockscreenPage   = false;
				$rootScope.isMainPage         = true;
			}
		}).

		// Layouts
		state('app.layout-and-skins', {
			url: '/layout-and-skins',
			templateUrl: appHelper.templatePath('layout-and-skins'),
		}).

		// Administration Module
		state('app.admin-role', {
			url: '/admin-role',
			templateUrl: 'modules/admin/views/roleEntity.html',
			controller: 'RoleEntityCtrl',
			controllerAs: 'roleEntityCtrl'
		}).

		state('app.admin-user', {
			url: '/admin-user',
			templateUrl: 'modules/admin/views/user.html',
			controller: 'UserCtrl',
			controllerAs: 'userCtrl'
		}).

		// Logins and Lockscreen
		state('login', {
			url: '/login',
			templateUrl: appHelper.templatePath('login'),
			controller: 'LoginCtrl',
			resolve: {
				resources: function($ocLazyLoad){
					return $ocLazyLoad.load([
						ASSETS.forms.jQueryValidate,
						ASSETS.extra.toastr,
					]);
				},
			}
		}).
		state('login-light', {
			url: '/login-light',
			templateUrl: appHelper.templatePath('login-light'),
			controller: 'LoginLightCtrl',
			resolve: {
				resources: function($ocLazyLoad){
					return $ocLazyLoad.load([
						ASSETS.forms.jQueryValidate,
					]);
				},
			}
		}).
		state('lockscreen', {
			url: '/lockscreen',
			templateUrl: appHelper.templatePath('lockscreen'),
			controller: 'LockscreenCtrl',
			resolve: {
				resources: function($ocLazyLoad){
					return $ocLazyLoad.load([
						ASSETS.forms.jQueryValidate,
						ASSETS.extra.toastr,
					]);
				},
			}
		});
})
// Angular Translate
 app.config(['$translateProvider', function ($translateProvider, DEBUG_MODE, LOCALES) {
  if (DEBUG_MODE) {
 	 $translateProvider.useMissingTranslationHandlerLog();// warns about missing translates
  }

  $translateProvider.useStaticFilesLoader({
 	 prefix: 'resources/locale-',
 	 suffix: '.json'
  });

  $translateProvider.preferredLanguage('en_US');
  $translateProvider.useLocalStorage();
 }])
 // Angular Dynamic Locale
 // app.config(function (tmhDynamicLocaleProvider) {
 //  tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
 // });
