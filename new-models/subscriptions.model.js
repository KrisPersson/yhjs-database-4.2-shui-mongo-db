const Subscriptions = require('./subscriptions.schema')
const { findUserById } = require('./users.model')
const { getChannelById } = require('./channels.model')


async function postSubscription(user_ID, channel_ID) {

    const userExists = await findUserById(user_ID)
    if (!userExists) {
        throw new Error(`User with ID ${user_ID} does not exist`)
    }
    const channelExists = await getChannelById(channel_ID)
    if (!channelExists) {
        throw new Error(`Channel with ID ${channel_ID} does not exist and can not be subscribed to`)
    }
    const subscriptionAlreadyExists = await findSubscription(user_ID, channel_ID)
    if (subscriptionAlreadyExists) {
        throw new Error(`User is already subscribed to this channel`)
    }

    return await Subscriptions.create({ user_ID, channel_ID })
}



async function findSubscription(user_ID, channel_ID) {
    return await Subscriptions.findOne({ user_ID, channel_ID })
}

async function findSubscriptionsByUserId(user_ID) {
    return await Subscriptions.findOne({ user_ID})
}

async function deleteSubscription(user_ID, channel_ID) {
    const foundSubscription = await findSubscription(user_ID, channel_ID)
    if (!foundSubscription) {
        throw new Error(`Subscription not found`)
    }

    return Subscriptions.deleteOne({ user_ID, channel_ID })
}




module.exports = { postSubscription, deleteSubscription, findSubscriptionsByUserId }
