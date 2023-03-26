const mongoose = require("mongoose")
const navigationmenuSchema = mongoose.Schema({
    Name: {
        type: String,


    },
    listOfPages: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Page"



    }
});



module.exports = mongoose.model("navigationMenu", navigationmenuSchema)