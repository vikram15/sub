(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerHeaderCtrl', ['$scope', '$state', 'AuthService', function ($scope, $state, AuthService) {
    var vm = this;

    vm.searchData = function () {
      $state.go('employer.search',{'query': vm.searchQuery});
      vm.searchQuery = '';
    };

    vm.onSuccessLogout = function(response) {
      var result = response;
      if (result && result.status === 200) {
        AuthService.clearUserData();
        AuthService.clearToken();
        $state.go('home');
      }
      else {

      }
    };
    vm.onErrorLogout = function(response) {
    };
    vm.logout = function () {
      AuthService.logout(vm.onSuccessLogout, vm.onErrorLogout);
    };
  }]);
})();
