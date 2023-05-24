const mongoose = require('mongoose')

const ChannelSchema = new mongoose.Schema({
    owner_ID: {
        required: true,
        type: String
    },
    name: {
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

module.exports = mongoose.model("Channel", ChannelSchema)
