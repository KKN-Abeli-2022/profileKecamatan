const moment = require("moment");


// authentication
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
    next();
    } else {
    req.flash('error', 'Harap login terlebih dahulu');
    res.redirect('/login');
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