const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const userModel = require('../models/user');
const bcryptjs = require('bcryptjs')

module.exports = function (passport) {
    passport.use(
        new localStrategy({usernameField:"username"},async (username,password,done) => {
            await  userModel.findOne({username}, async (err,data,req) => {
                if(err) throw err;
                if(!data) {
                    return done(null,false,{message: "User tidak ditemukan"})
                }
                await bcryptjs.compare(password,data.password,(err,match) => {
                    if(err) return done(null,false);
                    if(!match) return done(null,false,{message: "Username atau Password salah"});
                    if(match) return done(null,data);
                })
            }).clone()
        })
    )
}

passport.serializeUser((user,done) => {
    done(null,user.id)
})

passport.deserializeUser((id,done) => {
    userModel.findById(id,(err,user) => {
        done(err,user)
    })
})