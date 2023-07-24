const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app=express();

app.set("view engine","ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/api",{
    useNewUrlParser : true
});

const articleSchema= {
    title: String,
    des: String 
};

const Article =mongoose.model("items" , articleSchema);

app.get("/articles",function(req,res){
    Article.find({})
    .then(found => {
        res.send(found);
    })
    .catch(err => {
        console.log(err);
    });
});

app.post("/articles",function(req,res){
    const element1 = new Article({
        title: req.body.title,
        des: req.body.des ,
    })
    element1.save();
});

app.delete("/articles",async function(req,res){
    try{
        await Article.deleteMany({});
        res.send("Deleted");
    }
    catch(err){
        res.send(err);
    }
});

app.get("/articles/:articleTitle" ,async function(req,res){
    try{
        const articleFound = await Article.findOne({title: req.params.articleTitle});
        if (articleFound) {
            res.send(articleFound);
          } 
          else {
            res.status(404).send("Article not found.");
        }
    }
    catch(err){
        res.send(err);
        console.log(err);
        res.status(500).send("Error fetching the article.");
    }
});

app.put("/articles/:articleTitle", async function (req, res) {
  try {
    await Article.updateOne(
      { title: req.params.articleTitle },
      { title: req.body.title, des: req.body.des }
    );
    res.send("Updated");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.patch("/articles/:articleTitle",async function (req,res){
    try{
        await Article.findOneAndUpdate(
            {title: req.params.articleTitle},
            {$set : {des: req.body.des}}
        )
        res.send("Success");
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
});

app.delete("/articles/:articleTitle", async function(req,res){
    try{
        await Article.deleteOne(
            {title: req.params.articleTitle}
        )
        res.send("Deleted specific one");
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})



app.listen(8000, function(){
    console.log("server started on port 8000");
});
