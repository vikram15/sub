(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('HomeSearchCtrl', ['$scope', '$state', 'EmployerServices', '$stateParams', function ($scope, $state, EmployerServices, $stateParams) {
    var vm = this;
    vm.initialize = function() {
      var query = $stateParams.query;
      var requestParams = {
        'query': query
      };
      EmployerServices.getSearchedJobsGlobal(requestParams, vm.onSuccessSearch, vm.onErrorSearch);
    };

    vm.onSuccessSearch = function(response) {
      vm.result = response.data;
    };
    vm.viewJobFromSearch = function(job) {
    }
    vm.onErrorSearch = function() {
    };
    vm.initialize();
  }]);
})();
