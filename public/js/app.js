define(['angular', 'app.controllers', 'appConfig'], function(angular, xxx, appConfig) {

  var myApp = angular.module('myApp', ['app.controllers'])
  .constant('appConfig', appConfig);

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['myApp']);
  });

  return myApp;
});
