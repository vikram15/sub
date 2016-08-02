(function() {
'use strict';
angular.module('scApp.controllers')
  .controller('InviteTeamCtrl', ['$scope', '$state', 'EmployerServices', 'AuthService', function ($scope, $state, EmployerServices, AuthService) {
      var vm = this;
      var requestParams = {};

      vm.addInviteTeam = function(){
        vm.requestParams = {
          'firstName' : vm.firstName,
          'lastName' : vm.lastName,
          'email' : vm.email,
          'mobile' : vm.mobileNumber,
          'password' : vm.password,
        };

        var employerId = AuthService.getEmployerId();
        EmployerServices.addInviteTeam(employerId, vm.requestParams, vm.onAddInviteMembersSuccess, vm.onAddInviteMembersError );
      };

      vm.onAddInviteMembersSuccess = function(){
        $state.go('employer.viewTeam');
      };
      vm.onAddInviteMembersError = function(){
      };

  }]);
})();
