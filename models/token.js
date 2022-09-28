const mongoose = require("mongoose");
const schema = mongoose.Schema;


const tokenModel = new schema({
    token: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    expires_at: {
        type: Date,
        default: Date.now,
        expire: 600*5
    }
})

module.exports = mongoose.model("token",tokenModel)