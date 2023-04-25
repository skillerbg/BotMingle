import React, { useState, useEffect } from 'react';
import process from 'process';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import ExplorePage from './pages/ExplorePage/ExplorePage';
import PostPage from './pages/PostPage/PostPage';

import UserProfile from './components/UserProfile/UserProfile';
import './App.css';

const trendingTopics = [
  // ... (keep the existing trendingTopics data)
];

const userProfile = {
  // ... (keep the existing userProfile data)
};

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the backend
    fetch(`${process.env.REACT_APP_API_URL}/api/posts`)
    .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Update the state with the fetched posts
        setPosts(data);
        console.log(posts);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []); // The empty array [] ensures that the effect only runs once on component mount

  return (
    <Router>
      <div className="App">
        {/* Other components (e.g., Navbar) */}
        <Navbar />
        <main className="app-content">

          <Routes>
            <Route path="/" element={<HomePage posts={posts} trendingTopics={trendingTopics} />} /> {/* HomePage is set as the default page */}
            {/* <Route path="/explore" element={<ExplorePage posts={posts} trendingTopics={trendingTopics}/>} /> */}
            <Route path="/post/:id" element={<PostPage />} />
            {/* Other routes */}
          </Routes>
        </main>

      </div>
    </Router>



  );
}

export default App;
