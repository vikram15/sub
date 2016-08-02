(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerFullProfileCtrl', ['$scope', '$state', 'EmployerServices', 'AuthService', function($scope, $state, EmployerServices, AuthService) {
    var vm = this;
    vm.initialize = function() {
      vm.employerId = AuthService.getEmployerId();

      vm.editCompanyInfo = false;
      vm.editSocialInfo = false;
      vm.editExpertiseInfo = false;

      EmployerServices.getEmployerAllDetail(vm.employerId, vm.onSuccessGetEmployerAllDetail, vm.onErrorGetEmployerAllDetail);
    };

    vm.onSuccessGetEmployerAllDetail = function(response) {
      vm.result = response.data;
    };

    vm.onErrorGetEmployerAllDetail = function(response) {
    };

    vm.onProfileFormSubmit = function() {
      var requestParams = {
        'name': vm.result.name,
        'industryType': vm.result.industryType,
        'location': vm.result.location,
        'website': vm.result.website,
        'contactNumber': vm.result.contactNumber,
        'address': vm.result.address,
        'aboutCompany': vm.result.aboutCompany,
        'establishedAt': vm.result.establishedAt,
        'revenue': vm.result.revenue,
        'employeeCount': vm.result.employeeCount,
        'service': vm.result.service,
        'expert': vm.result.expert,
        'majorClient': vm.result.majorClient,
        'facebook': vm.result.facebook,
        'twitter': vm.result.twitter,
        'linkedIn': vm.result.linkedIn,
        'googlePlus': vm.result.googlePlus
      };
      EmployerServices.setFullEmployerProfile(requestParams, vm.employerId,  vm.onSetEmployerFullProfileSuccess, vm.onSetEmployerFullProfileError);
    };

    vm.onSetEmployerFullProfileSuccess = function() {
      vm.editCompanyInfo = false;
      vm.editSocialInfo = false;
      vm.editExpertiseInfo = false;

      EmployerServices.getEmployerAllDetail(vm.employerId, vm.onSuccessGetEmployerAllDetail, vm.onErrorGetEmployerAllDetail);
    };

    vm.onSetEmployerFullProfileError = function(response) {
    };

    vm.editExpertiseInfoBtn = function() {
      vm.editExpertiseInfo = true;
    };

    vm.cancelExpertiseInfo = function() {
      vm.editExpertiseInfo = false;
    };

    vm.editSocialInfoBtn = function() {
      vm.editSocialInfo = true;
    };

    vm.cancelSocialInfo = function() {
      vm.editSocialInfo = false;
    };

    vm.editCompanyInfoBtn = function() {
      vm.editCompanyInfo = true;
    };

    vm.cancelCompanyInfo = function() {
      vm.editCompanyInfo = false;
    };

    vm.initialize();
  }]);
})();
