angular.module('apApp.directives')
.directive('ngTranslateLanguageSelect', function (LocaleService) { 'use strict';
        return {
            restrict: 'A',
            replace: true,
            template: ''+
            // '<div class="language-select languages" ng-if="visible">'+
            //     '<label>'+
            //         '<select ng-model="currentLocaleDisplayName"'+
            //             'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
            //             'ng-change="changeLanguage(currentLocaleDisplayName)">'+
            //         '</select>'+
            //     '</label>'+
            // '</div>'+
            // '',

            '<ul class="languages dropdown-menu" ng-if="visible">'+
                '<li class="" ng-repeat="localesDisplayName in localesDisplayNames">'+
                    '<a href="#" ng-click="changeLanguage(localesDisplayName)">'+
                        '{{localesDisplayName}}' +
                    '</a>'+
                '</li>'+
            '</ul>'+
            '',

            controller: function ($scope) {
                $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
                $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
                $scope.visible = $scope.localesDisplayNames &&
                $scope.localesDisplayNames.length > 1;
                console.log($scope.localesDisplayNames);
                $scope.changeLanguage = function (locale) {
                    LocaleService.setLocaleByDisplayName(locale);
                };
            }
        };
    });
