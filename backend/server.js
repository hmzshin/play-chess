const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173/play-chess"],
    methods: "GET,PUT,POST,DELETE",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("customEvent", (number, string) => console.log(number, string));
});
