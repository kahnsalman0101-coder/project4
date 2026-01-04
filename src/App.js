import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import RandomTextPage from './pages/RandomTextPage';
import './App.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(280); // Default expanded width

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Set sidebar width based on state
      if (mobile) {
        setSidebarWidth(0);
      } else if (sidebarCollapsed) {
        setSidebarWidth(70); // Collapsed width
      } else {
        setSidebarWidth(280); // Expanded width
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [sidebarCollapsed]);

  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="App">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggleCollapse={handleToggleCollapse} 
      />
      
      <div 
        className="main-content" 
        style={{ 
          marginLeft: isMobile ? '0' : `${sidebarWidth}px`,
          width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`
        }}
      >
        <RandomTextPage 
          sidebarOpen={!sidebarCollapsed} 
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

export default App;