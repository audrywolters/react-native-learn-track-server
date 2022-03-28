// only require User once, here in index
require('./models/User')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)

// i know this is wrong to have user/password right in the file
// tutorial is about to explain JWT stuff. hopefully that will move this stuff for us.
const mongoUri =
	'mongodb+srv://chromaticarray:passwordpassword@cluster0.sx8ve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri)
mongoose.connection.on('connected', () => {
	console.log('connected to mongo instance!')
})
mongoose.connection.on('error', (err) => {
	console.error('error connecting to mongo!', err)
})

app.get('/', (req, res) => {
	res.send('Hi there. App.Get recieved!')
})

app.listen(3000, () => {
	console.log('Listening on Port 3000')
})
