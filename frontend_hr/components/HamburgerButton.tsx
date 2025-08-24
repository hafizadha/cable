"use client";
import { useState } from "react";

export function HamburgerButton() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Dispatch custom event to communicate with Navigation component
    window.dispatchEvent(new CustomEvent('toggleSidebar', { detail: !isSidebarOpen }));
  };

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease',
        marginRight: '16px'
      }}
      onClick={toggleSidebar}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{
          width: '20px',
          height: '2px',
          backgroundColor: 'white',
          transition: '0.3s',
          transform: isSidebarOpen ? 'rotate(-45deg) translate(-4px, 4px)' : 'none'
        }}></div>
        <div style={{
          width: '20px',
          height: '2px',
          backgroundColor: 'white',
          transition: '0.3s',
          opacity: isSidebarOpen ? '0' : '1'
        }}></div>
        <div style={{
          width: '20px',
          height: '2px',
          backgroundColor: 'white',
          transition: '0.3s',
          transform: isSidebarOpen ? 'rotate(45deg) translate(-4px, -4px)' : 'none'
        }}></div>
      </div>
    </div>
  );
}
