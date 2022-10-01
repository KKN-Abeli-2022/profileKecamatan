const data_penduduk = require('../models/penduduk');
const {truncateString,dateOnly} = require("./middleware/index");
const informationModel = require('../models/informasi')
const dotenv = require("dotenv");
dotenv.config({path:require('find-config')('.env')});


const getIndexPage = async (req, res) => {
    const dataInformasi = await informationModel.find().sort({id:-1}).limit(6)
    const dataPenduduk = await data_penduduk.find().sort({id:-1}).limit(1)
    res.render("index",{
        title: "Home",
        layout: "layouts/main",
        dataInformasi,
        dataPenduduk,
        convert : truncateString,
        date : dateOnly,
        });
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

const getInformasiPage = async (req, res) => {
    const data = await informationModel.find().sort({_id: -1})
    res.render('informasi', {
        title: 'Informasi',
        layout: 'layouts/main',
        data,
        date: dateOnly,
        convert: truncateString,
    });
}

const getDetailInformationPage = async (req, res) => {
    const mainContent = await informationModel.findById(req.params.id);
    const data = await (await informationModel.find()).filter((information) => {
        return information.id !== req.params.id
    })
    res.render('detail', {
            title: mainContent.judul,
            layout: 'layouts/main',
            judul : mainContent.judul,
            isi : mainContent.isi,
            gambar : mainContent.gambar,
            penulis : mainContent.author,
            id : mainContent._id,
            tgl_update: mainContent.tgl_update,
            data,
            date : dateOnly
        });
}

module.exports = {getIndexPage,getProfilePage,getLayananPage,getInformasiPage,getDetailInformationPage}