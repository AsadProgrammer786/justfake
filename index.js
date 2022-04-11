const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 80;
const path = require("path");
app.listen(port, () => {
    console.log("Server Has Started!");
});
app.use(express.urlencoded({extended:true}));
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://snips:snips@cluster0.hscsw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser : true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "error"));
db.once('open', ()=>{
    console.log("Database Connected!");
});

app.get("/", (req, res) => {
    res.end("This Is API, Not Your Personal Website, So Check It's Documentation!");
});
const memeStruc = mongoose.Schema({
    title : String,
    src : String,
    liked : Array,
    comments : Array
});
var meme = mongoose.model("memeApi", memeStruc);
app.get("/getmeme/:id", (req, res) => {
    var id = req.path;
    id = id.replace("/getmeme/:", "");
    id = parseInt(id);
    var myArr = new Array();
    meme.find({}, (err, memes) => {
        memes = memes.reverse();
        for(var i = 0;i<id;i++) {
            if(memes[i] == undefined) {
                break;
            }
            else {
                myArr.push(memes[i]);
            }
        }
        setTimeout(() => {
            res.send(myArr);
        }, 500);
    });
})