(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('EmployerDashboard', ['$scope', '$state', 'AuthService', 'EmployerServices', '$uibModal', 'EmployeeServices','$timeout',
      function ($scope, $state, AuthService, EmployerServices, $uibModal, EmployeeServices, $timeout) {
        var vm = this;
        var employerId = AuthService.getEmployerId();
        vm.requestParams = {
          'userId': AuthService.getEmployerId(),
          'employerId': AuthService.getEmployerId()
        };

        vm.initializeJobs = function() {
          EmployerServices.viewPublicJobs(vm.requestParams, onPublicJobSuccess, onPublicJobError);
        };

        function onSuccessRecentJobs(response) {
          vm.recentJobs = response.data;
        }

        function onErrorRecentJobs() {

        }
        function onSuccessCount(response) {
          vm.statesData = response.data;
        }
        function onErrorCount() {

        }
        vm.initializeRecentJobs = function() {
          EmployeeServices.viewRecentJobs(onSuccessRecentJobs, onErrorRecentJobs);
          EmployerServices.countStatastics(employerId, onSuccessCount, onErrorCount);
        };

        function getConnectionPostedJobs() {
          EmployerServices.viewMyConnectionPostedJobs(vm.requestParams.employerId, onConnectionJobSuccess, onConnectionJobError);
        }

        function getMyPostedJobs() {
          EmployerServices.viewMyPostedJobs(vm.requestParams, onPostedJobSuccess, onPostedJobError);
        }

        function getMyAppliedJobs() {
          EmployerServices.viewMyAppliedJobs(vm.requestParams, onAppliedJobSuccess, onAppliedJobError);
        }

        function getRecentEmployers() {
          EmployerServices.getRecentSignedInEmployer(vm.requestParams.employerId, onSuccessSignIn, onErrorSignIn);
        }

        vm.initializeEmployers = function() {
          EmployerServices.getAllEmployerDomainWise(vm.requestParams.employerId, 'notAll', onSuccessYouMay, onErrorYouMay);
        };

        function getEmployers(view) {
          switch (view) {
            case 'youMayKnow':
              vm.initializeEmployers();
              break;
            case 'recentlySigned':
              getRecentEmployers();
              break;
            default:
              vm.initializeEmployers();
            }
        }

        function getJobs(view) {
          switch (view) {
            case 'publicJobs':
              vm.initializeJobs();
              break;
            case 'connectionJobs':
              getConnectionPostedJobs();
              break;
            case 'postedJobs':
              getMyPostedJobs();
              break;
            case 'appliedJobs':
              getMyAppliedJobs();
              break;
            default:
              vm.initializeJobs();
          }
        }

        function onPublicJobSuccess(response) {
          vm.publicJobs = response.data;
        }

        function onPublicJobError(response) {
        }

        function onConnectionJobSuccess(response) {
          vm.connectionJobs = response.data;
        }

        function onConnectionJobError(response) {
        }

        function onPostedJobSuccess(response) {
           vm.postedJobs = response.data;
        }

        function onPostedJobError(response) {
        }

        function onAppliedJobSuccess(response) {
          vm.appliedJobs = response.data;
        }

        function onAppliedJobError(response) {
        }

        function onSuccessSignIn(response) {
            vm.signedIn = response.data;
        }

        function onErrorSignIn(response) {

        }

        function onSuccessYouMay(response) {
            vm.youMayKnow = response.data;
        }

        function onErrorYouMay(response) {

        }

        vm.viewJob = function(jobData) {
          $state.go('employer.viewJob', {
            'jobId': jobData.jobId,
            'userType': 'Employer'
          });
        };

        vm.listApplied = function (jobData) {
          if (jobData.jobAppliedCount > 0) {
            var modalInstance = $uibModal.open({
              templateUrl: 'views/public/appliedCandidates.html',
              controller: 'AppliedCandidatesCtrl',
              resolve: {
                item: function() {
                  return jobData;
                }
              },
              size: 'lg'
            });
          }
        };

        vm.switchTab = function (view) {
          $('.jobsCategory .active').removeClass('active');
          $('#' + view).addClass('active');
          getJobs(view);
        };

        vm.switchTabQuickLinks = function (view) {
          $('.empSuggestions .active').removeClass('active');
          $('#' + view).addClass('active');
          getEmployers(view);
        };

        vm.loadMoreYouMayKnow = function() {
          $state.go('employer.youMayKnow');
        };

        vm.loadMoreRecentSigned = function() {
          $state.go('employer.recentSignedIn');
        };

        vm.initializeJobs();
        vm.initializeEmployers();
        vm.initializeRecentJobs();
      }]);
})();
