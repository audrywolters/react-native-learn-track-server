const mongoose = require('mongoose')

// all the triangluaty stuff for where user is
// it is part of trackSchema
const pointSchema = new mongoose.Schema({
	timestamp: Number,
	coords: {
		latitude: Number,
		longitute: Number,
		altitude: Number,
		accuracy: Number,
		heading: Number,
		speed: Number
	}
})

// this is the track app's big one
const trackSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		// ref helps Mongoose know that MongoDB has a User model
		ref: 'User'
	},
	// what the user named the track
	name: {
		type: String,
		// default value
		default: ''
	},
	locations: [pointSchema]
})

mongoose.model('Track', trackSchema)
