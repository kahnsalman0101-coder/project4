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

  // Check if there are more than 9 items
  const hasMoreThan9Items = cartItems.length > 9;

  return (
    <div className="cart-table-section">
      <div className="cart-table-header">
        <div className="cart-summary-badge">
        </div>
      </div>

      <div className="cart-table-container">
        {cartItems.length > 0 ? (
          <div className="cart-table-wrapper">
            {/* Table Header */}
            <div className="table-header-row">
              <div className="table-col name">Product</div>
              <div className="table-col qty">Qty</div>
              <div className="table-col price">Price</div>
              <div className="table-col total">Total</div>
              <div className="table-col actions"></div>
            </div>

            {/* Table Body */}
            <div className={`cart-table-body ${hasMoreThan9Items ? 'has-more-than-9' : ''}`}>
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="table-row">
                  {/* Name Column */}
                  <div className="table-col name">
                    <div className="item-name">{item.name}</div>
                  </div>

                  {/* Quantity Column */}
                  <div className="table-col qty">
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
                  </div>

                  {/* Price Column */}
                  <div className="table-col price">
                    <div className="price-amount">
                      {item.price.toFixed(0)}
                    </div>
                  </div>

                  {/* Total Column */}
                <div className="table-col total">
  <div className="total-amount">
    {Number(calculateItemTotal(item)).toFixed(0)}
  </div>
</div>


                  {/* Actions Column */}
                  <div className="table-col actions">
                    <button 
                      className="remove-btn"
                      onClick={() => onRemoveFromCart(item.id)}
                      title="Remove item"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <div className="empty-state">
              <div className="empty-icon">🛒</div>
              <h4>Your cart is empty</h4>
              <p>Add items from the menu to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartTable;