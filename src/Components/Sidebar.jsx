import React, { useState, useRef, useEffect } from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarFooter from './SidebarFooter';
import '../style/Sidebar.css';

const Sidebar = ({ collapsed, onToggleCollapse }) => {
  const [width, setWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({
    media: false,
    cdn: false,
    devOptions: false
  });
  
  const sidebarRef = useRef(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  // Check screen size automatically
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Auto-close mobile sidebar when resizing to desktop
      if (!mobile && mobileOpen) {
        setMobileOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [mobileOpen]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && mobileOpen && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target) &&
          !event.target.closest('.mobile-hamburger')) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobile, mobileOpen]);

  const startResizing = (e) => {
    if (isMobile) return;
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const stopResizing = () => {
    setIsResizing(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  const resize = (e) => {
    if (isResizing && !isMobile) {
      const deltaX = e.clientX - startXRef.current;
      const newWidth = Math.max(200, Math.min(400, startWidthRef.current + deltaX));
      setWidth(newWidth);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => resize(e);
    const handleMouseUp = () => stopResizing();

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle collapse button click
  const handleCollapseButtonClick = () => {
    if (isMobile) {
      // On mobile, close the sidebar
      setMobileOpen(false);
    } else {
      // On desktop, toggle collapse state
      onToggleCollapse();
    }
  };

  // Toggle submenu expansion in collapsed view
  const toggleCollapsedSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  // Menu items from SidebarMenu component
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

  // If on mobile, show hamburger menu
  if (isMobile) {
    return (
      <>
        {/* Mobile hamburger button */}
        <button 
          className="mobile-hamburger"
          onClick={toggleMobileSidebar}
        >
          <i className="bi bi-list"></i>
        </button>
        
        {/* Backdrop when sidebar is open */}
        {mobileOpen && (
          <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />
        )}
        
        {/* Mobile sidebar */}
        <div 
          ref={sidebarRef}
          className={`cyber-sidebar ${mobileOpen ? 'mobile-open' : ''}`}
        >
          <SidebarHeader 
            collapsed={false} 
            onToggleCollapse={() => setMobileOpen(false)} 
          />
          <SidebarMenu />
          <SidebarFooter />
        </div>
      </>
    );
  }

  // If on desktop and collapsed, show mini sidebar with ONLY ICONS
  if (collapsed) {
    return (
      <div className="cyber-sidebar collapsed">
        <SidebarHeader 
          collapsed={collapsed} 
          onToggleCollapse={handleCollapseButtonClick} 
        />
        
        {/* Mini sidebar content with ONLY ICONS (no text labels) */}
        <div className="mini-sidebar-content">
          <div className="mini-menu">
            {menuItems.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                {/* Section separator for collapsed view - only shows first letter */}
                {section.category && (
                  <div className="mini-section-divider">
                    <span className="mini-section-label">{section.category.charAt(0)}</span>
                  </div>
                )}
                
                {section.items.map((item) => {
                  // Render parent item with ICON ONLY
                  return (
                    <React.Fragment key={item.id}>
                      <button 
                        className={`mini-menu-item ${item.type === 'parent' ? 'has-submenu' : ''} ${expandedMenus[item.id] ? 'expanded' : ''}`}
                        title={item.label} // Tooltip text on hover
                        onClick={() => {
                          if (item.type === 'parent') {
                            toggleCollapsedSubmenu(item.id);
                          } else {
                            console.log(`Clicked: ${item.label}`);
                          }
                        }}
                      >
                        <i className={`bi ${item.icon}`}></i>
                        {item.badge && (
                          <span className={`mini-badge ${item.badge.toLowerCase()}`}>{item.badge}</span>
                        )}
                        {item.type === 'parent' && (
                          <i 
                            className={`bi ${expandedMenus[item.id] ? 'bi-chevron-down' : 'bi-chevron-right'} mini-submenu-arrow`}
                          ></i>
                        )}
                      </button>
                      
                      {/* Render submenu items if parent is expanded - ICONS ONLY */}
                      {item.type === 'parent' && expandedMenus[item.id] && item.submenu && (
                        <div className="mini-submenu">
                          {item.submenu.map((subItem) => (
                            <button 
                              key={subItem.id}
                              className="mini-menu-item mini-submenu-item"
                              title={subItem.label} // Tooltip text on hover
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log(`Clicked: ${subItem.label}`);
                              }}
                            >
                              <i className={`bi ${subItem.icon}`}></i>
                            </button>
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop expanded view
  return (
    <>
      <div 
        ref={sidebarRef}
        className={`cyber-sidebar ${isResizing ? 'resizing' : ''}`}
        style={{ width: `${width}px` }}
      >
        <SidebarHeader 
          collapsed={collapsed} 
          onToggleCollapse={handleCollapseButtonClick} 
        />
        <SidebarMenu />
        <SidebarFooter />
        <div 
          className={`cyber-resizer ${isResizing ? 'resizing' : ''}`}
          onMouseDown={startResizing}
        />
      </div>
      {isResizing && <div className="resize-overlay" />}
    </>
  );
};

export default Sidebar;