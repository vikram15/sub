(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerRegisterationCtrl', ['$scope', '$state', 'EmployerServices', 'UserMetaDataService', function($scope, $state, EmployerServices, UserMetaDataService) {
    $scope.isShowEmailExist = 'ng-hide';
    $scope.emailExist = '';

    $scope.onRegisterFormSubmit = function(isValid) {
      //if ($scope.termCondition.value === true) {
        $scope.submitted = true;
        if(isValid){
          var requestParams = {
            'email': $scope.email,
            'password': $scope.password,
            'name': $scope.company
          };
        EmployerServices.setEmployer(requestParams, $scope.onSetEmployerRegistrationSuccess, $scope.onSetEmployerRegistrationError);
        }
    };

    $scope.onSetEmployerRegistrationSuccess = function(response) {
      var result = response.data;
      if (result !== null) {
        UserMetaDataService.setEmployerDetail(result);
        $state.go('employerTempProfile');
      }
    };

    $scope.onSetEmployerRegistrationError = function(response) {
    };

    $scope.checkUser = function() {
      var requestParams = {
        'email': $scope.email
      };
      EmployerServices.checkUserByEmail(requestParams, $scope.onSuccessCheckUser, $scope.onErrorCheckUser);
    };

    $scope.onSuccessCheckUser = function (response) {
      if (response.data === true) {
        $scope.isShowEmailExist = 'ng-show';
        $scope.emailExist = 'User already exist.';
      }
      else  {
        $scope.isShowEmailExist = 'ng-hide';
        $scope.emailExist = '';
      }
    };

    $scope.onErrorCheckUser= function(response) {
    };
  }]);
})();
