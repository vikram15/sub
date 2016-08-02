(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('ViewTeamCtrl', ['$scope','$uibModal','AuthService','EmployerServices', function ($scope, $uibModal, AuthService, EmployerServices) {
      var vm = this ;
      vm.initialize = function (){
        var employerId = AuthService.getEmployerId();
        EmployerServices.viewTeamMembers(employerId, vm.onGetViewTeamSuccess, vm.onGetViewTeamError);
      };
      vm.onGetViewTeamSuccess = function(response){
        vm.result = response.data;
      };
      vm.onGetViewTeamError = function(){
      };

      $scope.animationsEnabled = true;
      vm.editTeamMembersFun = function (teamData) {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'views/employer/editTeamMembers.html',
          controller: 'EditTeamMembersCtrl as editTeamMembersCtrl',
          size: 'lg',
          windowClass : 'view-job-window',
          backdropClass : 'view-job-window-backdrop',
          resolve: {
            teamDataItems: function () {
              return teamData;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
        });
      };

      vm.teamMemberChangePasswordFun = function(teamData){
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'views/employer/teamMembersChangePassword.html',
          controller: 'TeamMembersChangePassCtrl as teamMembersChangePassCtrl',
          size: 'lg',
          windowClass : 'view-job-window',
          backdropClass : 'view-job-window-backdrop',
          resolve: {
            teamDataItems: function () {
              return teamData;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
        });
      }
      vm.initialize();
  }])
  .controller('EditTeamMembersCtrl', ['$uibModalInstance', 'teamDataItems', 'EmployerServices', 'AuthService', '$scope', function($uibModalInstance, teamDataItems, EmployerServices, AuthService, $scope){
      var vm = this;
      vm.initialize = function() {
          vm.defaultTeamMember = teamDataItems;
      };

      vm.updateTeamMembers = function(){
        vm.requestParams = {
          'firstName' : vm.defaultTeamMember.firstName,
          'lastName' : vm.defaultTeamMember.lastName,
          'email' :vm.defaultTeamMember.email,
          'mobile' : vm.defaultTeamMember.mobile
        }
        EmployerServices.editTeamMembersDetail(AuthService.getEmployerId(), vm.defaultTeamMember.id, vm.requestParams, vm.onUpdateTeamMembersSuccess, vm.onUpdateTeamMembersError);
      };

      vm.onUpdateTeamMembersSuccess = function(){
        $uibModalInstance.dismiss('cancel');
      };
      vm.onUpdateTeamMembersError =function () {
      };

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      vm.initialize();
  }])
  .controller('TeamMembersChangePassCtrl', ['$uibModalInstance', 'teamDataItems', 'EmployerServices', 'AuthService', '$scope', function($uibModalInstance, teamDataItems, EmployerServices, AuthService, $scope){
      var vm = this;
      vm.initialize = function() {
          vm.defaultTeamMember = teamDataItems;
      };

      vm.onSuccessUpdatePassword = function(){
        $uibModalInstance.dismiss('cancel');
      };
      vm.onErrorUpdatePassword =function () {
      };

      vm.updatePassword = function(){
        vm.requestParams = {
          'password' : vm.defaultTeamMember.password,
        }
        EmployerServices.changeTeamMemberPassword(AuthService.getEmployerId(), vm.defaultTeamMember.id, vm.requestParams, vm.onSuccessUpdatePassword, vm.onErrorUpdatePassword);
      };

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      vm.initialize();
  }])
})();
