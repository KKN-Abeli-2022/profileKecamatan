const mongoose = require("mongoose")
const moment = require("moment")
const schema = mongoose.Schema;

const pendudukSchema = new schema({
    laki_laki:{
        type:Number,
        required:true,
        default:0
    },
    perempuan:{
        type:Number,
        required:true,
        default:0
    },
    sunda:{
        type:Number,
        required:true,
        default:0
    },
    jawa:{
        type:Number,
        required:true,
        default:0
    },
    bali:{
        type:Number,
        required:true,
        default:0
    },
    bugis:{
        type:Number,
        required:true,
        default:0
    },
    makasar:{
        type:Number,
        required:true,
        default:0
    },
    mandar:{
        type:Number,
        required:true,
        default:0
    },
    tolaki:{
        type:Number,
        required:true,
        default:0
    },
    buton:{
        type:Number,
        required:true,
        default:0
    },
    muna:{
        type:Number,
        required:true,
        default:0
    },
    bajo:{
        type:Number,
        required:true,
        default:0
    },
    mornene:{
        type:Number,
        required:true,
        default:0
    },
    toraja:{
        type:Number,
        required:true,
        default:0
    },
    islam:{
        type:Number,
        required:true,
        default:0
    },
    kristen:{
        type:Number,
        required:true,
        default:0
    },
    katolik:{
        type:Number,
        required:true,
        default:0
    },
    hindu:{
        type:Number,
        required:true,
        default:0
    },
    budha:{
        type:Number,
        required:true,
        default:0
    },
    year: {
        type: Number,
        required:true,
        default: moment().format('YYYY')
    }
})


module.exports = mongoose.model("data_penduduk",pendudukSchema)