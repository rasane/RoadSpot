function dataFetcher(url) {

	var request = require('request');
	var Promise = require("node-promise").Promise;
	var promise = new Promise();

	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			/**/
			promise.resolve(body);
		}else{
			promise.reject(error, response.statusCode);
		}
	});
	return promise;
};

module.exports = dataFetcher;