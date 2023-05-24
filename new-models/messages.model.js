const { findSubscriptionsByUserId } = require('./subscriptions.model')
const { findUserById } = require('./users.model')
const { uuidv4 } = require('../uuid')
const Messages = require('./messages.schema')




async function postNewMessage(user_ID, channels, text) {
    const userExists = await findUserById(user_ID)
    if (!userExists) {
        throw new Error('User with this ID does not exist')
    }
    const userSubscriptions = await findSubscriptionsByUserId(user_ID)
    channels.forEach(channel => {
        if (userSubscriptions.filter(userSub => userSub.channel_ID == channel).length !== 1) {
            throw new Error('User not subscribed to one or more channels and can not post')
        }
    });
    
    return await Messages.create({ user_ID, channels, text })
}

async function postMessChan(message_ID, channels) {
    let sql = `
        INSERT INTO messchan (message_ID, channel_ID) VALUES
    `
    const arr = []
    channels.forEach((channel, i) => {
        sql += `(?, ?)`
        if (i <= channels.length - 2) {
            sql += `, `
        } else {
            sql += `;`
        }
        arr.push(message_ID)
        arr.push(channel)
    })

    return new Promise((resolve, reject) => {
        db.run(sql, arr, (error) => {
            if (error) {
                reject(error.message)
            } else {
                resolve('Successfully posted messchan!')
            }
        })
    })
}

async function getMesschanByChannel(channel_ID) {
    let sql = `SELECT message_ID FROM messchan WHERE channel_ID = ?`
    const arr = [channel_ID]

    return new Promise((resolve, reject) => {
        db.all(sql, arr, (error, rows) => {
            if (error) {
                reject(error.message)
            } else {
                resolve(rows.map(row => row.message_ID))
            }
        })
    })
}

async function getMessages(messageIDs) {
    const allMessages = await getAllMessages()
    const result = []
    for (let i = 0; i < allMessages.length; i++) {
        if (messageIDs.includes(allMessages[i].ID)) {
            result.push(allMessages[i])
        }
    }
    return result
}

async function getMessagesByUser(user_ID) {
    return await Messages.find({ user_ID })
}

async function getAllMessages() {
    return await Messages.find()
}

async function findMessage(ID) {
    return await Messages.findOne({ ID })
}

async function deleteMessage(ID) {
   
    const foundMessage = await findMessage(ID)
    if (!foundMessage) {
        throw new Error(`Message with ID: ${ID} not found`)
    }

    return await Messages.deleteOne({ ID })
}

async function deleteMessChans(message_ID) {
    const sql = `DELETE FROM messchan WHERE message_ID = ?`
    const arr = [message_ID]

    return new Promise((resolve, reject) => {
        db.run(sql, arr, (err) => {
            if (err) {
                reject(err.message)
            } else {
                resolve('Messchans deleted!')
            }
        })
    })
}



module.exports = { postNewMessage, getMessages, getMessagesByUser, deleteMessage, postMessChan, getMesschanByChannel }
