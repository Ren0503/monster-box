const express = require('express')
const path = require('path')
const http = require('http')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const morgan = require('morgan')
const app = express()
const router = require('./routes')
const mongoose = require('mongoose')
dotenv.config()

const { mongoUri } = require('./config/key')
// const cors = require('cors');  // we don't need it anymore, because we use proxy server instead

// DB Setup (connect mongoose and instance of mongodb)
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

// App Setup (morgan and body-parser are middleware in Express)
app.use(morgan('combined'))  // middleware for logging
app.use(bodyParser.json({ type: '*/*' }))  // middleware for helping parse incoming HTTP requests
// app.use(cors());  // middleware for circumventing (规避) cors error

// Router Setup
router(app)

app.use(express.static(path.join(__dirname, '/client/build')))

app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
)

// Server Setup
const port = process.env.PORT || 5000
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on: ', port)