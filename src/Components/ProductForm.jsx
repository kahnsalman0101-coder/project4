// src/components/ProductForm.js - With Image Upload
import React, { useState, useEffect, useRef } from 'react';
import '../style/ProductForm.css';
import { 
  FiBox, 
  FiPackage, 
  FiImage, 
  FiDollarSign,
  FiX,
  FiSave,
  FiUpload,
  FiCamera,
  FiTrash2,
  FiCheck
} from 'react-icons/fi';

const ProductForm = ({ product, selectedCategoryId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    categoryId: selectedCategoryId || '',
    name: '',
    image: '',
    price: 0,
    orderBy: 1
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [uploadMethod, setUploadMethod] = useState('url'); // 'url' or 'gallery'
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (product) {
      setFormData(product);
      if (product.image) {
        setImagePreview(product.image);
        // Check if image is base64 or URL
        if (product.image.startsWith('data:image')) {
          setUploadMethod('gallery');
        } else {
          setUploadMethod('url');
        }
      }
    } else {
      // Generate a simple ID for new product
      const newId = 'prod_' + Date.now().toString(36).substr(-6);
      setFormData({
        id: newId,
        categoryId: selectedCategoryId || '',
        name: '',
        image: '',
        price: 0,
        orderBy: 1
      });
    }
  }, [product, selectedCategoryId]);

  // Handle image upload from gallery
  const handleGalleryUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, GIF, etc.)');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const base64Image = e.target.result;
      setFormData(prev => ({ ...prev, image: base64Image }));
      setImagePreview(base64Image);
      setUploadMethod('gallery');
      setIsUploading(false);
    };
    
    reader.onerror = () => {
      alert('Error reading image file. Please try again.');
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
  };

  // Handle URL image upload
  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, image: value }));
    if (value) {
      setImagePreview(value);
      setUploadMethod('url');
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    setImagePreview('');
  };

  // Open gallery/file picker
  const handleOpenGallery = () => {
    fileInputRef.current.click();
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (formData.price < 0) {
      newErrors.price = 'Price must be positive';
    }
    
    if (formData.orderBy < 1) {
      newErrors.orderBy = 'Order must be at least 1';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'orderBy' || name === 'price' ? parseFloat(value) || 0 : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!formData.categoryId) {
      alert('Category is required');
      return;
    }
    
    onSubmit(formData);
  };

  // Switch between upload methods
  const switchToUrlUpload = () => {
    setUploadMethod('url');
    setImagePreview(formData.image || '');
  };

  const switchToGalleryUpload = () => {
    setUploadMethod('gallery');
    if (formData.image && !formData.image.startsWith('http')) {
      setImagePreview(formData.image);
    } else {
      setFormData(prev => ({ ...prev, image: '' }));
      setImagePreview('');
    }
  };

  return (
    <div className="product-form-container">
      <div className="form-header">
        <div className="form-title">
          <FiBox className="form-icon" />
          <h3>{product ? 'Edit Product' : 'Add New Product'}</h3>
        </div>
        <button className="close-btn" onClick={onCancel}>
          <FiX />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="product-form">
        {/* Product Name Field */}
        <div className="form-field-group">
          <div className="field-header">
            <label htmlFor="productName" className="field-label required">
              <FiPackage className="field-icon" />
              Product Name
            </label>
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>
          <input
            type="text"
            id="productName"
            name="name"
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload Field */}
        <div className="form-field-group">
          <div className="field-header">
            <label htmlFor="productImage" className="field-label">
              <FiImage className="field-icon" />
              Product Image
            </label>
            <span className="field-helper">Optional - Upload from gallery or enter URL</span>
          </div>

          {/* Upload Method Selector */}
          <div className="upload-method-selector">
            <button
              type="button"
              className={`method-btn ${uploadMethod === 'gallery' ? 'active' : ''}`}
              onClick={switchToGalleryUpload}
            >
              <FiCamera />
              <span>Gallery</span>
            </button>
            <button
              type="button"
              className={`method-btn ${uploadMethod === 'url' ? 'active' : ''}`}
              onClick={switchToUrlUpload}
            >
              <FiUpload />
              <span>URL</span>
            </button>
          </div>

          {/* Gallery Upload */}
          {uploadMethod === 'gallery' && (
            <div className="gallery-upload-section">
              <div className="gallery-upload-area" onClick={handleOpenGallery}>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="productImageFile"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  style={{ display: 'none' }}
                />
                {imagePreview ? (
                  <div className="selected-image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <div className="image-overlay">
                      <FiCamera size={24} />
                      <span>Click to change image</span>
                    </div>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <FiCamera size={32} />
                    <span>Click to upload from gallery</span>
                    <small>Supports JPG, PNG, GIF (max 5MB)</small>
                  </div>
                )}
              </div>
              
              {imagePreview && (
                <div className="image-actions">
                  <button type="button" className="image-action-btn remove-btn" onClick={handleRemoveImage}>
                    <FiTrash2 />
                    <span>Remove Image</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* URL Upload */}
          {uploadMethod === 'url' && (
            <div className="url-upload-section">
              <div className="url-input-group">
                <input
                  type="text"
                  id="productImageUrl"
                  name="image"
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={handleImageUrlChange}
                />
                <button 
                  type="button" 
                  className="test-url-btn"
                  onClick={() => {
                    if (formData.image) {
                      setImagePreview(formData.image);
                    }
                  }}
                  title="Test URL"
                >
                  <FiCheck />
                </button>
              </div>
              
              {formData.image && (
                <div className="image-actions">
                  <button type="button" className="image-action-btn remove-btn" onClick={handleRemoveImage}>
                    <FiTrash2 />
                    <span>Remove Image</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Image Preview */}
          {imagePreview && (
            <div className="image-preview-container">
              <h4 className="preview-title">Preview</h4>
              <div className="image-preview">
                <img src={imagePreview} alt="Product Preview" onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="preview-error">Image failed to load</div>';
                }} />
              </div>
            </div>
          )}

          {/* Upload Status */}
          {isUploading && (
            <div className="upload-status">
              <div className="upload-spinner"></div>
              <span>Uploading image...</span>
            </div>
          )}
        </div>

        {/* Price Field */}
        <div className="form-field-group">
          <div className="field-header">
            <label htmlFor="productPrice" className="field-label required">
              <FiDollarSign className="field-icon" />
              Price ($)
            </label>
            {errors.price && <span className="field-error">{errors.price}</span>}
          </div>
          <input
            type="number"
            id="productPrice"
            name="price"
            className={`form-input ${errors.price ? 'error' : ''}`}
            placeholder="0.00"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>

        {/* Hidden Fields */}
        <input
          type="hidden"
          name="id"
          value={formData.id}
          readOnly
        />
        <input
          type="hidden"
          name="categoryId"
          value={formData.categoryId}
          readOnly
        />
        <input
          type="hidden"
          name="orderBy"
          value={formData.orderBy}
          readOnly
        />

        {/* Form Actions */}
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-submit"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <div className="btn-spinner"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <FiSave />
                <span>{product ? 'Update Product' : 'Save Product'}</span>
              </>
            )}
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            <FiX />
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;