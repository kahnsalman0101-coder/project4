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

  // Generate a consistent color based on product ID
  const getProductColor = (productId, productName) => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
      'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    ];
    
    // Use product ID to pick a consistent color
    const index = (productId || 0) % colors.length;
    return colors[index];
  };

  return (
    <div className={`product-section-main ${darkMode ? 'dark-mode' : ''}`}>
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
              const productColor = getProductColor(product.id, product.name);
              
              return (
                <div 
                  key={product.id} 
                  className={`product-card ${isInCart ? 'in-cart' : ''} ${isClicked ? 'clicked' : ''}`}
                  onClick={() => handleProductClick(product)}
                >
                  {/* Product Color Box */}
                  <div 
                    className="product-color-box"
                    style={{ background: productColor }}
                  >
                    {/* Center Content */}
                    <div className="product-center-content">
                      <div className="product-name-center" title={product.name}>
                        {product.name}
                      </div>
                      <div className="product-price-center">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                    
                    {/* Cart Indicator */}
                    {isInCart && (
                      <div className="cart-indicator">
                        <FiCheck />
                      </div>
                    )}

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