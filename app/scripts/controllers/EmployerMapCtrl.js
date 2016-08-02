(function(){
  'use strict';
  angular.module('scApp.controllers')
  .controller('EmployerMapCtrl',['$scope','EmployerServices','$timeout','$http', function($scope, EmployerServices, $timeout, $http){
    var vm = this;

    vm.initialize = function(){
      EmployerServices.employerDisplayMap(vm.onSuccessDisplayMap, vm.onErrorDisplayMap);
    };

    vm.onSuccessDisplayMap = function(response){
      vm.mapData = response.data;
      // display Employer Map
      var myCenter=new google.maps.LatLng(vm.mapData.latitude,vm.mapData.longitude);
      vm.mapDisplay = function(){
        var mapProp = {
          center:myCenter,
          zoom:6,
          mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

        var marker=new google.maps.Marker({
          position:myCenter,
        });
        marker.setMap(map);
      };
      google.maps.event.addDomListener(window ,vm.mapDisplay());

    };

    vm.onErrorDisplayMap = function(response){
      console.log("Error block");
    };

    vm.initialize();

  }]);
})();
