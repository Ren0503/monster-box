const User = require('../models/userModel')
const Blog = require('../models/blogModel')
const Comment = require('../models/commentModel')

/**
 * Fetch profile information
 * 
 * @param req
 * @param res
 * @param next
 */
exports.fetchProfile = function(req, res, next) {
    const user = ({
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        birthday: req.user.birthday,
        sex: req.user.sex,
        phone: req.user.phone,
        address: req.user.address,
        occupation: req.user.occupation,
        description: req.user.description,
    })

    res.send({ user: user })
}

/**
 * Update profile information
 * 
 * @param req
 * @param res
 * @param next
 */
exports.updateProfile = function(req, res, next) {
    const {
        firstName,
        lastName,
        birthday,
        sex,
        phone,
        address,
        occupation,
        description
    } = req.body

    const user = req.user

    Blog.updateMany(
        { authorId: user._id },
        { $set: { authorName: firstName + '' + lastName }},
        function(err) {
            if(err) next(err)
        }
    )

    Comment.updateMany(
        { authorId: user._id },
        { $set: { authorName: firstName + '' + lastName }},
        function(err) {
            if(err) next(err)
        }
    )

    User.findByIdAndUpdate(user._id, { $set: {
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        sex: sex,
        phone: phone,
        address: address,
        occupation: occupation,
        description: description,
    }}, { new: true }, function(err, updateUser) {
        if(err) {
            return next(err)
        }

        updateUser = updateUser.toObject()
        delete updateUser['_id']
        delete updateUser['password']
        delete updateUser['__v']

        res.send({ user: updateUser })
    })
}

/**
 * Reset password
 * 
 * @param req
 * @param res
 * @param next
 */
exports.resetPassword = function(req, res, next) {
    // Require auth
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    const user = req.user

    // Compare passwords - Does the user provide correct old password?
    user.comparePassword(oldPassword, function(err, isMatch) {        
        if (err) {
            return next(err)
        }
    
        if (!isMatch) {
            return res.status(422).send({ message: 'You old password is incorrect! Please try again.' })
        }
    
        if (oldPassword === newPassword) {
            return res.status(422).send({ message: 'Your new password must be different from your old password!' })
        }

        // Update password
        user.password = newPassword;

        // Save to DB
        user.save(function(err) {
            if (err) {
                return next(err)
            }

            // Respond user request indicating that the password was updated successfully
            res.json({ message: 'You have successfully updated your password.' })
        })
    }) 
}