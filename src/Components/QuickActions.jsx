import React from 'react';
import { 
  FiPlus, 
  FiDownload, 
  FiRefreshCw, 
  FiTrash2,
  FiFilter,
  FiBell,
  FiSettings,
  FiBarChart2
} from 'react-icons/fi';
import '../style/QuickActions.css';

const QuickActions = ({ onAction, darkMode, hasSelectedCategory }) => {
  const actions = [
    {
      id: 'add-category',
      label: 'Add Category',
      icon: <FiPlus />,
      color: 'purple',
      disabled: false
    },
    {
      id: 'add-product',
      label: 'Add Product',
      icon: <FiPlus />,
      color: 'blue',
      disabled: !hasSelectedCategory
    },
    {
      id: 'export-data',
      label: 'Export Data',
      icon: <FiDownload />,
      color: 'green'
    },
    {
      id: 'generate-report',
      label: 'Generate Report',
      icon: <FiBarChart2 />,
      color: 'orange'
    },
    {
      id: 'clear-filters',
      label: 'Clear Filters',
      icon: <FiFilter />,
      color: 'indigo'
    },
    {
      id: 'clear-notifications',
      label: 'Clear Notifications',
      icon: <FiBell />,
      color: 'red'
    }
  ];

  return (
    <div className="quick-actions glass-card">
      <div className="actions-header">
        <h3 className="actions-title">Quick Actions</h3>
        <p className="actions-subtitle">Frequently used actions</p>
      </div>
      
      <div className="actions-grid">
        {actions.map(action => (
          <button
            key={action.id}
            className={`action-card ${action.color} ${action.disabled ? 'disabled' : ''}`}
            onClick={() => !action.disabled && onAction(action.id)}
            disabled={action.disabled}
            title={action.disabled ? 'Select a category first' : action.label}
          >
            <div className="action-icon">
              {action.icon}
            </div>
            <span className="action-label">{action.label}</span>
            {action.disabled && (
              <div className="action-lock">
                <FiSettings />
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="actions-footer">
        <button 
          className="refresh-btn modern-btn glass"
          onClick={() => onAction('refresh')}
        >
          <FiRefreshCw />
          <span>Refresh Data</span>
        </button>
        
        <button 
          className="clear-all-btn modern-btn glass"
          onClick={() => onAction('clear-all')}
        >
          <FiTrash2 />
          <span>Clear All Data</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;