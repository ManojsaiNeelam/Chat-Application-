const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public")); // Serve front-end files

io.on("connection", (socket) => {
    console.log("New user connected");
    
    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on("chatMessage", ({ room, message }) => {
        io.to(room).emit("message", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
