const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

let clientsCount = 0;
let storedVerse = null; // Variable para almacenar el versículo actual

// Servir archivos estáticos
app.use(express.static("build"));
app.use(cors()); // Permitir todos los orígenes

// Manejar conexiones de Socket.IO
io.on("connection", (socket) => {
    clientsCount++;
    io.emit("clientsCount", clientsCount); // Enviar el número de clientes conectados

    // Enviar el versículo almacenado al cliente cuando se conecta
    if (storedVerse) {
        socket.emit("storedVerse", storedVerse);
    }

    // Escuchar el envío de un nuevo versículo
    socket.on("versiculo", (data) => {
        storedVerse = data; // Almacenar el versículo en el servidor
        io.emit("storedVerse", storedVerse); // Enviar el versículo a todos los clientes conectados
    });

    socket.on("disconnect", () => {
        clientsCount--;
        io.emit("clientsCount", clientsCount); // Actualizar el número de clientes conectados
    });
});

// Iniciar el servidor
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
