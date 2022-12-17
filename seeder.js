const mongoose = require('mongoose')
const fs = require('fs')
const colors = require('colors')
const dotenv = require('dotenv')

dotenv.config({path: './config/config.env'})

const Feature = require('./models/location');

// mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser : true
});

//Read JSON files
const feature = JSON.parse(
    fs.readFileSync(`${__dirname}\\data\\karnataka.geojson`,'utf-8')
);

//Import into DB
const importData = async () => {
    try {
        await Feature.create(feature);
        console.log("data imported...".green.inverse)
    } catch (err) {
        console.log(err);
    }
}

//Delete Data
const deleteData = async () => {
    try {
        await Feature.deleteMany();
        console.log("data deleted...".red.inverse)
    } catch (err) {
        console.log(err);
    }
};

if(process.argv[2] == '-i') {
    importData();
} else if(process.argv[2] == '-d') {
    deleteData();
}