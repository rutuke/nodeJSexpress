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


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});