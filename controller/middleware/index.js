const moment = require("moment");
const jwt = require("jsonwebtoken")

const dotenv = require("dotenv")
dotenv.config({path:require('find-config')('.env')})


// authentication
const isAuth = (req, res, next) => {
  if(req.isAuthenticated()){
    res.set("Cache-Control","no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0");
    next();
  } else {
    req.flash("error","Harap Login terlebih dahulu");
    res.redirect("/login")
  }
};
        
const truncateString = (str, num) => {
      if (str.length > num) {
        return str.slice(5, num) + '...';
      } else {
      return str;
    }
}

const dateOnly = (date) => {
        return moment(date).format("DD MMMM YYYY");
    }



module.exports = {isAuth,truncateString,dateOnly}



//  if (req.session.isAuth) {
//     next();
//     } else {
//     req.flash('error', 'Harap login terlebih dahulu');
//     res.redirect('/login');
//     }