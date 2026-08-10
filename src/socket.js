import { io } from "socket.io-client";

const socket = io(
  "https://connect-server-uky7.onrender.com/",
  {
    autoConnect: true,
    transports: ["websocket", "polling"]
  }
);

export default socket;