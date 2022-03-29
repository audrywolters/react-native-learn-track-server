const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')
// this is super gotten in in Index
const Track = mongoose.model('Track')

const router = express.Router()

// make sure user is signed in before using these routes
router.use(requireAuth)

// get all the tracks
router.get('/tracks', async (req, res) => {
	// from tracks collection find all of a specific user
	const tracks = await Track.find({ userId: req.user._id })

	// show user all their tracks
	res.send(tracks)
})

// create a new track and send it back
router.post('/tracks', async (req, res) => {
	const { name, locations } = req.body

	// validate there is something
	// mongoose does data type validation! :)
	if (!name || !locations) {
		return res
			.status(422)
			.send({ error: 'You must provide name and locations.' })
	}

	try {
		const track = new Track({ name, locations, userId: req.user._id })
		await track.save()
		res.send(track)
	} catch (err) {
		res.status(422).send({ error: err.message })
	}
})

module.exports = router
