const mongoose = require("mongoose")
const schema = mongoose.Schema;

const pendudukSchema = new schema({
    laki_laki:{
        type:Number,
        required:true
    },
    perempuan:{
        type:Number,
        required:true
    }
})


module.exports = mongoose.model("data_jumlah_penduduk",pendudukSchema)