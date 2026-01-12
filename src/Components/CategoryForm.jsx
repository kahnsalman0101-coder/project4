// Updated CategoryForm.js with image upload functionality
import React, { useState, useEffect, useRef } from 'react';
import { FiImage, FiX, FiUpload } from 'react-icons/fi';

const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    image: '/img/download (2).jfif', // Changed from string to File object
    color: '#4a6cf7',
    orderBy: 1
  });

  const [previewUrl, setPreviewUrl] = useState('');
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (category) {
      // If editing existing category
      setFormData({
        id: category.id || '',
        name: category.name || '',
        image: category.image || null,
        color: category.color || '#4a6cf7',
        orderBy: category.orderBy || 1
      });
      
      // Set preview if category has image (could be URL or base64)
      if (category.image) {
        if (typeof category.image === 'string' && category.image.startsWith('data:')) {
          setPreviewUrl(category.image);
        } else if (typeof category.image === 'string') {
          setPreviewUrl(category.image);
        }
      } else {
        setPreviewUrl('');
      }
    } else {
      // Reset for new category
      setFormData({
        id: '',
        name: '',
        image: null,
        color: '#4a6cf7',
        orderBy: 1
      });
      setPreviewUrl('');
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: name === 'orderBy' ? parseInt(value) || 1 : value
    };

    // Auto-generate ID from name when creating new category
    if (name === 'name' && !category) {
      const baseId = value.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      updatedData.id = baseId;
    }

    setFormData(updatedData);
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please select an image file' }));
        return;
      }
      
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size should be less than 2MB' }));
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      // Update form data
      setFormData(prev => ({ ...prev, image: file }));
      
      // Clear image error
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    setFormData(prev => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }
    
    if (!formData.id.trim()) {
      newErrors.id = 'Category ID is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Prepare data for submission
    const submitData = {
      ...formData,
      // If it's a File object, we'll keep it for upload
      // The parent component should handle the actual upload
      image: formData.image
    };
    
    onSubmit(submitData);
  };

  const colorOptions = [
    '#4a6cf7', '#10b981', '#f59e0b', '#ef4444', 
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
  ];

  return (
    <form onSubmit={handleSubmit} className="compact-form">
      <div className="form-group">
        <label htmlFor="name">Category Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter category name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="id">Category ID *</label>
        <input
          type="text"
          id="id"
          name="id"
          placeholder="Auto-generated from name"
          value={formData.id}
          onChange={handleChange}
          readOnly={!!category}
          className={errors.id ? 'error' : ''}
        />
        {errors.id && <span className="error-message">{errors.id}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="image">
          <FiImage />
          <span>Category Image</span>
        </label>
        <div className="image-upload-container">
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="file-input"
          />
          <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
            {previewUrl ? (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
                <button 
                  type="button" 
                  className="remove-image-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                >
                  <FiX />
                </button>
              </div>
            ) : (
              <div className="upload-placeholder">
                <FiUpload />
                <span>Click to upload image</span>
                <small>PNG, JPG up to 2MB</small>
              </div>
            )}
          </div>
          {errors.image && <span className="error-message">{errors.image}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Color</label>
        <div className="color-picker">
          <input
            type="color"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
          <div className="color-grid">
            {colorOptions.map(color => (
              <button
                key={color}
                type="button"
                className="color-option"
                style={{ backgroundColor: color }}
                onClick={() => setFormData(prev => ({ ...prev, color }))}
                aria-label={`Select color ${color}`}
              >
                {formData.color === color && (
                  <div className="color-check">✓</div>
                )}
              </button>
            ))}
          </div>
          <div 
            className="current-color"
            style={{ backgroundColor: formData.color }}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="orderBy">Order By</label>
        <input
          type="number"
          id="orderBy"
          name="orderBy"
          value={formData.orderBy}
          onChange={handleChange}
          min="1"
          step="1"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {category ? 'Update Category' : 'Create Category'}
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;