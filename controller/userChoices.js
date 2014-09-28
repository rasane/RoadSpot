/**
 * @author rasane
 */

function UserChoices(phoneNumber){
	var _sessionObject = {
		phoneNumber : phoneNumber,
		who : "?",
		driverInfo: {}
	};
	
	return {
		
		"getPhoneNumber": function(){
			return _sessionObject.phoneNumber;
		},
		"setAsDriver": function(){
			_sessionObject.who = "driver";
		},
		"getWho": function(){
			return _sessionObject.who;
		}, 
		"getSessionObject": function(){
			return _sessionObject;
		},
		"setError": function(error){
			_sessionObject.error = error; 
		},
		"setSessionObject": function(sessionObject){
			_sessionObject = sessionObject;
		},
		"setDriverInfo": function(zipCode, operateFrom, operateTo){
			_sessionObject.driverInfo.zipCode = zipCode;
			_sessionObject.driverInfo.operateFrom = operateFrom;
			_sessionObject.driverInfo.operateTo = operateTo;
		}, 
		"saveToDB": function(){
			console.log("todo: Jeff, do the save to your db");
		}
	}
}
UserChoices.FromSession = function(sessionObject){
	var userChoices = new UserChoices();
	userChoices.setSessionObject(sessionObject);
	return userChoices;
}
UserChoices.HasValidPhoneNumber = function(sessionObject){
	if(sessionObject){
		console.log(sessionObject.phoneNumber);	
	}
	
	return sessionObject && sessionObject.phoneNumber;
} 
UserChoices.IsValidDriver = function(sessionObject){
	if(sessionObject){
		console.log(sessionObject.who);
	}
	return UserChoices.HasValidPhoneNumber(sessionObject) && sessionObject.who;
}

module.exports = UserChoices;