const express = require('express')
// if we want access to a mongo model outside of index.js, here's how you do it
const mongoose = require('mongoose')
const User = mongoose.model('User')
//

const router = express.Router()

router.post('/signup', (req, res) => {
	console.log(req.body)
	res.send('you made a post request dear')
})

module.exports = router
