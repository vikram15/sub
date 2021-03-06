(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerPublicJobsCtrl', ['$scope', '$state', 'EmployerServices', 'AuthService', '$uibModal', function ($scope, $state, EmployerServices, AuthService, $uibModal) {
    var vm = this;
    vm.result = {};
    vm.requestParams = {};

    vm.initialize = function() {
      vm.requestParams = {
        'userId': AuthService.getEmployerId()
      };
      EmployerServices.viewPublicJobs(vm.requestParams, vm.onGetMyPostedJobsSuccess, vm.onGetMyPostedJobsError);
    };
    vm.onGetMyPostedJobsSuccess = function(response) {
      vm.result = response.data;
    };
    vm.onGetMyPostedJobsError = function(response) {
    };
    vm.viewJobOpen = function (jobData) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/public/viewJob.html',
        controller: 'ViewJobCtrl',
        controllerAs: 'viewJobCtrl',
        size: 'lg',
        windowClass : 'view-job-window',
        backdropClass : 'view-job-window-backdrop',
        backdrop : 'static',
        resolve: {
          items: function () {
            return jobData;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        vm.selected = selectedItem;
      }, function () {
      });
    };
    vm.initialize();
  }]);
})();
