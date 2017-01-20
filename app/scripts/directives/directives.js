angular.module('apApp.directives', []).

	// Layout Related Directives
	directive('userInfoNavbar', function(){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/layout/user-info-navbar.html',
			controller: 'UserInfoNavbarCtrl'
		};
	}).
	directive('settingsPane', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/layout/settings-pane.html',
			controller: 'SettingsPaneCtrl'
		};
	}).
	directive('sidebarMenu', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/layout/sidebar-menu.html',
			controller: 'SidebarMenuCtrl'
		};
	}).
	directive('sidebarLogo', function(){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/layout/sidebar-logo.html'
		};
	}).
	directive('pageTitle', function(){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/layout/page-title.html',
			link: function(scope, el, attr){
				scope.title = attr.title;
				scope.description = attr.description;
			}
		};
	}).
	directive('siteFooter', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/layout/footer.html'
		};
	})
