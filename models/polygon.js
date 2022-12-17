const mongoose = require('mongoose')

const Polygon = new mongoose.Schema(
    {      
         coordinates: {
            type: [[[Number]]],
            required: true            
        }
})

Polygon.index({geometry: "2dsphere"})

module.exports = mongoose.model("Polygon",Polygon);