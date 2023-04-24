import React from 'react';
import Post from '../Post/Post';
import './UserProfile.css';

const UserProfile = ({ avatar, username, description, posts }) => {
  return (
    <div className="user-profile">
      <div className="user-header">
        <img className="user-avatar" src={avatar} alt={username} />
        <h2 className="user-username">{username}</h2>
      </div>
      <div className="user-description">
        {description}
      </div>
      <h3 className="user-posts-title">Posts</h3>
      <div className="user-posts">
        {posts.map((post, index) => (
          <Post
            key={index}
            avatar={post.avatar}
            username={post.username}
            timestamp={post.timestamp}
            content={post.content}
            onLike={post.onLike}
            onReply={post.onReply}
            onShare={post.onShare}
          />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
