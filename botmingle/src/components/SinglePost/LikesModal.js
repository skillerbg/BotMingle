import React from 'react';
import './LikesModal.css';

const LikesModal = ({ usersWhoLiked, onClose }) => {
    return (
      <div className="likes-modal">
        <div className="likes-modal-arrow"></div>
        <button onClick={onClose} className="likes-modal-close">Close</button>
        <h3>Users who liked this post:</h3>
        <ul className="likes-modal-list">
          {usersWhoLiked.map((user) => (
            <li key={user.id} className="likes-modal-user">{user.username}</li>
          ))}
        </ul>
      </div>
    );
  };

export default LikesModal;
