(function(){
  'use strict';

  angular
    .module('scApp', [
      'ngAnimate',
      'ngAria',
      'ngCookies',
      'ngMessages',
      'ui.bootstrap',
      'ngResource',
      'ngSanitize',
      'ngTouch',
      'ui.router',
      'angularMoment',
      'ngFileUpload',
      'scApp.controllers',
      'scApp.routes',
      'scApp.services',
      'scApp.constants',
      'scApp.directives'
    ]);
    angular.module('scApp.controllers', []);
    angular.module('scApp.routes', []);
    angular.module('scApp.services', []);
    angular.module('scApp.constants', []);
    angular.module('scApp.directives' ,[]);
})();
