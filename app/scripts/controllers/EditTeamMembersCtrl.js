(function (){
  'use strict';

  angular.module('scApp.controllers')
    .controller('EditTeamMembersCtrl', ['$scope','EmployerServices', function($scope,EmployerServices){
        console.log("edit controller");
        var vm = this;
        vm.updateTeamMembers = function(){
          console.log("update team Members");
          vm.requestParams = {
            'firstName' : vm.firstName,
            'lastName' : vm.lastName,
            'email' :vm.email,
            'mobileNo' : vm.mobileNumber
          }
          vm.inviteTeamMemberId = 128
          console.log(vm.requestParams);
          EmployerServices.postEditedTeamMembers(vm.requestParams,vm.inviteTeamMemberId, vm.onUpdateTeamMembersSuccess, vm.onUpdateTeamMembersError);
        };

        vm.onUpdateTeamMembersSuccess = function(){
          console.log("success block");
        };
        vm.onUpdateTeamMembersError =function () {
          console.log("error block");
        };

        vm.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

    }]);
})();
