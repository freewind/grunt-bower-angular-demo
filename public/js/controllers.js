define(['angular'], function(angular) {
  return angular.module('app.controllers', [])
    .controller('MyController', ['$scope',
      function($scope) {
        $scope.name = 'Change the name';
      }
    ]);
});
