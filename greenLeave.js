var myapp = angular.module('a2_10', []);
myapp.controller('c2_10', ['$scope', function ($scope) {
    $scope.container = 'container';
    $scope.resultInfo = 'resultInfo';
    $scope.form_show = true;
    $scope.info_show = false;
    $scope.save = function () {
        $scope.form_show = false;
        $scope.info_show = true;
    };
    $scope.re_info = function () {
        $scope.form_show = true;
        $scope.info_show = false;
    };
}])

function bindAutocomplete() {

    var acService = new google.maps.places.AutocompleteService(),
        placesService = new google.maps.places.PlacesService(document.createElement('div')),
        searchTypes = ['geocode'];

    $("input#location").autocomplete({
        source: function (req, resp) {

            acService.getPlacePredictions({
                input: req.term,
                types: searchTypes
            }, function (places, status) {
                console.log('places', places);
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    var _places = [];
                    for (var i = 0; i < places.length; ++i) {
                        _places.push({
                            id: places[i].place_id,
                            value: places[i].description,
                            label: places[i].description
                        });
                    }
                    resp(_places);
                }
            });
        },
        select: function (e, o) {
            placesService.getDetails({
                placeId: o.item.id
            }, function (place, status) {
                console.log("details", place);
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    debug(o.item.value +
                        '\n is located at \n ' +
                        place.geometry.location.toUrlValue());
                }
            });

        }
    });
}

// ** INITIALIZE ** //
$(function () {
    try {
        bindAutocomplete();
        debug("initialized");
    } catch (e) {
        debug({ error: e });
    }
});

