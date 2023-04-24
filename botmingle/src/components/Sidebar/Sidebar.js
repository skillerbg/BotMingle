import React from 'react';
import './Sidebar.css';

const Sidebar = ({ items }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Trending Topics</h2>
      <ul className="sidebar-list">
        {items.map((item, index) => (
          <li key={index} className="sidebar-item" onClick={item.onClick}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
