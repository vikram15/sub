(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('CandidatesListCtrl', ['$scope', '$state', '$stateParams', 'EmployerServices', 'AuthService', '$uibModalInstance', 'item','$rootScope','$timeout',
      function ($scope, $state, $stateParams, EmployerServices, AuthService, $uibModalInstance, item, $rootScope, $timeout) {
        var vm = this;
        $scope.selectedCandidates = [];
        $scope.initialize = function() {
          var employerId = AuthService.getEmployerId();
          var skillsSet = '';
          for(var i=0; i<item.skillDtos.length; i++) {
            skillsSet = skillsSet + item.skillDtos[i].skillId + ',';
          }
          skillsSet = skillsSet.substring(0, skillsSet.length-1);
          EmployerServices.getCandidatesBySkill(employerId, skillsSet, onSuccessViewSkilledCandidate, onErrorViewSkilledCandidate);
        };

        function onSuccessViewSkilledCandidate(response) {
          $scope.candidates = response.data;
          for(var i = 0; i < $scope.candidates.length; i++) {
            $scope.candidates[i].checked = false;
          }
        }

        function onErrorViewSkilledCandidate(response) {
        }
        $scope.initialize();

        $scope.selectCandidate = function(id, checked) {
          if(checked) {
            $scope.selectedCandidates.push(id);
          } else {
            for(var i=0; i<$scope.selectedCandidates.length; i++) {
              if(id === $scope.selectedCandidates[i]) {
                $scope.selectedCandidates.splice(i, 1);
                break;
              }
            }
          }
          $scope.requestParams = {};
          if ($scope.selectedCandidates.length) {
            $scope.requestParams = {
              'candidateIds' : $scope.selectedCandidates
            }
          }
        };

        $scope.close = function() {
          $uibModalInstance.close();
        };

        $scope.onSuccessAppliedJobs = function(response) {
          $rootScope.alerts.push({type : "success", msg : "Job should be applied successfully"});

          $timeout(function () {
            $uibModalInstance.close();
          }, 2500);

        };

        $scope.onErrorAppliedJobs = function(response) {
        };

        $scope.applyCandidateForJob = function() {
          if ($scope.selectedCandidates.length) {
            EmployerServices.applyCandidatesForJob(item.jobId, $scope.requestParams, $scope.onSuccessAppliedJobs, $scope.onErrorAppliedJobs)
          }
        };
      }]);
})();
