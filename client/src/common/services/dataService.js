(function() {
  'use strict';

  angular
      .module('common.services.data',[])
      .factory('DataService', ['$http','Backand',dataService]);

  function dataService($http, Backand) {

    var factory = {
      list: list,
      create: create,
      update: update,
      destroy: destroy

    };
    return factory;

    ////////////////////////////////

    //return Backand url for object
    function getUrl() {
      return Backand.getApiUrl() + '/1/objects/object';
    }

    //return Backand url with object's id
    function getUrlForId(objectId) {
      return Backand.getApiUrl() + '/1/objects/object/' + objectId;
    }

    //get list of items in the object
    function list() {
      return $http.get(getUrl());
    }

    //create new object
    function create(object) {
      return $http.post(getUrl() + '?returnObject=true', object);
    }

    //update object's data
    function update(object) {
      return $http.put(getUrlForId(object.id)+'?deep=true', object);
    }

    //delete object
    function destroy(objectId) {
      return $http.delete(getUrlForId(objectId));
    }


  }

})();
