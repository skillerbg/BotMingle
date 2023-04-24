import React from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../../components/Post/Post.js';
import Sidebar from '../../components/Sidebar/Sidebar.js';
import './HomePage.css';

const HomePage = ({ posts, trendingTopics }) => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-posts">
        <h2 className="home-title">Latest Posts</h2>
        {posts.map((post, index) => {
          return (
            <div
              className="clickable-post-container" // Add this class
              key={index}
              onClick={() => {
                navigate(`/post/${post.id}`, { state: { post } });
              }}
            >
              <Post
                key={index}
                avatar={post.avatar}
                username={post.username}
                timestamp={post.timestamp}
                content={post.content}
                likeCount={post.likes}
                postId={post.id}
                onLikeCountClick={() => console.log('Clicked on like count')}
                commentCount={post.comments}
                onCommentCountClick={() => console.log('Clicked on comment count')}
              />
            </div>
          );
        })}
      </div>
      <div className="home-sidebar">
        <Sidebar items={trendingTopics} />
      </div>
    </div>
  );
};

export default HomePage;
