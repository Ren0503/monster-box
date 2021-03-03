var express = require('express')
const router = express.Router()
const passport = require('passport')
const Authentication = require('../controllers/authController')
const passportService = require('../config/passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

router.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123' })
})

router.post('/signup', Authentication.signup)
router.post('/signin', requireSignin, Authentication.signin)

router.get('/verify_jwt', requireAuth, Authentication.verifyJwt)

module.exports = router