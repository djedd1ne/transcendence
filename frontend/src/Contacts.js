import React from 'react';
import DeleteContact from './DeleteContact';
import avatarUrl from './chat-avatar.png'

const Contacts = ({ contacts, onChat, onBlock, onViewProfile, onDelete }) => {
  return (
    <div>
      {contacts.map(contact => (
        <div key={contact.id} className="contact-item">
          <span className="contact-name">{contact.name}</span>
          <button className="options-button" onClick={(event) => {
//------------------------> Toggle dropdown visibility
              const dropdown = event.currentTarget.nextElementSibling;
              dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }}>Options</button>
          <div className="options-dropdown" style={{display: 'none'}}>
            <button onClick={() => onChat(contact)}>Chat</button>
            <button onClick={() => onBlock(contact)}>Block</button>
            <DeleteContact contact={contact} onDeleteConfirm={onDelete}>
              <button>Delete</button>
            </DeleteContact>
            <button onClick={() => onViewProfile(contact)}>View Profile</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
