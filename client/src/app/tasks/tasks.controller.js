(function() {
  'use strict';

  angular
    .module('templates', [])
    .config(config)
    .controller('TasksCtrl',['CoursesService', 'TasksService', 'tasksList', TasksCtrl]);

  /**
   * @name  config
   * @description config block
  // */
  function config($stateProvider) {
    $stateProvider
        .state('root.tasks', {
          url: 'courses/:courseId/tasks',
          views: {
            '@': {
              templateUrl: 'src/app/tasks/tasks.tpl.html',
              controller: 'TasksCtrl',
              controllerAs: 'vm',
              resolve: {
                tasksList: function(CoursesService) {
                  return CoursesService.getTasks(1);
                }
              }
            }
          }
        });
  }

  /**
   * @name  HomeCtrl
   * @description Controller
   */
  function TasksCtrl(CoursesService, TasksService, tasksList) {
    var vm = this;

    //get the tasks fro the specific course
    vm.tasks = coursesList.data.data;

    function readCourses(){
      CoursesService.getTasks(1).then(
          function(tasks){
            vm.courses = tasks.data.data;
          }
      )
    }

    vm.createTask = function(task, isValid){
      if (isValid) {
        TasksService.create(task)
            .then(function (result) {
              //add the new course locally
              vm.tasks.push(result.data);
            })
            .catch(function (reason) {
              // alert
              console.log(reason);
            });
      }
    }

    vm.updateTask = function(task){
      vm.loading = true;

      TasksService.update(task).
          then(function (result) {
            //do something good
            vm.loading = false;
          })
          .catch(function (reason) {
            // alert
            console.log(reason);
          });
    }

    vm.deleteTask = function(id){
      TasksService.destroy(id).
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
