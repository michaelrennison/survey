const config = require('../src/config.json')
const mysql = require('mysql');

const mysqlConfig = {
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpass,
    database: config.dbname
}

var pool = mysql.createPool(mysqlConfig);

module.exports.connect = function (cb) {
    return new Promise((resolve, reject) => {
        pool.on('connection', function (connection) {
            connection.on('error', function (err) {
                console.log('Error connecting to database', err);
            });
            connection.on('close', function (err) {
                console.log('MySQL close event', err)
            });
        });
        resolve()
    })
}

async function executeQuery (query) {

    return new Promise((resolve, reject) => {
        try{
            pool.query(query, (e, r, f) => {
                if(e){
                    reject(e)
                }
                else{
                    resolve(r)
                }
            });
        }
        catch(ex){
            reject(ex)
        }
    })
}

async function execSP(spName, params){
    return new Promise((resolve, reject) => {
        try{
            var paramPlaceHolder = ''
            if(params && params.length){
                for(var i = 0; i < params.length; i++){
                    paramPlaceHolder += '?,'
                }
            }
            if(paramPlaceHolder.length){
                paramPlaceHolder = paramPlaceHolder.slice(0, -1)
            }

            pool.query(`CALL ${spName}(${paramPlaceHolder})`, params, (e, r, f) => {
                if(e){
                    reject(e)
                }
                else{
                    resolve(r[0])
                }
            });
        }
        catch(ex){
            reject(ex)
        }
    })
}
module.exports.executeQuery = executeQuery
module.exports.execSP = execSP
