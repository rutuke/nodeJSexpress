var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req,res){
   res.render("landing"); 
});

// AUTH ROUTES - SIGN UP
router.get("/signup", function(req,res){
   res.render("signup"); 
});

router.post("/signup", function(req,res){
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
router.get("/login", function(req,res){
   res.render("login"); 
});
// handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){
});
// logout route
router.get("/logout", function(req,res){
   req.logout();
   res.redirect("/campgrounds");
});

module.exports = router;