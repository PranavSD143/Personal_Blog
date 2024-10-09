import express from "express";

const app=express();
const port =3000;
let blog_posts={
  blogPosts:["dadasd","asdasdsa"]
};
app.use(express.static("public"));
app.listen(port,()=>{
  console.log("Listening on port "+port);
});

app.get("/",(req,res)=>{
  res.render("index.ejs",{blog_posts:blog_posts});
});

app.get("/gen_ai",(req,res)=>{
  res.render("result.ejs");
});

app.get("/gaming",(req,res)=>{
  res.render("result.ejs");
});

app.get("/productivity",(req,res)=>{
  res.render("result.ejs");
});

app.get("/add-post",(req,res)=>{
  res.render("add-post.ejs");
})