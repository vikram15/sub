(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployeeStatasticsDataCtrl', ['$scope', '$location', 'EmployeeServices', 'AuthService', function($scope, $location, EmployeeServices, AuthService) {
        var vm = this;

        vm.requestParams = {
          'userId' : AuthService.getUserId()
        };

        function onAppliedJobSuccess(response) {
          vm.appliedData = response.data;
        }

        function onAppliedJobError() {

        }

        function onSuccessRecentJobs(response) {
          vm.recentJobs = response.data;
        }

        function onErrorRecentJobs() {

        }
        vm.initialize = function() {
          EmployeeServices.viewMyAppliedJobsFromEmployee(vm.requestParams, onAppliedJobSuccess, onAppliedJobError);
          EmployeeServices.viewRecentJobs(onSuccessRecentJobs, onErrorRecentJobs)
        }

        vm.initialize();
    }]);
})();
