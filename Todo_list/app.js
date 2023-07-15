//server file

const express= require("express");             //importing
const bodyparser = require("body-parser");

var app = express();                           // copying contents to use
app.set("view engine", "ejs")                  // set view engine to ejs
app.use(express.static('public'));             // setting static files. i.e. all images,css,additional js should be stored in public and used through this
app.use(express.urlencoded({extended:true}));   // to use body parser


var example="working";
var items=[];

app.get("/", function(req,res){                         // get request on home page
    res.render("list",{ejes: items})            // display on home page .(list file) passing to homepage
    // example a var , its  value is passed to exej which is further passed to list.ejs.
});

app.post("/", function(req, res){
    //console.log( req.body.ele1);
    var item = req.body.ele1;
    items.push(item);
    res.redirect("/");
})





app.listen(8000, function(){          // start the server with port 8000
    console.log("server started")     // execute this on server start
})