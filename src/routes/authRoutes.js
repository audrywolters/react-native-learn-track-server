const express = require('require')

const router = express.Router()

router.post('/signup', (req, res) => {
	res.send('you made a post request dear')
})

module.exports = router;