import './App.css';
import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useWebSocket from './useWebSocket';
import axios from 'axios';
import Contacts from './Contacts';
import ChatWindow from './ChatWindow';
import ProfilePage from './ProfilePage';
import NotificationsComponent from './NotificationsComponent';
import { NotificationProvider } from './NotificationContext';
import ChatIcon from './ChatIcon';
import ChatBox from './ChatBox';
import DeleteContact from './DeleteContact';
import ConfirmationDialog from './ConfirmationDialog'
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { changeLanguage } from './languageSwitcher';
import languages from './languages';
import avatarUrl from './chat-avatar.png';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const urlParams = new URLSearchParams(window.location.search);
const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

// Backend URL
const url = 'http://localhost:8000';

function App() {
  const [contacts, setContacts] = useState([
    { id: '1', intra: 'sheali', name: 'Alice Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl},
    { id: '2', intra: 'sheali', name: 'Bob Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl},
    { id: '3', intra: 'sheali', name: 'Charlie Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl },
    { id: '4', intra: 'sheali', name: 'David Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl},
    { id: '5', intra: 'sheali', name: 'Eva Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl},
    { id: '6', intra: 'sheali', name: 'Fiona Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl},
    { id: '7', intra: 'sheali', name: 'George Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl },
    { id: '8', intra: 'sheali', name: 'Hannah Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl },
    { id: '9', intra: 'sheali', name: 'Ivan Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl},
    { id: '10',intra: 'sheali',  name: 'Julia Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl}
  ]);

  const userId = new URLSearchParams(window.location.search).get('user') || 'default-user-id';
  const socket = useWebSocket(url);

  useEffect(() => {
    if (socket) {
      socket.emit('join', { userId });
      socket.on('new-message', (message) => {
        setContacts((prevContacts) => {
          return prevContacts.map(contact => {
            if (contact.id === message.contactId) {
              return {
                ...contact,
                chatHistory: [...contact.chatHistory, message]
              };
            }
            return contact;
          });
        });
      });
    }
  }, [socket, userId]);

  const handleDeleteContact = contactId => {
    setContacts(currentContacts => currentContacts.filter(contact => contact.id !== contactId));
  };

  const [showChat, setShowChat] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);

  const toggleChat = () => setShowChat(!showChat);
  const handleChat = (contact) => {
    setActiveChat(contact);
    setShowChat(true);
  };

  const handleClose = () => {
    setShowChat(false);
  };

  const handleProfile = (contact) => {
    setActiveProfile(contact);
    setShowChat(true);
  };
  const closeProfile = () => setActiveProfile(null);

  return (
    <div className="app-container">
      <NotificationProvider>
        {!showChat && <ChatIcon toggleChat={toggleChat} />}
        {showChat && (
          <ChatBox
            contacts={contacts}
            onChat={handleChat}
            onBlock={(contact) => console.log('Block contact:', contact.name)}
            onDeleteConfirm={handleDeleteContact}
            onViewProfile={handleProfile}
            activeChat={activeChat}
            activeProfile={activeProfile}
            onClose={handleClose}
            closeProfile={closeProfile}
            socket={socket}
          />
        )}
        <NotificationsComponent />
      </NotificationProvider>
    </div>
  );
}
export default App;
