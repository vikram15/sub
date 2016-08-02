(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('EmployerSearchResume', ['$scope', '$location', '$state', 'EmployerServices', '$timeout', '$stateParams', 'AuthService', function($scope, $location, $state, EmployerServices, $timeout, $stateParams, AuthService) {
      var vm = this;
      vm.candidates = [];
      vm.loading = true;
      var candidateParams = {};
      var skillParams = {};

      function initialize() {
        candidateParams = {
          employerId: AuthService.getEmployerId(),
          skills: []
        };
      }

      vm.search = function() {
        skillParams = {
          name: vm.searchText
        };
        EmployerServices.getSkillByName(skillParams, onSkillSuccess, onSkillError);
      };

      function onSkillSuccess(skills) {
        if(skills.data.length > 0) {
          var skillsSet = '';
          for(var i=0; i<skills.data.length; i++) {
            skillsSet = skillsSet + skills.data[i].skillId + ',';
          }
          skillsSet = skillsSet.substring(0, skillsSet.length-1);
          EmployerServices.getCandidatesBySkill(candidateParams.employerId, skillsSet, onSearchSuccess, onSearchError);
        }
      }

      function onSkillError(skillError) {
      }

      function onSearchSuccess(response) {
        vm.candidates = response.data;
        vm.loading = false;
      }

      function onSearchError(response) {
        vm.loading = false;
        vm.candidates.length = 0;
      }

      vm.downloadResume = function(candidateId) {
        EmployerServices.downloadParticularCandidateResume(candidateId, vm.onSuccessDownloadResume, vm.onErrorDownloadResume);
      };

      vm.onSuccessDownloadResume = function(response) {
        var blob = new Blob([response.data], {type: response.headers('content-type')});
        var objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl);
      };

      vm.onErrorDownloadResume = function(response) {
      };

      initialize();

    }]);
})();
