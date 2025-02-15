import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    // Fetch user's conversations
    const fetchConversations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/messages/conversations', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();

    // Listen for incoming messages
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && currentChat) {
      const messageData = {
        sender: localStorage.getItem('userId'),
        content: newMessage,
        conversationId: currentChat._id,
      };

      // Emit message to server
      socket.emit('send_message', messageData);

      // Add message to state
      setMessages([...messages, messageData]);
      setNewMessage('');

      // Save message to database
      try {
        await fetch('http://localhost:5000/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(messageData),
        });
      } catch (error) {
        console.error('Error saving message:', error);
      }
    }
  };

  const handleChatChange = async (conversation) => {
    setCurrentChat(conversation);
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${conversation._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <ListGroup>
            {conversations.map((c) => (
              <ListGroup.Item
                key={c._id}
                action
                onClick={() => handleChatChange(c)}
                active={currentChat && currentChat._id === c._id}
              >
                {c.participants.find(p => p._id !== localStorage.getItem('userId')).name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8}>
          <div className="chat-box">
            <div className="chat-messages">
              {messages.map((m, index) => (
                <div
                  key={index}
                  className={`message ${m.sender === localStorage.getItem('userId') ? 'sent' : 'received'}`}
                  ref={scrollRef}
                >
                  {m.content}
                </div>
              ))}
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-3">
                <Form.Control
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="mt-2">Send</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Messages;