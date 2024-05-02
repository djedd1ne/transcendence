import React, { useState } from 'react';
import Contacts from './Contacts';
import ChatWindow from './ChatWindow';
import ProfilePage from './ProfilePage';

const ChatBox = ({
  contacts, onChat, onBlock, onDelete, onViewProfile,
  activeChat, closeChat, activeProfile, closeProfile, socket
}) => {
  const [view, setView] = useState('contacts');

  const handleViewChange = (view) => setView(view);

  return (
    <div className="chat-box" style={{
      position: 'fixed', bottom: '0', right: '20px', width: '300px', height: '400px', backgroundColor: '#fff', transition: 'all 0.3s'
    }}>
      {view === 'contacts' && <Contacts contacts={contacts} onChat={() => handleViewChange('chat')} onViewProfile={() => handleViewChange('profile')} />}
      {view === 'chat' && activeChat && <ChatWindow contact={activeChat} onClose={() => { handleViewChange('contacts'); closeChat(); }} socket={socket} />}
      {view === 'profile' && activeProfile && <ProfilePage contact={activeProfile} onBack={() => { handleViewChange('contacts'); closeProfile(); }} />}
    </div>
  );
};

export default ChatBox;
