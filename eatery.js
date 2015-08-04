var app = angular.module('eatery',[]);
app.controller('EateryController', function($scope, EateryFact){
  $scope.available = false;
  $scope.getRandomRestaraunt = function(){
    EateryFact.getRandomRestaraunt().then(function(data){
      $scope.data = data;
      EateryFact.mapFunc(data.venue.location.lat, data.venue.location.lng);
      $scope.available = true;
    });
  };
});


app.controller('MapController', function($scope, EateryFact){//useless controller

});

app.factory('EateryFact', function($http, $location){
  var data = '?ll=37.783724,-122.408978&radius=1609&section=food&openNow=1&price=1,2,3&client_id=AMPO5F53E2EG2N4FYOF3IJLUOO1JTLZ3V4G3PYOENMJIWZF4&client_secret=PWGXI0LL5TYQO2NAPPIPW2N5FVBEOU0XIAZ0WVLT04IIAP3H&v=20140806&m=foursquare'
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
      console.log(respData);
      return rando;// returns one location from an array of locations
    });
  };
  var mapFunc = function(lat, long){//this builds the map
    var image = 'images/small.png';
    var mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(lat, long),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    this.marker = new google.maps.Marker({// restaraunt location
      position: new google.maps.LatLng(lat,long),
      map: this.map,
      icon: image
    });
    this.marker = new google.maps.Marker({// users location
      position: new google.maps.LatLng(37.783724,-122.408978),
      map: this.map
    });
    var infoWindow = new google.maps.InfoWindow();
  };  

  return {
    getRandomRestaraunt: getRandomRestaraunt,
    mapFunc: mapFunc
  }
})