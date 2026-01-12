import React, { useState } from 'react';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiGrid,
  FiX,
  FiImage
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

  const handleEdit = (category) => {
    setEditingCategory(category);
    onShowFormChange(true);
  };

  const handleDelete = (categoryId) => {
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

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.id && category.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => a.orderBy - b.orderBy);

  return (
    <div className="category-section-compact glass-card">
      <div className="section-header-compact">
        <div className="header-left">
          <h2 className="section-title-compact">
            <FiGrid />
            <span>Categories Management</span>
            <span className="section-count">{categories.length}</span>
          </h2>
        </div>
        
        <div className="section-controls-compact">
         
          <button 
            className="modern-btn primary small"
            onClick={() => {
              setEditingCategory(null);
              onShowFormChange(true);
            }}
          >
            <FiPlus />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="compact-form-overlay">
          <div className="compact-form-container">
            <div className="compact-form-header">
              <h3>{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
              <button 
                className="close-btn"
                onClick={handleFormCancel}
              >
                <FiX />
              </button>
            </div>
            <CategoryForm
              category={editingCategory}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}

      <div className="categories-container">
        {sortedCategories.length > 0 ? (
          <div className="categories-grid">
            {sortedCategories.map(category => (
              <div 
                key={category.id}
                className={`category-card-compact ${selectedCategoryId === category.id ? 'selected' : ''}`}
                onClick={() => onSelectCategory(category.id)}
              >
                <div className="category-card-header">
                  <div 
                    className="category-color-indicator"
                    style={{ backgroundColor: category.color }}
                  />
                  <div className="category-actions">
                    <button 
                      className="action-btn edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(category);
                      }}
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(category.id);
                      }}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                
                {/* Category Image Display */}
                {category.image ? (
                  <div className="category-image-container">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="category-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.querySelector('.image-fallback').style.display = 'flex';
                      }}
                    />
                    <div className="image-fallback" style={{ display: 'none' }}>
                      <FiImage />
                    </div>
                  </div>
                ) : (
                  <div className="category-image-placeholder">
                    <FiImage />
                    <span>No Image</span>
                  </div>
                )}
                
                <div className="category-card-body">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-id">{category.id}</p>
                  <div className="category-meta">
                    <span className="meta-item">
                      Order: #{category.orderBy}
                    </span>
                    <span className="meta-item">
                      Products: {category.productCount || 0}
                    </span>
                  </div>
                </div>
                
                {selectedCategoryId === category.id && (
                  <div className="selection-indicator">
                    Selected
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state-compact">
            <div className="empty-icon">
              <FiGrid />
            </div>
            <h3>No Categories Yet</h3>
            <p>Start by creating your first category</p>
            <button 
              className="modern-btn primary"
              onClick={() => {
                setEditingCategory(null);
                onShowFormChange(true);
              }}
            >
              <FiPlus />
              <span>Create Category</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;