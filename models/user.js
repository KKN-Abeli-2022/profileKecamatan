const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String,
        required: true
    },
    nama: {
        type: String,
        required: true
    },
    jabatan: {
        type: String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    nip: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
})

module.exports = mongoose.model("User",userSchema)