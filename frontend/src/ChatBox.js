import React, { useState } from 'react';
import Contacts from './Contacts';
import ChatWindow from './ChatWindow';
import ProfilePage from './ProfilePage';
import Header from './Header';

const ChatBox = ({
  contacts, onBack, onClose, profilePic, socket
}) => {
  const [view, setView] = useState('contacts');
  const [activeChat, setActiveChat] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);

  const handleViewChange = (view) => setView(view);

  return (
    <div className="chat-box">
      {/* <Header
        // onBack={() => handleViewChange('contacts')}
        profilePic={profilePic}
        title="Game Chat"
        onClose={onClose}
      /> */}
      {view === 'contacts' && <Contacts contacts={contacts} onChat={(contact) => { setActiveChat(contact); handleViewChange('chat'); }} onViewProfile={(contact) => { setActiveProfile(contact); handleViewChange('profile'); }} />}
      {view === 'chat' && activeChat && <ChatWindow contact={activeChat} onClose={onClose} onBack={() => handleViewChange('contacts')} socket={socket} />}
      {view === 'profile' && activeProfile && <ProfilePage contact={activeProfile} onBack={() => handleViewChange('contacts')} />}
    </div>
  );
};

export default ChatBox;
