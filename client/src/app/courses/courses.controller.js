(function() {
  'use strict';

  angular.module('app')
    .controller('CoursesCtrl', ['CoursesService', 'coursesList', CoursesCtrl]);


  /**
   * @name  CoursesController
   * @description Controller
   */
  function CoursesCtrl (CoursesService, coursesList){

    var vm = this;
    vm.courses = null;

    //get the courses from the resolve
    vm.courses = coursesList.data.data;

    function readCourses(){
      CoursesService.list().then(
        function(couses){
          vm.courses = couses.data.data;
        }
      )
    }

    vm.createCourse = function(course, isValid) {
      if (isValid) {
        CoursesService.create(course)
          .then(function (result) {
            //add the new course locally
            vm.courses.push(result.data);
          })
          .catch(function (reason) {
            // alert
            console.log(reason);
          });
      }
    };

    vm.updateCourse = function(course){
      vm.loading = true;

      CoursesService.update(course).
        then(function (result) {
          //do something good
          vm.loading = false;
        })
        .catch(function (reason) {
          // alert
          console.log(reason);
        });
    };

    vm.deleteCourse = function(id){
      CoursesService.destroy(id).
        then(function (result) {
          //refresh the course list
          readCourses();
        })
        .catch(function (reason) {
          // alert
          console.log(reason);
        });
    }

  }

})();
