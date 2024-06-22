const mongoose = require('mongoose')

const dbConnect = async() =>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("DB Connection Failure : "+error);
    }
}

module.exports = dbConnect
