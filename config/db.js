const mongoose = require('mongoose')

const connectDB = async (db_uri) => {
    try {
        await mongoose.connect(db_uri);
        console.log("Database connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {connectDB}