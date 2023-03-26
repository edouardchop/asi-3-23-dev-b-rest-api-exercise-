const mongoose = require("mongoose")

const roleSchema = mongoose.Schema({


    name: {
        type: String,
        required: true,
        enum: ['admin', 'manager', 'editor']
    },
    permission: {

        type: String,
        enum: ["read", "create", "update", "delete"]

    }

}, { timestamps: true })

module.exports = mongoose.model("Role", roleSchema)