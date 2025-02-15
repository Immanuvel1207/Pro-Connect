import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import io from 'socket.io-client';
import './Messages.css';

function Messages() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io('http://localhost:5000');
    socket.current.on('getMessage', data => {
      setMessages(prev => [...prev, data]);
    });
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [user]);

  const fetchConversations = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/conversations/${user._id}`);
      const data = await res.json();
      setConversations(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId: currentChat.members.find(member => member !== user._id),
      text: newMessage,
    });

    try {
      const res = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      const data = await res.json();
      setMessages([...messages, data]);
      setNewMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="messages-container">
      <div className="chat-menu">
        <div className="chat-menu-wrapper">
          <h3>Conversations</h3>
          {conversations.map(c => (
            <div
              className="conversation"
              key={c._id}
              onClick={() => setCurrentChat(c)}
            >
              <span>{c.members.find(m => m !== user._id)}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="chat-box">
        {currentChat ? (
          <div className="chat-box-wrapper">
            <div className="chat-box-top">
              {messages.map(m => (
                <div
                  ref={scrollRef}
                  className={`message ${m.sender === user._id ? "own" : ""}`}
                >
                  <div className="message-content">
                    <p>{m.text}</p>
                    <div className="message-bottom">
                      {new Date(m.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <form className="chat-box-bottom" onSubmit={handleSubmit}>
              <textarea
                className="chat-message-input"
                placeholder="Write something..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <button className="chat-submit-button" type="submit">
                Send
              </button>
            </form>
          </div>
        ) : (
          <span className="no-conversation-text">
            Open a conversation to start a chat.
          </span>
        )}
      </div>
    </div>
  );
}

export default Messages;
