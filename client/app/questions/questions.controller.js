'use strict';

angular.module('votinApp')
  .controller('QuestionsCtrl', function ($scope, $http, $stateParams, socket, $localStorage) {
    var url = '/api/questions/' + $stateParams.id
    $scope.didVote = true

    if(!$localStorage.votes){
      console.log($localStorage.votes)
      $localStorage.votes = []
    }



    $scope.questions = []



    $http.get(url).success(function(res){
      $scope.question = res
      update(res)
        checkVote()
        console.log($scope.didVote)
      socket.syncUpdates('question', $scope.questions, function(event, question, questions){
        if (question._id === $scope.question._id ){
          update(question)
        }
      })
    }).error(function(error){
          console.log(error);
       })

      $scope.castVote = function(){
        $scope.didVote = true

        $http.put(url + "?vote="  + $scope.sendVote)
          .success(function(){
            $localStorage.votes.push($scope.question._id)
          //  console.log($localStorage.votes)
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

      function checkVote(){
        console.log('hello')
        console.log($localStorage.votes)
      var check = $localStorage.votes.filter(function(vote){
        console.log(vote === $scope.question._id)
          return vote === $scope.question._id
        }).pop()
        if(!check){
        $scope.didVote = false
}
      }

})
