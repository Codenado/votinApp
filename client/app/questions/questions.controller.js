'use strict';

angular.module('votinApp')
  .controller('QuestionsCtrl', function ($scope, $http, $stateParams) {
    var url = '/api/questions/' + $stateParams.id

    $scope.data = {
     group1 : 'Banana',
     group2 : '2',
     group3 : 'avatar-1'
   }


    $http.get(url).success(function(res){
          $scope.question = res
          console.log(res)
       }).error(function(error){
          console.log(error);
       })

      $scope.castVote = function(){
        var vote = $.param( $scope.data.group1 )
        $http.put('/api/questions/' + $stateParams.id + "?name="  + $scope.data.group1).success(function(res){
            $scope.question = res
           }).error(function(error){
              console.log(error);
           })
      }
})
