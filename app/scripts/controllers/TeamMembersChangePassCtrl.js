(function (){
  'use strict';
   angular.module('scApp.controllers')
    .controller('TeamMembersChangePassCtrl',['$scope','EmployerServices', function($scope, EmployerServices){
      console.log("Team Members Change password");
      var vm = this;
      vm.changePasswordPassFun = function(){
        console.log("chage password function");
        vm.requestParams = {
          'newPassword' : vm.password,
          'reEnterPassword' : vm.reEnterNewPassword
        },
        console.log(vm.requestParams);
        vm.inviteTeamMemberId = 128
        EmployerServices.changePassword(vm.inviteTeamMemberId, vm.requestParams, vm.onChangePasswordSuccess, vm.onChangePasswordError)
      };

    }]);
})();
