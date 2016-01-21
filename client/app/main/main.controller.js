angular.module('votinApp')
  .controller('MainCtrl', function ($scope, $http, Auth, socket) {
    if (Auth.isLoggedIn()){
      $scope.loggedIn = true
      console.log(Auth)
    }else{
      $scope.loggedIn = false
    }
    $scope.newQuestion = {
      title: '',
      choices: [{ label: 'Choice #1' }, { label: 'Choice #2' }]
    }

    $http.get('api/questions').then(function(res){
      $scope.questions = res.data
        socket.syncUpdates('question', $scope.questions)
    })


    $scope.addNewChoice = function() {
      var newLabel = $scope.newQuestion.choices.length+1
      $scope.newQuestion.choices.push({ label: 'Choice #' + newLabel });

   }

   $scope.addNewQuestion = function() {
     console.log('$scope.newQuestion')
     $http.post('/api/questions', $scope.newQuestion).success(function(){

        }).error(function(error){
           console.log("error");
        })
    }


  })
