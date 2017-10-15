var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

 var Cat = mongoose.model("Cat", catSchema);
 // name of singular object
 
var george = new Cat({
   name: "Blue",
   age: 5,
   temperament: "Blue"
});

george.save(function(err, cat){
    // cat is being sent back from database
    if(err){
        console.log("Something went wrong");
    } else {
    console.log("You just saved a cat to the DB:");
    console.log(cat);
    }
});
//adding new cat to database
Cat.create({
   name: "Tinker",
   age: 15,
   temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});

//retrieve all cats from database and console.log each one

Cat.find({}, function(err, cats){
    if(err){
        console.log("There's an error!");
        console.log(err);
    } else {
        console.log("All the found cats:");
        console.log(cats);
    }
});


