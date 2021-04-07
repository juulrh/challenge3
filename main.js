mapboxgl.accessToken = 'pk.eyJ1IjoianV1bHJoIiwiYSI6ImNrbWx0cXBkajA5Ym0ycGx3NGQxa2Q2ZTgifQ.3qb02-PYSz_d6fgTyY8p5w';

//VAR LOCATIES MET COORDINATEN
var locaties = [{
    type: 'Feature',
    properties: {
      description: '<p>Goede plek om te landen</p>',
      icon: 'flag'
    },
    geometry: {
      type: 'Point',
      coordinates: [6.533258519883534, 53.17623958958595]
    },
  },
  {
    type: 'Feature',
    properties: {
      description: '<p>Goede plek om te landen</p>',
      icon: 'flag'
    },
    geometry: {
      type: 'Point',
      coordinates: [6.5159615333312315, 53.1797266170132]
    }
  },
  {
    type: 'Feature',
    properties: {
      description: '<p>Goede plek om te landen</p>',
      icon: 'flag'
    },
    geometry: {
      type: 'Point',
      coordinates: [6.539079670415777, 53.168154040005206]
    }
  },
];

// DE MAPS
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/juulrh/ckmlxucqgfqfk17qyr6gxvnc2',
  center: [6.5425821, 53.1787103],
  zoom: 13

});

//CONTROL BAR RECHTS BOVEN
map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {

  // EXTERN BESTAND
 //map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', function (error, image) {
map.loadImage('images/flag.png', function (error, image){
      // VOEG IMAGE TOE
     map.addImage('flag', image);

      // PUNT IN GEHEUGEN
      map.addSource('point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
         features: locaties
        }
      });
      // NIEUWE SOURCE POINT OP MAPS
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'point',
        layout: {
          'icon-image': 'flag',
         'icon-size': 0.18
        }
      });
    }
  );
});


            // ICON UITROEPS coordinates: [6.558267009864895, 53.17932862664539]
    // function getAPIdata() {
    //
    //         	// construct request
    //         	var city = document.getElementById('city').value;
    //         	var request = 'https://api.openweathermap.org/data/2.5/weather?appid=639b70cdea4ec366f54e164e3bc7269c&q=' + city;
    //         					// https://api.openweathermap.org/data/2.5/weather?appid=HIERAPIKEY&q=rotterdam
    //         	// get current weather
    //         	fetch(request)  //fetch is geef mij info, vraag stellen aan weathermap
    //
    //         	// parse response to JSON format . daarna gebeurt dit,
    //         	.then(function(response) {
    //         		return response.json(); //maak van respond een json
    //         	})
    //
    //         	// iets doen met  response
    //         	.then(function(response) { //hiertussne opschrijven wat ik wil doen met info weather app
    //         		// show full JSON object
    //         		console.log(response);//response.main.temp --komt het in de console.
    //         		var weatherBox = document.getElementById('weather');
    //         		//weatherBox.innerHTML = response;
    //         		//weatherBox.innerHTML = response.weather[0].description;
    //         		weatherBox.innerHTML = (response.main.temp - 273.15).toFixed(1) + ' &#176;C </br>' + '' + (response.weather[0].description) + '</br>' + 'Windspeed: ' + response.wind.speed + ' km/h';
    //         		//weatherBox.innerHTML = (response.weather[0].description);
    //         		//weatherBox.innerHTML = response.wind.speed;
    //
    //         		// var degC = Math.floor(response.main.temp - 273.15);
    //         		// var weatherBox = document.getElementById('weather');
    //         		// weatherBox.innerHTML = degC + '&#176;C <br>';
    //         	});
    //         }
            document.getElementById('citybutton').onclick = function(){
            	getAPIdata();
            }

            // init data stream
            var geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            });

            // Voeg de zoekbalk toe
            map.addControl( geocoder, 'top-left');

            map.on('load', function () {
            	// Listen for the `geocoder.input` event that is triggered when a user
            	// makes a selection
            	geocoder.on('result', function (ev) {
            	  console.log(ev.result.center);
                //document.getElementById('coordinaten').innerHTML = ev.result.center[0] + '-' + ev.result.center[1];
                getAPIdata(ev.result.center[0], ev.result.center[1]);
            	});
            });

            function getAPIdata(ingevoerdeLon, ingevoerdeLat) {

            	// construct request
            //	var city = document.getElementById('city').value;
            	var request = 'https://api.openweathermap.org/data/2.5/weather?appid=639b70cdea4ec366f54e164e3bc7269c&lon=' +ingevoerdeLon+ '&lat=' +ingevoerdeLat;
            					// https://api.openweathermap.org/data/2.5/weather?appid=HIERAPIKEY&q=rotterdam
            	// get current weather
            	fetch(request)  //fetch is geef mij info, vraag stellen aan weathermap

            	// parse response to JSON format . daarna gebeurt dit,
            	.then(function(response) {
            		return response.json(); //maak van respond een json
            	})

            	// iets doen met  response
            	.then(function(response) { //hiertussne opschrijven wat ik wil doen met info weather app
            		// show full JSON object
            		console.log(response);//response.main.temp --komt het in de console.
            		var weatherBox = document.getElementById('weer');
            		//weatherBox.innerHTML = response;
            		//weatherBox.innerHTML = response.weather[0].description;
            		weatherBox.innerHTML = 'Weather' + '</br>' + (response.main.temp - 273.15).toFixed(1) + ' &#176;C </br>' + '' + (response.weather[0].description) + '</br>' + 'Windspeed: ' + response.wind.speed + ' m/s';

            		// weatherBox.innerHTML = degC + '&#176;C <br>';
            	});
            }

//WERKT NIET, SUBSRIBED
// function getNews() {
//
//   var request = 'http://newsapi.org/v2/top-headlines?country=nl&apiKey=8bfdf0e85006470f90c1d383d80ee8e0';
//
//   fetch(request)  //fetch is geef mij info, vraag stellen
//
//   // parse response to JSON format . daarna gebeurt dit,
//   .then(function(response) {
//     return response.json();
//   })
//
//   .then(function(response) {
//
//     console.log(response);
//     var nieuws = document.getElementById('nieuws');
//     //nieuws.innerHTML = response;
//     //weatherBox.innerHTML = response.weather[0].description;
//   //  weatherBox.innerHTML = 'Weather' + '</br>' + (response.main.temp - 273.15).toFixed(1) + ' &#176;C </br>' + '' + (response.weather[0].description) + '</br>' + 'Windspeed: ' + response.wind.speed + ' m/s';
//   });
// }
// getNews();



// WERKT WEL, GEKKE DATUM EN TEKST
 function getNews() {

   var request = 'https://api.nasa.gov/planetary/apod?api_key=TmVvFQjkKXOxfapC7ExzRfOi2zf0CpYWdobgYXzM';

   fetch(request)  //fetch is geef mij info, vraag stellen

   // parse response to JSON format . daarna gebeurt dit,
   .then(function(response) {
     return response.json();
   })

   .then(function(response) {

     console.log(response);
     var nieuws = document.getElementById('nieuws');
     //nieuws.innerHTML = response;
     nieuws.innerHTML = (response.date) + '<br>' + (response.explanation);
   //  weatherBox.innerHTML = 'Weather' + '</br>' + (response.main.temp - 273.15).toFixed(1) + ' &#176;C </br>' + '' + (response.weather[0].description) + '</br>' + 'Windspeed: ' + response.wind.speed + ' m/s';
   });
 }
 getNews();

//open tripmap
 // function getNews() {
 //
 //   var request = 'https://api.opentripmap.com/0.1/en/places/radius?radius=500&lon=6.533258519883534&lat=53.17623958958595&kinds=interesting_places&name=Interesting%20places&rate=2&format=json&limit=5&apikey=5ae2e3f221c38a28845f05b6209bf7bfd923b79af11437d9379c8539';
 //
 //   fetch(request)  //fetch is geef mij info, vraag stellen
 //
 //   // parse response to JSON format . daarna gebeurt dit,
 //   .then(function(response) {
 //     return response.json();
 //   })
 //
 //   .then(function(response) {
 //
 //     console.log(response);
 //  //   var nieuws = document.getElementById('nieuws');
 //     //nieuws.innerHTML = response;
 //     //nieuws.innerHTML = (response.date) + '<br>' + (response.explanation);
 //   //  weatherBox.innerHTML = 'Weather' + '</br>' + (response.main.temp - 273.15).toFixed(1) + ' &#176;C </br>' + '' + (response.weather[0].description) + '</br>' + 'Windspeed: ' + response.wind.speed + ' m/s';
 //   });
 // }
 // getNews();
