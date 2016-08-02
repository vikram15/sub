(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployeeFullProfileCtrl', ['$scope', '$location', '$state', 'EmployerServices', '$timeout', '$stateParams', 'AuthService', 'moment', 'EmployeeServices','$rootScope', function($scope, $location, $state, EmployerServices, $timeout, $stateParams, AuthService, moment, EmployeeServices,$rootScope) {
        var vm = this;
        var lastValue = '';
        var timeout;
        vm.isAppSiteListShow = 'ng-hide';
        vm.searchResultNotFoundClass = 'HideElement';

        vm.open1 = function() {
           vm.opened = true;
        };
        vm.initialize = function(){
          // initialize Dates'
          vm.today = function() {
              vm.dateOfBirth = new Date();
          };
          vm.today();
          vm.dateOptions = {
            formatYear: 'yyyy',
            maxDate: new Date(),
            startingDay: 1
          };

          vm.requestParams = {};
          vm.candidateProfessional = [];
          vm.candidateProfObject = {};
          vm.candidateId = $stateParams.candidateId;
          vm.employerId = '';
          EmployerServices.gelAllLookupData(vm.onSuccessAllLookupData, vm.onErrorAllLookupData);
          vm.userId = AuthService.getUserId();
          EmployeeServices.viewParticularCandidateFromCandidate(vm.userId, vm.onSuccessGetData, vm.onErrorGetData);
        };
        vm.onSuccessGetData = function(response) {
          vm.candidateData = response.data;
        };
        vm.onErrorGetData = function() {

        };
        vm.onSuccessAllLookupData = function (response) {
          vm.lookupData = response.data;
          vm.educationData = vm.lookupData.Education;
          vm.industryType = vm.lookupData.IndustryType;
          vm.rateType = vm.lookupData.RateType;
          vm.experienceType = vm.lookupData.Experience;
          vm.employmentType = vm.lookupData.EmploymentType;
          vm.requirementType = vm.lookupData.RequirementType;
        };
        vm.onErrorAllLookupData = function(response) {

        };
        vm.addCandidateBasicDetail = function() {
          vm.requestQualificationParams = {
             'qualificationTitle': vm.candidateData.educationData,
             'qualificationType': '',
             'year1': vm.candidateData.year1,
             'year2': '',
             'percentage': '',
             'institute': '',
             'university': vm.candidateData.highestUniversity
          };
          var tempQualificationArray = [];
          tempQualificationArray.push(vm.requestQualificationParams);

          vm.requestProfessionalParams = {
            'annualSalary': vm.candidateData.annualSalary,
            'employer': vm.candidateData.currentlyWorkingIn,
            'experience': vm.candidateData.experience,
            'employmentType': vm.candidateData.workingAs,
            'employerLocation': vm.candidateData.location,
            'joinedAt': '',
            'resignedAt': ''
          };
          var tempProfArray = [];
          tempProfArray.push(vm.requestProfessionalParams);

          vm.requestParams = {
            'firstName': vm.candidateData.firstName,
            'lastName': vm.candidateData.lastName,
            'password': '',
            'currentLocation': vm.candidateData.currentCity,
            'mobileNo': vm.candidateData.countryCode + '' + vm.candidateData.mobileNumber,
            'currency': vm.candidateData.currency,
            'email': vm.candidateData.email,
            'resumeStatus': vm.candidateData.resumeStatus,
            'dateOfBirth': moment(vm.candidateData.dateOfBirth).format('YYYYMMDD'),
            'candidateQualifications': tempQualificationArray,
            'candidateProfessional': tempProfArray,
            'candidateSkills' : vm.skillArray,
            'placed' : false,
            'active': false
          };

          // Calling Service to Post Data
          var fd = new FormData();
          fd.append('file', vm.candidateData.latestReume);

          EmployeeServices.updateCandidate(vm.userId, vm.requestParams, vm.onAddNewCandidateSuccess,vm.onAddNewCandidateError);
          EmployerServices.addResumeOnServer(fd, vm.candidateData.candidateId, vm.onResumeUploadSuccess,vm.onResumeUploadError)
        }
        vm.onResumeUploadSuccess = function() {
        };
        vm.onResumeUploadError = function() {
        };
        vm.onAddNewCandidateSuccess = function(response) {
          console.log(JSON.stringify(response) + "success ");
          $rootScope.alerts.push({type : "success", msg :"Congrats ! Registration successful. Please check your email to continue"});
          $timeout(function () {
            $state.go('home');
            $rootScope.alerts.push({type : "success", msg :"Congrats ! Registration successful. Please check your email to continue"});
          }, 2500);
        };
        vm.onAddNewCandidateError = function(response) {
          console.log(JSON.stringify(response) + "error");
          $rootScope.alerts.push({type : "danger", msg :"something going wrong"});
        };
        vm.changeInSkillsInput = function() {
          if(vm.candidateData.jobSkills.length > 2) {
            var value = vm.candidateData.jobSkills;
            var str = vm.candidateData.jobSkills;
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

        vm.skillArray = [];
        vm.appSiteSelectedFromList = function(item) {
          var myObj = {};
          var str = vm.candidateData.jobSkills;
          if (str.indexOf(',') > 0) {
            var n = str.lastIndexOf(',');
            var resultantString = str.substring(0, n);
            vm.candidateData.jobSkills = resultantString + ',' + item.skillName;
          }
          else
          {
            vm.candidateData.jobSkills = '';
            vm.candidateData.jobSkills = item.skillName;
          }
          myObj = {
            'skillId' : item.skillId,
            'experience' : '3 Years'
          };
          vm.skillArray.push(myObj);
          vm.isAppSiteListShow = false;
        }

        vm.initialize();
    }]);
})();
