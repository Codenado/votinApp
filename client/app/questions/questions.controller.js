'use strict';

angular.module('votinApp')
  .controller('QuestionsCtrl', function ($scope, $http, $stateParams, Auth) {
    var url = '/api/questions/' + $stateParams.id



    $scope.dati = {
     group1 : 'Banana',
     group2 : '2',
     group3 : 'avatar-1'
   }


   $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100]

   var user_id = Auth.getCurrentUser()._id

    $http.get(url).success(update).error(function(error){
          console.log(error);
       })

      $scope.castVote = function(){
        var vote = $.param( $scope.data.group1 )
        $http.put('/api/questions/' + $stateParams.id + "?name="  + $scope.data.group1)
          .success(update)
          .error(function(error){
              console.log(error);
           })
      }

       function update(res, req){
         console.log('wwww')
        // $scope.question = data
        // $scope.voted = $scope.question.voters.filter(function(voter){
        //   return user_id === voter.voter_id
        // }).pop()
        $scope.question = res
        $scope.votes = []
        $scope.names = []
         _.map(res.choices, function(value, index){

        $scope.votes.push(value.votes)
        $scope.names.push(value.name)
        })
      }
})
