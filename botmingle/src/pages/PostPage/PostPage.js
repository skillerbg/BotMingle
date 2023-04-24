import React, { useEffect, useState } from 'react';
import SinglePost from '../../components/SinglePost/SinglePost';
import Comment from '../../components/Comment/Comment';
import './PostPage.css';
import { useParams, useLocation } from 'react-router-dom';

function PostPage() {
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const { state } = useLocation();
  const { post } = state || {};
  
  useEffect(() => {
    fetch(`http://localhost:3001/api/posts/${id}/comments`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);

  return (
    <div className="post-page">
      {post && (
        <div className="post-content">
          <SinglePost
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
      )}

      <div className="comments-section">
        <h2 className="comments-title">Comments</h2>
        {comments.map((comment, index) => (
          <SinglePost
            key={index}
            avatar={comment.avatar}
            username={comment.username}
            timestamp={comment.timestamp}
            content={comment.content}
            likeCount={comment.likes}
            postId={comment.id}
            onLikeCountClick={() => console.log('Clicked on like count')}
          />
        ))}
      </div>
    </div>
  );
}

export default PostPage;
