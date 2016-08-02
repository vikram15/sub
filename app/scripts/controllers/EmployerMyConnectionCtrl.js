(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerMyConnectionCtrl', ['$state', 'EmployerServices', 'AuthService', function ($state, EmployerServices, AuthService) {
    var vm = this;

    vm.initialize = function() {
      vm.myAvailableConnection = true;

      vm.employerId = AuthService.getEmployerId();
      // Calling my Connected Network list
      EmployerServices.myConnectedNetwork(vm.employerId, vm.onSuccessMyConnectedNetwork, vm.onErrorMyConnectedNetwork);
    };

    vm.onSuccessMyConnectedNetwork = function(response) {
      vm.result = response.data;
      if (vm.result.length > 0) {
        vm.myAvailableConnection = true;
      }
      else {
        vm.myAvailableConnection = false;
      }
    };

    vm.onErrorMyConnectedNetwork = function(response) {
    };

    vm.redirectSignInEmployers = function() {
      $state.go('employer.recentSignedIn');
    };

    vm.viewConnection = function (connection) {
      $state.go('employer.connectionDetails',{'connectionId': connection.employerId});
    };

    vm.initialize();
  }]);
})();
