var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');


const directoryPath = __dirname+'/testFiles/';
const port = 3000;


io.on('connection', function(socket){
    var files = fs.readdirSync(directoryPath);
    console.log('get connection');
    socket.emit('Ready','JSON DATA')
    socket.on('Start',function() {
        
        console.log('sending metadata');
        socket.emit('Metadata',{'Count' : files.length})
        });

    socket.on('Send',function(data){
        
        var current = data['current'];
        console.log('request on index : '+current);
        fs.readFile(directoryPath+files[current],function(err,dat){
            if(err) console.log(err);
            else{
                console.log('sending...')
                console.log(dat);
                socket.emit('Sending',{'Name' : files[current],'Data' : dat, 'current' : current});
                fs.unlink(directoryPath+files[current],function(err){
                    if(err) console.log(err);
                });
            }
        });
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });



 });
server.listen(port,function(){
    console.log('on air')
});
