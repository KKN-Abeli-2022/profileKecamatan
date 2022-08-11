const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const app = express()


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayout);
app.use(express.static(path.join(__dirname, "public")));

// add middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting up session
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: false
    })
)

// add flash
app.use(cookieParser("secret"));
app.use(flash());

// database connection
const pool = mysql.createPool({
    connectionLimit     : 10,
    host                : "localhost",
    user                : "root",
    password            : "",
    database            : "profile"
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

app.post("/signup",(req,res) => {
    const {username, password, nama, nip, position, email} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(`INSERT INTO pegawai (username, password, nama, nip, jabatan, email) VALUES ('${username}', '${hash}', '${nama}', '${nip}', '${position}', '${email}')`, (err, result) => {
            if(err) throw err;
            connection.release();
            res.redirect("/login");
        });
    });
});


const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
