import React, { useState } from 'react';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiGrid,
  FiX,
  FiImage,
  FiSearch,
  FiBox,
  FiDollarSign
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
  const [searchTerm, setSearchTerm] = useState('');

  // Mock dish counts for demo
  const categoryDishCounts = {
    'CAT001': 8,
    'CAT002': 12,
    'CAT003': 6,
    'CAT004': 10,
    'CAT005': 15,
    'CAT006': 9,
    'CAT007': 11,
    'CAT008': 7
  };

  const handleEdit = (category, e) => {
    e.stopPropagation();
    setEditingCategory(category);
    onShowFormChange(true);
  };

  const handleDelete = (categoryId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this category?')) {
      onDeleteCategory(categoryId);
    }
  };

  const handleFormSubmit = (data) => {
    const submitData = { ...data };
    
    if (data.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        submitData.image = reader.result;
        if (editingCategory) {
          onUpdateCategory(submitData);
        } else {
          onAddCategory(submitData);
        }
        setEditingCategory(null);
        onShowFormChange(false);
      };
      reader.readAsDataURL(data.image);
    } else {
      if (editingCategory) {
        onUpdateCategory(submitData);
      } else {
        onAddCategory(submitData);
      }
      setEditingCategory(null);
      onShowFormChange(false);
    }
  };

  const handleFormCancel = () => {
    setEditingCategory(null);
    onShowFormChange(false);
  };

  const handleAddClick = () => {
    setEditingCategory(null);
    onShowFormChange(true);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.id && category.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => a.orderBy - b.orderBy);

  return (
    <div className={`hotel-menu-section ${darkMode ? 'dark-mode' : ''}`}>
      {/* Header */}
      <div className="hotel-menu-header">
        <div className="header-left">
          <div className="hotel-menu-title">
            <FiGrid />
            <span>Categories</span>
            <span className="category-count">{categories.length}</span>
          </div>
        </div>
        
        <div className="hotel-menu-controls">
          <button 
            className="add-btn-plus" 
            onClick={handleAddClick}
            title="Add Category"
          >
            <FiPlus />
          </button>
        </div>
      </div>

      {/* Category Form Overlay */}
      {showForm && (
        <div className="compact-form-overlay">
          <div className="form-modal-compact">
            <div className="form-header-compact">
              <h3>{editingCategory ? 'Edit Category' : 'Add Category'}</h3>
              <button 
                className="add-btn-plus"
                onClick={handleFormCancel}
              >
                <FiX />
              </button>
            </div>
            <div className="form-content-compact">
              <CategoryForm
                category={editingCategory}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            </div>
          </div>
        </div>
      )}

      {/* Categories Grid - 4 per row */}
      <div className="hotel-categories-container">
        {sortedCategories.length > 0 ? (
          <div className="hotel-categories-grid">
            {sortedCategories.map(category => {
              const dishCount = categoryDishCounts[category.id] || category.dishCount || 0;
              const isSelected = selectedCategoryId === category.id;
              
              return (
                <div 
                  key={category.id}
                  className={`category-tile ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectCategory(category.id)}
                >
                  {/* Color Strip */}
                  <div 
                    className="category-color-strip" 
                    style={{ backgroundColor: category.color || '#667eea' }}
                  />
                  
                  {/* Selection Dot */}
                  {isSelected && (
                    <div className="selection-dot" />
                  )}
                  
                  {/* Image or Icon */}
                  <div className="category-image-container">
                    {category.image ? (
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="category-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.querySelector('.image-fallback').style.display = 'flex';
                        }}
                      />
                    ) : (
                      <div className="image-fallback">
                        <FiBox size={16} />
                      </div>
                    )}
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
                      onClick={(e) => handleEdit(category, e)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={(e) => handleDelete(category.id, e)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              );
            })}
            
            {/* Add More Tile - Only show if there's space */}
            {sortedCategories.length < 8 && (
              <div 
                className="category-tile add-more-tile"
                onClick={handleAddClick}
                title="Add Category"
              >
                <div className="add-tile-content">
                  <FiPlus size={20} />
                  <span>Add Category</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <FiGrid />
            </div>
            <h3>No Categories</h3>
            <p>Create categories like Salads, Biryani, Pulao, etc.</p>
            <button 
              className="add-first-btn"
              onClick={handleAddClick}
            >
              <FiPlus />
              Add First Category
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;