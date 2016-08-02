(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerMyPostedJobsCtrl', ['$scope', '$state', 'EmployerServices', 'AuthService', '$uibModal', function ($scope, $state, EmployerServices, AuthService, $uibModal) {
    var vm = this;
    vm.result = {};
    vm.initialize = function() {
      vm.requestParams = {
        'employerId': AuthService.getEmployerId()
      };
      EmployerServices.viewMyPostedJobs(vm.requestParams, vm.onGetMyPostedJobsSuccess, vm.onGetMyPostedJobsError);
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

    vm.editJobData = function(jobData) {
      $state.go('employer.postJob', {'jobId':jobData.jobId})
    };

    vm.initialize();
  }]);
})();
