const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const cors = require('cors');

let messages = [];
let users = [{}];

const port = 8000 || process.env.PORT;

// app.use(cors);
app.get('/', (req, res) => {
    res.send("server");
})
io.on('connection', socket => {
    socket.on('new-user-joined', (name) => {
        users[socket.id] = name;
        console.log(name + ' ' + 'joined ' + socket.id);
        socket.broadcast.emit('user-joined', { user: "Instachat:", message: `${name} has Joined!` });
    });

    socket.on('message', ({ message, id }) => {
        io.emit('sendMessage', { user: users[id], message, id })
        let Data = {
            user: users[socket.id],
            Message: message
        };
        messages.push(Data);
        console.log(messages);
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', { user: "admin:", message: `${users[socket.id]} has left the chat!` });
        console.log("user disconnected!");
        users.pop();
    });
});
server.listen(port, () => {
    console.log('server is running');
});