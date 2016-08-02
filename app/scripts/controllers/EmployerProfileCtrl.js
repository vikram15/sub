(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerProfileCtrl', ['$scope', '$state', 'EmployerServices', 'UserMetaDataService', 'AuthService','$rootScope','$timeout', function($scope, $state, EmployerServices, UserMetaDataService, AuthService, $rootScope, $timeout) {
    var vm = this;
    var userId = UserMetaDataService.getUserId();
    $rootScope.user = UserMetaDataService.getEmployerName();

    vm.onSuccessAllLookupData = function (response) {
      vm.industryType = response.data;
      vm.selectedIndustryType = vm.industryType[63].displayTitle; //from array
    };
    vm.ErrorAllLookupData = function (response) {
    };
    EmployerServices.getIndustryLookup(vm.onSuccessAllLookupData, vm.onErrorAllLookupData);

    vm.onProfileFormSubmit = function() {
      var requestParams = {
        'industryType': vm.selectedIndustryType,
        'location': vm.location,
        'website': vm.website,
        'contactNo': String(vm.contactNumber),
        'contactName' : vm.contactName
      };
      EmployerServices.setBasicEmployerProfile(requestParams, userId,  vm.onSetEmployerBasicProfileSuccess, vm.onSetEmployerBasicProfileError);
    };

    vm.onSetEmployerBasicProfileSuccess = function(response) {
      $rootScope.alerts.push({ type :"success", msg : "Congrats ! Registration successful. Please check your email to continue."})
      $timeout(function () {
          $state.go('home');
      }, 2500);
    };

    vm.onSetEmployerBasicProfileError = function(response) {
    };
  }]);
})();
