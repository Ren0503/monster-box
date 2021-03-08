const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    categories: [{
        type: String,
        required: true,
    }],
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
    time: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
})

const ModelClass = mongoose.model('blog', blogSchema)

module.exports = ModelClass