var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var fs = require('fs');
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var path = require('path');
var request = require('request');
var io = require('socket.io')(server);
var http = require('http');
var JSON = require('JSON');
app.use(bodyParser.urlencoded({
	
	extended: false
	
}));

app.use(express.static(path.join(__dirname,'public')));


server.listen(port,function(){
	console.log('https://doublejtoh.run.goorm.io에서 돌고 있습니당.');
});

io.on('connection',function(socket){
	socket.on('send query',function(data){
		
		
		getApi(data,socket);
		
		
	});
	
	
	
});

	// search through naver api with movie title
	
	function getApi(movie,socket){
		
	var url = 'http://yts.am/api/v2/list_movies.json?query_term='+movie.title+'&limit=18&page='+movie.page;
	console.log(url);
	request(url, (error, response, body)=> {
	  if (!error && response.statusCode === 200) {
		const fbResponse = JSON.parse(body);
		
		  console.log(fbResponse);
		socket.emit('query result',fbResponse.data.movies);
		  
	  } else {
		console.log("Got an error: ", error, ", status code: ", response.statusCode);
	  }
	});
			
		
	}	
	