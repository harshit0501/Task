const mongoose = require("mongoose")


const FeatureCollection = new mongoose.Schema(
    {
        type: {
            type: String,
        },
        properties: {
            fill: {
                type: String
            }
        },
        geometry: {
            type: {
                type: String,
                enum: ['Polygon'],
                required: true
            },
            coordinates: {
                type: [[[Number]]],
                required: true
                // index: '2dsphere'
            }
        }
    }
)

FeatureCollection.index({geometry: "2dsphere"});

module.exports = mongoose.model("Feature", FeatureCollection);