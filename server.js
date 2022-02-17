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


const port = process.env.PORT || 3000;

app.listen(port,()=> {
    console.log('express server is running at localhost:3000')
})