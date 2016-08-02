(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployeeSearchBySkillsCtrl', ['$scope', '$location', 'EmployerServices', 'EmployeeServices', 'AuthService', function($scope, $location, EmployerServices, EmployeeServices, AuthService) {
        var vm = this;
        var resultantString = ' ';
        var userId = AuthService.getUserId();

        function onSuccessSkillList(response) {
          vm.skillList = response.data;
        }

        function onErrorSkillList(response) {

        }
        vm.initialize = function() {
          EmployerServices.getAllSkillsList(resultantString.trim(), onSuccessSkillList, onErrorSkillList);
        };

        function onSuccessJobs(response) {
          vm.jobsData = response.data;
        }

        function onErrorJobs(response) {
        }

        vm.searchJobs = function() {
          EmployeeServices.getSearchedJobsByTypes(userId, vm.selectedSkill, 'skill', onSuccessJobs, onErrorJobs);
        };

        vm.viewJob = function(jobData) {
          $state.go('employee.viewJob', {
            'jobId': jobData.jobId,
            'userType': 'Employee'
          });
        };

        vm.initialize();
    }]);
})();
