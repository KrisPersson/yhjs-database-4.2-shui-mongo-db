const Channel = require('./channel.schema')


async function insertNewChannel(owner_ID, name) {
  return await Channel.create({
    owner_ID,
    name
  })
}

async function removeChannel(owner_ID, name) {
  return await Channel.deleteOne({ owner_ID, name })
}

async function getAllChannels() {
  return await Channel.find()
}

async function getChannelName(name) {
  return await Channel.findOne({ name })
}

async function getChannelById(channel_ID) {
  return await Channel.findOne({ channel_ID })   
}

async function getChannelOwnerID(owner_ID) {
  return await Channel.findOne({ owner_ID })
}

async function getChannelPrimaryKey(name) {
  const foundChannel = await Channel.findOne({ name })
  return foundChannel.id ? foundChannel.id : undefined
}

module.exports = {
  insertNewChannel,
  getAllChannels,
  getChannelName,
  getChannelOwnerID,
  removeChannel,
  getChannelPrimaryKey,
  getChannelById
};
