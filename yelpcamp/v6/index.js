var     express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        Campground      = require("./models/campground"),
        Comment         = require("./models/comment"),
        seedDB          = require("./seeds.js"),
        passport        = require("passport"),
        localStrategy   = require("passport-local"),
        User            = require("./models/user");
        
mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();
// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Hello World",
    resave: false,
    saveUninitialize: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req,res){
    // get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
             res.redirect("/campgrounds", {campgrounds: allCampgrounds});
        }
    });
});

app.get("/campgrounds/new", function(req,res){
   res.render("campgrounds/new"); 
});

app.get("/campgrounds/:id", function(req,res){
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

// ======== Comments Routes

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
    // find campground by id
    Campground.findById(req.params.id, function(err,campground){
       if(err){
           console.log(err);
       } else {
               res.render("comments/new", {campground: campground}); 
       }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});

// AUTH ROUTES - SIGN UP
app.get("/signup", function(req,res){
   res.render("signup"); 
});
app.post("/signup", function(req,res){
    var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render("/signup");
       } 
       passport.authenticate("local")(req,res, function(){
          res.redirect("/campgrounds"); 
       });
   });
});
// AUTH ROUTES - LOGIN FORM
app.get("/login", function(req,res){
   res.render("login"); 
});
// handling login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){
});
// logout route
app.get("/logout", function(req,res){
   req.logout();
   res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp server has started! "); 
});