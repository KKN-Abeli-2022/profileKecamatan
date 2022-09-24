const mongoose = require('mongoose')
const schema = mongoose.Schema;


const informationSchema = new schema({
    judul: {
        type: String,
        required: true
    },
    tgl_update: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    gambar: {
        type: String,
        require: true
    },
    isi: {
        type: String,
        require:true
    },
    author: {
        type:String,
        require: true
    }
})

module.exports = mongoose.model("informasi",informationSchema);