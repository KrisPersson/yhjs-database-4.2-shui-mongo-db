const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000

require('dotenv').config()

// const { userRouter } = require('./routes/user.route')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const database = mongoose.connection
database.on('error', (error) => console.log(error))
database.once('connected', () => console.log('Database connection established'))


app.use(express.json())

const { channelsRouter } = require('./routes/channels.route')
const { messagesRouter } = require('./routes/messages.route')
const { subscriptionsRouter } = require('./routes/subscriptions.route')
const { usersRouter } = require('./routes/users.route')
const { createDbConnection } = require('./db')


app.use(express.json())

app.use('/api/channels', channelsRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/subscriptions', subscriptionsRouter)
app.use('/api/users', usersRouter)

createDbConnection()

app.listen(PORT, () => {
	console.log('Started server at: ' + PORT)
})
