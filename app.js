const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const moment = require("moment")
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

// authentication
const isAuth = (req, res, next) => {
    if (req.session.isAuth){
        next();
    } else {
        req.flash("error", "Please login first");
        res.redirect("/login");
    }
}

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

app.get("/berita",(req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err;
        connection.query("SELECT * FROM berita",(err,rows) => {
            res.render("berita",{
                title: "Berita",
                layout: "layouts/main"
            })
    })
})});

app.get("/login",(req,res) => {
    res.render("login",{
        title: "Login",
        layout: "layouts/login-signup",
        err: req.flash("error")
    })
})

app.get("/signup",(req,res) => {
    res.render("signup",{
        title: "Signup",
        layout: "layouts/login-signup",
        err: req.flash("error")
    })
})

app.get("/dashboard", isAuth, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM pegawai", (err, result) => {
            console.log(req.session.user.username)
            if (err) throw err;
            res.render("dashboard",{
                title: "Dashboard",
                layout: "layouts/dashboard-layout",
                username: req.session.user.username,
            });
            connection.release();
        });
    })
});

app.get("/dashboard/dataUser",isAuth,(req,res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM pegawai", (err, result) => {
            if (err) throw err;
            // console.log(result);
            res.render("data-user",{
                title: "Data User",
                layout: "layouts/dashboard-layout",
                username: req.session.user.username,
                data: result
            })
            connection.release();
        }
        )
    });
})

app.get("/dashboard/berita",isAuth,(req,res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM pegawai", (err, result) => {
            if (err) throw err;
            // console.log(result);
            res.render("uploadBerita",{
                title: "Berita",
                layout: "layouts/dashboard-layout",
                username: req.session.user.username,
                msg: req.flash("success")
            })
            connection.release();
        }
        )
    });
})

app.post("/dashboard/berita",isAuth,(req,res) => {
    const { judul, isi } = req.body;
    const tgl_update = moment().format("YYYY-MM-DD");
    pool.getConnection((err,connection) =>{
        if(err) throw err;
        connection.query("INSERT INTO berita SET ?",{
            judul: judul,
            isi: isi,
            tgl_update
        } ,(err,result) => {
            if(err) throw err;
            req.flash("success", "Berhasil menambahkan berita");
            res.redirect("/dashboard/berita");
        });

    })
})

app.post("/signup",(req,res) => {
    const {username, password, nama, nip, position, email,confirmPassword} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    pool.getConnection((err, connection) => {
        if(err) throw err;
        if(password !== confirmPassword){
            req.flash("error", "Password doesn't match");
            res.redirect("/signup");
        } else {
            connection.query(`INSERT INTO pegawai (username, password, nama, nip, jabatan, email) VALUES ('${username}', '${hash}', '${nama}', '${nip}', '${position}', '${email}')`, (err, result) => {
                if(err) throw err;
                connection.release();
                res.redirect("/login");
            });
        }
    });
});

app.post("/login", async (req,res) => {
    const {username, password} = req.body;
    pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(`SELECT * FROM pegawai WHERE username = '${username}'`, async (err, result) => {
            if(err) throw err;
            if(result.length > 0){
                console.log(bcrypt.compareSync(password, result[0].password));
                if(await bcrypt.compare(password, result[0].password)){
                    req.session.isAuth = true;
                    req.session.user = result[0];
                    res.redirect("/dashboard");
                } else {
                    req.flash("error", "Username and Password doesn't match");
                    res.redirect("/login");
                }
            } else {
                req.flash("error", "Username doesn't exist");
                res.redirect("/login");
            }
            connection.release();
        } );
    } );
})

// logout
app.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if(err) throw err;
        res.redirect("/login");
    } );
});


const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
