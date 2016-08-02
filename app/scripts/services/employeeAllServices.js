(function(){
  'use strict';
  angular.module('scApp.services')
  .service('EmployeeServices', ['$http', 'API_URL', 'AuthService', function($http, API_URL, AuthService) {
    return {
      // Registering Employee
      setEmployee : function(requestParams, successCallback, errorCallback) {
        $http({
          method: 'POST',
          url: API_URL + 'v1/employee/registration',
          data: JSON.stringify(requestParams),
          headers: {
            'Content-Type' : 'application/json'
          }
        })
        .then(function onSuccess(response) {
          successCallback(response);
        },
        function onError(response) {
          errorCallback(response);
        });
      },

      setBasicEmployeeProfile : function(requestParams, employerId, successCallback, errorCallback) {
        $http({
          method: 'PUT',
          url: API_URL + 'v1/employer/' + employerId,
          data: JSON.stringify(requestParams),
          headers: {
            'Content-Type' : 'application/json'
          }
        })
        .then(function onSuccess(response) {
          successCallback(response);
        },
        function onError(response) {
          errorCallback(response);
        });
      },

      getAllSkillsList: function(jobSkills,  successCallback, errorCallback) {
        $http({
          method: 'GET',
          url: API_URL + 'v1/skill?name=' + jobSkills,
          headers: {
              'authToken' : AuthService.getToken()
          }
        })
        // $http.get('scripts/services/jsonFiles/myPostedJobs.json')
        .then(function onSuccess(response) {
          successCallback(response);
        },
        function onError(response) {
          errorCallback(response);
        });
      },

      checkUserByEmail: function(requestParams, successCallback, errorCallback) {
        $http({
          method: 'GET',
          url: API_URL + 'v1/employer/checkuser?email=' + requestParams.email,
        })
        // $http.get('scripts/services/jsonFiles/myPostedJobs.json')
        .then(function onSuccess(response) {
          successCallback(response);
        },
        function onError(response) {
          errorCallback(response);
        });
      },

      viewPublicJobsFromEmployee: function(requestParams, successCallback, errorCallback) {
        $http({
          method: 'GET',
          url: API_URL + 'v1/employee/' + requestParams.userId + '/jobs',
          headers: {
              'authToken' : AuthService.getToken()
          }
        })
        .then(function onSuccess(response) {
          successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
      },
      viewMyAppliedJobsFromEmployee: function(requestParams, successCallback, errorCallback) {
        $http({
          method: 'GET',
          url: API_URL + 'v1/employee/' + requestParams.userId + '/applied/jobs',
          headers: {
              'authToken' : AuthService.getToken()
          }
        })
        .then(function onSuccess(response) {
          successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
        });
      },
      getJobsById: function(requestParams, successCallback, errorCallback) {
        $http({
          method: 'GET',
          url: API_URL + 'v1/employer/' + requestParams.userId + '/job/' + requestParams.jobId,
          headers: {
            'authToken' : AuthService.getToken()
          }
        })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
      },
      getSearchedJobsByTypes: function(userId, query, searchType, successCallback, errorCallback) {
        $http({
          method: 'GET',
          url: API_URL + 'v1/employee/' + userId + '/job/search?q=' + query + '&type=' + searchType,
          headers: {
            'authToken' : AuthService.getToken(),
          }
        })
        .then(function onSuccess(response) {
          console.log(response);
          successCallback(response);
        },
        function onError(response) {
          errorCallback(response);
        });
      },
      getSearchedEmployers: function(userId, query, successCallback, errorCallback) {
        $http({
          method: 'GET',
          url: API_URL + 'v1/employee/' + userId + '/employer/search?name=' + query,
          headers: {
            'authToken' : AuthService.getToken(),
          }
        })
        .then(function onSuccess(response) {
          console.log(response);
          successCallback(response);
        },
        function onError(response) {
          errorCallback(response);
        });
      },
      viewRecentJobs: function(successCallback, errorCallback) {
        $http({
          method: 'GET',
          url: API_URL + 'v1/job/recent',
          headers: {
            'authToken' : AuthService.getToken(),
          }
        })
        .then(function onSuccess(response) {
          successCallback(response);
        },
        function onError(response) {
          errorCallback(response);
        });
      },
      viewParticularCandidateFromCandidate: function(userId, successCallback, errorCallback) {
        $http({
          method: 'GET',
          url: API_URL + 'v1/employee/' + userId,
          headers: {
            'authToken' : AuthService.getToken(),
          }
        })
        .then(function onSuccess(response) {
          console.log(response);
          successCallback(response);
        },
        function onError(response) {
          errorCallback(response);
        });
      },
      updateCandidate: function(userId, requestParams, successCallback, errorCallback) {
        $http({
          method: 'PUT',
          url: API_URL + 'v1/employee/' + userId,
          data: JSON.stringify(requestParams),
          headers: {
            'authToken': AuthService.getToken(),
            'Content-Type' : 'application/json'
          }
        })
        .then(function onSuccess(response) {
          successCallback(response);
        },
        function onError(response) {
          errorCallback(response);
        });
      },
    };
  }]);
})();
