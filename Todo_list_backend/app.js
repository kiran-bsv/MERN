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

// const todo = new item({
//     name : "create some videos"
// });
// const todo1 = new item({
//     name : "learn dsa"
// });
// const todo2 = new item({
//     name : "learn react"
// });
// const todo3 = new item({
//     name : "take some rest"
// });

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

app.post("/",function(req,res){
    const itemName =req.body.ele1;
    const todoNew = new item({
        name: itemName
    });
    todoNew.save();
    res.redirect("/");
});

// app.post("/delete",function(req,res){
//     const checked =req.body.checkbox1;
//     item.findByIdAndRemove(checked,function(err){
//         if(!err){
//             console.log("deleted");
//             res.redirect("/");
//         }
//         else {
//             console.error("Error while deleting:", err);
//             res.status(500).send("Error occurred while deleting the item.");
//           }
//     });
// });

app.post("/delete", async function(req, res) {
    const checked = req.body.checkbox1;
    try {
      await item.findByIdAndRemove(checked);
      console.log("deleted");
      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting item.");
    }
});


app.listen('3000',function(){
    console.log("server is running")
});