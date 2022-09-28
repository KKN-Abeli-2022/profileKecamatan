const informasi = require('../models/informasi');
const data_penduduk = require('../models/penduduk');
const {isAuth,truncateString,dateOnly} = require("./middleware/index")
const dotenv = require("dotenv");
dotenv.config({path:require('find-config')('.env')});


const getIndexPage = async (req, res) => {
    res.render("index",{
        title: "Home",
        layout: "layouts/main",
        convert : truncateString,
        date : dateOnly,
        });
}

const initialAddDataPenduduk = async (req,res) => {
    const {laki_laki,perempuan} = req.body;
    console.log(laki_laki,perempuan)
    const dataPenduduk = new data_penduduk({
        laki_laki,perempuan
    });
    dataPenduduk.save((err,msg)=> {
        if(!err)
            res.send({
                message: "The data has been added successfully"
            })
        else
            res.send({
                message: "The data has not been added" + err
            })
    })
}

const getProfilePage = (req, res) => {
    res.render('profile', {
    title: 'Profile',
    layout: 'layouts/main',
    });
}

const getLayananPage = (req,res) => {
    res.render("layanan",{
    title : "layanan",
    layout : "layouts/main"
    })
}

module.exports = {getIndexPage,initialAddDataPenduduk,getProfilePage,getLayananPage}