var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Wicklow Mountains", 
//     image: "http://innovationalsteps.org/uploads/3/4/7/8/34786860/5082015_orig.jpg",
//     description: "This is a huge hill, no bathrooms. No water. Beautiful hill."
// }, function(err,campground){
//   if(err){
//       console.log(err);
//   } else {
//       console.log("Newly Created Campground");
//       console.log(campground);
//   }
// });

app.get("/", function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req,res){
    // get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
    //render them all
    //res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req,res){
    // get data from form
    // add to campgrounds array
    // redirect back to campgrounder page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCamp = {name: name, image: image, description: desc}
    // Create new campground and save to DB
    Campground.create(newCamp, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }   else {
             res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
   res.render("new.ejs"); 
});

app.get("/campgrounds/:id", function(req,res){
    // find campground with given ID
    // render more information about that ID
    Campground.findById(req.params.id, function(err,foundCampground){
       if(err){
           console.log(err);
       } else {
           res.render("show", {campground: foundCampground});
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpcCamp server has started! "); 
});