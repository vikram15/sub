(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('HomeCtrl', ['$scope', '$state', function ($scope, $state) {
    var vm = this;
    vm.initialize = function() {
      vm.searchStr = '';
    };

    vm.myInterval = 3000;
    vm.noWrapSlides = false;
    vm.recruiterSignup = function() {
      $state.go('employerRegisteration');
    };

    vm.consultantSignup = function() {
      $state.go('employeeRegisteration');
    };

    vm.onSearchSubmit = function() {
      $state.go('homeSearch', {'query' : vm.searchStr });
    };

    vm.initialize();
  }]);
})();
