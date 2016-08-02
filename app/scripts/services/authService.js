(function(){
  'use strict';
  angular.module('scApp.services')
    .factory('AuthService', ['$http', '$rootScope', 'API_URL', '$cookies', function($http, $rootScope, API_URL, $cookies) {
      var globals;
      if($cookies.get('globals') && !angular.isUndefined($cookies.get('globals'))) {
        globals = JSON.parse($cookies.get('globals'));
      }
      return {
        loginService: function(requestParams, successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL + 'login',
            headers: requestParams
            //
            //data: JSON.stringify(requestParams),
          })
           //$http.get('scripts/services/jsonFiles/loginJSON.json')
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        storeUserInformation: function(userInfo) {
          if (userInfo.userType === 'EMPLOYER') {
            globals = {
              'authToken': userInfo.authToken,
              'userName': userInfo.userName,
              'userId' : userInfo.userId,
              'employerId' : userInfo.employerId
            };
          }
          else {
            globals = {
              'authToken': userInfo.authToken,
              'userName': userInfo.userName,
              'userId' : userInfo.userId,
              'candidateId' : userInfo.candidateId
            };
          }
          $cookies.put('globals', JSON.stringify(globals));
          // $rootScope.user = globals.userName;
          // console.log(globals);
        },

        updateToken: function(token) {
          globals.authToken = token;
          $cookies.put('globals', JSON.stringify(globals));
        },

        isLoggedIn: function() {
          return (!angular.isUndefined(globals) && globals && globals.userInfo);
        },

        getUserName: function() {
          return globals.userInfo.name;
        },

        getUserId: function() {
          return globals.userId;
        },

        getEmployerId: function() {
          return globals.employerId;
        },

        getCandidateId: function() {
          return globals.candidateId;
        },

        getToken: function() {
          return globals.authToken;
        },

        clearUserData: function() {
          globals = {};
        },

        clearToken: function() {
          globals = null;
          $cookies.remove('globals');
        },

        logout: function(successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL + 'logout',
            headers: {
              'authToken': this.getToken()
            }
          }).then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
        forgotPassword: function(requestParams, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/user/forgotPassword?email=' + requestParams.email,
          }).then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
        resetPassword: function(requestParams, authToken, successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL + 'v1/user/reset?token=' + authToken + '&newpw=' + requestParams.password,
          }).then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
      };
    }]);
})();
