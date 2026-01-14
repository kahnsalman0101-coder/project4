import React, { useState } from 'react';
import { 
  FiBox,
  FiImage,
  FiShoppingCart,
  FiStar,
  FiCheck
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
  darkMode
}) => {
  const [clickedProductId, setClickedProductId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleProductClick = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
      
      // Show click animation
      setClickedProductId(product.id);
      setTimeout(() => {
        setClickedProductId(null);
      }, 600);
    }
  };

  return (
    <div className="product-section-main">
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

      {/* Products Grid */}
      <div className="products-grid-container">
        {products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => {
              const cartQuantity = product.cartQuantity || 0;
              const isClicked = clickedProductId === product.id;
              const isInCart = cartQuantity > 0;
              
              return (
                <div 
                  key={product.id} 
                  className={`product-card ${isInCart ? 'in-cart' : ''} ${isClicked ? 'clicked' : ''}`}
                  onClick={() => handleProductClick(product)}
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
                    
                    {/* Cart Indicator */}
                    {isInCart && (
                      <div className="cart-indicator">
                        <FiCheck />
                      </div>
                    )}

                    {/* Product Name Overlay */}
                    <div className="product-name-overlay">
                      <div className="product-name" title={product.name}>
                        {product.name}
                      </div>
                      <div className="product-price">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>

                    {/* Product Badges */}
                    <div className="product-badges">
                      {product.featured && (
                        <div className="badge featured">
                          <FiStar />
                        </div>
                      )}
                      {product.quantity < 10 && (
                        <div className="badge low-stock">
                          {product.quantity}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <FiBox size={48} />
            </div>
            <h3>No Menu Items Found</h3>
            <p>
              {selectedCategoryId 
                ? `No dishes in "${selectedCategory?.name}" category`
                : 'Select a category to view dishes'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;