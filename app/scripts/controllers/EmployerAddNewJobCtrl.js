(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployerAddNewJobCtrl', ['$scope', '$location', '$state', '$timeout', '$stateParams', 'EmployerServices', 'AuthService', 'moment', function($scope, $location, $state, $timeout, $stateParams, EmployerServices, AuthService, moment) {
        var vm = this;
        var requestParams = {};
        var lastValue = '';
        var timeout;
        vm.jobPostMode = '';
        vm.isAppSiteListShow = false;
        vm.searchResultNotFoundClass = 'HideElement';
        var employerId = '';

        vm.open1 = function() {
           vm.opened = true;
        };

        vm.initialize = function(){
          // initialize Dates'
          vm.today = function() {
              vm.dt = new Date();
          };
          vm.today();
          vm.dateOptions = {
            formatYear: 'yyyymmdd',
            minDate: new Date(),
            startingDay: 1
          };
          employerId = AuthService.getEmployerId();
          // Getting All Lookup Data
          EmployerServices.gelAllLookupData(vm.onSuccessAllLookupData, vm.onErrorAllLookupData);
          EmployerServices.viewTeamMembers(employerId, vm.onSuccessAllTeamMembers, vm.onErrorAllTeamMembers);
          vm.jobId = $stateParams.jobId;

          if (vm.jobId === null || vm.jobId === '' || vm.jobId === undefined) {
            vm.jobPostMode = 'NewMode';
          }
          else {
            vm.jobPostMode = 'EditMode';
            EmployerServices.viewParticularJob(employerId, vm.jobId, vm.onSuccessMyJobs, vm.onErrorMyJobs);
          }
        };

        vm.onSuccessMyJobs = function(response) {
          vm.jobDetailData = response.data;
        };

        vm.onErrorMyJobs = function(response) {

        };
        vm.onSuccessAllLookupData = function (response) {
          vm.lookupData = response.data;
          vm.travelType = vm.lookupData.TravelType;
          vm.industryType = vm.lookupData.IndustryType;
          vm.rateType = vm.lookupData.RateType;
          vm.experienceType = vm.lookupData.Experience;
          vm.employmentType = vm.lookupData.EmploymentType;
          vm.requirementType = vm.lookupData.RequirementType;
        };
        vm.onSuccessAllTeamMembers = function(response) {
          vm.allTeamMember = response.data;
        };
        vm.onErrorAllTeamMembers = function(response) {

        };
        vm.onErrorAllLookupData = function (response) {
        };

        vm.postNewJob = function() {
          vm.requestParams = {
            'jobTitle': vm.jobDetailData.jobTitle,
            'jobDesc': vm.jobDetailData.jobDesc,
            'location': vm.jobDetailData.jobLocation,
            'skill': vm.jobDetailData.jobSkills,
            'keywords': vm.jobDetailData.jobKeywords,
            'expFrom': vm.jobDetailData.txtExpFrom,
            'expTo': vm.jobDetailData.txtExpTo,
            'qualification': vm.jobDetailData.qualification,
            'noOfPosition': vm.jobDetailData.noOfPositions,
            'employmentType': vm.jobDetailData.employmentType,
            'requirementType': vm.jobDetailData.reqType,
            'currency': vm.jobDetailData.currency,
            'salaryFrom': vm.jobDetailData.salaryRangeFrom,
            'salaryTo': vm.jobDetailData.salaryRangeTo,
            'rateType': vm.jobDetailData.rateType,
            'contractTerms': vm.jobDetailData.contractTerms,
            'industry': vm.jobDetailData.industry,
            'functionalArea': vm.jobDetailData.functionalArea,
            'travelType': vm.jobDetailData.travelType,
            'aboutCompany': vm.jobDetailData.endClientDesc,
            'visibility': vm.jobDetailData.jobVisibility,
            'noticePeriod': vm.jobDetailData.noticeInMonth,
            'noticeIn': vm.jobDetailData.noticeInDays,
            'refreshJob': vm.jobDetailData.refreshJobBy,
            'closingAt': moment(vm.jobDetailData.dt).format('YYYYMMDD'),
            'recruiterAssigned': vm.jobDetailData.recruiter,
            'expiredAt': null,
            'jobStatus': null,
          };
          // Calling Service to Post Data
          if (vm.jobPostMode === 'EditMode') {
            EmployerServices.postEditedJob(vm.jobId, employerId, vm.requestParams,vm.onPostNewJobSuccess,vm.onPostNewJobError);
          }
          else {
            // $scope.submitted = true;
            // if(isValid){
              EmployerServices.postNewJob(vm.requestParams,vm.onPostNewJobSuccess,vm.onPostNewJobError);
            //}
          }
        };
        vm.onPostNewJobSuccess = function() {
          $state.go('employer.viewMyPostedJobs');
        };
        vm.onPostNewJobError = function(response) {
        };

        vm.changeInSkillsInput = function() {
          if(vm.jobDetailData.jobSkills.length > 2) {
            var value = vm.jobDetailData.jobSkills;
            var str = vm.jobDetailData.jobSkills;
            var n = str.lastIndexOf(',');
            var resultantString = str.substring(n + 1);

            if (value !== lastValue) {
              lastValue = value;
              if (timeout) {
                $timeout.cancel(timeout);
              }
              timeout = $timeout(function() {
                EmployerServices.getAllSkillsList(resultantString.trim(), vm.onSuccessSkillList, vm.onErrorSkillList);
              }, 350);
            }
          }
          else {
            vm.inputBoxShowListClass='';
            vm.isAppSiteListShow = false;
          }
        };


        $scope.result = ''
    //    $scope.details = ''
        $scope.options = {};

        //Typehead select box
        $scope.doSomething = function () {
          $scope.$selection_made = $item;
        };


        vm.onSuccessSkillList = function(response) {
          vm.appDataList = response.data;
          if(vm.appDataList.length===0){
            vm.searchResultNotFoundClass = 'ng-show';
          }
          else{
            vm.searchResultNotFoundClass = 'ng-hide';
          }
          vm.inputBoxShowListClass='appSiteInputBox';
          vm.isAppSiteListShow = true;
        };

        vm.onErrorSkillList = function() {
          vm.searchResultNotFoundClass = 'HideElement';
        };

        vm.appSiteSelectedFromList = function(item) {
          var str = vm.jobDetailData.jobSkills;
          if (str.indexOf(',') > 0) {
            var n = str.lastIndexOf(',');
            var resultantString = str.substring(0, n);
            vm.jobDetailData.jobSkills = resultantString + ',' + item.skillName;
          }
          else
          {
            vm.jobDetailData.jobSkills = '';
            vm.jobDetailData.jobSkills = item.skillName;
          }
          vm.isAppSiteListShow = false;
        }

        vm.initialize();
    }]);
})();
