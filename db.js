const mongoose = require('mongoose');
const colors = require('colors');


const connectDB = async () => {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser : true,
    });

    console.log('MongoDB connected:'.green);
};

module.exports = connectDB;