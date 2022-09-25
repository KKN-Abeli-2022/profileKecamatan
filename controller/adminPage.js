const bcrypt = require("bcryptjs");
const userModel = require("../models/user")
const {isAuth} = require("./middleware/index")


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
                isVerified: false
            })
            await data.save()
            req.flash("msg","Akun Telah Berhasil Dibuat")
            res.redirect('/login')
        }
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await userModel.findOne({username});
    if(!user){
        req.flash("error","Username tidak terdaftar");
        res.redirect("/login")
    } else {
        await bcrypt.compare(hash,user.password);
        req.session.isAuth = true;
        res.redirect("/dashboard")
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login');
    });
}

module.exports = {getLoginPage,getSignupPage,createUser,logout,login}