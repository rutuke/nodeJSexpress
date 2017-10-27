var     express     = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose"),
        Campground  = require("./models/campground"),
        seedDB      = require("./seeds");
        

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

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
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
       if(err){
           console.log(err);
       } else {
           console.log(foundCampground);
           res.render("show", {campground: foundCampground});
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpcCamp server has started! "); 
});