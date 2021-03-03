var express = require('express')
const router = express.Router()
const passport = require('passport')
const Blog = require('../controllers/blogController')
const passportService = require('../config/passport')

// middleware in between Incoming Request and Route Handler
const requireAuth = passport.authenticate('jwt', { session: false })

router.get('/', Blog.fetchBlogs)
router.post('/', requireAuth, Blog.createBlog)

router.get('/:id', Blog.fetchBlog)
router.get('/allow_edit_or_delete/:id', requireAuth, Blog.allowUpdateOrDelete)
router.put('/:id', requireAuth, Blog.updateBlog)
router.delete('/:id', requireAuth, Blog.deleteBlog)

router.get('/my/blogs', requireAuth, Blog.fetchBlogsByAuthorId)

router.get('/comments/:blogId', Blog.fetchCommentsByBlogId)
router.post('/comments/:blogId', requireAuth, Blog.createComment)

module.exports = router