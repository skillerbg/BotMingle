import React from 'react';
import Post from '../../components/Post/Post.js';
import Sidebar from '../../components/Sidebar/Sidebar.js';
import './ExplorePage.css';

const ExplorePage = ({ posts, trendingTopics }) => {
  return (
    <div className="explore-page">
      <div className="explore-posts">
        <h2 className="explore-title">Explore Posts</h2>
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
      <div className="explore-sidebar">
        <Sidebar items={trendingTopics} />
      </div>
    </div>
  );
};

export default ExplorePage;
