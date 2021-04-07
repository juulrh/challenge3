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
            // document.getElementById('citybutton').onclick = function(){
            // 	getAPIdata();
            // }

            // // init data stream
            // var geocoder = new MapboxGeocoder({
            //     accessToken: mapboxgl.accessToken,
            //     mapboxgl: mapboxgl
            // });
            //
            // // Voeg de zoekbalk toe
            // map.addControl( geocoder, 'top-left');

            var geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                types: 'country,region,place,postcode,locality,neighborhood'
            });

            // place with id
            var features = [];

            geocoder.addTo('#geocoder');

            // Add geocoder result to container.
            geocoder.on('result', function (e) {
                let coords = e.result.geometry.coordinates;

                //update map, go to coordinates
                map.flyTo({
                    center: coords,
                    zoom: 15
                });

                features = [];
                getBars(coords);
                // getCultural(coords);
            });

            //andere api  parameter coords
            function getBars(coords) {
                const openTripMapKey = '5ae2e3f221c38a28845f05b6209bf7bfd923b79af11437d9379c8539';
                let url = 'https://api.opentripmap.com/0.1/en/places/radius',
                    qString = '?radius=1000&lon=' + coords[0] + '&lat=' + coords[1] + '&kinds=bars&limit=20&apikey=' + openTripMapKey;

                fetch(url + qString)
                    .then(resp => {
                        return resp.json();
                    }).then(data => {
                    let bars = data.features;

                    for (let i = 0; i < bars.length; i++) {
                        let bar = bars[i];

                        let obj = {};
                        obj.id = bar.id;
                        obj.type = 'Feature';
                        obj.properties = {};
                        obj.properties.description = '<strong>' + bar.properties.name + '</strong>';
                        obj.properties.icon = 'bar';
                        obj.geometry = {};
                        obj.geometry.type = 'Point';
                        obj.geometry.coordinates = bar.geometry.coordinates;

                        features.push(obj);
                    }
                    placeMarkers();
                }).catch((error) => {
                    alert(error);
                })
            }

            //markers gemaakt
            function placeMarkers() {
                map.addSource('places', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': features
                    }
                });

                // Add a layer showing the places.
                map.addLayer({
                    'id': 'places',
                    'type': 'symbol',
                    'source': 'places',
                    'layout': {
                        'icon-image': '{icon}-15',
                        'icon-size': 2,
                        'icon-allow-overlap': true
                    }
                });

                var popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                });

                map.on('mouseenter', 'places', function (e) {

                    const openTripMapKey = '5ae2e3f221c38a28845f05b6209bf7bfd923b79af11437d9379c8539';
                    let url = 'https://api.opentripmap.com/0.1/en/places/xid/' + e.features[0].id,
                        qString = '?apikey=' + openTripMapKey;
                    fetch(url + qString)
                        .then(resp => {
                            return resp.json();
                        }).then(data => {
                        let address = '<p>' + data.address.road + ' ' + data.address.house_number + '<br>' + data.address.postcode + ' ' + data.address.city + '<br>' + data.address.country + '</p>';
                        var coordinates = e.features[0].geometry.coordinates.slice();
                        var description = e.features[0].properties.description + address;


                        // Populate the popup and set its coordinates based on the feature found.
                        popup.setLngLat(coordinates)
                            .setHTML(description)
                            .addTo(map);
                    }).catch((error) => {
                        alert(error);
                    })
                });

                map.on('mouseleave', 'places', function () {
                    popup.remove();
                });
            }

            //markers gemaakt
            function placeMarkers() {
                map.addSource('places', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': features
                    }
                });

                // Add a layer showing the places.
                map.addLayer({
                    'id': 'places',
                    'type': 'symbol',
                    'source': 'places',
                    'layout': {
                        'icon-image': '{icon}-15',
                        'icon-size': 2,
                        'icon-allow-overlap': true
                    }
                });

                var popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                });

                map.on('mouseenter', 'places', function (e) {

                    const openTripMapKey = '5ae2e3f221c38a28845f05b6209bf7bfd923b79af11437d9379c8539';
                    let url = 'https://api.opentripmap.com/0.1/en/places/xid/' + e.features[0].id,
                        qString = '?apikey=' + openTripMapKey;
                    fetch(url + qString)
                        .then(resp => {
                            return resp.json();
                        }).then(data => {
                          let address = '<p>' + data.address.road + ' ' + data.address.house_number + '<br>' + data.address.postcode + ' ' + data.address.city + '<br>' + data.address.country + '</p>';
                          var coordinates = e.features[0].geometry.coordinates.slice();
                          var description = e.features[0].properties.description + address;


                        // Populate the popup and set its coordinates based on the feature found.
                        popup.setLngLat(coordinates)
                            .setHTML(description)
                            .addTo(map);
                    }).catch((error) => {
                        alert(error);
                    })
                });

                map.on('mouseleave', 'places', function () {
                    popup.remove();
                });
            }





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

            	var request = 'https://api.openweathermap.org/data/2.5/weather?appid=639b70cdea4ec366f54e164e3bc7269c&lon=' +ingevoerdeLon+ '&lat=' +ingevoerdeLat;

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

            		weatherBox.innerHTML = 'Weather' + '</br>' + (response.main.temp - 273.15).toFixed(1) + ' &#176;C </br>' + '' + (response.weather[0].description) + '</br>' + 'Windspeed: ' + response.wind.speed + ' m/s';
            	});
            }




//WERKT WEL, GEKKE DATUM EN TEKST
 // function getNews() {
 //
 //   var request = 'https://api.nasa.gov/planetary/apod?api_key=TmVvFQjkKXOxfapC7ExzRfOi2zf0CpYWdobgYXzM';
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
 //     nieuws.innerHTML = (response.date) + '<br>' + (response.explanation);
 //   //  weatherBox.innerHTML = 'Weather' + '</br>' + (response.main.temp - 273.15).toFixed(1) + ' &#176;C </br>' + '' + (response.weather[0].description) + '</br>' + 'Windspeed: ' + response.wind.speed + ' m/s';
 //   });
 // }
 // getNews();


 function getNews() {

   var request = 'https://test.spaceflightnewsapi.net/api/v2/articles?_limit=5';

   fetch(request)  //fetch is geef mij info, vraag stellen

   // parse response to JSON format . daarna gebeurt dit,
   .then(function(response) {
     return response.json();
   })

   .then(function(response) {

     console.log(response);
    var nieuws = document.getElementById('nieuws');
     //nieuws.innerHTML = response;
    nieuws.innerHTML = 'Space News' + '</br>'+ (response[0].title) + '</br>' + (response[1].title) + '</br>' +(response[2].title) + '</br>' +(response[3].title);
   //  weatherBox.innerHTML = 'Weather' + '</br>' + (response.main.temp - 273.15).toFixed(1) + ' &#176;C </br>' + '' + (response.weather[0].description) + '</br>' + 'Windspeed: ' + response.wind.speed + ' m/s';
   });
 }
 getNews();
