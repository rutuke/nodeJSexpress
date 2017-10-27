var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
    name: "Cloud's Rest",
    image: "https://static.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg",
    description: "Blah Blah Blah"
    },
    {
    name: "Big Big Hills",
    image:"https://static.pexels.com/photos/618848/pexels-photo-618848.jpeg",  
    description: "Blah Blah Blah"
    },
    {
    name: "Nice Forest",
    image: "https://static.pexels.com/photos/546337/fire-hot-warm-warmth-546337.jpeg",
    description: "Blah Blah Blah"
    }
];

function seedDB(){
    // remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
       console.log("remove campgrounds"); 
       data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added campground");
                    // create a comment
                    Comment.create(
                        {text: "This place is pretty great!",
                         author: "Ruta"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a comment!");
                            }
                        });
                    }
            });
        });
    });    
}

module.exports = seedDB;
