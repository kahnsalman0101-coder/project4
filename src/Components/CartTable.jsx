import React from 'react';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import '../style/CartTable.css';

const CartTable = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const calculateItemTotal = (item) => {
    return (item.price * item.cartQuantity).toFixed(2);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.cartQuantity);
    }, 0).toFixed(2);
  };

  const handleIncrease = (item) => {
    onUpdateQuantity(item.id, item.cartQuantity + 1);
  };

  const handleDecrease = (item) => {
    if (item.cartQuantity > 1) {
      onUpdateQuantity(item.id, item.cartQuantity - 1);
    }
  };

  return (
    <div className="cart-table-section">
      <div className="cart-table-header">
        <h3 className="cart-title">
          <span>Order Cart</span>
          <span className="cart-count">{cartItems.length} items</span>
        </h3>
      </div>

      <div className="cart-table-container">
        {cartItems.length > 0 ? (
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-info">
                  <span className="item-name" title={item.name}>
                    {item.name}
                  </span>
                  <span className="item-price">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                
                <div className="cart-item-controls">
                  <div className="quantity-control">
                    <button 
                      className="qty-btn minus"
                      onClick={() => handleDecrease(item)}
                      disabled={item.cartQuantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="quantity">{item.cartQuantity}</span>
                    <button 
                      className="qty-btn plus"
                      onClick={() => handleIncrease(item)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                  
                  <span className="item-total">
                    ${calculateItemTotal(item)}
                  </span>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => onRemoveFromCart(item.id)}
                    title="Remove"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-cart">
            <p>Cart is empty. Add items from menu.</p>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span className="subtotal">${calculateSubtotal()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartTable;