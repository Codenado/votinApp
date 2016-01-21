'use strict';

angular.module('votinApp')
  .controller('QuestionsCtrl', function ($scope, $http, $stateParams, Auth, socket) {
    var url = '/api/questions/' + $stateParams.id



    $scope.dati = {
     group1 : 'Banana',
     group2 : '2',
     group3 : 'avatar-1'
   }

 $scope.questions = []


   var user_id = Auth.getCurrentUser()._id

    $http.get(url).success(function(res){
      $scope.question = res
      update(res)
      socket.syncUpdates('question', $scope.questions, function(event, question, questions){
      if (question._id === $scope.question._id ){

        update(question)
      }

       })
    }).error(function(error){
          console.log(error);
       })

      $scope.castVote = function(){
        var vote = $.param( $scope.data.group1 )
        $http.put('/api/questions/' + $stateParams.id + "?name="  + $scope.data.group1)
          .success(function(){
            console.log('success')
          })
          .error(function(error){
              console.log(error);
           })
      }

       function update(question){

         $scope.question = question
        $scope.votes = []
        $scope.names = []
         _.map(question.choices, function(value, index){

        $scope.votes.push(value.votes)
        $scope.names.push(value.name)
        })
      }
})
