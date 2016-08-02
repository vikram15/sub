(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerCandidateDetailsCtrl', ['$scope', '$state', 'EmployerServices', 'AuthService', '$uibModal', '$stateParams', function ($scope, $state, EmployerServices, AuthService, $uibModal, $stateParams) {
    var vm = this;
    vm.result = {};
    var candidateId = '';
    var employerId  = '';

    vm.initialize = function() {
      employerId = AuthService.getEmployerId();
      candidateId = $stateParams.candidateId;
      EmployerServices.viewParticularCandidate(employerId, candidateId, vm.onSuccessMyCandidates, vm.onErrorMyCandidates);
    };
    vm.onSuccessMyCandidates = function(response) {
      vm.candidateData = response.data;
    };
    vm.onErrorMyCandidates = function(response) {
    };

    vm.downloadResume = function(candidateId) {
      EmployerServices.downloadParticularCandidateResume(candidateId, vm.onSuccessDownloadResume, vm.onErrorDownloadResume);
    };

    vm.onSuccessDownloadResume = function(response) {
    };

    vm.onErrorDownloadResume = function(response) {
    };
    vm.initialize();
  }]);
})();
