const express = require("express");
const expressApp = express();
const fs = require("fs");
const path = require("path");
const axios = require('axios');

//set defaults
expressApp.set('json spaces', 2);

expressApp.get("/api/getUsers", function(request, response){
    fs.readFile(path.join(__dirname, "/scripts/json/users.json"), "utf8", function(error, data){
        var userData = {};

        if(error){
            userData.error = error;
        } else {
            userData = JSON.parse(data);
        }

        response.json(userData);
    });
});

expressApp.post("/api/sendID", function(request, response){
    var userData = {};
    var sendData = {};
    var selectID = request.body.id;

    fs.readFile(path.join(__dirname, "../json/"+"users.json"), "utf8", function(error, data){
        if(error){
            userData.error = error;
        } else {
            userData = JSON.parse(userData.user);
            for(var i = 0; i < userData.length; i++)
            {
                if(userData[i].id == selectID)
                {
                    sendData = userData[i];
                }
            }
        }
    });

    response.json(JSON.parse(sendData));
});

//server setup
var server = expressApp.listen(80, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("REST API listening at http://%s:%s", host, port);
});
