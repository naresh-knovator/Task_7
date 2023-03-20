const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Album", albumSchema)