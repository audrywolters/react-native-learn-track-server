const express = require('express')
const mongoose = require('mongoose')
// access the mongo model from index - which grabs it from models/User
const User = mongoose.model('User')
//

const router = express.Router()

router.post('/signup', async (req, res) => {
	
	// get the items out of the request
	const { email, password } = req.body
	const user = new User({ email, password })

	// actually save the thing
	await user.save()

	res.send('you made a post request dear')
})

module.exports = router
