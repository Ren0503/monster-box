const jwt = require('jwt-simple')
const config = require('../config/key')
const User = require('../models/userModel')

// utility function: User ID + Timestamp + Secret String = JSON Web Token (JWT)
function tokenForUser(user) {
    const timestamp = new Date().getTime()
    return jwt.encode({ sub: user._id, iat: timestamp }, config.secret)
}

/**
 * Sign up a new user
 * 
 * @param req
 * @param res
 * @param next
 */
exports.signup = function (req, res, next) {
    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    if (!email || !password) {
        return res.status(422).send({ message: 'You must provide both email and password.' })  // 422 refers to unprocessable entity
    }

    User.findOne({ email: email }, function (err, existUser) {
        if (err) {
            return next(err)
        }

        if (existUser) {
            return res.status(422).send({ message: 'This email is in use.' })  // 422 refers to unprocessable entity
        }

        // If a user with email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        })

        user.save(function (err) {
            if (err) {
                return next(err)
            }

            // Respond user request indicating the user was created
            res.json({ message: 'You have successfully signed up. You can sign in now.' })
        })
    })
}

/**
 * Sign in the user
 *
 * @param req
 * @param res
 * @param next
 */
exports.signin = function (req, res, next) {
    // Require auth

    // User has already had their email and password auth (through passport middleware [LocalStrategy])
    // We just need to give them a token
    res.send({
        token: tokenForUser(req.user),
        username: req.user.firstName + ' ' + req.user.lastName,
    })
}

/**
 * Verify if the JWT in local storage is valid
 *
 * @param req
 * @param res
 * @param next
 */
exports.verifyJwt = function (req, res, next) {
    // Require auth

    res.send({
        username: req.user.firstName + ' ' + req.user.lastName
    })
}
