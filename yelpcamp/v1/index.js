var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req,res){
   var campgrounds = [
       {name: "Wicklow Mountains", image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Glendasan_River%2C_Wicklow_Mountains.jpg"},
       {name: "Dublin Mountains", image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Glendasan_River%2C_Wicklow_Mountains.jpg"},
       {name: "Wexford Mountains", image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Glendasan_River%2C_Wicklow_Mountains.jpg"},
       {name: "Cork Mountains", image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Glendasan_River%2C_Wicklow_Mountains.jpg"},
       {name: "Limerick Mountains", image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Glendasan_River%2C_Wicklow_Mountains.jpg"},
       {name: "Sligo Mountains", image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Glendasan_River%2C_Wicklow_Mountains.jpg"},
       {name: "Kerry Mountains", image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Glendasan_River%2C_Wicklow_Mountains.jpg"},
       {name: "Meath Mountains", image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Glendasan_River%2C_Wicklow_Mountains.jpg"},
       ]; 
       
       res.render("campgrounds", {campgrounds:campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpcCamp server has started! "); 
});