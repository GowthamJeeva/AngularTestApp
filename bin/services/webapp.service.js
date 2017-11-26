const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
let http = require('http');


const stitch = require("mongodb-stitch")
const client = new stitch.StitchClient('test1-jmkxv');
const db = client.service('mongodb', 'mongodb-atlas').db('TestDatabase');

function createApp() {
    const app = express();
    return app;
}


function setupMiddlewares(app) {
    //  For logging each requests
    app.use(morgan('dev'));

    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    const compression = require('compression');
    app.use(compression());

    return app;
}


    let app = createApp();
app.use(express.static(path.resolve(__dirname, '../../' + '/dist')));
    app = setupMiddlewares(app);


app.post('/',function(req,res){
    addEmployee(req.body).then((result) => {
        console.log(result);
    return res.status(201).send(successResult);
        console.log(successResult);
    },(err) => {
            return res.status(500).send({ error: 'Internal error occurred, please try later..!' });

    });
    
});
 function addEmployee(data){
    console.log(data);
    return new Promise((resolve,reject) => {
       if(data){
        client.login().then(() =>
        db.collection('Test11').insertOne({"data":"data"}).then((success) => {
            console.log("successs");
            resolve({success:true});
        },
        (err) => {
            console.log("error");
            reject({success:false});
        }
        ))
       } 
    });
 }


   // service.setupMongooseConnections();


let port = "6002";

/**
 * Create HTTP server.
 */

let server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
console.log('Server running  on ' + port);
