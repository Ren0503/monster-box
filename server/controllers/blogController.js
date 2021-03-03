let _ = require('lodash')

const Blog = require('../models/blogModel')
const Comment = require('../models/commentModel')

/**
 * Get a list of blogs
 *
 * @param req
 * @param res
 * @param next
 */
exports.fetchBlogs = function (req, res, next) {
    Blog.find({})
        .select({})
        .limit(9)
        .sort({ time: -1 })
        .exec(function (err, blogs) {
            if (err) {
                console.log(err)
                return res.status(422).json({
                    message: 'Error! Could not retrieve blogs.'
                })
            }
            res.json(blogs)
        })
}

/**
 * Fetch a single blog by blog ID
 *
 * @param req
 * @param res
 * @param next
 */
exports.fetchBlog = function (req, res, next) {
    Blog.findById({
        _id: req.params.id
    }, function (err, blog) {
        if (err) {
            console.log(err)
            return res.status(422).json({
                message: 'Error! Could not retrieve the blog with the given blog ID.'
            })
        }

        if (!blog) {
            return res.status(404).json({
                message: 'Error! The blog with the given ID is not exist.'
            })
        }

        res.json(blog)
    })
}


/**
 * Create a new blog
 *
 * @param req
 * @param res
 * @param next
 */
exports.createBlog = function (req, res, next) {
    // Require auth
    const user = req.user


    const title = req.body.title
    const description = req.body.description
    const categories = req.body.categories
    const content = req.body.content
    const image = req.body.image
    const authorId = user._id
    const authorName = user.firstName + ' ' + user.lastName
    const time = Date.now()

    if (!title || !categories || !description || !content || !image) {
        return res.status(422).json({
            message: 'Title, categories and content are all required.'
        })
    }

    // Create a new blog 
    const blog = new Blog({
        title: title,
        description: description,
        categories: _.uniq(categories.split(',').map((item) => item.trim())),  // remove leading and trailing spaces, remove duplicate categories
        content: content,
        image: image,
        authorId: authorId,
        authorName: authorName,
        time: time,
    })

    blog.save(function (err, blog) {
        if (err) {
            return next(err)
        }

        res.json(blog)
    })
}


/**
 * Check if current blog can be updated or deleted by the authenticated user: The author can only make change to his/her own blogs
 *
 * @param req
 * @param res
 * @param next
 */
exports.allowUpdateOrDelete = function (req, res, next) {
    // Require auth
    const user = req.user

    // Find the blog by blog ID
    Blog.findById({
        _id: req.params.id
    }, function (err, blog) {

        if (err) {
            console.log(err)
            return res.status(422).json({
                message: 'Error! Could not retrieve the blog with the given blog ID.'
            })
        }

        // Check if the blog exist
        if (!blog) {
            return res.status(404).json({
                message: 'Error! The blog with the given ID is not exist.'
            })
        }

        console.log(user._id)
        console.log(blog.authorId)

        // Check if the user ID is equal to the author ID
        if (!user._id.equals(blog.authorId)) {
            return res.send({ allowChange: false })
        }
        res.send({ allowChange: true })
    })
}

/**
 * Edit/Update a blog
 *
 * @param req
 * @param res
 * @param next
 */
exports.updateBlog = function (req, res, next) {
    // Require auth
    const user = req.user

    // Find the blog by blog ID
    Blog.findById({
        _id: req.params.id
    }, function (err, blog) {

        if (err) {
            console.log(err)
            return res.status(422).json({
                message: 'Error! Could not retrieve the blog with the given blog ID.'
            })
        }

        // Check if the blog exist
        if (!blog) {
            return res.status(404).json({
                message: 'Error! The blog with the given ID is not exist.'
            })
        }

        // Make sure the user ID is equal to the author ID (Cause only the author can edit the blog)
        // console.log(user._id);
        // console.log(blog.authorId);
        if (!user._id.equals(blog.authorId)) {
            return res.status(422).json({
                message: 'Error! You have no authority to modify this blog.'
            })
        }

        // Make sure title, categories and content are not empty
        const title = req.body.title
        const description = req.body.description
        const categories = req.body.categories
        const content = req.body.content
        const image = req.body.image

        if (!title || !categories || !content || !description || !image) {
            return res.status(422).json({
                message: 'Title, categories and content are all required.'
            })
        }

        // Update user
        blog.title = title
        blog.description = description
        blog.categories = _.uniq(categories.split(',').map((item) => item.trim()))  // remove leading and trailing spaces, remove duplicate categories
        blog.content = content
        blog.image = image

        // Save user
        blog.save(function (err, blog) {  // callback function
            if (err) {
                return next(err)
            }
            res.json(blog)  // return the updated blog
        })
    })
}

/**
 * Delete a blog by blog ID
 *
 * @param req
 * @param res
 * @param next
 */
exports.deleteBlog = function (req, res, next) {
    // Require auth

    // Delete the blog
    Blog.findByIdAndRemove(req.params.id, function (err, blog) {
        if (err) {
            return next(err)
        }
        if (!blog) {
            return res.status(422).json({
                message: 'Error! The blog with the given ID is not exist.'
            })
        }

        // Delete comments correspond to this blog
        Comment.remove({ blogId: blog._id }, function (err) {
            if (err) {
                return next(err)
            }
        })

        // Return a success message
        res.json({
            message: 'The blog has been deleted successfully!'
        })
    })
}

/**
 * Fetch blogs by author ID
 *
 * @param req
 * @param res
 * @param next
 */
exports.fetchBlogsByAuthorId = function (req, res, next) {
    // Require auth
    const user = req.user

    if (!user) {
        return res.status(422).json({
            message: 'You must sign in before you can blog new comment.'
        })
    }

    // Fetch posts by author ID
    Blog
        .find({
            authorId: user._id,
        })
        .populate(' ')
        .limit(100)
        .sort({
            time: -1
        })
        .exec(function (err, blogs) {
            if (err) {
                console.log(err)
                return res.status(422).json({
                    message: 'Error! Could not retrieve posts.'
                })
            }
            res.json(blogs)
        })
}

/**
 * Create a new comment (blog ID and user ID are both needed)
 *
 * @param req
 * @param res
 * @param next
 */
exports.createComment = function (req, res, next) {
    // Require auth
    const user = req.user

    if (!user) {
        return res.status(422).json({
            message: 'You must sign in before you can blog new comment.'
        })
    }

    // Get blog ID
    const blogId = req.params.blogId

    // Get content and make sure it is not empty
    const content = req.body.content
    if (!content) {
        return res.status(422).json({
            message: 'Comment cannot be empty.'
        })
    }

    // Create a new comment
    const comment = new Comment({
        content: content,
        authorId: user._id,
        authorName: user.firstName + ' ' + user.lastName,
        blogId: blogId,
        time: Date.now(),
    })

    // Save the comment
    comment.save(function (err, comment) {  // callback function
        if (err) {
            return next(err)
        }
        res.json(comment)  // return the created comment
    })
}

/**
 * Fetch comments for a specific blog blog (blog ID is needed)
 *
 * @param req
 * @param res
 * @param next
 */
exports.fetchCommentsByBlogId = function (req, res, next) {
    Comment
        .find({
            blogId: req.params.blogId
        })
        .select({})
        .limit(9)
        .sort({ time: 1 })
        .exec(function (err, comments) {
            if (err) {
                console.log(err)
                return res.status(422).json({
                    message: 'Error! Could not retrieve comments.'
                })
            }
            res.json(comments)
        })
}