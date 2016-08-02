(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployeeSearchForJobsCtrl', ['$scope', '$location', 'AuthService', 'EmployeeServices', '$state',
          function($scope, $location, AuthService, EmployeeServices, $state) {
        var vm = this;
        var userId = AuthService.getUserId();
        function onSuccessJobs(response) {
          vm.jobsData = response.data;
        }

        function onErrorJobs(response) {

        }

        vm.searchJobs = function() {
          EmployeeServices.getSearchedJobsByTypes(userId, vm.currentJobs, 'title', onSuccessJobs, onErrorJobs);
        };

        vm.viewJob = function(jobData) {
          $state.go('employee.viewJob', {
            'jobId': jobData.jobId,
            'userType': 'Employee'
          });
        };
    }]);
})();
