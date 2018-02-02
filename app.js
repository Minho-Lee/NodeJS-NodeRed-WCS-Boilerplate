'use strict';

let fs = require('fs');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var cfenv = require('cfenv');
const axios = require('axios');
const CircularJSON = require('circular-json');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.get('/', function(req, res) {
	res.render('index.ejs');
});

app.get('/main', function(req, res) {
	res.render('main.ejs');
});

// CONFIGURE THIS URL TO YOUR OWN NODE RED INSTANCE
const url = 'https://moodlewatson.mybluemix.net';

var options = {
	"method": "POST",
	"hostname": url,
	"port": null,
	"path": "/testing1",
	"headers": {
		"cache-control": "no-cache",
	}
};

app.post('/sendconvo', function(req, res) {
	axios.post(`${url}/testing1`,{
		text: req.body.payload,
	})
	.then(function(response) {
		
		// Need this to avoid Circular Referrence
		let my_json = CircularJSON.stringify(response.data);
		
		res.json({
			payload: my_json,
		})
	})
	.catch(function(error) {
		console.log('axios error occurred');
		console.log(error);
	});
});


var appEnv = cfenv.getAppEnv();
// console.log(appEnv);
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
	console.log("server starting on " + appEnv.url);
});
