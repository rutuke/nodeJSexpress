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
        

var     commentRoutes   = require("./routes/comments.js"),
        campgroundRoutes = require("./routes/campgrounds.js"),
        authRoutes      = require("./routes/auth.js");

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
//middelware to run for all routes
app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   next();
});

app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp server has started! "); 
});