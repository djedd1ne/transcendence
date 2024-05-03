// App.js

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

// function App() {
//   const [currentUser, setCurrentUser] = useState();
//   const [registrationToggle, setRegistrationToggle] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [first_name, setFirstName] = useState('');
//   const [last_name, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || 'en');
//   const t = languages[currentLanguage];

//   useEffect(() => {
//     client.get("/api/test")
//     .then(function(res) {
//       setCurrentUser(true);
//     })
//     .catch(function(error) {
//       setCurrentUser(false);
//     });
//   }, []);

//   function update_form_btn() {
//     if (registrationToggle) {
//       document.getElementById("form_btn").innerHTML = t.register;
//       setRegistrationToggle(false);
//     } else {
//       document.getElementById("form_btn").innerHTML = t.login;
//       setRegistrationToggle(true);
//     }
//   }

//   function handleLanguageChange(lang) {
//     changeLanguage(lang); // Update localStorage
//     setCurrentLanguage(lang); // Update state
//   }

//   function submitRegistration(e) {
//     e.preventDefault();
//     client.post(
//       "/api/register",
//       {
//         username: username,
//         password: password,
//         email: email,
//         first_name: first_name,
//         last_name: last_name
//       }
//     ).then(function(res) {
//       client.post(
//         "/api/login",
//         {
//           username: username,
//           password: password
//         }
//       ).then(function(res) {
//         setCurrentUser(true);
//       });
//     });
//   }

//   function submit42Login(e) {
//     let uid="u-s4t2ud-17c3d06c29a63f052756d513ba06d6d98b92ee95cb7b6a9dd4e66465af2477ab"
//     let scope="public"
//     let url="https://api.intra.42.fr/oauth/authorize?client_id="+ uid +"&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000&response_type=code&scope=" + scope
//     window.open(url, "_self")
    
//     let code= urlParams.get("code");
//     client.post("/api/42token",
//       {
//         code: code
//       }
//     ).then(function(res) {
//       console.log(res)
//     });
//   }

//   function submitLogin(e) {
//     e.preventDefault();
//     client.post(
//       "/api/login",
//       {
//         username: username,
//         password: password
//       }
//     ).then(function(res) {
//       setCurrentUser(true);
//     });
//   }

//   function submitLogout(e) {
//     e.preventDefault();
//     client.get(
//       "/api/logout",
//     ).then(function(res) {
//       setCurrentUser(false);
//     });
//     setRegistrationToggle(false);
//   }

//   return (
//     <div>
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand>Authentication App</Navbar.Brand>
//           <Navbar.Toggle />
//           <Navbar.Collapse className="justify-content-end">
//             <Navbar.Text>
//               <Button id="form_btn" onClick={update_form_btn} className={registrationToggle ? "primary-button" : "secondary-button"}>
//                 {registrationToggle ? t.register : t.login}
//               </Button>
//             </Navbar.Text>
//           </Navbar.Collapse>
//         </Container>
//         <Nav className="mr-auto">
//           <NavDropdown title={t.language} id="language-dropdown">
//             <NavDropdown.Item onClick={() => handleLanguageChange('en')}>{t.english}</NavDropdown.Item>
//             <NavDropdown.Item onClick={() => handleLanguageChange('de')}>{t.german}</NavDropdown.Item>
//             <NavDropdown.Item onClick={() => handleLanguageChange('fr')}>{t.french}</NavDropdown.Item>
//           </NavDropdown>
//         </Nav>
//       </Navbar>
//       {registrationToggle ? (
//         <div className="center">
//           <h2>{t.registerHeader}</h2>
//           <Form onSubmit={submitRegistration}>
//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="formGridEmail">
//                 <Form.Label>{t.email}</Form.Label>
//                 <Form.Control type="email" placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)} />
//               </Form.Group>
//             </Row>
//             <Row className="mb-3">
//               <Col>
//                 <Form.Control placeholder={t.firstName} value={first_name} onChange={e => setFirstName(e.target.value)}/>
//               </Col>
//               <Col>
//                 <Form.Control placeholder={t.lastName} value={last_name} onChange={e => setLastName(e.target.value)}/>
//               </Col>
//             </Row>
//             <Form.Group className="mb-3" controlId="formGroupUsername">
//               <Form.Label>{t.username}</Form.Label>
//               <Form.Control type="text" placeholder={t.username} value={username} onChange={e => setUsername(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formGroupPassword">
//               <Form.Label>{t.password}</Form.Label>
//               <Form.Control type="password" placeholder={t.password} value={password} onChange={e => setPassword(e.target.value)} />
//             </Form.Group>
//             <Button variant="primary" type="submit" className="primary-button">
//               {t.registerButton}
//             </Button>
//           </Form>
//         </div>        
//       ) : (
//         <div className="center">
//           <h2>{t.loginHeader}</h2>
//           <Form onSubmit={submitLogin}>
//             <Form.Group className="mb-3" controlId="formGroupUsername">
//               <Form.Label>{t.username}</Form.Label>
//               <Form.Control type="text" placeholder={t.username} value={username} onChange={e => setUsername(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formGroupPassword">
//               <Form.Label>{t.password}</Form.Label>
//               <Form.Control type="password" placeholder={t.password} value={password} onChange={e => setPassword(e.target.value)} />
//             </Form.Group>
//             <Button variant="primary" type="submit" className="primary-button">
//               {t.loginButton}
//             </Button>
//           </Form>
//           <Form onSubmit={submit42Login}>
//             <Button variant="primary" type="submit" className="primary-button">
//               {t.login42}
//             </Button>
//           </Form>
//         </div>
//       )}
//     </div>
//   );
// }

function App() {
  const [contacts, setContacts] = useState([
    { id: 1, intra: 'sheali', name: 'Alice Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl},
    { id: 2, intra: 'sheali', name: 'Bob Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl},
    { id: 3, intra: 'sheali', name: 'Charlie Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl },
    { id: 4, intra: 'sheali', name: 'David Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl},
    { id: 5, intra: 'sheali', name: 'Eva Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl},
    { id: 6, intra: 'sheali', name: 'Fiona Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl},
    { id: 7, intra: 'sheali', name: 'George Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl },
    { id: 8, intra: 'sheali', name: 'Hannah Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl },
    { id: 9, intra: 'sheali', name: 'Ivan Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl},
    { id: 10,intra: 'sheali',  name: 'Julia Doe', blocked: false, chatHistory: [], profileViewed: false, avatarUrl: avatarUrl}
  ]);

  const socket = useWebSocket('ws:http://127.0.0.1:8000/ws');

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('New message:', message);
        // handle message based on its type
      };
    }
  }, [socket]);

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
    console.log("Closing chat box...");
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
