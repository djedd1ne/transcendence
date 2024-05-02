import React from 'react';

const ProfilePage = ({ contact, onBack }) => {
  return (
    <div className="profile-page">
      <img src={contact.avatarUrl || 'default-avatar.png'} alt={`${contact.name}'s avatar`} className="profile-avatar"/>
      <h1>{contact.name}'s Profile</h1>
      <p>Last seen: {contact.lastSeen}</p>
      <p>Email: {contact.email}</p>  {/* Example additional info */}
      <button aria-label="Back to Contacts" onClick={onBack}>Back to Contacts</button>
    </div>
  );
};

export default ProfilePage;

