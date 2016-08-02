(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('ViewJobCtrl', ['$scope', '$state', '$stateParams', 'EmployerServices', 'EmployeeServices', 'AuthService', '$uibModal',
      function ($scope, $state, $stateParams, EmployerServices, EmployeeServices, AuthService, $uibModal) {
        var vm = this;
        var userType = '';
        var requestParams = {};
        var candidateIdsList = [];
        var rpCandidateList = {};
        vm.initialize = function() {
          userType = $stateParams.userType;

          if (userType === 'Employee') {
            candidateIdsList.push(AuthService.getCandidateId());
            requestParams = {
              'userId': AuthService.getUserId(),
              'jobId': $stateParams.jobId,
            };
            rpCandidateList = {
              'candidateIds' : candidateIdsList
            };
            EmployeeServices.getJobsById(requestParams, onSuccess, onError);
          }
          else {
            requestParams = {
              employerId: AuthService.getEmployerId(),
              jobId: $stateParams.jobId
            };
            EmployerServices.getJobsById(requestParams, onSuccess, onError);
          }
        };

        function onSuccess(response) {
          vm.result = response.data;
        }

        function onError() {
        }
        vm.initialize();

        vm.onSuccessAppliedJobs = function() {
          $state.go('employee.dashboard');
        };

        vm.onErrorAppliedJobs = function() {
        };

        vm.backToDashboard = function() {
          window.history.back();
        };

        vm.openCandidates = function() {
          if (userType === 'Employee') {
            EmployerServices.applyCandidatesForJob(requestParams.jobId, rpCandidateList, vm.onSuccessAppliedJobs, vm.onErrorAppliedJobs);
          }
          else {
            var modalInstance = $uibModal.open({
              templateUrl: 'views/public/candidatesList.html',
              controller: 'CandidatesListCtrl',//EmployerApplyCandidateCtrl.js
              resolve: {
                item: function() {
                  return vm.result;
                }
              },
              size: 'lg'
            });
          }
        };

      }]);
})();
