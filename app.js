'use strict';

let fs = require('fs');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
//var cors = require('cors')
var cfenv = require('cfenv');
//var http = require("https");
//var request = require('request');
const axios = require('axios');
const CircularJSON = require('circular-json');
//app.use(cors());

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

var options = {
	"method": "POST",
	"hostname": "moodlewatson.mybluemix.net",
	"port": null,
	"path": "/testing1",
	"headers": {
		"cache-control": "no-cache",
		"postman-token": "c13e1775-5066-4111-32fa-1298c9bf7dfd"
	}
};

const url = 'https://moodlewatson.mybluemix.net';

// To initiate the conversation
// axios.get(`${url}/initialize`)
// .then(function(response) {
// 	console.log('initialized');
// })
app.post('/sendconvo', function(req, res) {
	axios.post(`${url}/testing1`,{
		text: req.body.payload,
	})
	.then(function(response) {
		//console.log('RESPONSE DATA');
		//console.log(response.data);
		//console.log(response);
		let my_json = CircularJSON.stringify(response.data);
		//console.log('MYJSON');
		//console.log(my_json);
		res.json({
			payload: my_json,
		})
		//console.log(response.data);
	})
	.catch(function(error) {
		console.log('axios error occurred');
		console.log(error);
	});
});


/*var conversation_response;

//conversation_request.write('HELLO');
//conversation_request.end();
app.post('/sendconvo', function(req,final_res) {
	var conversation_request = http.request(options, function (res) {
		console.log('HTTP RES');
		//console.log(res);
		var chunks = [];

		res.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res.on("end", function () {
			var body = Buffer.concat(chunks);
			conversation_response = body.toString();
			console.log('ON END');
			console.log(conversation_response);
			final_res.json({
				payload: conversation_response,
			});
		});

		
	});

	conversation_request.write(req.body.payload);
	console.log('convo res: ' + conversation_response);
	conversation_request.end();
	
	//console.log(res);
	//console.log(conversation_response);
	
});
*/

var appEnv = cfenv.getAppEnv();
// console.log(appEnv);
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
	console.log("server starting on " + appEnv.url);
});
