import React, { useState, useEffect } from 'react';
import { FiBox, FiCheck, FiPlus, FiTable, FiMapPin } from 'react-icons/fi';
import '../style/ProductSection.css';

const ProductSection = ({
  products = [],
  selectedCategory,
  selectedCategoryId,
  onAddToCart,
  darkMode,
  pendingQuantity = 1,
  calculatorMode = 'quantity',
  selectedTable = null,
  onTableTextboxClick
}) => {
  const [localProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => a.orderBy - b.orderBy);
    
    if (sortedProducts.length > 0 && !selectedCategoryId && sortedProducts[0]?.categoryId) {
      const firstCategoryProducts = sortedProducts.filter(
        product => product.categoryId === sortedProducts[0].categoryId
      );
      setLocalProducts(firstCategoryProducts);
    } else {
      setLocalProducts(sortedProducts);
    }
  }, [products, selectedCategoryId]);

  const getTextClass = (name) => {
    const length = name?.length || 0;
    if (length > 30) return 'long-text';
    if (length > 15) return 'medium-text';
    return 'short-text';
  };

  // Handle product click
  const handleProductClick = (product, event) => {
    if (event) event.stopPropagation();
    
    // Only add to cart if calculator is in quantity mode and we have a pending quantity
    if (calculatorMode === 'quantity' && pendingQuantity > 0) {
      if (onAddToCart) {
        onAddToCart(product.id, pendingQuantity);
      }
    }
  };

  // Handle price button click - always adds 1
  const handlePriceButtonClick = (product, event) => {
    if (event) event.stopPropagation();
    
    if (onAddToCart) {
      onAddToCart(product.id, 1);
    }
  };

  // Handle table textbox click
  const handleTableTextboxClick = () => {
    if (onTableTextboxClick) {
      onTableTextboxClick();
    }
  };

  // Get table color
  const getTableColor = () => {
    if (selectedTable) {
      // If table has color property, use it
      if (selectedTable.color) return selectedTable.color;
      
      // Otherwise assign color based on table number
      const tableColors = {
        1: '#3b82f6', // Blue
        2: '#10b981', // Green
        3: '#f59e0b', // Amber
        4: '#ef4444', // Red
        5: '#8b5cf6', // Purple
        6: '#ec4899', // Pink
        7: '#06b6d4', // Cyan
        8: '#84cc16', // Lime
        9: '#f97316', // Orange
        10: '#14b8a6', // Teal
        11: '#6366f1', // Indigo
        12: '#22c55e', // Emerald
        13: '#3b82f6', // Blue
        14: '#10b981', // Green
        15: '#f59e0b', // Amber
        16: '#ef4444', // Red
        'takeaway': '#10b981' // Green for takeaway
      };
      
      return tableColors[selectedTable.id] || '#667eea';
    }
    return '#6b7280'; // Gray when no table selected
  };

  return (
    <div className={`product-section-main ${darkMode ? 'dark-mode' : ''}`}>
      {/* Small Table Selection Textbox */}
      <div 
        className="table-selection-input" 
        onClick={handleTableTextboxClick}
        style={{ 
          backgroundColor: getTableColor(),
          background: selectedTable 
            ? `linear-gradient(135deg, ${getTableColor()}, ${darkenColor(getTableColor(), 20)})`
            : 'linear-gradient(135deg, #6b7280, #4b5563)'
        }}
        title={selectedTable ? `Table: ${selectedTable.name} (${selectedTable.location})` : 'Click to select table'}
      >
        <div className="table-input-icon">
          <FiTable />
        </div>
        <div className="table-input-content">
          <div className="table-input-value">
            {selectedTable ? (
              <>
                <span className="table-input-name">{selectedTable.name}</span>
                {selectedTable.location && (
                  <span className="table-input-location">
                    <FiMapPin /> {selectedTable.location}
                  </span>
                )}
              </>
            ) : (
              <span className="table-input-placeholder">Select Table</span>
            )}
          </div>
        </div>
      </div>

      <div className="products-grid-container">
        {localProducts.length > 0 ? (
          <div className="products-grid">
            {localProducts.map(product => {
              const textClass = getTextClass(product.name);
              const cartQuantity = product.cartQuantity || 0;
              const isInCart = cartQuantity > 0;
              const hasPendingQuantity = calculatorMode === 'quantity' && pendingQuantity > 0;
              
              return (
                <div 
                  key={product.id} 
                  data-product-id={product.id}
                  className={`product-card ${isInCart ? 'in-cart' : ''} ${hasPendingQuantity ? 'pending-add-mode' : ''}`}
                  onClick={(e) => handleProductClick(product, e)}
                  title={
                    hasPendingQuantity 
                      ? `Click to add ${pendingQuantity}x ${product.name} to cart` 
                      : `Click to add 1x ${product.name} to cart`
                  }
                  style={{ 
                    background: product.color || '#667eea',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Checkmark Indicator */}
                  {isInCart && (
                    <div className="cart-checkmark-indicator">
                      <FiCheck />
                    </div>
                  )}
              
                  
                  {/* Product Name */}
                  <div className={`product-name-top ${textClass}`} title={product.name}>
                    {product.name}
                  </div>
                  
                  
                  {/* Price Button */}
                  <div className="product-price-bottom-right">
                    <div 
                      className={`price-button ${hasPendingQuantity && pendingQuantity > 1 ? 'pending-mode' : ''}`}
                      onClick={(e) => handlePriceButtonClick(product, e)}
                      title="Add 1 to cart"
                    >
                      <span className="price-currency">Rs</span>
                      <span className="price-value">{product.price.toFixed(0)}</span>
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

// Helper function to darken color for gradient
const darkenColor = (color, percent) => {
  let r = 0, g = 0, b = 0;
  
  if (color.startsWith('#')) {
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
  } else if (color.startsWith('rgb')) {
    const rgb = color.match(/\d+/g);
    r = parseInt(rgb[0]);
    g = parseInt(rgb[1]);
    b = parseInt(rgb[2]);
  }
  
  r = Math.floor(r * (100 - percent) / 100);
  g = Math.floor(g * (100 - percent) / 100);
  b = Math.floor(b * (100 - percent) / 100);
  
  return `rgb(${r}, ${g}, ${b})`;
};

export default ProductSection;