const mongoose = require('mongoose');
require('dotenv').config();
// const URI = "mongodb://localhost:27017/instaclone"
const URI = process.env.URI;
const dbconnect = async () => {
    await mongoose.connect(URI).then(()=> console.log("connected successfully to Database " )).catch((err)=>console.log("Failed to connect "+err))
}


module.exports = dbconnect;