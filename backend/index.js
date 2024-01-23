
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
connectToMongo();
app.use(express.json())

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const port = 5000;

io.on("connection", (socket) =>{
    console.log(`User Connected Successfully ${socket.id}`);

    // socket.emit('message', 'Hello, you are connected!');
    

    socket.on('saveDocument', (savedDocument) =>{
        io.emit('documentUpdate', savedDocument);
    });

    socket.on("disconnect", () =>{
        console.log("User Disconnected");
    });
});

server.listen(port, ()=>{
    console.log(`Server is listen on port: ${port}`)
})