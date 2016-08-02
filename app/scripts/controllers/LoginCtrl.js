(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('LoginCtrl', ['$scope', '$state', 'AuthService','$rootScope','$timeout', function ($scope, $state, AuthService,$rootScope,$timeout) {

    // alerts display
    $rootScope.alerts = [];
    $rootScope.closeAlert = function(index) {
      $rootScope.alerts.splice(index, 1);
    };

    $scope.onLoginFormSubmit = function() {
     $scope.emailError = false;
     $rootScope.error = true;
     $scope.passwordError = false;
     $scope.serverError = false;
     //  first checks if email is valid then checks the password
     if($scope.signInForm.email.$valid){
       $scope.emailError = false;
       if($scope.signInForm.password.$valid){
         $scope.passwordError = false;
         $scope.isDisabled = true;
         $scope.isLoading = true;
         var requestParams = {
           'username': $scope.email,
           'password': $scope.password,
         };
          AuthService.loginService(requestParams, $scope.onSuccess, $scope.onError);
       }
       else{
         $scope.emailError = false;
         $scope.passwordError = true;
       }
      }
      else{
      //  $scope.emailError = true;
       $scope.passwordError = false;
     }
    };

    $scope.onSuccess = function(response) {
      $scope.loginResponse = response.data;
      $scope.isLoading = false;
      AuthService.storeUserInformation($scope.loginResponse);

      if ($scope.loginResponse.userType === 'EMPLOYER') {
        $rootScope.user = $scope.loginResponse.employerName;
        if ($scope.loginResponse.isProfileUpdated === true) {
          $state.go('employer.dashboard');
        }
        else {
          $state.go('employerTempProfile');
        }
      }
      else {
        $rootScope.user = $scope.loginResponse.firstName;
        if ($scope.loginResponse.isProfileUpdated === true) {
          $state.go('employee.dashboard');
        }
        else {
          // $state.go('fullProfile');
          $state.go('employee.dashboard');
        }
      }
    }

    $scope.onError = function(response) {
      if(response.status === 401){
        $rootScope.alerts.push({type: 'danger', msg: 'please login with your provided credentials and try again'});
      }
    };

    $scope.onSuccessGetAppSite = function(response) {
      if(response.data && response.data.status === 'success' && response.data.data.length===0) {
        $state.go('addAppSite'); //navigate user to Add new app/site page
      }
      else{
        $state.go('reports.revenue'); //navigate user to dashboard revenue page
      }
    };

    $scope.onErrorGetAppSite = function(response) {
    };
  }]);
})();
