(function() {
  'use strict';

  function dataService($http, Backand) {

    var factory = {};

    //return Backand url for object
    function getUrl() {
      return Backand.getApiUrl() + '/1/objects/courses';
    };

    //return Backand url with object's id
    function getUrlForId(courseId) {
      return Backand.getApiUrl() + '/1/objects/courses/' + courseId;
    };

    //get list of courses
    factory.list = function () {
      return $http.get(Backand.getApiUrl() + getUrl());
    };

    //create new course
    factory.create = function (course) {
      return $http.post(getUrl() + '?returnObject=true', course);
    };

    //update course data
    factory.update = function (courseId, course) {
      return $http.put(getUrlForId(courseId)+'?deep=true', course);
    };

    //delete course
    factory.delete = function (courseId) {
      return $http.delete(getUrlForId(courseId));
    };

    //get tasks
    self.getTasks = function(courseId){
      return $http.get(Backand.getApiUrl() + getUrl() + courseId + '/tasks').then(extractData);
    }

  }

  angular.module('common.services.data', [])
    .factory('DataService', ['$http','Backand',dataService]);
})();
