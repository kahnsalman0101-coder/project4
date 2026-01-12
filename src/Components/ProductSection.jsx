// Ultra-compact ProductSection.js with 70% max width - Simplified
import React, { useState } from 'react';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2,
  FiBox,
  FiGrid,
  FiList,
  FiImage,
  FiDollarSign,
  FiMoreVertical,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi';
import ProductForm from './ProductForm';
import '../style/ProductSection.css';

const ProductSection = ({
  products = [],
  selectedCategory,
  showForm,
  selectedCategoryId,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onShowFormChange,
  darkMode,
  activeTab,
  searchQuery,
  onSearchChange,
  onReorderProduct
}) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [expandedProduct, setExpandedProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
    onShowFormChange(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDeleteProduct(productId);
    }
  };

  const handleAddClick = () => {
    if (!selectedCategoryId) {
      alert('Please select a category first');
      return;
    }
    setEditingProduct(null);
    onShowFormChange(true);
  };

  const handleMoveUp = (product) => {
    onReorderProduct(product.id, 'up');
  };

  const handleMoveDown = (product) => {
    onReorderProduct(product.id, 'down');
  };

  const toggleExpand = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  const sortedProducts = [...products].sort((a, b) => a.orderBy - b.orderBy);

  return (
    <div className="product-section-ultra-compact">
      <div className="section-header-ultra-compact">
        <div className="header-left">
          <h2 className="section-title-ultra-compact">
            <FiBox className="section-icon" />
            <span>Products</span>
            <span className="section-count">{products.length}</span>
          </h2>
          
          {selectedCategory && (
            <div className="selected-category-badge-ultra">
              <span className="badge-label-ultra">
                Category:
              </span>
              <span className="badge-value-ultra">{selectedCategory.name}</span>
            </div>
          )}
        </div>
        
        <div className="section-controls-ultra-compact">
          <div className="view-toggle-container">
            <button 
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <FiGrid />
            </button>
            <button 
              className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <FiList />
            </button>
          </div>
          
       <button 
  className="add-btn-ultra" 
  onClick={handleAddClick}
  disabled={!selectedCategoryId}
  title={selectedCategoryId ? "Add Product" : "Select a category first"}
>
  <FiPlus />
  <span className="btn-text">Add Product</span>
</button>

        </div>
      </div>

      {showForm && (
        <div className="form-overlay-ultra">
          <div className="form-modal-ultra">
            <ProductForm
              product={editingProduct}
              selectedCategoryId={selectedCategoryId}
              onSubmit={(data) => {
                if (editingProduct) {
                  onUpdateProduct(data);
                } else {
                  onAddProduct(data);
                }
                onShowFormChange(false);
              }}
              onCancel={() => onShowFormChange(false)}
            />
          </div>
        </div>
      )}

      <div className={`products-container-ultra ${viewMode}`}>
        {products.length > 0 ? (
          viewMode === 'table' ? (
            <div className="ultra-table-wrapper">
              <table className="ultra-compact-table">
                <thead>
                  <tr>
                    <th className="col-image">Image</th>
                    <th className="col-name">Product Name</th>
                    <th className="col-price">Price</th>
                    <th className="col-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map((product, index) => (
                    <tr 
                      key={product.id} 
                      className={`
                        ${expandedProduct === product.id ? 'expanded' : ''}
                        ${index % 2 === 0 ? 'even' : 'odd'}
                      `}
                    >
                      <td className="td-image">
                        <div className="product-image-ultra">
                          {product.image ? (
                            <img src={product.image} alt={product.name} />
                          ) : (
                            <div className="image-placeholder-ultra">
                              <FiImage />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="td-name">
                        <div className="product-name-ultra">
                          <div className="name-text">{product.name}</div>
                        </div>
                      </td>
                      <td className="td-price">
                        <div className="price-display">
                          <span className="currency">$</span>
                          <span className="amount">{product.price.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="td-actions">
                        <div className="table-actions-ultra">
                          <button 
                            className="table-btn edit-btn"
                            onClick={() => handleEdit(product)}
                            title="Edit Product"
                          >
                           
                            <FiMoreVertical />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="ultra-products-grid">
              {sortedProducts.map(product => (
                <div 
                  key={product.id} 
                  className={`ultra-product-card ${expandedProduct === product.id ? 'expanded' : ''}`}
                >
                  {/* Product Image */}
                  <div className="ultra-card-image">
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <div className="ultra-image-placeholder">
                        <FiImage size={32} />
                      </div>
                    )}
                    
                    {/* Price Badge on Image */}
                    <div className="price-badge-overlay">
                      <FiDollarSign size={12} />
                      <span>{product.price.toFixed(2)}</span>
                    </div>
                    
                    
                  </div>
                  
                  {/* Product Name */}
                  <div className="ultra-card-content">
                    <h4 className="ultra-product-name">{product.name}</h4>
                    
                    {/* Reorder Controls */}
                    <div className="reorder-controls">
                     
                        
                     
                    </div>
                    
                    {/* Quick Price Display */}
                    <div className="quick-price-display">
                      <FiDollarSign size={14} />
                      <span className="price-value">{product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="ultra-empty-state">
            <div className="empty-icon-ultra">
              <FiBox size={48} />
            </div>
            {selectedCategoryId ? (
              <>
                <h3>No Products Found</h3>
                <p>Start by adding your first product to this category</p>
                <button 
                  className="ultra-add-btn"
                  onClick={handleAddClick}
                >
                  <FiPlus />
                  <span>Add First Product</span>
                </button>
              </>
            ) : (
              <>
                <h3>Select a Category</h3>
                <p>Choose a category from the sidebar to view or add products</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;