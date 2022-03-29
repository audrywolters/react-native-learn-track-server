const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
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
	
		// make the JWT
		// userId is the payload
		// but the second argument is what makes it safer
		// current key is bad! fix
		// Learing: check requireAuth to see where this is recieved from the frontend user
		const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')

		// send the JWT to the frontend
		// can condense to just ({ token })
		// but leaving for learninging
		res.send({ token: token })

	} catch (err) {
		// 422 is user sent invalid data
		// AUDRY - is it ok to send 422? what if it's a different error?
		// err.message is not the best for a user but we're using it to debug for now
		return res.status(422).send(err.message)
	}
})

module.exports = router
