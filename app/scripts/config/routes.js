'use strict';

app.run(function() {
  // Page Loading Overlay
  public_vars.$pageLoadingOverlay = jQuery('.page-loading-overlay');

  jQuery(window).load(function() {
    public_vars.$pageLoadingOverlay.addClass('loaded');
  });
});

app.config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

  $urlRouterProvider.otherwise('/admin-role');

  $stateProvider.
  // Main Layout Structure
  state('app', {
    abstract: true,
    url: '',
    templateUrl: 'views/layout/app-body.html',
    controller: function($rootScope) {
      $rootScope.isLoginPage = false;
      $rootScope.isLightLoginPage = false;
      $rootScope.isLockscreenPage = false;
      $rootScope.isMainPage = true;
    }
  }).

  // Administration Module
  state('app.admin-role', {
    url: '/admin-role',
    templateUrl: 'modules/admin/views/roleEntity.html',
    controller: 'RoleEntityCtrl',
    controllerAs: 'roleEntityCtrl'
  }).

  state('app.admin-user', {
    url: '/admin-user?selectedId=id',
    templateUrl: 'modules/admin/views/user.html',
    controller: 'UserCtrl',
    controllerAs: 'userCtrl'
  }).

  state('app.admin-user-list', {
    url: '/admin-user-list',
    templateUrl: 'modules/admin/views/userList.html',
    controller: 'UserListCtrl',
    controllerAs: 'userListCtrl'
  }).
  state('app.admin-location', {
    url: '/admin-location?selectedId=id',
    templateUrl: 'modules/admin/views/location.html',
    controller: 'LocationCtrl',
    controllerAs: 'locationCtrl'
  }).
  state('app.admin-location-list', {
    url: '/admin-location-list',
    templateUrl: 'modules/admin/views/locationList.html',
    controller: 'LocationListCtrl',
    controllerAs: 'locationListCtrl'
  })
  ;
});
// Angular Translate
app.config(['$translateProvider', function($translateProvider, LOCALES) {
  $translateProvider.useStaticFilesLoader({
    prefix: 'resources/locale-',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('en_US');
  $translateProvider.useLocalStorage();
}]);
