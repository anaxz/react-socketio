// import express from 'express'; 
//make sure in package.json, don't use module type else will have to use import instead

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

// can we check if how many clients/players connected to socket

server.listen(3000, () => {
  console.log('listening on *:3000');
});

/**So far in index.js we’re calling res.send and passing it a string of HTML. 
 * Our code would look very confusing if we just placed our entire application’s HTML
 * there, so instead we're going to create a index.html file and serve that instead.
 * So let’s refactor our route handler to use sendFile instead.
 */

/**If you're hosting your app in a folder that is not the root of your website 
 * (e.g., https://example.com/chatapp) then you also need to specify the path in 
 * both the server and the client. */