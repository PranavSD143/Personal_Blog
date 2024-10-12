import express from "express";

const app=express();
const port =3000;

let blog_posts={
  gen_ai:
  {
    "What is Gen AI":"https://www.gartner.com//en//topics//generative-ai#q1",
    "Benefits of Generative AI":"https://www.gartner.com//en//topics//generative-ai#q3",
    "Risks of Gen AI":"https://www.gartner.com//en//topics//generative-ai#q4",
    "Industries impacted by Gen AI":"https://www.gartner.com/en/topics/generative-ai#q7"
  }
  ,
  gaming:{
    "AI in gaming":"https://www.engati.com//blog//ai-for-gaming#toc-what-is-ai-for-gaming-",
    "AI integrated with NPC's":"https://appinventiv.com//blog//ai-in-gaming//#tab3"
  }
  ,
  productivity:{

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
app.use(express.static("public"));
app.listen(port,()=>{
  console.log("Listening on port "+port);
});

app.get("/",(req,res)=>{
  res.render("index.ejs");
});

app.get("/gen_ai",(req,res)=>{
  let posts = arrayConversion(blog_posts,"gen_ai");
  res.render("result.ejs",{posts});
});

app.get("/gaming",(req,res)=>{
  let posts = arrayConversion(blog_posts,"gaming");
  res.render("result.ejs",{posts});
});

app.get("/productivity",(req,res)=>{
  let posts = arrayConversion(blog_posts,"productivity");
  res.render("result.ejs",{posts});
});

app.get("/add-post",(req,res)=>{
  res.render("add-post.ejs");
})