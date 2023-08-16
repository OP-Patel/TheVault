import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const port = 3000; 
const app = express(); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const userSchema = new mongoose.Schema ({
    password: String, 
    email: String
});


const User = new mongoose.model("User", userSchema);


app.get("/", (req, res)=>{
    res.render("home.ejs");
});

app.get("/login", (req, res)=>{
    res.render("login.ejs");
});

app.get("/register", (req, res)=>{
    res.render("register.ejs");
});




app.listen(port, function(){
    console.log("Server started on port 3000.");
});