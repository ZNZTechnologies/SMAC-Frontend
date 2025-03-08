// socket.js
import io from "socket.io-client";

/**
 * Initializes and returns the socket instance.
 * Ensures that the socket is initialized only once.
 */
let socket;
let userToken = null;
function getSocket(loginToken) {
  if (!socket) {
    // ////console.log("check socket instance");
    if (loginToken) {
      userToken = loginToken;
    } else {
      const rawToken = localStorage.getItem("persist:root");
      // Retrieve token from localStorage or other secure storage
      const parsedToken = JSON.parse(JSON.parse(rawToken)?.user);
      userToken = parsedToken?.token;
      ////console.log(userToken, "from");
    }

    try {
      if (userToken) {
        return (socket = io("ws://52.205.44.122:5000/", {
          // return (socket = io(`wss://www.smacltd.com`, {
          withCredentials: true, // Ensures cookies are sent with requests
          transports: ["websocket"], // Use WebSocket transport
          reconnection: true, // Enable reconnection logic
          auth: {
            token: userToken,
          },
        }).connect());
      } else {
        ////console.log("no data from localstorage");
      }
    } catch (error) {
      console.error("Error parsing token:", error);
    }

    // Optional logging for debugging
    // socket.on("connect", () => ////console.log("Socket connected"));
    // socket.on("notifyMessage", (message) => {
    //
    // });

    // socket.on("disconnect", () => socket.disconnect());
  } else {
    return socket;
  }
}

export default getSocket;
