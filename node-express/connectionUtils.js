var mysql = require('promise-mysql');
var configDB = {
    connectionLimit: 10000,
    host: "xxx",
    user: "xxx",
    password: "xxx",
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
