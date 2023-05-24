const mongoose = require('mongoose')

const SubscriptionsSchema = new mongoose.Schema({
    owner_ID: {
        required: true,
        type: String
    },
    channel_ID: {
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

module.exports = mongoose.model("Subscriptions", SubscriptionsSchema)
