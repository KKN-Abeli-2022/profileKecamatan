const router = require('express').Router();
const moment = require("moment");
const passport = require('passport')
const {isAuth,truncateString,dateOnly} = require("../controller/middleware/index")
const crypto = require("crypto");
const {connectDB} = require('../config/db');
const {
        getIndexPage,
        getProfilePage,
        getLayananPage,
        getInformasiPage,
        getDetailInformationPage
      } = require('../controller/clientPage')
const {
        getLoginPage,
        getSignupPage,
        createUser,
        logout,
        login,
        getDashboardPage,
        sendMail,
        verifyEmail,
        addDataUserPage,
        deleteUser,
        dataProfile,
        addDataPage,
        addDataPagePost,
        updatePenduduk,
        updateAgama,
        updateEtnis,
        getInformasiDashboard,
        postInformasi,
        getEditProfile,
        postditProfile
      } = require('../controller/adminPage')
const dotenv = require("dotenv")
dotenv.config({path:require('find-config')('.env')})


// database connection
connectDB(process.env.db_uri)


router.get('/', getIndexPage);



router.get('/profile', getProfilePage);

router.get('/informasi', getInformasiPage);

router.get('/informasi/:id', getDetailInformationPage);

router.get("/layanan", getLayananPage)

router.get('/login', getLoginPage);

router.get('/signup', getSignupPage);

router.get("/dashboard",isAuth, getDashboardPage);

router.get('/dashboard/dataUser', isAuth, addDataUserPage);

router.delete("/delete-user",deleteUser)

router.get("/dashboard/add-data",isAuth,addDataPage)

router.post("/dashboard/add-data",isAuth,addDataPagePost)

router.get("/dashboard/dataProfile",isAuth,dataProfile)
router.put("/update-penduduk",updatePenduduk)

router.put("/update-agama",updateAgama)

router.put("/update-etnis",updateEtnis)

router.get("/dashboard/informasi",isAuth,getInformasiDashboard);

router.post('/dashboard/informasi', postInformasi);

// edit profile
router.get("/dashboard/edit-profile",isAuth,getEditProfile)

router.put("/dashboard/edit-profile",postditProfile)

// verification email
router.get("/dashboard/verify-email",isAuth, sendMail)

router.get("/verify-email/:token", verifyEmail)

// forgot-password
router.post("/forgot-password",(req,res) => {
  const {email} = req.body;
  // generate token
  const token = crypto.randomBytes(20).toString("hex");
  // set token database
  pool.getConnection((err,connection) => {
    if(err) throw err;
    connection.query(`SELECT * FROM pegawai WHERE email = "${email}"`,(err,result) => {
      if(err) throw err;
      else if(result.length > 0){
        connection.query(`INSERT INTO token SET ?`,{
          token,
          email,
          date : new Date()
        })
        connection.release();
        const mailOptions = {
          from : process.env.email,
          to : email,
          subject : "Reset Password",
          html : `
            <h1> Reset Password </h1>
            <p> Reset your password by clicking this link <a href="http://kelurahan-abeli.com/forgot-password/${token}">Reset Password</a></p>
          `
        }
        transporter.sendMail(mailOptions)
        req.flash("msg","Link untuk reset password telah dikirim ke email jika tidak menerima pesan harap cek folder spam");
        res.redirect("/login")
      } else {
        req.flash("error","Email tidak terdaftar");
        res.redirect("/login")
      }
    })
  })
})

router.get("/forgot-password/:token", async (req,res) => {
const token = req.params.token;
  pool.getConnection((err,connection) => {
    if(err) throw err;
    connection.query(`SELECT * FROM token WHERE token = '${token}'`,(err,result) => {
      if(err) throw err;
      if(result.length > 0){
        const email = result[0].email;
        connection.query(`SELECT * FROM pegawai WHERE email = '${email}'`,(err,result) => {
          if(err) throw err;
          if(result.length > 0) {
            res.render("forgot-password",{
              title: "Reset Password",
              layout: 'layouts/login-signup',
              username: result[0].username,
              email : result[0].email,
              id : result[0].id,
              err : req.flash("err"),
              msg : req.flash("msg")
            })
          }
        })
      }else{
        res.redirect("/login");
      }
    })
  })
})

router.put("/reset-password",(req,res) => {
  const {id,email,password,username,confirmPassword} = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  pool.getConnection((err,connection) => {
    if(err) throw err;
    if(password !== confirmPassword){
      req.flash("err","Password dan Konfirmasi Password tidak sesuai");
      connection.query(`SELECT token FROM token WHERE email = "${email}"`,(err,result) => {
        res.redirect(`/forgot-password/${result[0].token}`)
      })
    } else {
      connection.query(`DELETE FROM token WHERE email = '${email}'`,(err,result) => {
        connection.query(`UPDATE pegawai SET ? WHERE id = '${id}'`,{
          password : hash
        })
        req.flash("msg","Password telah berhasil di update")
        res.redirect("/login")
      })
    }
  })
})


router.post('/signup', createUser);

router.post('/login', login);

// logout
router.post('/logout', logout);


module.exports = {router}