import React, { useState } from 'react';
import { 
  FiPlus, 
  FiBox,
  FiEdit2,
  FiTrash2,
  FiShoppingCart,
  FiImage,
  FiSearch,
  FiFilter,
  FiStar,
  FiGrid,
  FiList
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
  onAddToCart,
  onShowFormChange,
  darkMode,
  searchQuery = '',
  onSearchChange,
  activeTab = 'all',
  onTabChange
}) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');

  const handleAddClick = () => {
    if (!selectedCategoryId) {
      alert('Please select a category first');
      return;
    }
    setEditingProduct(null);
    onShowFormChange(true);
  };

  const handleAddToCartClick = (product, e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleEditClick = (product, e) => {
    e.stopPropagation();
    setEditingProduct(product);
    onShowFormChange(true);
  };

  const handleDeleteClick = (product, e) => {
    e.stopPropagation();
    if (window.confirm(`Delete ${product.name}?`)) {
      onDeleteProduct(product.id);
    }
  };

  const getSortedProducts = () => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'quantity':
          return b.quantity - a.quantity;
        default:
          return 0;
      }
    });
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="product-section-main">
      {/* Header with Controls */}
      <div className="product-section-header">
        <div className="header-top">
          <div className="header-left">
            <h2 className="section-title">
              <FiBox />
              <span>Menu Items</span>
              <span className="count-badge">{products.length}</span>
            </h2>
            {selectedCategory && (
              <div className="category-badge">
                <span className="category-name">{selectedCategory.name}</span>
              </div>
            )}
          </div>
          
          <div className="header-right">
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <FiGrid />
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <FiList />
              </button>
            </div>
            
            <button 
              className="add-btn"
              onClick={handleAddClick}
              disabled={!selectedCategoryId}
            >
              <FiPlus />
              <span>Add Dish</span>
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="header-bottom">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-container">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="quantity">Stock Quantity</option>
            </select>
          </div>
        </div>

        {/* Quick Tabs */}
        <div className="quick-tabs">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => onTabChange && onTabChange('all')}
          >
            All Items
          </button>
          <button 
            className={`tab-btn ${activeTab === 'featured' ? 'active' : ''}`}
            onClick={() => onTabChange && onTabChange('featured')}
          >
            <FiStar />
            Featured
          </button>
          <button 
            className={`tab-btn ${activeTab === 'low-stock' ? 'active' : ''}`}
            onClick={() => onTabChange && onTabChange('low-stock')}
          >
            Low Stock
          </button>
          <button 
            className={`tab-btn ${activeTab === 'in-cart' ? 'active' : ''}`}
            onClick={() => onTabChange && onTabChange('in-cart')}
          >
            In Cart
          </button>
        </div>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-modal">
            <ProductForm
              product={editingProduct}
              selectedCategoryId={selectedCategoryId}
              onSubmit={(data) => {
                if (editingProduct) {
                  onUpdateProduct(data);
                } else {
                  onAddProduct(data);
                }
                setEditingProduct(null);
                onShowFormChange(false);
              }}
              onCancel={() => {
                setEditingProduct(null);
                onShowFormChange(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Products Grid/List */}
      <div className="products-grid-container">
        {products.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="products-grid">
              {sortedProducts.map(product => (
                <div 
                  key={product.id} 
                  className={`product-card ${product.inCart ? 'in-cart' : ''}`}
                >
                  {/* Product Image */}
                  <div className="product-image-container">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="product-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="image-placeholder">
                      <FiImage />
                    </div>
                    
                    {/* Product Badges */}
                    <div className="product-badges">
                      {product.featured && (
                        <div className="badge featured">
                          <FiStar />
                          Featured
                        </div>
                      )}
                      <div className="badge price">
                        ${product.price.toFixed(2)}
                      </div>
                      {product.quantity < 10 && (
                        <div className="badge low-stock">
                          {product.quantity} left
                        </div>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="quick-actions">
                      <button 
                        className="action-btn cart-btn"
                        onClick={(e) => handleAddToCartClick(product, e)}
                        title="Add to Cart"
                      >
                        <FiShoppingCart />
                      </button>
                      <button 
                        className="action-btn edit-btn"
                        onClick={(e) => handleEditClick(product, e)}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={(e) => handleDeleteClick(product, e)}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    {/* Cart Quantity Indicator */}
                    {product.cartQuantity > 0 && (
                      <div className="cart-indicator">
                        {product.cartQuantity} in cart
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="product-info">
                    <h3 className="product-name" title={product.name}>
                      {product.name}
                    </h3>
                    <p className="product-description" title={product.description}>
                      {product.description}
                    </p>
                    <div className="product-meta">
                      <div className="meta-item">
                        <span className="meta-label">SKU:</span>
                        <span className="meta-value">{product.sku}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Stock:</span>
                        <span className={`meta-value ${product.quantity < 10 ? 'low' : 'normal'}`}>
                          {product.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="products-list">
              {sortedProducts.map(product => (
                <div 
                  key={product.id} 
                  className={`product-list-item ${product.inCart ? 'in-cart' : ''}`}
                >
                  <div className="list-item-left">
                    <div className="list-image">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="list-placeholder">
                        <FiImage />
                      </div>
                    </div>
                    
                    <div className="list-info">
                      <div className="list-header">
                        <h3 className="product-name">{product.name}</h3>
                        {product.featured && (
                          <span className="featured-badge">
                            <FiStar /> Featured
                          </span>
                        )}
                      </div>
                      <p className="product-description">{product.description}</p>
                      <div className="list-meta">
                        <span className="meta-item">SKU: {product.sku}</span>
                        <span className="meta-item">Stock: {product.quantity}</span>
                        <span className="meta-item">Category: {selectedCategory?.name || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="list-item-right">
                    <div className="price-section">
                      <div className="price-amount">${product.price.toFixed(2)}</div>
                      {product.cartQuantity > 0 && (
                        <div className="cart-quantity">
                          {product.cartQuantity} in cart
                        </div>
                      )}
                    </div>
                    
                    <div className="list-actions">
                      <button 
                        className="action-btn cart-btn"
                        onClick={(e) => handleAddToCartClick(product, e)}
                        title="Add to Cart"
                      >
                        <FiShoppingCart />
                        Add to Cart
                      </button>
                      <button 
                        className="action-btn edit-btn"
                        onClick={(e) => handleEditClick(product, e)}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={(e) => handleDeleteClick(product, e)}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <FiBox size={48} />
            </div>
            <h3>No Menu Items Found</h3>
            <p>
              {selectedCategoryId 
                ? `No dishes in "${selectedCategory?.name}" category`
                : 'Select a category to add dishes'
              }
            </p>
            {selectedCategoryId && (
              <button 
                className="add-first-btn"
                onClick={handleAddClick}
              >
                <FiPlus />
                Add First Dish
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="footer-stats">
        <div className="stat-item">
          <span className="stat-label">Total Items:</span>
          <span className="stat-value">{products.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">In Cart:</span>
          <span className="stat-value">
            {products.filter(p => p.inCart).length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Low Stock:</span>
          <span className="stat-value low">
            {products.filter(p => p.quantity < 10).length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Featured:</span>
          <span className="stat-value">
            {products.filter(p => p.featured).length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;