define(['angular', 'angularMocks', 'app.controllers'], function(angular, mocks, appModule) {
  describe('MyController', function() {

    var MyController, scope;

		beforeEach(function() {
			mocks.module('app.controllers');
			mocks.inject(function($rootScope, $controller) {
				scope = $rootScope.$new();
				MyController = $controller('MyController', {
					$scope: scope
				});
			});
		});

    it('should have added name to $scope', function() {
      expect(scope.name).toBe("Change the name");
    });
  });
});
