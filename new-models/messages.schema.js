const mongoose = require('mongoose')

const MessagesSchema = new mongoose.Schema({
    ID: {
        required: true,
        type: String
    },
    user_ID: {
        required: true,
        type: String
    },
    text: {
        required: true,
        type: String
    },
    createdAt: {
        required: true,
        type: String,
        default: () => {
            return new Date().toLocaleString()
        }
    }
})

module.exports = mongoose.model("Messages", MessagesSchema)
