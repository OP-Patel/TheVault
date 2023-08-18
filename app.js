import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";
import bodyParser from "body-parser";

//Passport imports for authentication
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";


//To start mongoDB, install and type "mongosh" in terminal
const port = 3000; 
const app = express(); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//Initialize session
app.use(session({
    secret: "thisismysecretstring",
    resave: false,
    saveUninitialized: false,

}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());


//Connect to local DB 
mongoose.connect("mongodb://localhost:27017/userDB")

//Create mongoose schema for every user
const userSchema = new mongoose.Schema ({
    username: String,
    password: String,
});

//Used to hash/salt and save users to DB
userSchema.plugin(passportLocalMongoose);


const User = new mongoose.model("User", userSchema);

//Passport-local configurations
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser()); //Create cookie with user IDs
passport.deserializeUser(User.deserializeUser()); //Destroys the cookie and discover data


//Server request handling
app.get("/", (req, res)=>{
    res.render("home.ejs");
});

app.get("/login", (req, res)=>{
    res.render("login.ejs");
});

app.get("/register", (req, res)=>{
    res.render("register.ejs");

});

app.get("/logout", (req, res, next)=>{ 
    req.logout(function(err) {  //Destroy cookie/end authenticated session when user decides to logout
        if (err) { return next(err); }
        res.redirect('/');
    });
})

app.get("/secrets", (req, res)=>{
    if (req.isAuthenticated()){ //Only give access if they have a logged in session
        res.render("secrets.ejs");
    } else {
        res.redirect("/login"); //If they don't force to log in to start a session
    }
});


app.post("/register", (req, res)=>{
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err){
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){ //Authenticate the user session when signing up
                res.redirect("/secrets")
            });
        }
    })
});


app.post("/login", async (req, res)=>{

    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, function(err) {
        if (err){
            console.log(err);
        }else{
            passport.authenticate("local")(req, res, function(){ //Authenticate the user session when logging in
                res.redirect("/secrets")
            });
        }
    });
});


app.listen(port, function(){
    console.log("Server started on port 3000.");
});