(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerSentConnectionRequestCtrl', ['$state', 'EmployerServices', 'AuthService', function ($state, EmployerServices, AuthService) {
    var vm = this;

    vm.initialize = function() {
      vm.sentNetworkList = true;
      vm.employerId = AuthService.getEmployerId();
      // Calling my Connected Network list
      EmployerServices.sentNetworkRequest(vm.employerId, vm.onSuccessSentNetworkRequest, vm.onErrorSentNetworkRequest);
    };

    vm.onSuccessSentNetworkRequest = function(response) {
      vm.result = response.data;
      if (vm.result.length > 0) {
        vm.sentNetworkList = true;
      }
      else {
        vm.sentNetworkList = false;
      }
    };

    vm.onErrorSentNetworkRequest = function(response) {
    };

    vm.cancelRequest = function(employerDetail) {
      EmployerServices.cancelNetworkRequest(employerDetail.employerId, employerDetail.employerNetworkId, vm.onSuccessCancelNetworkRequest, vm.onErrorCancelNetworkRequest);
    };

    vm.onSuccessCancelNetworkRequest = function() {
      EmployerServices.sentNetworkRequest(vm.employerId, vm.onSuccessSentNetworkRequest, vm.onErrorSentNetworkRequest);
    };

    vm.onErrorCancelNetworkRequest = function(response) {
    };

    vm.redirectSignInEmployers = function() {
      $state.go('employer.recentSignedIn');
    };

    vm.initialize();
  }]);
})();
