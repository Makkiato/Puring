var express = require('express');
var app = express();
var getpg = require('./getpg.js');
var server = require('http').createServer(app);
var socket = require('socket.io')(server);
var fs = require('fs');
var util = require('util');
var fs = require('fs');

//sudo /etc/init.d/postgresql restart

var pug = require('pug');
app.locals.pretty = true;
app.set('view engine', 'pug');
app.set('views', __dirname+'/template');


app.get('/template',function(req,res){
	var data = getpg.excute('select * from location',function(data){
		var stringed = JSON.stringify(data);
		res.render('mappage',{data : stringed});
	});
	
});
app.get('/templete',function(req,res){
		res.render('mappage1');
	});


app.get('/', function(req,res){
  console.log('connected');
  var data = getpg.excute('select * from location',function(data){
    console.log(data);
    console.log(JSON.stringify(data));
    res.send(data);
    });
});

app.get('/addResult',function(req,res){
  
  var queryString = util.format("insert into location(lat,lng,record_time,val) values (%s,%s,%s,%s)",req.query.lat,req.query.lng,req.query.record_time,req.query.val);
  queryString = queryString.replace('=',' ');
  console.log(queryString);

  getpg.excute(queryString,function(data){
    console.log(data);

    res.sendStatus(200);
  });
  
});


app.get('/test',function(req,res){
  res.sendStatus(200)
})



server.listen(4000,function(){
  console.log('on air');
});
