const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 8080 || process.env.PORT

const app = express()

// our server instance
const server = http.createServer(app)

server.listen(port, () => console.log(`Listening on port ${port}`))

const io = socketIO(server)

io.on('connection', socket => {
    socket.on('liveChatMessage', (msg) => {
        io.sockets.emit('liveChatMessage', msg)
    })

    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {
        socket.removeAllListeners('liveChatMessage')
    })
})
