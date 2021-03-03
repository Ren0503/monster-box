var express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../controllers/userController')
const passportService = require('../config/passport')

const requireAuth = passport.authenticate('jwt', { session: false })

router.get('/profile', requireAuth, User.fetchProfile)
router.post('/profile', requireAuth, User.updateProfile)
router.put('/password', requireAuth, User.resetPassword)

module.exports = router
