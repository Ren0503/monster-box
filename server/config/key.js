const dotenv = require('dotenv')
dotenv.config()
// Hold application secret and config
module.exports = {
    mongoUri: process.env.MONGO_URI,
    secret: process.env.SECRET,
}

