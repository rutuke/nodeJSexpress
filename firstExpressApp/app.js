var express = require("express");
var app = express();

// call it by saying app.---

app.get("/", function(req, res){
   res.send("Hi There!");
});
app.get("/bye", function(req,res){
   res.send("Goobye!"); 
});
app.get("/dog", function(req,res){
   res.send("MEOW!"); 
});
// order of routes super important! if catch all/* route is first
// nothing will match it! 
// only first matching route will run! 

// route parameters/path variables/route variables! 
// example .../r/:pageName
app.get("/r/:subredditName", function(req,res){
   var subreddit = req.params.subredditName;
   res.send("Welcome to the " + subreddit.toUpperCase() + " subreddit!");
});
app.get("/a/:subredditName/comments/:id/:title", function(req,res){
   var subreddit = req.params.subredditName;
   res.send("Welcome to the " + subreddit.toUpperCase() + " subreddit!");
   res.send("Welcome to another random page!");
});

app.get("*", function(req,res){
   res.send("You are a STAR!");
// useful for page not found etc.
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});
