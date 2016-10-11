(function () {
'use strict';

angular.module('myApp', [])
.controller('myController', myController)
.service('getItemsService', getItemsService)
.directive('foundItems', FoundItemsDirective)


myController.$inject = ['getItemsService'];
function myController(getItemsService) {
  var ctrl = this;
  ctrl.title = "title";
  ctrl.recieved = undefined;
  ctrl.getItems = function (jsonFile) {
    

    getItemsService.getItems(jsonFile)
    .then(function (result) {
      ctrl.recieved = result;
      ctrl.title = "Title";
      
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
      // url: ("https://raw.githubusercontent.com/billsakkas/Website/master/json/Collection1.json")
      url: ("json/" + jsonFile + ".json")
    }).then(function(response){
      console.log(response.data.links);
      return response.data.links;
    });
  }
}


function FoundItemsDirective() {
  var ddo = {
        restrict: 'E',
        templateUrl: 'directiveTemplates/foundItemsDirective.html',
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
