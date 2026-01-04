import React from 'react';
import "../style/SidebarHeader.css";

const SidebarHeader = ({ collapsed, onToggleCollapse }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onToggleCollapse();
  };

  return (
    <div className="cyber-header">
      <div className={`d-flex ${collapsed ? 'justify-content-center' : 'justify-content-between'} align-items-center`}>
        {!collapsed && (
          <div className="cyber-logo">
            <div className="cyber-logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="cyber-logo-text">imagekit.io</span>
          </div>
        )}
        
        <button className="cyber-collapse-btn" onClick={handleClick}>
          <i className={`bi bi-${collapsed ? 'list' : 'chevron-left'}`}></i>
        </button>
      </div>
    </div>
  );
};

export default SidebarHeader;