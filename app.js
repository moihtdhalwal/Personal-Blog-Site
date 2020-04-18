//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');
const mongoose = require('mongoose');

const homeStartingContent = "Hello , this is my diary and it is updated frequently. So, please come later if you do not see any updates.";
const aboutContent = "Hello dear reader, my name is Mohit Dhalwal. I created this Web Diary during the coronavirus outbreak of 2020. This was made as little project to improve my skills in web development. So let me tell you about somethings about me(as this is an about me page :D). Currently I am a student at DTU in the Computer Science department Pursuing my Bachelors degree. I like playing and watching football(not American , Real FOOTBALL). Playing Games and watching movies and series are one of my passtime routines.I also like anime and mangas.❣";
const contactContent = "My EmailId : mohitdhalwal12@gmail.com. *Other contacts will be updates soon*";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-mohit:Test@cluster0-egc1q.mongodb.net/blogDB", {useNewUrlParser: true , useUnifiedTopology: true});



const postSchema = {
  title:String,
  content : String
};

const Post = mongoose.model("Post",postSchema);

app.get("/" , function(req,res){
  Post.find({}, function(err, posts){

   res.render("home", {

     homeStartingContent: homeStartingContent,

     posts: posts

     });

 })
})


app.get("/about" , function(req,res){
  res.render("about" , {aboutContent : aboutContent});
})


app.get("/contact" , function(req,res){
  res.render("contact" , {contactContent : contactContent});
})


app.get("/compose" , function(req,res){
  res.render("compose");
})

app.get("/posts/:postId" , function(req,res){
  const requestedPostId = req.params.postId;
  Post.findOne({_id:requestedPostId}, function(err, posts){

   res.render("post", {

     title: posts.title,

     content: posts.content

     });
})
 });

app.post("/compose" , function(req,res){
  const post = new Post({
    title : req.body.titleText ,
    content : req.body.postText
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
