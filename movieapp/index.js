var express = require("express");
var request = require('request');
var bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
   res.render("search"); 
});

app.get("/results", function(req,res){
    var movieTitle = req.query.movie;
    var url = 'http://www.omdbapi.com/?s='+ movieTitle + '&apikey=thewdb';
    
    request(url, function(error, response,body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data:data}); // prints the html for home page.
        } else {
            console.log(error); // prints error if error occured
            console.log(response && response.statusCode );//prints repsponse status code
        }
});

});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie app has started!"); 
 });
