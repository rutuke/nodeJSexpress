var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("Hi There, Welcome to my assignment!");
});
app.get("/speak/:animal", function(req,res){
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woog",
        cat: "meow"
    }
   var animal = req.params.animal.toLowerCase();
   var sound = sounds[animal];
   res.send("The " + animal + " says '" + sound + "'");
   
});
app.get("/repeat/:subMenu/:id", function(req,res){
   var subMenu = req.params.subMenu;
   var times = Number(req.params.id);
   var result = "";
   
   for(var i = 0; i < times; i++){
       result += subMenu + " ";
   }
   res.send(result);
});

app.get("*", function(req,res){
   res.send("Sorry, page not found...What are you doing with your life?");
// useful for page not found etc.
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});
