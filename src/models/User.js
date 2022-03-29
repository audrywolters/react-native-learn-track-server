const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

// pre-save hook for hashing/salting a password
// this will run before we try to save the user to DB
// using old keyword function() so we can grab 'this'. a.k.a. the user.
userSchema.pre('save', function (next) {
	// this/user is coming from DB
	const user = this
	// if user has same password - ignore this code
	if (!user.isModified('password')) {
		return next()
	}

	// if a new password generate a new salt
	// 10 means complexity (length probably)
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err)
		}

		// hash and salt the password and callsbacks an error
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err)
			}

			// go ahead and salt/hash the password (change it to crypted format)
			user.password = hash

			next()
		})
	})
})

// now we are checking existing passwords
// using old keyword function() so we can grab 'this'. a.k.a. the user.
userSchema.methods.comparePassword = function (candidatePassword) {
	// this/user is coming from DB
	const user = this

	// use a promise because bycrypt isn't into async/await
	return new Promise((resolve, reject) => {
		// get bycrypt to hash/salt sent password
		// and compare to what exists in DB
		bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
			// something went wrong
			if (err) {
				return reject(err)
			}

			// no match!
			if (!isMatch) {
				return reject(false)
			}

			// huzzah!
			resolve(true)
		})
	})
}

mongoose.model('User', userSchema)
