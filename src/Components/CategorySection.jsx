import React, { useState } from 'react';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiGrid,
  FiX,
  FiBox
} from 'react-icons/fi';
import CategoryForm from './CategoryForm';
import '../style/CategorySection.css';

const CategorySection = ({
  categories = [],
  selectedCategoryId,
  showForm,
  onSelectCategory,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onShowFormChange,
  darkMode
}) => {
  const [editingCategory, setEditingCategory] = useState(null);

  return (
    <div className={`hotel-menu-section ${darkMode ? 'dark-mode' : ''}`}>
      <div className="hotel-categories-container">
        {categories.length > 0 ? (
          <div className="hotel-categories-grid">
            {categories.map(category => {
              const dishCount = category.dishCount || 0;
              const isSelected = selectedCategoryId === category.id;
              
              return (
                <div 
                  key={category.id}
                  className={`category-tile ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectCategory(category.id)}
                >
                  {/* Color Strip at Top */}
                  <div 
                    className="category-color-strip" 
                    style={{ backgroundColor: category.color || '#667eea' }}
                  />
                  
                  {/* Selection Dot */}
                  {isSelected && (
                    <div className="selection-dot" />
                  )}
                  
                  {/* Color Circle - Replacing Image */}
                  <div className="category-color-circle-container">
                    <div 
                      className="category-color-circle"
                      style={{ backgroundColor: category.color || '#667eea' }}
                    />
                  </div>
                  
                  {/* Category Content */}
                  <div className="category-content">
                    <div className="category-name" title={category.name}>
                      {category.name}
                    </div>
                    <div className="category-count">
                      {dishCount} items
                    </div>
                  </div>
                  
                  {/* Hover Actions */}
                  <div className="category-actions">
                    <button 
                      className="action-btn edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCategory(category);
                        onShowFormChange(true);
                      }}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Are you sure you want to delete this category?')) {
                          onDeleteCategory(category.id);
                        }
                      }}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <FiGrid />
            </div>
            <h3>No Categories</h3>
            <p>Create your first category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;