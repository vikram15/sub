(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('EmployerViewConnection', ['$state', 'EmployerServices', 'AuthService', '$stateParams', function ($state, EmployerServices, AuthService, $stateParams) {
      var vm = this;
      vm.connectionId = $stateParams.connectionId;
      vm.jobs = [];

      vm.initialize = function() {

        EmployerServices.getEmployerAllDetail(vm.connectionId, vm.onSuccessMyConnectedNetwork, vm.onErrorMyConnectedNetwork);
      };

      vm.onSuccessMyConnectedNetwork = function(response) {
        vm.currentConnection = response.data;
        EmployerServices.getJobsByEmployer(vm.connectionId, onSuccess, onError);
      };

      vm.onErrorMyConnectedNetwork = function(response) {
      };

      function onSuccess(response) {
        vm.jobs = response.data;
      }

      function onError(response) {
      }

      vm.switchTab = function (view) {
        $('.active').removeClass('active');
        $('#' + view).addClass('active');
      };

      vm.initialize();
    }]);
})();
