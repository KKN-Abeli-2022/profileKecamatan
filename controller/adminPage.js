const bcrypt = require("bcryptjs");
const userModel = require("../models/user");
const tokenModel = require('../models/token')
const crypto = require("crypto");
const {transporter} = require("./middleware/index")
const dotenv = require("dotenv");
const passport = require("passport");
const data_penduduk = require("../models/penduduk")
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
    const jabatan = req.user.jabatan
    res.render("dashboard",{
        title: "Dashboard",
        layout: "layouts/dashboard-layout",
        msg : req.flash("msg"),
        err : req.flash("err"),
        isVerified,
        username,
        jabatan
        });
}

const logout = (req, res) => {
    req.logout(() => {
        req.session.destroy((err) => {
            res.redirect("/login")
        })
    })
}

const sendMail = async (req,res) => {
    // generate token
    const token = crypto.randomBytes(20).toString('hex');
    // set token to database
    const user = await userModel.findOne({username:req.user.username});
    if(user){
        const data = new tokenModel({
            token,
            email: req.user.email
        })
        await data.save()
    }
    const mailOptions = {
        from: process.env.email,
        to: req.user.email,
        subject: "Verify Email",
        html: `
        <h1Verify Your Email</h1>
        <p>Click this link to verify your email</p>
        <a href="https://kelurahan-abeli.herokuapp.com/verify-email/${token}">Verify Email</a>
        `
    }
    await transporter.sendMail(mailOptions);
    req.flash("msg","Link email verifikasi telah berhasil dikirim jika tidak ada di inbox harap cek folder spam");
    res.redirect("/dashboard")
}

const verifyEmail = async (req,res) => {
    const token = req.params.token;
    const tokenSent = await tokenModel.findOne({token})
    if(tokenSent){
        await userModel.updateOne({username:req.user.username},{
            $set: {
                isVerified: true
            }
        })
        await tokenModel.deleteOne({token})
        req.flash("msg","Your Account has been verified");
        res.redirect("/dashboard")
    }
}

const addDataUserPage = async (req,res) => {
    const isVerified = req.user.isVerified;
    const jabatan = req.user.jabatan;
    const username = req.user.username;
    const data = await userModel.find()
    res.render('data-user', {
        title: 'Data User',
        layout: 'layouts/dashboard-layout',
        username,
        msg: req.flash("msg"),
        isVerified,
        jabatan,
        data
    });
};

const deleteUser = async (req,res) => {
    const {id} = req.body;
    await userModel.deleteOne({_id:id})
    req.flash("msg","data telah berhasil dihapus");
    res.redirect("/dashboard/dataUser")
}

const dataProfile = async (req,res) => {
    const isVerified = req.user.isVerified;
    const jabatan = req.user.jabatan;
    const username = req.user.username;
    const data = await data_penduduk.find()
    res.render("data-profile",{
        title: "Data Profile",
        layout: "layouts/dashboard-layout",
        username,
        data,
        isVerified,
        jabatan,
        msg : req.flash("msg")
        })
}

module.exports = {getLoginPage,getSignupPage,createUser,logout,login,getDashboardPage,sendMail,verifyEmail,addDataUserPage,deleteUser,dataProfile}