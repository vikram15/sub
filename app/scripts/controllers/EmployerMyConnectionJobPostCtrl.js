(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerMyConnectionJobPostCtrl', ['$scope', '$state', 'EmployerServices', '$uibModal', 'AuthService', function ($scope, $state, EmployerServices, $uibModal, AuthService) {
    var vm = this;
    vm.result = {};
    vm.initialize = function() {
      vm.employerId = AuthService.getEmployerId();
      EmployerServices.viewMyConnectionPostedJobs(vm.employerId, vm.onGetMyPostedJobsSuccess, vm.onGetMyPostedJobsError);
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
