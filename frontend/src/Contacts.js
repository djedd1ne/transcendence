import React from 'react';

const Contacts = ({ contacts, onChat, onBlock, onDelete, onViewProfile }) => {
  return (
    <div>
      {contacts.map(contact => (
        <div key={contact.id} className="contact-item">
          <span className="contact-name">{contact.name}</span>
          <button className="options-button" onClick={(event) => {
              // Prevent multiple dropdowns from staying open
              document.querySelectorAll('.options-dropdown').forEach(dropdown => {
                if (dropdown !== event.currentTarget.nextElementSibling) {
                  dropdown.style.display = 'none';
                }
              });
              // Toggle dropdown visibility
              const dropdown = event.currentTarget.nextElementSibling;
              dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }}>Options</button>
          <div className="options-dropdown" style={{display: 'none'}}>
            <button onClick={() => onChat(contact)}>Chat</button>
            <button onClick={() => onBlock(contact)}>Block</button>
            <button onClick={() => onDelete(contact)}>Delete</button>
            <button onClick={() => onViewProfile(contact)}>View Profile</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;

// import React from 'react';
// import { BrowserRouter as Link } from 'react-router-dom';


// const Contacts = ({ contacts, onChat, onViewProfile }) => {
//   return (
//     <div>
//       {contacts.map(contact => (
//         <div key={contact.id} className="contact-item">
//           <span className="contact-name">{contact.name}</span>
//           <button className="options-button">Options</button>
//           <div className="options-dropdown">
//             <button onClick={() => onChat(contact)}>Chat</button>
//             <button onClick={() => onViewProfile(contact)}>
//               <Link to="/profile">View Profile</Link>
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Contacts;
