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

  // If on mobile, show hamburger menu
  if (isMobile) {
    return (
      <>
        {/* Hamburger button */}
        <button 
          className={`mobile-hamburger ${mobileOpen ? 'mobile-close' : ''}`}
          onClick={toggleMobileSidebar}
        >
          <i className={`bi ${mobileOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
        </button>
        
        {/* Backdrop when sidebar is open */}
        {mobileOpen && (
          <div className="sidebar-backdrop" onClick={toggleMobileSidebar} />
        )}
        
        {/* Mobile sidebar */}
        <div 
          ref={sidebarRef}
          className={`cyber-sidebar ${mobileOpen ? 'mobile-open' : ''}`}
        >
          <SidebarHeader 
            collapsed={false} 
            onToggleCollapse={handleCollapseButtonClick} 
          />
          <SidebarMenu />
          <SidebarFooter />
        </div>
      </>
    );
  }

  // If on desktop, show normal sidebar
  if (collapsed) {
    return (
      <div className="cyber-sidebar collapsed">
        <SidebarHeader collapsed={collapsed} onToggleCollapse={handleCollapseButtonClick} />
        <div className="text-center mt-4">
          <button className="cyber-expand-btn" onClick={handleCollapseButtonClick}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        ref={sidebarRef}
        className={`cyber-sidebar ${isResizing ? 'resizing' : ''}`}
        style={{ width: `${width}px` }}
      >
        <SidebarHeader collapsed={collapsed} onToggleCollapse={handleCollapseButtonClick} />
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