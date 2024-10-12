import express from "express";
import bodyParser from "body-parser";
const app=express();
const port =3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
let blog_posts={
  "Gen AI":
  {
  }
  ,
  "Gaming":{
  }
  ,
  "Productivity":{
  }

};


function arrayConversion(blog_posts,category){
  let posts=[];
  for(var content in blog_posts[category])
  {
    let url = blog_posts[category][content];
    posts.push({title:content,url:url});
  }
  return posts;

}

app.listen(port,()=>{
  console.log("Listening on port "+port);
});

app.get("/",(req,res)=>{
  res.render("index.ejs");
});

app.get("/gen_ai",(req,res)=>{
  let posts = arrayConversion(blog_posts,"Gen AI");
  res.render("result.ejs",{posts});
});

app.get("/gaming",(req,res)=>{
  let posts = arrayConversion(blog_posts,"Gaming");
  res.render("result.ejs",{posts});
});

app.get("/productivity",(req,res)=>{
  let posts = arrayConversion(blog_posts,"Productivity");
  res.render("result.ejs",{posts});
});

app.get("/add-post",(req,res)=>{
  res.render("add-post.ejs");
})

app.post("/submit",(req,res)=>{
  if(!req.body) return;
  let post_content=req.body;
  let category=post_content.category;
  let postTitle=post_content.postTitle;
  blog_posts[category][postTitle]=post_content['postContent'];
  console.log(blog_posts);
});