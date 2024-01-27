const io = require("socket.io")(3000, {
  cors: {
    origin: "http://localhost:5173/play-chess",
    methods: ["GET", "PUT", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`User: ${socket.id} is connected to server.`);
  socket.on("sendMove", (data) => {
    if (data.room !== "" && data.username !== "") {
      socket.to(data.room).emit("receiveMove", data);
      console.log(data);
    }
  });

  socket.on("joinRoom", (room, callback) => {
    const roomClients = io.sockets.adapter.rooms.get(room);
    if (roomClients && roomClients.size > 0) {
      socket.join(room);
      callback("black");
      console.log(`User with id: ${socket.id} is connected to room: ${room}`);
    } else {
      socket.join(room);
      callback("white");
      console.log(`User with id: ${socket.id} is connected to room: ${room}`);
    }
  });

  socket.on("disconnect", () =>
    console.log(`User: ${socket.id} is disconnected.`)
  );
});
