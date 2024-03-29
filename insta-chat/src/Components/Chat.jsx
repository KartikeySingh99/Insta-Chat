import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import socketIO from "socket.io-client";
import { Link } from "react-router-dom";
// import { user } from "./Login";

let socket;
// const EndPoint = "http://localhost:8000";
const EndPoint = "https://instachat-u3gn.onrender.com";
const Chat = () => {
  const [id, setID] = useState(""); //*useState hook to set user id
  const [messages, setMessage] = useState([]); //*useState hook to set messages

  const text = useRef(null);

  // * --------------------Notification API--------------------
  // let permission = Notification.permission;

  // if (permission === "granted") {
  //   showNotification();
  // } else if (permission === "default") {
  //   requestAndShowPermission();
  // } else {
  //   alert("Use normal alert");
  // }

  // function requestAndShowPermission() {
  //   Notification.requestPermission(function (permission) {
  //     if (permission === "granted") {
  //       showNotification();
  //     }
  //   });
  // }
  // function showNotification(user) {
  //   //  if(document.visibilityState === "visible") {
  //   //      return;
  //   //  }
  //   let title = `${user} Has Sent You A Message!`;
  //   let icon = "https://homepages.cae.wisc.edu/~ece533/images/zelda.png"; //this is a large image may take more time to show notifiction, replace with small size icon
  //   let body = "Message to be displayed";

  //   let notification = new Notification(title, { body, icon });

  //   notification.onclick = () => {
  //     notification.close();
  //     window.parent.focus();
  //   };
  // }

  //* function to retrieve the message
  const sendMessage = () => {
    let message = text.current.value;

    if (message === "") {
      alert("Type Some Text!");
    } else {
      socket.emit("message", { message, id }); //*emitting message event to send message to server
      text.current.value = "";
    }
  };

  const redirect = () => {
    socket.emit("disconnect");
    // alert(`${user} has disconnected`)
    socket.off();
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    socket = socketIO(EndPoint, {
      transports: ["websocket"],
    });

    //*Receiving event when connection establishes
    socket.on("connect", () => {
      setID(socket.id);
      alert("Connected!");
    });

    //*sending event to the server to trigger when new user joins
    socket.emit("new-user-joined", user);

    //*receiving data about user back from server to store
    socket.on("user-joined", (data) => {
      // setMessage([...messages,data]);
      alert(`${data.user} ${data.message}`);
      // console.log(data.user, data.message);
    });

    //*defining event to trigger when user leaves the page
    socket.on("leave", (data) => {
      console.log("leave");
      // setMessage([...messages,data]);
      // console.log(data.user, data.message);
      alert(`${data.user} ${data.message}`);
    });
    return () => {
      // socket.emit("disconnect");
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    //*defining event for receiving messages
    socket.on("sendMessage", (data) => {
      setMessage([...messages, data]);
      // showNotification(data.user);
    });
  }, [messages]);

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="header">
            <div className="title">Insta Chat</div>
            <div className="close">
              <Link to="/" onClick={redirect}>
                <i className="bi bi-x"></i>
              </Link>
            </div>
          </div>
          <div className="chat-area">
            {messages.map((item, i) => (
              <Message
                key={i}
                user={item.id === id ? "" : item.user}
                text={item.message}
                classs={item.id === id ? "right" : "left"}
              />
            ))}
          </div>
          <div className="controls">
            <input
              type="text"
              placeholder="Type Your Message..."
              ref={text}
              onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
            />
            <button id="btn" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
