function latLngToPostCodeConverter(lat, lng) {

	var request = require('request');
	var dataFetcher = require("./fetchData");
	var Promise = require("node-promise").Promise;
	var googleApiKey = "xxx-PutYourKey-xxx";
	
	var requestString = ["https://maps.googleapis.com/maps/api/geocode/json?latlng=", lng, ",", lat, "&key=", googleApiKey].join("");
    var returnedPromise = dataFetcher(requestString);
	var promise = new Promise();
	returnedPromise.then(function(data) {
		var results = JSON.parse(data).results;
		//console.log(results.length);
		for (var i = 0; i < results.length; ++i) {
			var geoCodeData = results[i];
			//console.log(geoCodeData.address_components.length);
			for (var j = 0; j < geoCodeData.address_components.length; ++j) {
				if (geoCodeData.address_components[j].types[0] === "postal_code") {
					var postal_code = geoCodeData.address_components[j].short_name;
					console.log(postal_code);
					promise.resolve(postal_code);
					return postal_code;
				}
			}
		}
	});
	return promise;
};
module.exports = latLngToPostCodeConverter;
 