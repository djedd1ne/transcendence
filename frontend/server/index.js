const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

let users = {};

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('join', ({ userId }) => {
    users[socket.id] = userId;
    console.log(`User ${userId} connected with ID: ${socket.id}`);
  });

  socket.on('send-message', (message) => {
    const { contactId, ...msg } = message;
    const recipientSocketId = Object.keys(users).find(key => users[key] === contactId);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('new-message', msg);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
    delete users[socket.id];
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
