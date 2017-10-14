var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds = [
       {name: "Wicklow Mountains", image: "http://innovationalsteps.org/uploads/3/4/7/8/34786860/5082015_orig.jpg"},
       {name: "Wexford Mountains", image: "http://innovationalsteps.org/uploads/3/4/7/8/34786860/5082015_orig.jpg"},
       {name: "Cork Mountains", image: "http://innovationalsteps.org/uploads/3/4/7/8/34786860/5082015_orig.jpg"},
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