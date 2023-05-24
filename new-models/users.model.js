const User = require('./users.schema')

async function insertUser(username, password) {
    
        const result = await User.create({
            username,
            password
        })
        return result
}

async function listUsers() {
    return await User.find()
}

async function validateUser(username, password) {
    return await User.findOne({ username, password })
}

async function findUserById(ID) {
    return await User.findOne({ ID })
}

async function findUserByUsername(username) {
    return await User.findOne({ username })
}



module.exports = { insertUser, listUsers, validateUser, findUserById }


