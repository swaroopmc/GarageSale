var express = require('express');
var path = require('path');
var crypto = require('crypto');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var app = express();
var mongoOp =require("./model/mongo");



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.get("/", function(req,res){
        var response = {};
        res.sendFile(path.join(__dirname + '/views/Frontpage.html'));
    });


app.get("/items/category/:cat", function(req,res){

        var response = {};     

        var category = req.params.cat;
        console.log('category provided is nodejs' + category);
        mongoOp.find({'category': category },function(err,data){
        
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });

    
    });

app.get("/items/search/:searchItem", function(req,res){

        var response = {};     

        var searchItem = req.params.searchItem;
        console.log('searctem provided in nodejs' + searchItem);
        var exp = new RegExp(searchItem);
        console.log(exp);
        mongoOp.find({ 'heading': { $regex:exp} } ,function(err,data){
        
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });

    
    });

app.get("/items/category/:searchItem", function(req,res){

        var response = {};     

        var category = req.params.cat;
        console.log('category provided is nodejs' + category);
        mongoOp.find({'category': category },function(err,data){
        
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });

    
    });




app.get("/items/:itemId", function(req,res){
        var response = {};
        //var _id = req.params.id;
        mongoOp.findOne({'itemId':req.params.itemId},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }

            
            res.send(data);
        });
    });




app.get("/items", function(req,res){

        var response = {};


        if(!req.param('q')) {

        mongoOp.find({},function(err,data){
    
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });


      }

      

else{
        var u = req.param('q');
       console.log(u);
        mongoOp.find({'itemName': u },function(err,data){
        
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
   }




    
    });






app.post("/items/postforsale",function(req,res){
        console.log("Ajeet Testing");
        var db = new mongoOp();
        var response = {};
        //var user = req.param('user');
        db.itemId = req.body.itemId;
        db.itemName = req.body.itemName;
        db.price = req.body.price;
        db.category = req.body.category ; 
        db.itemImageURL = req.body.itemImageURL

        db.save(function(err){
        
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });






app.delete("/items/:itemId", function(req,res){
  var response ={}
  mongoOp.findOneAndRemove({'itemId':req.params.itemId}, function (err, data) {  
  
response = {
        message: "successfully deleted",
      
    };
    res.send(response);
});
});





 
app.put("/items/:itemId", function(req,res){

mongoOp.findOne({'itemId':req.params.itemId}, function (err, data) {  
    // Handle any possible database errors
    if (err) {
        res.status(500).send(err);
    } else {

    
   data.itemName = req.body.itemName || data.itemName;
    data.price = req.body.price || data.price;
    data.itemImageURL = req.body.itemImageURL || data.itemImageURL;
    data.category = req.body.category || data.category;

        
      data.save(function (err, data) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(data);
        });// save
    }
}); // find

}); //put


app.listen(3010, function () {
console.log("express has started on port 3010");
});
console.log("the server is runnning");


module.exports = app;