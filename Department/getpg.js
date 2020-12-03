var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://ddagaebi:1234@localhost:5432/ddagaebi");


// 콘솔 접속은
// psql -U ddagaebi -h localhost -d ddagaebi

exports.excute = excute;

function excute(query,callback){
db.any(query)
    .then(function (data) {
       
        callback(data);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
        callback(null);
    });
    
}