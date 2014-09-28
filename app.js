var express = require("express");
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var UserChoices = require("./controller/userChoices");

app.use(session({
	resave : false, // don't save session if unmodified
	saveUninitialized : false, // don't create session until something stored
	secret : 'shhhh, very secret'
}));

var pub = __dirname;

// register and init jade engine
app.engine('jade', require('jade').__express);
app.set('views', './views')
app.set('view engine', 'jade')
app.use(express.static(pub));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// register routes


app.get('/signin', function (req, res, next) {
  res.render('signin', {});
  //next();
});

app.post('/signin', function(req, res, next){
	console.log(req.body.phone);
	
	var phoneNumber = req.body.phone;
	if(!phoneNumber){
		res.redirect('signin', {"error": "Please enter a valid number"});
		return;
	}
	var userChoices = new UserChoices(phoneNumber);
	console.log(userChoices.getSessionObject());
	req.session.userChoices = res.session = userChoices.getSessionObject();
	
	console.log("signin: setting session object");
	res.redirect('/choose');
});
app.get("/choose", function(req, res, next){

	if(!UserChoices.HasValidPhoneNumber(req.session.userChoices)){
		console.log("choose: valid phone not found, redirect to signin");
		var userChoices = new UserChoices();
		userChoices.setError("Please enter a valid number") ;
		res.redirect('/signin');
		return;
	}
	var userChoices = UserChoices.FromSession(req.session.userChoices);
	res.render('choose', userChoices);
});

function driver(req, res, next){
	console.log(req.session);
	if(!UserChoices.HasValidPhoneNumber(req.session.userChoices)){
		console.log("a session not found, redirecting to signin page..");
		res.render('signin', {});
		return;
	}
	var userChoices = UserChoices.FromSession(req.session.userChoices);
	userChoices.setAsDriver();
	console.log(userChoices.getSessionObject());
	req.session.userChoices = res.session = userChoices.getSessionObject();
	console.log("driver: setting session object");
	res.location("/driversettings");
	res.render('driversettings', userChoices);
	
	next();
}
var driverPost = driver;
var driverGet = driver;

app.post('/driver', driverPost);
app.get('/driver', driverGet);


function setdriver(req, res, next){
	// todo: session check
	console.log(req.session);
	if(!UserChoices.HasValidPhoneNumber(req.session.userChoices)){
		console.log("a session not found, redirecting to signin page..");
		res.redirect('/signin');
		return;
	}
	console.log("doing setDriver..");
	var userChoices = UserChoices.FromSession(req.session.userChoices);
	var zipCode = req.body.opzicode1;
	var operateFrom = req.body.starttime;
	var operateTo = req.body.endtime;
	userChoices.setDriverInfo(zipCode, operateFrom, operateTo);
	userChoices.saveToDB();
	console.log(userChoices.getSessionObject());
	req.session.userChoices = res.session = userChoices.getSessionObject();
}

app.post('/setdriver', setdriver);
app.post('/', function(req, res, next){
	console.log("in base!");
	res.redirect('/signin');
});

function userSettingsGet(req, res, next){
	//todo: session check
	res.render('usersettings', {});
}

app.get('/usersettings', userSettingsGet);

app.post('/setuser', function(req, res, next){
	console.log("need a setuser completion page!!");
});

// start the web server
var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
}); 