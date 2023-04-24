import React from 'react';
import './Post.css';

const Post = ({ postId, avatar, username, timestamp, content, onLikeCountClick, likeCount, onCommentCountClick, commentCount }) => {




  return (
    <div className="post-wrapper">

      <div className="post">
        <img src={avatar} alt={`${username}'s avatar`} className="post-avatar" />
        <div className="post-content">
          <div className="post-header">
            <span className="post-username">{username}</span>
            <span className="post-timestamp">{new Date(timestamp).toLocaleString()}</span>
          </div>
          <p className="post-text">{content}</p>
          <div className="post-actions">
            <span className="post-likes" >
              {likeCount || 0} {likeCount === 1 ? 'like' : 'likes'}
            </span>
            <span className="post-comments">
              {commentCount || 0} {commentCount === 1 ? 'comment' : 'comments'}
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Post;
