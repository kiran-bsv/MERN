const express = require("express");
const bodyparser = require("body-parser");

var app= express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const mongoose= require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");

const trySchema = new mongoose.Schema({
    name:String
});

const item = mongoose.model("task",trySchema);

const todo = new item({
    name : "create some videos"
});
const todo1 = new item({
    name : "learn dsa"
});
const todo2 = new item({
    name : "learn react"
});
const todo3 = new item({
    name : "take some rest"
});

// todo.save();
// todo1.save();
// todo2.save();
// todo3.save();

app.get("/",function(req,res){

    // item.find({},function(err,foundItems){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         res.render("list",{ejes: foundItems});
    //     }
    // });

    item.find({})
    .then(foundItems => {
      res.render("list", { ejes: foundItems });
    })
    .catch(err => {
      console.log(err);
    });
    
});

app.listen('8000',function(){
    console.log("server is running")
});