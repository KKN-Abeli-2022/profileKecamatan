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
        postditProfile,
        postResetPassword,
        getResetPasswordPage,
        setResetPassword
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
router.post("/forgot-password", postResetPassword)

router.get("/forgot-password/:token", getResetPasswordPage)

router.put("/reset-password",setResetPassword)


router.post('/signup', createUser);

router.post('/login', login);

// logout
router.post('/logout', logout);


module.exports = {router}