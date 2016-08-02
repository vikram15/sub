(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('EmployeeDashboardCtrl', ['$scope', '$state', 'AuthService', 'EmployerServices', 'EmployeeServices',
      function ($scope, $state, AuthService, EmployerServices, EmployeeServices) {
        var vm = this;
        vm.requestParams = {
          'userId' : AuthService.getUserId()
        };

        vm.initialize = function() {
          EmployeeServices.viewPublicJobsFromEmployee(vm.requestParams, onPublicJobSuccess, onPublicJobError);
        };

        function getMyAppliedJobs() {
          EmployeeServices.viewMyAppliedJobsFromEmployee(vm.requestParams, onAppliedJobSuccess, onAppliedJobError);
        }

        function getJobs(view) {
          switch (view) {
            case 'publicJobs':
              vm.initialize();
              break;
            case 'appliedJobs':
              getMyAppliedJobs();
              break;
            default:
              vm.initialize();
          }
        }

        function onPublicJobSuccess(response) {
          vm.publicJobs = response.data;
        }

        function onPublicJobError() {
        }

        function onAppliedJobSuccess(response) {
          vm.appliedJobs = response.data;
        }

        function onAppliedJobError() {
        }

        vm.viewJob = function(jobData) {
          $state.go('employee.viewJob', {
            'jobId': jobData.jobId,
            'userType' : 'Employee'
          });
        };

        vm.switchTab = function (view) {
          $('.active').removeClass('active');
          $('#' + view).addClass('active');
          getJobs(view);
        };

        vm.initialize();
      }]);
})();
