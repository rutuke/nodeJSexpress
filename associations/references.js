var mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/references_demo");

// POST = title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

// USER = email , name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});
var User = mongoose.model("User", userSchema);

User.create({
    email: "bob@gmail.com",
    name: "Bob Bobby"
});

Post.create({
  title: "How to cook the best burger Part 3",
  content: "Blah Blah Blah That's Yummy I would like more of that Yum!!!!!"
}, function(err, post){
    User.findOne({email:"bob@gmail.com"}, function(err,foundUser){
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
              if(err){
                  console.log(err);
              } else {
                  console.log(data);
              }
            });
        }
    })
});

//find user and find all posts for that user

User.findOne({email:"bob@gmail.com"}).populate("posts").exec(function(err,user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});
