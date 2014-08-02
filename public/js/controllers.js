define(['angular'], function(angular) {
	return angular.module('app.controllers', [])
	.controller('MyController', ['$rootScope', '$scope', '$http', 'appConfig',
		function($rootScope, $scope, $http, appConfig) {
			$scope.name = 'Change the name';
			$scope.age = 0;
			$http.get('/public/data/' + appConfig.name + ".json")
			.success(function(data) {
				$scope.age=data.age;
			})
		}])
	.controller('ConfigController', ['$scope', function($scope) {

	}]);
});
