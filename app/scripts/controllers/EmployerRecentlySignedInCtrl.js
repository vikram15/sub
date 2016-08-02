(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerRecentlySignedInCtrl', ['$state', 'EmployerServices', 'UserMetaDataService', 'AuthService', function ($state, EmployerServices, UserMetaDataService, AuthService) {
    var vm = this;
    var employerId = AuthService.getEmployerId();


    vm.initialize = function() {
      vm.myAvailableConnection = false;
      vm.requestParams = {};
      EmployerServices.getAllSignedInEmployer(employerId, vm.onSuccessAllSignedInEmployer, vm.onErrorAllSignedInEmployer);
    };

    vm.onSuccessAllSignedInEmployer = function(response) {
      vm.result = response.data;
    };
    vm.onErrorAllSignedInEmployer = function(response) {
    };

    vm.connectToEmployer = function(requestId) {
      vm.requestParams = {
        'requestedTo' : requestId.employerId
      };
      EmployerServices.sendNetworkRequest(employerId, vm.requestParams, vm.onSuccessSendNetworkRequest, vm.onErrorSendNetworkRequest);
    };

    vm.onSuccessSendNetworkRequest = function() {
      $state.go('employer.myConnection');
    };

    vm.onErrorSendNetworkRequest = function() {
      
    };

    vm.initialize();
  }]);
})();
