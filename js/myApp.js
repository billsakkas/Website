(function () {
'use strict';

angular.module('myApp', [])
.controller('myController', myController)
.service('getItemsService', getItemsService)
.directive('foundItems', FoundItemsDirective)
.constant('link', 'https://github.com/billsakkas/Website/blob/master/json/')

myController.$inject = ['getItemsService'];
function myController(getItemsService) {
  var ctrl = this;

  ctrl.getItems = function (jsonFile) {
    console.log("Clicked! :D");
    ctrl.recieved = undefined;
    getItemsService.getItems(jsonFile)
    .then(function (result) {
      ctrl.recieved = result;
      console.log(ctrl.recieved);
    })
    .catch(function(error) {
      console.log("Something went wrong!!! Error code = " + error);
    });

  }
  ctrl.notRecieved = function () {
    if (ctrl.recieved == undefined) {
      return false;
    }
    return ctrl.recieved.length == 0;
  }


}


getItemsService.$inject = ['$http'];
function getItemsService($http) {
  var service = this;
  service.getItems = function(jsonFile) {
    return $http({
      method: "GET",
      // url: (link + jsonFile)
      url: ("https://raw.githubusercontent.com/billsakkas/Website/master/json/Collection1.json")
    }).then(function(response){
      console.log(response.data.links[0]);
      return response.data.links
    });
  }
}


function FoundItemsDirective() {
  var ddo = {
        restrict: 'E',
        templateUrl: 'foundItemsDirective.html',
        scope: {
            items: '<recievedItems'
        },
        controller: DirectiveController,
        controllerAs: 'dirCtrl',
        bindToController: true,
        transclude: true
        };
    return ddo;
  };


function DirectiveController() {

}
})();
