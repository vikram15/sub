(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('ForgotPasswordCtrl', ['$scope', '$window', '$state', '$rootScope', '$timeout', 'AuthService', function ($scope, $window, $state, $rootScope, $timeout, AuthService){
    $scope.errorMsg = '';
      $scope.emailError = false;

    $scope.onSuccessEmail = function(response) {

      var result = response;
      if (result && result.status === 200) {
        $rootScope.alerts.push({type :'success', msg : "We\'ve send you an email. Please check your inbox."});
         $timeout(function () {
           $state.go('home');
         }, 2500);
      }
      else
      {
        $rootScope.alerts.push({type :'danger', msg : "Sorry, something went wrong."});
      }
    };

    $scope.onErrorEmail = function(response) {
      //bad request
      var result = response;
      if(result && response.status === 400){
        $scope.emailError = true;
        $timeout(function () {
          $scope.emailError = false;
        }, 2500);
      }
    };

    $scope.onForgotpasswordFormSubmit = function(){
        var requestParams = {
          'email': $scope.email
        };
        AuthService.forgotPassword(requestParams, $scope.onSuccessEmail, $scope.onErrorEmail);
    };
  }]);
})();
