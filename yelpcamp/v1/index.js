var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

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
       
app.get("/", function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req,res){
       res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req,res){
    // get data from form
    // add to campgrounds array
    // redirect back to campgrounder page
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {name: name, image: image}
    campgrounds.push(newCamp);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpcCamp server has started! "); 
});