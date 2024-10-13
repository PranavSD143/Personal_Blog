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
  let titles = Object.keys(blog_posts[category]);
  for(const title of titles)
  {
    let postDetails=blog_posts[category][title];
    posts.push({'title':title,'postDetails': postDetails});
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
  let obj=[
    posts,
    "Gen AI"];
  res.render("result.ejs",{obj});
});

app.get("/gaming",(req,res)=>{
  let posts = arrayConversion(blog_posts,"Gaming");
  let obj=[
    posts,
    "Gaming"];
  res.render("result.ejs",{obj});
});

app.get("/productivity",(req,res)=>{
  let posts = arrayConversion(blog_posts,"Productivity");
  let obj=[
    posts,
    "Productivity"];
  res.render("result.ejs",{obj});
});

app.get("/add-post",(req,res)=>{
  res.render("add-post.ejs");
})

app.post("/submit", (req, res) => {
  console.log(req.body);  // Log the request to ensure data is being received correctly
  if (!req.body) return;
  let post_content = req.body;
  let category = post_content.category;
  let postTitle = post_content.postTitle;
  blog_posts[category][postTitle] = post_content["postContent"];
  
  let posts = arrayConversion(blog_posts, category);
  let obj = [posts, category];
  
  // Render the result page with the posts object based on the category
  res.render("result.ejs", { obj });
});

app.post("/display-post",(req,res)=>{
  const postTitle = req.body['title'];
  const Category = req.body['category'];
  const postCategory = Category.slice(0, Category.length-6);
  const postContent = blog_posts[postCategory][postTitle];
  const obj = [postTitle, postContent];
  res.redirect("/");
});
