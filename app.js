const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const mailer = require("nodemailer");
const multer = require("multer");
const dotenv = require("dotenv");
const {router} = require("./routes/route")
const findConfig = require('find-config');
const mongoDbSession = require('connect-mongodb-session')(session);
const app = express()

// set environment
dotenv.config({path: findConfig(".env")});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static(path.join(__dirname, 'public')));

// add middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

// setting up multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single('imageBerita')
);

app.use('/images', express.static(path.join(__dirname, 'images')));

// setting up session
app.use(
    session({
        secret: process.env.cookieParserSecret,
        resave: true,
        saveUninitialized: false
    })
)

// add flash
app.use(cookieParser(process.env.cookieParserSecret));
app.use(flash());

// setting up mailer
const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.email,
        pass: process.env.password
    }
})



// load all routes
app.use("/",router)

const port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}`));