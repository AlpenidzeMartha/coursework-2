//import express
const express = require('express');
//express instance
const app = express();

var path =require("path");
var fs =require ("fs");

//parse the request parameters
app.use(express.json());


//serve the static files
app.use(express.static('public'));


app.use ((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers","*");
    res.setHeader('Access-Control-Allow-Origin', 'PUT');
    next();
})

//static middleware                             
app.use(function(req, res, next) {
    var filePath = path.join(__dirname,  "images", req.url);
    fs.stat(filePath, function(err, fileInfo){
        if (err) {
            next();
            return;
            }
            if (fileInfo.isFile()) res.sendFile(filePath);
            else next();
            
        });
    });


    // connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb+srv://Martha:marthako12@cluster0.ssnjx.mongodb.net', (err, client) => {
db = client.db('Coursework')
})

// display a message for root path to show that API is working
app.get('/', (req, res, next) => {
    res.send('Select a collection, e.g., /collection/lessons or /collection/order')
})


//get the collection name 
app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    // console.log('collection name:', req.collection)
    return next()
})



const port = process.env.PORT || 3000;

app.listen(port,()=> {
    console.log('express server is running at localhost:3000')
})