import React, { useState } from 'react';

const ChatWindow = ({ contact, onClose }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState(contact.chatHistory);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { message, time: new Date().toLocaleTimeString(), isUser: true };
      setChatHistory([...chatHistory, newMessage]);
      contact.chatHistory.push(newMessage); // Update the chat history in the contact object
      setMessage(''); // Clear input after sending
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        Chat with {contact.name}
        <button onClick={onClose}>Close</button>
      </div>
      <div className="chat-messages">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.isUser ? 'self-end' : ''}`}>
            <div>{msg.message}</div>
            <div className="message-time">{msg.time}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
