var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io')(server);
var fs = require('fs');


socket.on('connection',function(imgsocket){
    console.log('got it');
    imgsocket.emit('OkToGo');
    console.log('img transfer start');


    imgsocket.on('Here',function(data){
       console.log('img coming')
       console.log(data);
      imgname = data.name;
      imgname= imgname.replace(':',' ');
      imgname= imgname.replace(':','=');
      imgname= imgname.replace(':','=');
      fs.writeFile(__dirname+'/img/'+imgname+'.jpg',data.data,function(err){
        if(err) console.log(err);
        else {
          console.log('saving img complete');
          imgsocket.emit('disconnect');
        }
      });
    })
  
  
  });
  server.listen(3500,function(){
      console.log('gogogo');
  });