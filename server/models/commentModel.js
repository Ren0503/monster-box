const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    authorId: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    blogId: {
        type: String,
        required: true,
    },
    time: Date,
}, {
    timestamps: true
})

// Create the model class
const ModelClass = mongoose.model('comment', commentSchema)

// Export the model
module.exports = ModelClass