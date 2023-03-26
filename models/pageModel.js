const mongoose = require("mongoose")
const pageSchema = mongoose.Schema({


    title: {
        type: String,
        required: true

    },
    content: {
        type: String


    },
    urlslag: {
        type: String,
        required: true,
        Unique: true

    },
    creator: {
        type: String,
        required: true


    },
    userWhoModified: {
        type: String


    },

    status: {
        type: String,
        required: true,
        enum: ['draft', 'published']


    }



}, { timestamps: true });

module.exports = mongoose.model("Page", pageSchema)