import { io } from "socket.io-client";

const socket = io(
  "https://connect-server-uky7.onrender.com",
  {
    transports: ["polling", "websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000
  }
);

export default socket