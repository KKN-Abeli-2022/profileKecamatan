const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const app = express()


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayout);
app.use(express.static(path.join(__dirname, "public")));

// add middleware
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index",{
        title: "Home",
        layout: "layouts/main"
    });
});


const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
