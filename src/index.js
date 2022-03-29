// only require User and Track once, here in index
require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')

const app = express()

// associate things with our application (hook-up I guess)
app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

// i know this is wrong to have user/password right in the file
// .env file is incoming
const mongoUri =
	'mongodb+srv://chromaticarray:passwordpassword@cluster0.sx8ve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri)
mongoose.connection.on('connected', () => {
	console.log('connected to mongo instance!')
})
mongoose.connection.on('error', (err) => {
	console.error('error connecting to mongo!', err)
})

// only allow access to this with a JWT. requrieAuth arugment is imported middleware.
app.get('/', requireAuth, (req, res) => {

	// DEBUG: send this back for testing
	res.send(`Your email is: ${req.user.email}`)
})

app.listen(3000, () => {
	console.log('Listening on Port 3000')
})
