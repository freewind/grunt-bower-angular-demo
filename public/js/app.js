define(['angular', 'app.controllers'], function(angular, xxx) {
  var myApp = angular.module('myApp', ['app.controllers']);

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['myApp']);
  });

  return myApp;
});
