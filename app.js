import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";
import bodyParser from "body-parser";


import bcrypt from "bcrypt";
const saltRounds = 10; // Salting rounds for bcrpyt

// TO START MONGODB USE >> mongosh IN TERMINAL, Studio3T (former Robo3T) for interface!

const port = 3000; 
const app = express(); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect("mongodb://localhost:27017/userDB")

const userSchema = new mongoose.Schema ({
    username: String,
    password: String 
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

app.post("/register", (req, res)=>{
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            const newUser = new User({
                username: req.body.username,
                password: hash
            });
        
            // Then and Catch callback function for error
            newUser.save().then(()=>{
                res.render("secrets.ejs");
            }).catch((err)=>{
                console.log(err);
            })
        });
    });



app.post("/login", async (req, res)=>{
    const Username = req.body.username;
    const Password = req.body.password;

    User.findOne({username: Username}).then((foundUser)=>{
        if (foundUser){
            bcrypt.compare(Password, foundUser.password).then(function(result) {
                if (result === true){
                    res.render("secrets.ejs");
                } else {
                    res.redirect("/login");
                }
            });
        };
    })
    .catch((err) => console.log(err));
});


app.listen(port, function(){
    console.log("Server started on port 3000.");
});