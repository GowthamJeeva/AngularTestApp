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
    return res.status(201).send(result);
    },(err) => {
            return res.status(500).send({ error: 'Internal error occurred, please try later..!' });

    });
    
});
 function addEmployee(data){
    return new Promise((resolve,reject) => {
       if(data){
        client.login().then(() =>
        db.collection('Test11').insertOne({owner_id : client.authedId(),name:data.name,code:data.code}).then((success) => {
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

 app.get('/employee',function(req,res){
    showEmployees().then((result) => {
    return res.status(201).send(result);
    },(err) => {
            return res.status(500).send({ error: 'Internal error occurred, please try later..!' });

    });
    
});
 function showEmployees(){
    return new Promise((resolve,reject) => {
        client.login().then(() =>
        db.collection('Test11').find({}).limit(1000).execute().then( docs => {
            resolve(docs);
        },
        (err) => {
            console.log("error");
            reject({success:false});
        }
        ))
    });
 }

 //edit employee
 app.patch('/',function(req,res){
    editEmployees(req.body).then((result) => {
    return res.status(201).send(result);
    },(err) => {
            return res.status(500).send({ error: 'Internal error occurred, please try later..!' });

    });
    
});
 function editEmployees(datas){
    return new Promise((resolve,reject) => {
        client.login().then(() =>
        db.collection('Test11').updateOne({code:datas.code,owner_id : client.authedId()},{$set:{name:datas.name}}).then( docs => {
            resolve(docs);
        },
        (err) => {
            console.log("error");
            reject({success:false});
        }
        ))
    });
 }

 //delete employee
 app.delete('/',function(req,res){
    deleteEmployees(req.query['code']).then((result) => {
    return res.status(201).send(result);
    },(err) => {
            return res.status(500).send({ error: 'Internal error occurred, please try later..!' });

    });
    
});
 function deleteEmployees(datas){
    return new Promise((resolve,reject) => {
        client.login().then(() =>
        db.collection('Test11').deleteOne({code:datas,owner_id : client.authedId()}).then( docs => {
            resolve(docs);
        },
        (err) => {
            console.log(err);
            reject({success:false});
        }
        ))
    });
 }


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
