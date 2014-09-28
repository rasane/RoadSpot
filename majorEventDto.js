function createEventData(fromMajorOpenEventData){
	return{
		"id": fromMajorOpenEventData.id,
		"lat": fromMajorOpenEventData.geometry.coordinates[0],
		"lng": fromMajorOpenEventData.geometry.coordinates[1],
		"start": fromMajorOpenEventData.properties.start,
		"end": fromMajorOpenEventData.properties.end,
		"headline": fromMajorOpenEventData.properties.headline
	};
}

module.exports = createEventData;