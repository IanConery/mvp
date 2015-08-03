var app = angular.module('eatery',[]);

app.controller('EateryController', function($scope, EateryFact){
  $scope.getRandomRestaraunt = function(){
    EateryFact.getRandomRestaraunt().then(function(data){
      $scope.data = data;
    });

  }

});

app.factory('EateryFact', function($http, $location){
  var data = '?ll=37.783724,-122.408978&radius=1609&section=food&limit=5&client_id=AMPO5F53E2EG2N4FYOF3IJLUOO1JTLZ3V4G3PYOENMJIWZF4&client_secret=PWGXI0LL5TYQO2NAPPIPW2N5FVBEOU0XIAZ0WVLT04IIAP3H&v=20140806&m=foursquare'
  var getRandomRestaraunt = function () {
    console.log('I have been clicked');
    return $http({
      method: 'GET',
      url: 'https://api.foursquare.com/v2/venues/explore' + data
    })
    .then(function (resp) {
      var respData = resp.data.response.groups[0].items;
      var rando = respData[Math.floor(Math.random() * respData.length)]
      console.log('here is the response', rando)
      return rando;
    });
  };

  return {
    getRandomRestaraunt: getRandomRestaraunt
  }
})