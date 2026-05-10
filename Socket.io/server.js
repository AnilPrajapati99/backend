import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

{
  // import { createServer } from "http";
  // import { Server } from "socket.io";
  // const htttpServer = createServer(app);
  // const io = new Server(htttpServer, {});
  // io.on("connection", (socket) => {
  //   console.log("New Connection created");
  //   socket.on("message", (msg) => {
  //     console.log("User Fired new Usre");
  //     console.log(msg);
  //     io.emit("abc");
  //   });
  // });
  // htttpServer.listen(3000, () => {
  //   console.log("Srever is Running");
  // });
}

const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("welcome", "welcome to the new user");
  socket.broadcast.emit("user-joined", "a new user joined");
  socket.on("message", (msg) => {
    console.log(`msg recieve ${msg}`);
    io.emit("abc", msg);
  });
});

httpServer.listen(3000, () => {
  console.log("server is Connected");
});
