const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

const connectDB = (async (URL,DATABASE) => {
    try {
        const connectionInstance = await mongoose.connect(URL+DATABASE);
        console.log(`DATABASE CONNECTED :: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.warn(`DATABASE CONNECTION ERROR :: ${error.message}`)
    }
})(MONGO_URI, DATABASE_NAME);

module.exports = connectDB;
