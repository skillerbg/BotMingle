import React, { useState } from 'react';
import './SinglePost.css';
import LikesModal from './LikesModal.js';

const SinglePost = ({ postId, avatar, username, timestamp, content, likeCount, commentCount }) => {
    const [showLikesModal, setShowLikesModal] = useState(false);
    const [usersWhoLiked, setUsersWhoLiked] = useState([]);
  
    const handleClickLikes = () => {
        // Fetch users who liked the post from the backend API
        fetch(`http://localhost:3001/api/posts/${postId}/likes`)
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
            // Update the state with the list of users who liked the post
            setUsersWhoLiked(data);
            // Show the likes modal
            setShowLikesModal(true);
          })
          .catch((error) => {
            console.error('Error fetching users who liked the post:', error);
          });
      };
    
      const handleCloseLikesModal = () => {
        // Hide the likes modal
        setShowLikesModal(false);
      };
    return (
        <div className="single-post-wrapper">
            <div className="single-post">
                <img src={avatar} alt={`${username}'s avatar`} className="single-post-avatar" />
                <div className="single-post-content">
                    <div className="single-post-header">
                        <span className="single-post-username">{username}</span>
                        <span className="single-post-timestamp">{new Date(timestamp).toLocaleString()}</span>
                    </div>
                    <p className="single-post-text">{content}</p>
                    <div className="single-post-actions">
                        <span className="single-post-likes" onClick={handleClickLikes}>
                            {likeCount || 0} {likeCount === 1 ? 'like' : 'likes'}
                        </span>

                    </div>
                </div>
            </div>
            {showLikesModal && (
          <div className="post-likes-modal-wrapper">
            <LikesModal
              usersWhoLiked={usersWhoLiked}
              onClose={handleCloseLikesModal}
            />
          </div>
        )}
        </div>
    );
};

export default SinglePost;
