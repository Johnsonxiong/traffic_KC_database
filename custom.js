$(function () {	
	
	var location, mapCanvas, map;
    function initMap() {
        //var lt, ln=0.00; use by getting latllong from the db
                 
    	centerloc = new google.maps.LatLng(37.697948,-97.314835); //latlong for the map to recenter somewhere in wichita
        locations = [['Wichita', 37.697948,-97.314835]];

	  mapCanvas = document.getElementById('map');
      var mapOptions = {
            center: centerloc,
            zoom: 7,
            panControl: true,
            scrollwheel: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    map = new google.maps.Map(mapCanvas, mapOptions);

	  addMarker(locations);
	  var styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];
    //map.set('styles', styles);

    }

	
	function addMarker(location){  //function to add a list of markers with db query
		var markerImage = 'marker.png';
		var marker,i;
    
		for (i = 0; i < location.length; i++) 
		{  
         marker = new google.maps.Marker({
         position: new google.maps.LatLng(location[i][1], location[i][2]),
         map: map,
		 icon: markerImage
         });
		
         google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
          infowindow.setContent(location[i][0]);
          infowindow.open(map, marker);
          
		  $.post('./detectorStations.php',function(result){
			  console.log(result)
			  var data = JSON.parse(result)
			  //var x = result[0]
			  console.log(data)
			  console.log(data[0][0])
			  console.log(data[0][1])
			  console.log(data[0][2])
			  addMarker(data)
		  });
		  
          }
         })(marker, i));
    
        var contentString = '<div class="info-window">' +
                '<h3>Traffic data</h3>' +
                '<div class="info-content">' + //use the contentString to show something on the markers of the map, like station id and crashtime
                '<p> Just the content string with extra stuff Pellentesque habitant morbi tristique senectus et netur qua</p>' +
                '</div>' +
                '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 400
            });

	   }
     }
    google.maps.event.addDomListener(window, 'load', initMap);
});