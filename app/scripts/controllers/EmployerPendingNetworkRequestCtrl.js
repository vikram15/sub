(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerPendingNetworkRequestCtrl', ['$state', 'EmployerServices', 'AuthService', function ($state, EmployerServices, AuthService) {
    var vm = this;

    vm.initialize = function() {
      vm.myPendingRequest = false;
      vm.employerId = AuthService.getEmployerId();

      // Calling my Connected Network list
      EmployerServices.pendingNetworkRequest(vm.employerId, vm.onSuccessPendingNetworkRequest, vm.onErrorPendingNetworkRequest);
    };

    vm.onSuccessPendingNetworkRequest = function(response) {
      vm.result = response.data;
      if (vm.result.length > 0) {
        vm.myPendingRequest = true;
      }
      else {
        vm.myPendingRequest = false;
      }
    };

    vm.onErrorPendingNetworkRequest = function(response) {
    }

    vm.acceptRequest = function(employerDetail) {
      EmployerServices.acceptNetworkRequest(employerDetail.employerId, employerDetail.employerNetworkId, vm.onSuccessAcceptNetworkRequest, vm.onErrorAcceptNetworkRequest);
    };

    vm.onSuccessAcceptNetworkRequest = function(response) {
      EmployerServices.pendingNetworkRequest(vm.employerId, vm.onSuccessPendingNetworkRequest, vm.onErrorPendingNetworkRequest);
    };

    vm.onErrorAcceptNetworkRequest = function(response) {
    };

    vm.initialize();
  }]);
})();
