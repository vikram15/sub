(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerChangePasswordCtrl', function ($scope) {
  	$scope.onChangePasswordFormSubmit = function(isValid){
  		$scope.submitted = true;
  		if(isValid){

  		}
  	}
  });
})();
