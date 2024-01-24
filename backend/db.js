
const mongoose = require('mongoose');
const mongoURL =  "mongodb://localhost:27017/settyl-assignment"

const connectToMongo = async() =>{
    try{
        await mongoose.connect(mongoURL)
        console.log("Connected to mongo successfully")
    }
    catch(error) {
        console.log("Error while connecting to MongoDB", error);
    }
} 
module.exports = connectToMongo;
