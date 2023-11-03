const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const RainWearSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model("ProductSchema", RainWearSchema);