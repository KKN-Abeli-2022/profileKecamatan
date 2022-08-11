const express = require("express");
const path = require("path");
const {Sequelize} = require("sequelize");
const expressLayout = require("express-ejs-layouts");
const app = express()


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayout);
app.use(express.static(path.join(__dirname, "public")));

// add middleware
app.use(express.urlencoded({ extended: true }));

// database connection
const sequelize = new Sequelize("profile_abeli", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

// test connection
sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch(err => {
    console.error("Unable to connect to the database:", err);
});

// routes
app.get("/", (req, res) => {
    res.render("index",{
        title: "Home",
        layout: "layouts/main"
    });
});

app.get("/profile", (req, res) => {
    res.render("profile",{
        title: "Profile",
        layout: "layouts/main"
    });
});

app.get("/login",(req,res) => {
    res.render("login",{
        title: "Login",
        layout: "layouts/login-signup"
    })
})

app.get("/signup",(req,res) => {
    res.render("signup",{
        title: "Signup",
        layout: "layouts/login-signup"
    })
})


const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
