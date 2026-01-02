import React, { useState } from 'react';
import "../style/SidebarMenu.css";

const SidebarMenu = () => {
  const [activeItem, setActiveItem] = useState('get-started');
  const [expandedMenus, setExpandedMenus] = useState({
    media: true, // Media library expanded by default
    cdn: false,
    devOptions: false
  });

  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const menuItems = [
    {
      category: null,
      items: [
        { 
          id: 'get-started', 
          label: 'Get Started', 
          icon: 'bi-rocket-takeoff-fill', 
          badge: 'NEW',
          type: 'simple'
        },
        { 
          id: 'media', 
          label: 'Media Library', 
          icon: 'bi-images', 
          badge: null,
          type: 'parent',
          submenu: [
            { id: 'gallery', label: 'Image Gallery', icon: 'bi-collection' },
            { id: 'videos', label: 'Video Library', icon: 'bi-film' },
            { id: 'documents', label: 'Documents', icon: 'bi-file-earmark-text' }
          ]
        },
        { 
          id: 'analytics', 
          label: 'Usage Analytics', 
          icon: 'bi-bar-chart-line', 
          badge: null,
          type: 'simple'
        },
        { 
          id: 'cache', 
          label: 'Purge Cache', 
          icon: 'bi-lightning-charge-fill', 
          badge: 'HOT',
          type: 'simple'
        },
      ]
    },
    {
      category: 'CONFIGURATION',
      items: [
        { 
          id: 'storage', 
          label: 'External Storage', 
          icon: 'bi-hdd-fill', 
          badge: null,
          type: 'simple'
        },
        { 
          id: 'cdn', 
          label: 'CDN Endpoints', 
          icon: 'bi-globe2', 
          badge: null,
          type: 'parent',
          submenu: [
            { id: 'cdn-primary', label: 'Primary Edge', icon: 'bi-hdd-network' },
            { id: 'cdn-backup', label: 'Backup Nodes', icon: 'bi-hdd-stack' }
          ]
        },
        { 
          id: 'settings', 
          label: 'Settings', 
          icon: 'bi-gear-fill', 
          badge: null,
          type: 'simple'
        },
      ]
    },
    {
      category: 'DEVELOPER',
      items: [
        { 
          id: 'performance', 
          label: 'Performance Center', 
          icon: 'bi-graph-up-arrow', 
          badge: null,
          type: 'simple'
        },
        { 
          id: 'dev-options', 
          label: 'Developer Options', 
          icon: 'bi-code-slash', 
          badge: null,
          type: 'parent',
          submenu: [
            { id: 'api-keys', label: 'API Keys', icon: 'bi-key' },
            { id: 'webhooks', label: 'Webhooks', icon: 'bi-link-45deg' },
            { id: 'logs', label: 'Access Logs', icon: 'bi-journal-text' }
          ]
        },
        { 
          id: 'upgrade', 
          label: 'Upgrade Plan', 
          icon: 'bi-rocket-fill', 
          badge: 'PRO',
          type: 'simple'
        },
      ]
    }
  ];

  const handleItemClick = (itemId, itemType) => {
    setActiveItem(itemId);
    if (itemType === 'parent') {
      toggleSubmenu(itemId);
    }
  };

  const handleSubItemClick = (itemId, parentId, e) => {
    e.stopPropagation();
    setActiveItem(itemId);
  };

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
                <React.Fragment key={item.id}>
                  <li
                    className={`cyber-menu-item ${activeItem === item.id || item.submenu?.some(sub => sub.id === activeItem) ? 'active' : ''} ${item.type === 'parent' ? 'has-submenu' : ''}`}
                    onClick={() => handleItemClick(item.id, item.type)}
                  >
                    <div className="menu-item-content">
                      <i className={`bi ${item.icon} menu-icon`}></i>
                      <span className="menu-label">{item.label}</span>
                      {item.badge && (
                        <span className={`menu-badge ${item.badge.toLowerCase()}`}>
                          {item.badge}
                        </span>
                      )}
                      {item.type === 'parent' && (
                        <i 
                          className={`bi ${expandedMenus[item.id] ? 'bi-chevron-down' : 'bi-chevron-right'} submenu-arrow`}
                        ></i>
                      )}
                    </div>
                  </li>
                  
                  {item.type === 'parent' && expandedMenus[item.id] && (
                    <div className="submenu-container">
                      {item.submenu.map((subItem) => (
                        <div
                          key={subItem.id}
                          className={`submenu-item ${activeItem === subItem.id ? 'active' : ''}`}
                          onClick={(e) => handleSubItemClick(subItem.id, item.id, e)}
                        >
                          <i className={`bi ${subItem.icon} submenu-icon`}></i>
                          <span className="submenu-label">{subItem.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SidebarMenu;