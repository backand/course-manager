(function() {
  'use strict';

  angular
    .module('templates', [])
    .config(config)
    .controller('CoursesController', ['CoursesService', CoursesController]);

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.courses', {
        url: '/courses',
        views: {
          '@': {
            templateUrl: 'src/app/courses/courses.tpl.html',
            controller: 'CoursesController',
            controllerAs: 'vm'
          }
        }
      });
  }

  /**
   * @name  CoursesController
   * @description Controller
   */
  function CoursesController (CoursesService){

    var vm = this;
    vm.courses = null;

    readCourses();

    function readCourses(){
      CoursesService.list().then(
        function(couses){
          vm.courses = couses.data.data;
        }
      )
    }

    vm.createCourse = function(course, isValid){
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
    }

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
    }

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