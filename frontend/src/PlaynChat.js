// App.js

import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { changeLanguage } from './languageSwitcher';
import languages from './languages';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const urlParams = new URLSearchParams(window.location.search);
const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const ChatMessage = ({ message, time, isUser }) => (
  <div className={`flex gap-5 ${isUser ? "self-end text-right" : ""} text-3xl text-black max-md:mt-10 max-md:flex-wrap`}>
    {!isUser && <img src="../img/chat-avatar.png" alt="User1 avatar" className="in-chat-user1-avatar" />}
    <div className={`${isUser ? "flex-auto" : "flex flex-col grow shrink-0 basis-0 w-fit"}`}>
      <div>{message}</div>
      {!isUser && <div className="mt-1.5 text-base text-neutral-400">{time}</div>}
    </div>
    {isUser && <img src="../img/chat-avatar.png" alt="User2 avatar" className="in-chat-user2-avatar" />}
  </div>
);

const ChatInput = () => (
  <div className="chat-input-section">
    <div className="chat-text-box">
      Chat message...
    </div>
      <img src="/path/to/send-icon.png" alt="Send message icon" className="send-chat-button" />
  </div>
);

const ChatMessages = () => {
  const messages = [
    { message: "Chat message...", time: "22:04 PM", isUser: false },
    { message: "Chat message...", time: "22:04 PM", isUser: true },
    { message: "Chat message...", time: "22:04 PM", isUser: false },
    { message: "Chat message...", time: "22:04 PM", isUser: false },
    { message: "Chat message...", time: "22:04 PM", isUser: true },
    { message: "Chat message...", time: "22:04 PM", isUser: false },
    { message: "Chat message...", time: "22:04 PM", isUser: true },
  ];

  return (
    <div className="flex flex-col px-3.5 mt-48 max-md:mt-10 max-md:max-w-full">
      {messages.map((msg, index) => (
        <React.Fragment key={index}>
          <ChatMessage {...msg} />
          {msg.isUser && <div className={`${msg.isUser ? "self-end" : ""} mr-14 text-base text-neutral-400 max-md:mr-2.5`}>{msg.time}</div>}
        </React.Fragment>
      ))}
      <ChatInput />
    </div>
  );
};

const ChatHeader = () => (
  <header className="chat-section-header">
    <img src="../img/chat-avatar.png" alt="Chat avatar" className="user-chat-avater" />
    <h2 className="chat-heading">Chat</h2>
    <button className="close-button my-auto text-white">x</button>
  </header>
);

const ScoreBoard = () => (
  <div className="scoreboard">
    <div className="player-1-score-box">
      Player 1: 0
    </div>
    <div className="player-2-score-box">
      Player 2: 0
    </div>
  </div>
);

function Playnchat() {
  return (
    <div className="body">
      <div className="game-and-chat-window">
        <main className="game-window">
          <section className="header-box">
            <h1 className="game-titel">
              PONG GAME
            </h1>
            <ScoreBoard />
          </section>
        </main>
        <aside className="chat-section">
          <div className="chat-window">
            <ChatHeader />
            <ChatMessages />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Playnchat;
