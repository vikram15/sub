(function(){
  'use strict';
  angular.module('scApp.routes')
    .config(['$stateProvider', function($stateProvider) {
      $stateProvider
        .state('home', {
          url: '',
          templateUrl: 'views/home.html',
          authenticate: false,
        })
        .state('homeSearch', {
          url: '/homeSearch?selectedQuery:query',
          templateUrl: 'views/public/search.html',
          controller: 'HomeSearchCtrl',
          controllerAs: 'homeSearchCtrl',
          authenticate: false,
        })
        .state('forgotPasswordRegisteration', {
          url: '/forgotPassword',
          templateUrl: 'views/forgotPassword.html',
          authenticate: false,
          controller: 'ForgotPasswordCtrl'
        })
        .state('resetPasswordRegisteration', {
          url: '/resetPassword',
          templateUrl: 'views/resetPassword.html',
          authenticate: false,
          controller: 'ResetPasswordCtrl'
        })
        .state('employerRegisteration', {
          url: '/employers/registration',
          templateUrl: 'views/employer/employerRegisteration.html',
          authenticate: false,
          controller: 'EmployerRegisterationCtrl'
        })
        .state('employerTempProfile', {
          url: '/employers/basicProfile',
          templateUrl: 'views/employer/employerProfile.html',
          authenticate: false,
          controller: 'EmployerProfileCtrl',
          controllerAs: 'employerProfileCtrl'
        })
        .state('employeeCandidateProfile', {
          url: '/createCandidateProfile?selectedCandidateId:candidateId',
          templateUrl: 'views/employee/employeeFullProfile.html',
          controller: 'EmployeeFullProfileCtrl',
          controllerAs: 'employeeFullProfileCtrl',
          authenticate: false
        })
        .state('employer', {
          url: '/employer',
          abstract:true ,
          templateUrl: 'views/employer/employerNavigation.html',
          controller: 'EmployerNavigationCtrl',
          authenticate: false
        })
        .state('employer.postJob', {
          url: '/postJob?selectedJobId:jobId',
          templateUrl: 'views/employer/employerPostJob.html',
          controller: 'EmployerAddNewJobCtrl',
          controllerAs: 'employerAddNewJobCtrl',
          authenticate: false
        })
        .state('employer.viewMyPostedJobs', {
          url: '/myPostedJobs',
          templateUrl: 'views/employer/employerMyPostedJobs.html',
          controller: 'EmployerMyPostedJobsCtrl',
          controllerAs: 'employerMyPostedJobsCtrl',
          authenticate: false
        })
        .state('employer.viewMyConnectionPostedJobs', {
          url: '/myConnectionPostedJobs',
          templateUrl: 'views/employer/employerMyConnectionJobPost.html',
          controller: 'EmployerMyConnectionJobPostCtrl',
          controllerAs: 'employerMyConnectionJobPostCtrl',
          authenticate: false
        })
        .state('employer.employerCandidateDetail', {
          url: '/viewCandidateDetail??selectedEmployerId:empId&?selectedCandidateId:candidateId',
          templateUrl: 'views/employer/employerCandidateDetail.html',
          controller: 'EmployerCandidateDetailsCtrl',
          controllerAs: 'employerCandidateDetailsCtrl',
          authenticate: false
        })
        .state('employer.viewPublicJobs', {
          url: '/publicJobs',
          templateUrl: 'views/employer/employerPublicJobs.html',
          controller: 'EmployerPublicJobsCtrl',
          controllerAs: 'employerPublicJobsCtrl',
          authenticate: false
        })
        .state('employer.addNewCandidate', {
          url: '/addCandidate?selectedCandidateId:candidateId',
          templateUrl: 'views/employer/employerAddNewCandidate.html',
          controller: 'EmployerAddNewCandidateCtrl',
          controllerAs: 'employerAddNewCandidateCtrl',
          authenticate: false
        })
        .state('employer.myCandidates', {
          url: '/myCandidates',
          templateUrl: 'views/employer/employerMyCandidates.html',
          controller: 'EmployerMyCandidatesCtrl',
          controllerAs: 'employerMyCandidatesCtrl',
          authenticate: false
        })
        .state('employer.inviteTeam', {
          url: '/inviteTeam',
          templateUrl: 'views/employer/inviteTeam.html',
          controller: 'InviteTeamCtrl',
          controllerAs: 'inviteTeamCtrl',
          authenticate: false
        })
        .state('employer.viewTeam', {
          url: '/viewTeam',
          templateUrl: 'views/employer/viewTeam.html',
          controller: 'ViewTeamCtrl',
          controllerAs: 'viewTeamCtrl',
          authenticate: false
        })
        .state('employer.myConnection', {
          url: '/myConnection',
          templateUrl: 'views/employer/employerMyConnection.html',
          controller: 'EmployerMyConnectionCtrl',
          controllerAs: 'employerMyConnectionCtrl',
          authenticate: false
        })
        .state('employer.recentSignedIn', {
          url: '/recentSignedInEmployers',
          templateUrl: 'views/employer/employerRecentlySignedIn.html',
          controller: 'EmployerRecentlySignedInCtrl',
          controllerAs: 'employerRecentlySignedInCtrl',
          authenticate: false
        })
        .state('employer.youMayKnow', {
          url: '/youMayKnow',
          templateUrl: 'views/employer/employerYouMayKnow.html',
          controller: 'EmployerYouMayKnowCtrl',
          controllerAs: 'employerYouMayKnowCtrl',
          authenticate: false
        })
        .state('employer.sentConnectionRequest', {
          url: '/sentNetworkRequest',
          templateUrl: 'views/employer/employerSentConnectionRequest.html',
          controller: 'EmployerSentConnectionRequestCtrl',
          controllerAs: 'employerSentConnectionRequestCtrl',
          authenticate: false
        })
        .state('employer.pendingNetworkRequest', {
          url: '/pendingNetworkRequest',
          templateUrl: 'views/employer/employerPendingNetworkRequest.html',
          controller: 'EmployerPendingNetworkRequestCtrl',
          controllerAs: 'employerPendingNetworkRequestCtrl',
          authenticate: false
        })
        .state('employer.myFullProfile', {
          url: '/myFullProfile',
          templateUrl: 'views/employer/employerFullProfile.html',
          controller: 'EmployerFullProfileCtrl',
          controllerAs: 'employerFullProfileCtrl',
          authenticate: false
        })
        .state('employer.changePassword', {
          url: '/changePassword',
          templateUrl: 'views/employer/employerChangePassword.html',
          controller: 'EmployerChangePasswordCtrl',
          controllerAs: 'employerChangePasswordCtrl',
          authenticate: false
        })
        .state('employer.dashboard', {
          url: '/dashboard',
          templateUrl: 'views/employer/employerDashboard.html',
          controller: 'EmployerDashboard',
          controllerAs: 'employerDashboard',
          authenticate: false
        })
        .state('employer.search', {
          url: '/search?query',
          templateUrl: 'views/employer/employerSearch.html',
          controller: 'EmployerSearchCtrl',
          controllerAs: 'searchCtrl',
          authenticate: false
        })
        .state('employer.connectionDetails', {
          url: '/myConnection/:connectionId',
          templateUrl: 'views/employer/connectionDetails.html',
          controller: 'EmployerViewConnection',
          controllerAs: 'connectionCtrl',
          authenticate: false
        })
        .state('employer.searchResume', {
          url: '/resume',
          templateUrl: 'views/employer/employerSearchResume.html',
          controller: 'EmployerSearchResume',
          controllerAs: 'resumeSearchCtrl',
          authenticate: false
        })
        .state('employer.listTrusted', {
          url: '/trusted/all',
          templateUrl: 'views/employer/employerListAllTrusted.html',
          controller: 'EmployerRequestManagement',
          controllerAs: 'trustedRequests',
          authenticate: false
        })
        .state('employer.pendingTrusted', {
          url: '/trusted/pending',
          templateUrl: 'views/employer/employerListAllPendingTrusted.html',
          controller: 'EmployerRequestManagement',
          controllerAs: 'listPending',
          authenticate: false
        })
        .state('employer.sentTrusted', {
          url: '/trusted/sent',
          templateUrl: 'views/employer/employerListAllSentTrusted.html',
          controller: 'EmployerRequestManagement',
          controllerAs: 'sentRequest',
        })
        .state('employer.viewJob', {
          url: '/viewjob/:jobId?selectedUserType:userType',
          templateUrl: 'views/public/viewJob.html',
          controller: 'ViewJobCtrl',
          controllerAs: 'viewJobCtrl',
          authenticate: false
        })
        .state('employer.employerMap',{
          url : '/employerMap',
          templateUrl : 'views/employer/employerMap.html',
          controller : 'EmployerMapCtrl',
          controllerAs : 'employerMapCtrl',
          authenticate: false
        })
        // Employee Routes
        .state('employeeRegisteration', {
          url: '/employee/employeeRegisteration',
          templateUrl: 'views/employee/employeeRegistration.html',
          authenticate: false,
          controller: 'EmployeeRegistrationCtrl',
          controllerAs: 'employeeRegistrationCtrl'
        })
        .state('fullProfile', {
          url: '/employee/fullProfile',
          templateUrl: 'views/employee/employeeFullProfile.html',
          controller: 'EmployeeFullProfileCtrl',
          authenticate: false
        })
        .state('employee', {
          url: '/employee',
          abstract:true ,
          templateUrl: 'views/employee/employeeNavigation.html',
          controller: 'EmployeeNavigationCtrl',
          authenticate: false
        })
        .state('employee.dashboard', {
          url: '/dashboard',
          templateUrl: 'views/employee/employeeDashboard.html',
          controller: 'EmployeeDashboardCtrl',
          controllerAs: 'employeeDashboardCtrl',
          authenticate: false
        })
        .state('employee.viewJob', {
          url: '/viewjob/:jobId?selectedUserType:userType',
          templateUrl: 'views/public/viewJob.html',
          controller: 'ViewJobCtrl',
          controllerAs: 'viewJobCtrl',
          authenticate: false
        })
        .state('employee.searchLocation', {
          url: '/searchByLocation',
          templateUrl: 'views/employee/employeeSearchByLocation.html',
          controller: 'EmployeeSearchByLocationCtrl',
          controllerAs: 'employeeSearchByLocationCtrl',
          authenticate: false
        })
        .state('employee.searchSkills', {
          url: '/searchBySkills',
          templateUrl: 'views/employee/employeeSearchBySkills.html',
          controller: 'EmployeeSearchBySkillsCtrl',
          controllerAs: 'employeeSearchBySkillsCtrl',
          authenticate: false
        })
        .state('employee.searchCompany', {
          url: '/searchByCompany',
          templateUrl: 'views/employee/employeeSearchByCompany.html',
          controller: 'EmployeeSearchByCompanyCtrl',
          controllerAs: 'employeeSearchByCompanyCtrl',
          authenticate: false
        })
        .state('employee.searchEmployers', {
          url: '/searchByEmployers',
          templateUrl: 'views/employee/employeeSearchByEmployers.html',
          controller: 'EmployeeSearchByEmployersCtrl',
          controllerAs: 'employeeSearchByEmployersCtrl',
          authenticate: false
        })
        .state('employee.searchForJobs', {
          url: '/searchForJobs',
          templateUrl: 'views/employee/employeeSearchForJobs.html',
          controller: 'EmployeeSearchForJobsCtrl',
          controllerAs: 'employeeSearchForJobsCtrl',
          authenticate: false
        })
        ;
    }])
    .run(['$rootScope', '$state', 'AuthService', '$window', '$uibModalStack', function($rootScope, $state, AuthService, $window, $uibModalStack) {
      $rootScope.$on('$stateChangeStart', function(event, next) {
        $uibModalStack.dismissAll();
        if (next.authenticate) {
          if (!AuthService.isLoggedIn()) {
            event.preventDefault();
            $state.go('home');
          }
        } else if(!next.authenticate && next.name === 'login' && AuthService.isLoggedIn()) {
          if(!$rootScope.showLogin) {
            event.preventDefault();
          } else {
            $rootScope.showLogin = false;
          }
        }
      });
    }]);
})();
