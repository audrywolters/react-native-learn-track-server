const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')

const app = express()
app.use(authRoutes)

const mongoUri = 'mongodb+srv://chromaticarray:passwordpassword@cluster0.sx8ve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri)
mongoose.connection.on('connected', () => {
	console.log('connected to mongo instance!')
})
mongoose.connection.on('error', (err) => {
	console.error('error connecting to mongo!', err)
})

app.get('/', (req, res) => {
	res.send('Hi there')
})

app.listen(3000, () => {
	console.log('Listening on Port 3000')
})
