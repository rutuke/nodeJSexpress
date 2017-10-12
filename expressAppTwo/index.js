var express = require("express");
var app = express();

// call it by saying app.---

app.get("/", function(req, res){
   res.send("Hi There, Welcome to my assignment!");
});
app.get("/speak/:subMenu", function(req,res){
   var subMenu = req.params.subMenu;
   if(subMenu == "pig"){
      res.send("The " + subMenu + " says 'Oink'");
   } else if(subMenu =="cow"){
      res.send("The " + subMenu + " says 'Moo'");
   } else if(subMenu == "dog"){
      res.send("The " + subMenu + " says 'Woof Woof'");
   }
});
app.get("/repeat/:subMenu/:id", function(req,res){
   var subMenu1 = req.params.subMenu;
   
   for(var i = 0; i < parseInt(req.query.id); i++){
       res.send(subMenu1 + " ");
   }
});

app.get("*", function(req,res){
   res.send("Sorry, page not found...What are you doing with your life?");
// useful for page not found etc.
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});
