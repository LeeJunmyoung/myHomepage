

var fs = require('fs');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));

var assert = require('assert');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/memo'); // 기본 설정에 따라 포트가 상이 할 수 있습니다.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");
});




app.get('/',function(request,response){
	fs.readFile('index.html',function(error,data){
		response.send(data.toString());
	});
	
	console.log('접속함');
});


app.get('/message',function(request,response){
	fs.readFile('index.html',function(error,data){
		response.send(data.toString());
	});
	
	console.log('접속함');
});

app.post('/message',function(request,response){
	console.log('post::: /message');
	
	var name = request.body.name;
	var email = request.body.email;
	var phone = request.body.phone;
	var message = request.body.message;
	
	console.log(name,email);
	console.log(phone,message);
	
	db.collection('myhome_board').insertOne(
			{
				"name"    : name,
				"email"   : email,
				"phone"   : phone,
				"message" : message
			}, function(err, result) {
				if(err){
				 console.warn(err);
				}
			 });
	
	response.send(request.body);
	
});

app.listen(52273,function (){
	
	console.log('localhost:board running');
});