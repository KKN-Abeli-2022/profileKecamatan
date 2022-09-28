const bcrypt = require("bcryptjs");
const userModel = require("../models/user")
const {isAuth} = require("./middleware/index")
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const passport = require("passport");
require("../config/passportStrategy")(passport);
dotenv.config({path:require('find-config')('.env')})


const getLoginPage = (req, res) => {
    res.render('login', {
        title: 'Login',
        layout: 'layouts/login-signup',
        err: req.flash('error'),
        msg: req.flash("msg")
    });
}

const getSignupPage = (req, res) => {
    res.render('signup', {
    title: 'Signup',
    layout: 'layouts/login-signup',
    err: req.flash('error'),
    msg: req.flash("msg")
    });
}

const createUser = async (req, res) => {
    const { username, password, nama, nip, position, email, confirmPassword } = req.body;
    const userEmail = await userModel.findOne({email})
    const user = await userModel.findOne({username})
    if(userEmail) {
        req.flash("error","Email telah terdaftar");
        res.redirect("/signup");
    } else if(user){
        req.flash("error","Username telah terdaftar");
        res.redirect("/signup")
    } else {
        if(password !== confirmPassword){
            req.flash("error","Password dan Konfirmasi Password tidak sesuai");
            res.redirect("/signup")
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const data = new userModel({
                username,
                nama,
                jabatan: position,
                nip,
                email,
                password: hash,
                isVerified: false,
            })
            await data.save()
            req.flash("msg","Akun Telah Berhasil Dibuat")
            res.redirect('/login')
        }
    }
}

const login = async (req, res,next) => {
    passport.authenticate("local",{
        failureRedirect: "/login",
        successRedirect: "/dashboard",
        failureFlash: true
    })(req,res,next);
}

const getDashboardPage = async (req, res) => {
    const isVerified = req.user.isVerified;
    const username = req.user.username;
    res.render("dashboard",{
        title: "Dashboard",
        layout: "layouts/dashboard-layout",
        msg : req.flash("msg"),
        err : req.flash("err"),
        isVerified,
        username
        });
}

const logout = (req, res) => {
    req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login');
    });
}

module.exports = {getLoginPage,getSignupPage,createUser,logout,login,getDashboardPage}