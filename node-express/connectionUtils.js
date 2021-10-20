var mysql = require('promise-mysql');
var configDB = {
    connectionLimit: 5000,
    host: "file-db.c7dok1izn8lr.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "Kajal4846",
    port: 3306
}

var getConnection = async()=>{
    var pool = await mysql.createPool(configDB);
    return new Promise(async (resolve,reject) => {
        var pool = await mysql.createPool(configDB);
        pool.getConnection().then(function(conn){
            if(conn){
                console.log("Connected to DB!!");  
               resolve(conn);
            }
        }).catch(function(err){
            reject(err);
            console.log("in error...")
            console.log(err);
        });
    });
}

module.exports.getConnection = getConnection;