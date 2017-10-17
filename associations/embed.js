var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/associations_demo");

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
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);


// var newUser = new User({
//   email: "billy@brown.edu",
//   name: "Billy Brown"
// });

// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Just kidding. Go to potions class to learn that!"
// });
// newUser.save(function(err, user){
//   if(err){
//       console.log(err);
//   } else {
//       console.log(user);
//   }
// });

// var newPost = new Post({
//   title: "Reflections on Oranges",
//   content: "They are delicious and juicy!"
// });

// newPost.save(function(err, post){
//   if(err){
//       console.log(err);
//   } else {
//       console.log(post);
//   }
// });

User.findOne({ name: "Billy Brown" }, function(err, user){
    if(err){
        console.log(err);
    } else {
        user.posts.push({
           title: "Three things I Hate",
           content: "Voldemort, Voldemort, Voldemort!"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        })
    }
});