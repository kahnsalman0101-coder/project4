import React, { useState } from 'react';
import "../style/SidebarMenu.css";

const SidebarMenu = () => {
  const [activeItem, setActiveItem] = useState('get-started');

  const menuItems = [
    {
      category: null,
      items: [
        { id: 'get-started', label: 'Get Started', icon: 'bi-rocket-takeoff-fill', badge: 'NEW' },
        { id: 'media', label: 'Media Library', icon: 'bi-images', badge: null },
        { id: 'analytics', label: 'Usage Analytics', icon: 'bi-bar-chart-line', badge: null },
        { id: 'cache', label: 'Purge Cache', icon: 'bi-lightning-charge-fill', badge: 'HOT' },
      ]
    },
    {
      category: 'CONFIGURATION',
      items: [
        { id: 'storage', label: 'External Storage', icon: 'bi-hdd-fill', badge: null },
        { id: 'cdn', label: 'CDN Endpoints', icon: 'bi-globe2', badge: null },
        { id: 'settings', label: 'Settings', icon: 'bi-gear-fill', badge: null },
      ]
    },
    {
      category: 'DEVELOPER',
      items: [
        { id: 'performance', label: 'Performance Center', icon: 'bi-graph-up-arrow', badge: null },
        { id: 'dev-options', label: 'Developer Options', icon: 'bi-code-slash', badge: null },
        { id: 'upgrade', label: 'Upgrade Plan', icon: 'bi-rocket-fill', badge: 'PRO' },
      ]
    }
  ];

  return (
    <div className="cyber-menu">
      <nav>
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="menu-section">
            {section.category && (
              <div className="cyber-category">
                <span className="category-label">{section.category}</span>
                <div className="category-line"></div>
              </div>
            )}
            <ul className="menu-list">
              {section.items.map((item) => (
                <li
                  key={item.id}
                  className={`cyber-menu-item ${activeItem === item.id ? 'active' : ''}`}
                  onClick={() => setActiveItem(item.id)}
                >
                  <div className="menu-item-content">
                    <i className={`bi ${item.icon} menu-icon`}></i>
                    <span className="menu-label">{item.label}</span>
                    {item.badge && (
                      <span className={`menu-badge ${item.badge.toLowerCase()}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SidebarMenu;