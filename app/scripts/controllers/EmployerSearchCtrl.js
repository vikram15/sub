(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('EmployerSearchCtrl', ['$scope', '$location', '$state', 'EmployerServices', '$timeout', '$stateParams', 'AuthService', function($scope, $location, $state, EmployerServices, $timeout, $stateParams, AuthService) {
      var vm = this;
      vm.jobs = [];
      function initialize() {
        var requestParams = {
          'query': $stateParams.query
        };
        EmployerServices.getSearchedJobs(requestParams, onSearchSuccess, onSearcherror);
      }

      function onSearchSuccess(response) {
        vm.jobs = response.data;
      }

      function onSearcherror(response) {
      }

      initialize();

    }]);
})();
