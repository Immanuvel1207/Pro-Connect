import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", message);
    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <div className="container">
      <h4>Chat</h4>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button className="btn btn-primary" onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
