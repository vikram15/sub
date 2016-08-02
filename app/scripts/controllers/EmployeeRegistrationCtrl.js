(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployeeRegistrationCtrl', ['$scope', '$state', 'EmployeeServices', 'AuthService', function($scope, $state, EmployeeServices, AuthService) {
        var vm = this;
        vm.initialize = function() {
          vm.today = function() {
            vm.dt = new Date();
          };
          vm.today();
          vm.clear = function() {
            vm.dt = null;
          };
          vm.dateOptions = {
            formatYear: 'yyyymmdd',
            maxDate: new Date(),
            startingDay: 1
          };
          vm.open1 = function() {
            vm.popup1.opened = true;
          };
          vm.popup1 = {
            opened: false
          };
        };

        vm.doSomething = function () {
          vm.$selection_made = $item;
        };
        vm.onRegisterFormSubmit = function() {
          $scope.submitted = true;
          // if (isValid) {
            var requestParams = {
              'firstName' : vm.firstName,
              'lastName' : vm.lastName,
              'password': vm.password,
              'mobileNo': vm.mobile,
              'email': vm.email,
              'dateOfBirth': moment(vm.dt).format('YYYYMMDD'),
            };
            EmployeeServices.setEmployee(requestParams, vm.onSetEmployeeRegistrationSuccess, vm.onSetEmployeeRegistrationError);
        };

        function onSuccessLogin(response) {
          $scope.loginResponse = response.data;
          AuthService.storeUserInformation($scope.loginResponse);

          if ($scope.loginResponse.userType === 'EMPLOYER') {
            if ($scope.loginResponse.isProfileUpdated === true) {
              $state.go('employer.dashboard');
            }
            else {
              $state.go('employerTempProfile');
            }
          }
          else {
            if ($scope.loginResponse.isProfileUpdated === true) {
              $state.go('employee.dashboard');
            }
            else {
              $state.go('employeeCandidateProfile', {
                'candidateData' : $scope.loginResponse.candidateId
              });
            }
          }
        }

        function onErrorLogin(response) {

        }
        vm.onSetEmployeeRegistrationSuccess = function(response) {
          var result = response.data;
          if (result !== null) {
            var requestParams = {
              'username': vm.email,
              'password': vm.password,
            };
            AuthService.loginService(requestParams, onSuccessLogin, onErrorLogin);
          }
        };

        vm.onSetEmployeeRegistrationError = function(response) {

        };

        vm.initialize();
      }]);
})();
