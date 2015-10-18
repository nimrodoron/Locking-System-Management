/**
 * Created by Amir on 17/10/2015.
 */


    var map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -33.8666, lng: 151.1958},
            zoom: 15
        });

    }
    function searchList(placesList, suffix, callback){

        var placesOutput = [];
        var service = new google.maps.places.PlacesService(map);
        var total_requests = placesList.length;
        var factor=0;
        var global_index = 0;
        for (var i=5; i<placesList.length+5; i+=5){
            for (var j=i-5; j<i && j<placesList.length; j++) {
                setTimeout(function () {
                    var sPlaceName = placesList[global_index];
                    global_index++;
                    service.textSearch({query: suffix + sPlaceName}, function (result, status) {
                        total_requests = total_requests - 1;
                        console.log(status, "remaining requests: " + total_requests);
                        if (status == google.maps.places.PlacesServiceStatus.OK) {

                            placesOutput.push({
                                name: result[0]["formatted_address"],
                                lon: result[0].geometry.location.lng(),
                                lat: result[0].geometry.location.lat()
                            });
                            if (total_requests == 0) {
                                callback(placesOutput);
                            }
                        }
                    });

                }, factor);
            }
            factor += 5000;
        }
    }

