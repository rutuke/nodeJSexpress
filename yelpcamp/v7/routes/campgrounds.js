var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/", function(req,res){
    // get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
    //render them all
    //res.render("campgrounds", {campgrounds:campgrounds});
});

router.post("/", function(req,res){
    // get data from form
    // add to campgrounds array
    // redirect back to campgrounder page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCamp = {name: name, image: image, description: desc};
    // Create new campground and save to DB
    Campground.create(newCamp, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }   else {
             res.redirect("/campgrounds", {campgrounds: allCampgrounds});
        }
    });
});

router.get("/new", function(req,res){
   res.render("campgrounds/new"); 
});

router.get("/:id", function(req,res){
    // find campground with given ID
    // render more information about that ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
       if(err){
           console.log(err);
       } else {
           console.log(foundCampground);
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

module.exports = router;
