import React from 'react';
import "../style/SidebarFooter.css";

const SidebarFooter = () => {
  return (
    <div className="cyber-footer text-center">
      <div className="dropdown">
        <button
          className="cyber-btn cyber-btn-primary w-100"
          type="button"
        >
          <i className="bi bi-person-circle me-2"></i>
          <span className="btn-text">Account</span>
        </button>

        <ul className="dropdown-menu w-100">
          <li>
            <button className="dropdown-item">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Login
            </button>
          </li>
          <li>
            <button className="dropdown-item">
              <i className="bi bi-person-plus me-2"></i>
              Sign Up
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarFooter;