(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployerAddNewCandidateCtrl', ['$scope', '$location', '$state', 'EmployerServices', '$timeout', '$stateParams', 'AuthService', function($scope, $location, $state, EmployerServices, $timeout, $stateParams, AuthService) {
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
              vm.dt = new Date();
          };
          vm.today();
          vm.dateOptions = {
            formatYear: 'yy',
            minDate: new Date(),
            startingDay: 1
          };

          vm.requestParams = {};
          vm.candidateProfessional = [];
          vm.candidateProfObject = {};
          vm.candidateId = $stateParams.candidateId;
          vm.employerId = AuthService.getEmployerId();
          EmployerServices.gelAllLookupData(vm.onSuccessAllLookupData, vm.onErrorAllLookupData);
          if (vm.candidateId === undefined || vm.candidateId === null || vm.candidateId === '') {
            vm.saveMode = 'NewMode';
          }
          else {
            vm.saveMode = 'EditMode';
            EmployerServices.viewParticularCandidate(vm.employerId, vm.candidateId, vm.onSuccessMyCandidates, vm.onErrorMyCandidates);
          }
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
        vm.onSuccessMyCandidates = function(response) {
          vm.candidateData = response.data;
        };
        vm.onErrorMyCandidates = function() {

        };
        vm.editCandidateBasicDetail = function() {
          vm.requestParams = {
            'firstName': vm.candidateData.firstName,
            'lastName': vm.candidateData.lastName,
            'password': '',
            'currentLocation': vm.candidateData.currentLocation,
            'mobileNo': vm.candidateData.countryCode + '' + vm.candidateData.mobileNumber,
            'currency': vm.candidateData.currency,
            'email': vm.candidateData.email,
            'resumeStatus': vm.candidateData.resumeStatus,
            'dateOfBirth': moment(vm.candidateData.dt).format('YYYYMMDD'),
          };
          // Calling Service to Post Data
          EmployerServices.editBasicCandidateDetail(vm.employerId, vm.candidateId, vm.requestParams,vm.onAddNewCandidateSuccess,vm.onAddNewCandidateError);

          var fd = new FormData();
          fd.append('file', vm.candidateData.latestReume);

          EmployerServices.addResumeOnServer(fd, vm.candidateId, vm.onResumeUploadSuccess,vm.onResumeUploadError)
          var employerId = AuthService.getEmployerId();
          // Creating Other Candidate Qualification Data's JSON
          vm.requestQualificationParams = {
             'qualificationTitle': vm.candidateData.educationData,
             'qualificationType': '',
             'year1': vm.candidateData.highestEduYear,
             'year2': '',
             'percentage': '',
             'institute': '',
             'university': vm.candidateData.highestUniversity
          };
          var tempQualificationArray = [];
          tempQualificationArray.push(vm.requestQualificationParams);
          EmployerServices.addCandidateQualification(employerId, vm.candidateId, tempQualificationArray, vm.onSuccessQualification, vm.onErrorQualification);

          vm.requestProfessionalParams = {
            'annualSalary': vm.candidateData.annualSalary,
            'employer': vm.candidateData.currentlyWorkingIn,
            'experience': vm.candidateData.experience,
            'employmentType': vm.candidateData.workingAs,
            'employerLocation': vm.candidateData.currentLocation,
            'joinedAt': '',
            'resignedAt': ''
          };
          var tempProfArray = [];
          tempProfArray.push(vm.requestProfessionalParams);
          EmployerServices.addCandidateProfession(employerId, vm.candidateId, tempProfArray, vm.onSuccessProfession, vm.onErrorProfession);
          EmployerServices.addCandidateSkill(employerId, vm.candidateId, vm.skillArray, vm.onSuccessSkill, vm.onErrorSkill);
          $state.go('employer.myCandidates');
        };

        vm.addCandidateBasicDetail = function() {
          console.log("function called");
          vm.requestParams = {
            'firstName': vm.candidateData.firstName,
            'lastName': vm.candidateData.lastName,
            'password': '',
            'currentLocation': vm.candidateData.currentLocation,
            'mobileNo': vm.candidateData.countryCode + '' + vm.candidateData.mobileNumber,
            'currency': vm.candidateData.currency,
            'email': vm.candidateData.email,
            'resumeStatus': vm.candidateData.resumeStatus,
            'dateOfBirth': moment(vm.candidateData.dt).format('YYYYMMDD'),
          };
          EmployerServices.addNewCandidate(vm.requestParams,vm.onAddNewCandidateSuccess,vm.onAddNewCandidateError);
        }
        vm.onResumeUploadSuccess = function() {
        };
        vm.onResumeUploadError = function() {
        };
        vm.onSuccessQualification = function(response) {
        };
        vm.onErrorQualification = function(response) {
        };
        vm.onSuccessProfession = function(response) {
        };
        vm.onErrorProfession = function(response) {
        };
        vm.onSuccessSkill = function(response) {
        };
        vm.onErrorSkill = function(response) {
        };
        vm.onAddNewCandidateSuccess = function(response) {
          var result = response.data;
          var fd = new FormData();
          fd.append('file', vm.candidateData.latestReume);

          var candidateId = result.candidateId;
          EmployerServices.addResumeOnServer(fd, candidateId, vm.onResumeUploadSuccess,vm.onResumeUploadError)
          var employerId = AuthService.getEmployerId();
          // Creating Other Candidate Qualification Data's JSON
          vm.requestQualificationParams = {
             'qualificationTitle': vm.candidateData.educationData,
             'qualificationType': '',
             'year1': vm.candidateData.highestEduYear,
             'year2': '',
             'percentage': '',
             'institute': '',
             'university': vm.candidateData.highestUniversity
          };
          var tempQualificationArray = [];
          tempQualificationArray.push(vm.requestQualificationParams);
          EmployerServices.addCandidateQualification(employerId, candidateId, tempQualificationArray, vm.onSuccessQualification, vm.onErrorQualification);

          vm.requestProfessionalParams = {
            'annualSalary': vm.candidateData.annualSalary,
            'employer': vm.candidateData.currentlyWorkingIn,
            'experience': vm.candidateData.experience,
            'employmentType': vm.candidateData.workingAs,
            'employerLocation': vm.candidateData.currentLocation,
            'joinedAt': '',
            'resignedAt': ''
          };
          var tempProfArray = [];
          tempProfArray.push(vm.requestProfessionalParams);
          EmployerServices.addCandidateProfession(employerId, candidateId, tempProfArray, vm.onSuccessProfession, vm.onErrorProfession);
          EmployerServices.addCandidateSkill(employerId, candidateId, vm.skillArray, vm.onSuccessSkill, vm.onErrorSkill);
          $state.go('employer.myCandidates');
        }
        vm.onAddNewCandidateError = function(response) {
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
