var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    localStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");
    

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();   
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: "This is my little secret!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===================== ROUTES =================

app.get("/", function(req,res){
   res.render("home"); 
});
app.get("/secret", isLoggedIn, function(req,res){
   res.render("secret"); 
});

// ========= AUTH ROUTES ==========
app.get("/signup", function(req,res){
    res.render("signup");
});

// handling user sign up
app.post("/signup", function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req,res, function(){
           res.redirect("/secret"); 
        });
    });
});
// handling user log in
app.get("/login", function(req,res){
   res.render("login"); 
});

app.post("/login", passport.authenticate("local", {
    sucessRedirect: "/secret",
    failureRedirect: "/login"
    }), function(req,res){
});

// handling log out
app.get("/logout", function(req,res){
   req.logout(); 
   res.redirect("/");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has starter!"); 
});