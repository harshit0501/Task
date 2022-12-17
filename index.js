const express = require('express')
const path = require('path')
const connectDB = require("./db")
const app = express();
const colors = require('colors');
const Feature = require('./models/location');
const Polygon = require('./models/polygon');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

dotenv.config({path: './config/config.env'})

// //connect to database
connectDB()

app.use(cors())

//parse request to body-parser
// app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

//set view engine
app.set("view engine","ejs")


//Set static folder
app.use(express.static(path.join(__dirname,'public')));


//ROUTES//
let coords =[];

app.get('/',async (req,res) => {
})

app.post('/', async (req,res) => {
    try {
        
        // const shape = await Polygon.create(req.body);
        coords = req.body
        return res.status(200).json({
            success: true,
            data: coords
        })
    } catch (err) {
        console.log(err);
    }
});

app.get('/find',async(req,res) => {
    try {
        const test = {
            geometry: {
                $geoIntersects: {
                    $geometry: {
                        type: 'Polygon',
                        coordinates: coords.coordinates
                    }
                }
            }
        }
    
        let intersects = await Feature.find(test);
        return res.status(200).json({
            data: intersects
        });
     
    } catch (err) {
        console.log(err);
    }
   
});



const PORT = process.env.PORT || 8000;
app.listen(
    PORT,
    console.log('Server is running....'.green.inverse)
);

