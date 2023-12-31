require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const SocketServer = require('./socketServer')
const { ExpressPeerServer } = require('peer')
const path = require('path')


const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000", "https://dating-fe-livid.vercel.app"],
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
    credentials: true
}))
app.use(cookieParser())


// Socket
const port = process.env.PORT || 5000
const http = app.listen(port, () => {
    console.log('Server is running on port', port)
})
const io = require('socket.io')(http, {
    cors: {
        origins: "https://dating-fe-livid.vercel.app",
        credentials: true,
    }
})


io.on('connection', socket => {
    SocketServer(socket)
})

// Create peer server
ExpressPeerServer(http, { path: '/' })


// Routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/notifyRouter'))
app.use('/api', require('./routes/messageRouter'))
app.use('/api', require('./routes/datingRouter'))



const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to mongodb')
})

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'))
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
//     })
// }


