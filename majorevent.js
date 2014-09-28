var dataFetcher = require("./fetchData");
var Promise = require("node-promise").Promise;
var majorEventDto = require("./majorEventDto");


var returnedPromise = dataFetcher("http://livetraffic.rta.nsw.gov.au/traffic/hazards/majorevent-open.json");
var promise = new Promise();

console.log(returnedPromise);
returnedPromise.then(function(body) {
	var majorOpenEventData = JSON.parse(body);
	console.log(majorOpenEventData.features.length);
	var eventsDto = [];
	for (var i = 0; i < majorOpenEventData.features.length; ++i) {
		var anEvent = majorOpenEventData.features[i];
		var eventDto = majorEventDto(anEvent);
		console.log(eventDto);
		eventsDto.push(eventDto);
	}
	promise.resolve(eventDto);
});
return promise;




