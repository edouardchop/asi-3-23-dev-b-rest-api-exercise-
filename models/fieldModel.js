const mongoose = require("mongoose")

const fieldSchema = mongoose.Schema({


    type: {
        type: String,
        enum: ['single line text', 'multi line text', 'radio', 'select', 'checkbox'],
        required: true
    },
    options: [{
        type: String
    }],
    label: {
        type: String,
        required: true
    },
    defaultValue: {
        type: mongoose.Schema.Types.Mixed
    }
});





module.exports = mongoose.model("Field", fieldSchema)