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
            		weatherBox.innerHTML = (response.main.temp - 273.15).toFixed(1) + ' &#176;C </br>' + '' + (response.weather[0].description) + '</br>' + 'Windspeed: ' + response.wind.speed + ' km/h';

            		// weatherBox.innerHTML = degC + '&#176;C <br>';
            	});
            }

  // function getMoreData() {
  //
  //   var city = document.getElementById('citybutton').value;
  //   var request = 'https//api.ipgeolocation.io/astronomy?apiKey=1eeb4b955fe247768ea167e1d406ce08&location=' + city;
  //
  //   fetch(request)
  //
  //   // parse response to JSON format . daarna gebeurt dit,
  //   .then(function(response) {
  //     return response.json(); //maak van respond een json
  //   })
  //
  //   // iets doen met  response
  //   .then(function(response) { //hiertussne opschrijven wat ik wil doen met info weather app
  //     // show full JSON object
  //     console.log(response);//response.main.temp --komt het in de console.
  //     var maanzonBox = document.getElementById('zonmaan');
  //   });
  // }

function getAPIData() {

  //var request = 'https://newsapi.org/v2/everything?q=Apple&from=2021-04-03&sortBy=popularity&apiKey=8bfdf0e85006470f90c1d383d80ee8e0';
var request = 'https://newsapi.org/v2/top-headlines?country=nl&apiKey=8bfdf0e85006470f90c1d383d80ee8e0';
  fetch(request)  //fetch is geef mij info, vraag stellen aan weathermap

  // parse response to JSON format . daarna gebeurt dit,
  .then(function(response) {
    return response.json(); //maak van respond een json
  })

  // iets doen met  response
  .then(function(response) { //hiertussne opschrijven wat ik wil doen met info weather app
    // show full JSON object
    console.log(response);//response.main.temp --komt het in de console.
    var zonMaan = document.getElementById('zonmaan');
    zonMaan.innerHTML = response;
    //weatherBox.innerHTML = response.weather[0].description;
  //  zonMaan.innerHTML = author.titel[0];
    //weatherBox.innerHTML = (response.weather[0].description);
    //weatherBox.innerHTML = response.wind.speed;

    // var degC = Math.floor(response.main.temp - 273.15);
    // var weatherBox = document.getElementById('weather');
    // weatherBox.innerHTML = degC + '&#176;C <br>';
  });
}
