require('dotenv').config();
const express = require('express');
const path = require('path');
const { createServer } = require("http");
const connectDB = require("./config/DBconnection.js");
const { Server } = require("socket.io");
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const indexRoutes = require('./routes/index.js');
const notFound = require('./middlewares/notFound.js');
const errorHandler = require('./middlewares/errorHandler.js');


const PORT = process.env.PORT || 8000;
const app = express();
const httpServer = createServer(app);


const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
  }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors('*'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(notFound);
app.use(errorHandler)

app.get('/', function(req, res){
  res.send('Server is listening ....')
})

app.use('/api', indexRoutes);

app.use(function(req, res, next) {
  next(createError(404));
});




io.on("connection", function (socket) {

  socket.on('setup', function(userData){
    socket.join(userData._id);
    socket.emit('connected');
  })

  socket.on('join-room',function(room){
    socket.join(room);
    console.log("Room joined")
  })

  socket.on('new-message', function(newMessageRecived){
    var chat = newMessageRecived.chat;
    if(!chat.users) return console.log("chat's users not defined");

    chat.users.forEach((user) => {
      if(user._id === newMEssageRecived.sender._id) return

      socket.in(user._id).emit("message-recived", newMessageRecived)
    })
  })


  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop_typing', (room) => socket.in(room).emit('stop_typing'))


  socket.off('setup', () => {
    console.log('USER DISCONNECTED');
    socket.leave(userData._id);
  })

  socket.on("disconnect", function(){
    console.log("User Disconnect")
  })
});




httpServer.listen(PORT, ()=> console.log('Server is Listening...'))