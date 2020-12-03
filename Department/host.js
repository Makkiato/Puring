var fs = require('fs');    			// 파일시스템 모듈
var express = require('express');   // express 모듈
var app = express();                // express 객체 생성

var http = require('http');         // Http 웹 서버 모듈

var server = http.createServer(app);    // 서버 객체 생성

app.set('port',4500);      // 서버 포트 설정

server.listen(app.get('port'),function(){       // 서버 가동 
         console.log('Express server listening on port ' + app.get('port'));
     });




 // 이미지파일 호스팅 로직 
app.get('/img/:name',function (req,res){     
    var filename = req.params.name;
    console.log(__dirname+'/img/'+filename);
    fs.exists(__dirname+'/img/'+filename, function (exists) {
        if (exists) {
            fs.readFile(__dirname+'/img/'+filename, function (err,data){
                res.end(data);
            });
        } else {
            res.end('file is not exists');
        }
    })
});

app.get('/image',function(req,res){
    var name = req.query.name;
    fs.readFile(__dirname+'/img/'+name, function (err,data){
        res.sendFile(__dirname+'/img/'+name);
    });
});