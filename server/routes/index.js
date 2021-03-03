const auth = require('./authRoutes')
const user = require('./userRoutes')
const blog = require('./blogRoutes')

module.exports = function(app) {
    app.use('/api/auth', auth)
    app.use('/api/users', user)
    app.use('/api/blogs', blog)
}