const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    signedUp: {
        required: true,
        type: String,
        default: () => {
            return new Date().toLocaleString()
        }
    }
})

module.exports = mongoose.model("User", UserSchema)
