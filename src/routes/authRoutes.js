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

	try {
		// actually save the thing
		await user.save()
	
		// success message
		res.send('you made a post request dear')
	} catch (err) {
		// 422 is user sent invalid data
		// AUDRY - is it ok to send 422? what if it's a different error?
		// err.message is not the best for a user but we're using it to debug for now
		return res.status(422).send(err.message)
	}
})

module.exports = router
