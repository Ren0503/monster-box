const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {
    timestamps: true,
})

// On Save Hook, encrypt the password
userSchema.pre('save', function (next) {  // before saving the model, run this funtion

    const user = this; // get access to the user model

    bcrypt.genSalt(10, function (err, salt) {  // generate a salt, then run callback

        if (err) {
            return next(err)
        }

        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {

            if (err) {
                return next(err)
            }

            // overwrite plain text password with encrypted password
            user.password = hash

            // go ahead and save the model
            next()
        })
    })
})

// userSchema.methods: Whenever we create a user object, it's going to have access to any functions that we define on this methods property
userSchema.methods.comparePassword = function (candidatePassword, callback) {  // used in LocalStrategy

    // candidatePassword will be encrypted internally in this function
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err)
        }
        callback(null, isMatch)
    })
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema)

// Export the model
module.exports = ModelClass