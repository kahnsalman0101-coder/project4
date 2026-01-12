// New Component: BottomActions.js
import React from 'react';
import { 
  FiPlus, 
  FiEdit, 
  FiRefreshCw, 
  FiTrash2,
  FiSave,
  FiBox,
  FiTag
} from 'react-icons/fi';
import '../style/BottomActions.css';

const BottomActions = ({
  onAddProduct,
  onUpdateProduct,
  onAddCategory,
  onUpdateCategory,
  onRefresh,
  onClearAll,
  darkMode
}) => {
  return (
    <div className="bottom-actions-container">
      {/* First Row: Product Actions */}
      <div className="bottom-actions-row">
        <button 
          className="bottom-action-btn primary"
          onClick={onAddProduct}
        >
          <FiPlus />
          <FiBox />
          <span>Add Product</span>
        </button>
        
        <button 
          className="bottom-action-btn secondary"
          onClick={onUpdateProduct}
        >
          <FiEdit />
          <FiBox />
          <span>Update Product</span>
        </button>
      </div>
      
      {/* Second Row: Category Actions */}
      <div className="bottom-actions-row">
        <button 
          className="bottom-action-btn primary"
          onClick={onAddCategory}
        >
          <FiPlus />
          <FiTag />
          <span>Add Category</span>
        </button>
        
        <button 
          className="bottom-action-btn secondary"
          onClick={onUpdateCategory}
        >
          <FiEdit />
          <FiTag />
          <span>Update Category</span>
        </button>
      </div>
      
      {/* Additional Actions Row */}
      <div className="bottom-actions-row">
        <button 
          className="bottom-action-btn secondary"
          onClick={onRefresh}
        >
          <FiRefreshCw />
          <span>Refresh All</span>
        </button>
        
        <button 
          className="bottom-action-btn danger"
          onClick={onClearAll}
        >
          <FiTrash2 />
          <span>Clear All Data</span>
        </button>
      </div>
      
      {/* Save Actions Row */}
      <div className="bottom-actions-row">
        <button 
          className="bottom-action-btn primary"
          onClick={() => {
            onAddProduct();
            onAddCategory();
          }}
        >
          <FiSave />
          <span>Save All Changes</span>
        </button>
        
        <button 
          className="bottom-action-btn secondary"
          onClick={() => alert('Export all data')}
        >
          <FiSave />
          <span>Export All</span>
        </button>
      </div>
    </div>
  );
};

export default BottomActions;