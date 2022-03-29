const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res, next) => {
	// authorization is a header ( use Uppercase in Postman - express downcases stuff )
	// try to grab the header's authorization prop
	// authorization === 'Bearer asdfjlk;adsfjlk;'
	const { authorization } = req.headers
	
	// check request to see if it has an authorization prop
	if (!authorization) {
		// 401 is forbidden error
		// if no authorization, tell user no
		return res.status(401).send({ error: 'You must be logged in!' })
	}

	// take out only the token key part
	const token = authorization.replace('Bearer ', '')

	// check this is the correct token
	// third argument callsbacks what to do with data
	// payload and token is created authRoutes post /signup
	jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {

		// this error means the key is wrong or null
		if (err) {
			// but we're going to be secrety about it so haxors don't know what's up
			return res.status(401).send({ error: 'You must be logged in!' })
		}

		// the key is good! keep going
		// payload and token is created authRoutes post /signup
		// userId is part of the payload
		const { userId } = payload
		
		// Mongoose, find the user in the db collection
		const user = await User.findById(userId)

		// since all is well, add this data to request object so rest of app has access to it
		// psst - index is going to use this
		req.user = user
		
		// do the next middleware or end
		next()
	})
}
