import React from 'react';
import { FiPrinter, FiCheckCircle, FiTag } from 'react-icons/fi';
import '../style/TotalAmount.css';

const TotalAmount = ({
  cartItems,
  subtotal,
  discount,
  total,
  selectedDiscount,
  onDiscountChange,
  onDiscountFocus,
  onCheckout,
  onClearCart,
  selectedProductId,
  activeInput
}) => {
  // Calculate net amount
  const calculateNet = () => {
    const totalValue = parseFloat(subtotal) || 0;
    const discountValue = parseFloat(selectedDiscount) || 0;
    const calculatedNet = Math.max(0, totalValue - discountValue);
    return calculatedNet.toFixed(0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="total-amount-section">
      {/* Header */}
      <div className="total-amount-header">
        <h3 className="total-title">
          <span>Order Summary</span>
        </h3>
        <button className="print-btn" onClick={handlePrint} title="Print Receipt">
          <FiPrinter />
        </button>
      </div>

      {/* Amount Breakdown */}
      <div className="amount-breakdown">
        {/* Total Input Box */}
        <div className="input-box total-input-box">
          <label className="input-label">Total</label>
          <div className="input-wrapper">
            <span className="input-currency">Rs</span>
            <input
              type="text"
              value={subtotal.toFixed(0)}
              readOnly
              className="input-field"
            />
          </div>
        </div>
        
        {/* Discount Input Box */}
        <div className="input-box discount-input-box">
          <label className="input-label">Discount (Rs)</label>
          <div 
            className={`discount-input-wrapper ${activeInput === 'discount' ? 'active' : ''}`}
            onClick={onDiscountFocus}
          >
            <div className="discount-currency-icon">
              <FiTag />
            </div>
            <input
              type="number"
              value={selectedDiscount || ''}
              onChange={(e) => {
                let value = e.target.value;
                value = value.replace(/[^0-9.]/g, '');
                const maxDiscount = parseFloat(subtotal);
                const discountValue = parseFloat(value) || 0;
                
                if (discountValue > maxDiscount) {
                  value = maxDiscount.toString();
                }
                
                if (value === '' || isNaN(parseFloat(value))) {
                  onDiscountChange('');
                } else {
                  onDiscountChange(parseFloat(value));
                }
              }}
              onFocus={onDiscountFocus}
              placeholder="0"
              min="0"
              max={subtotal}
              step="1"
              className="discount-input-field"
            />
            <span className="discount-currency-label">Rs</span>
          </div>
          <div className="active-indicator">
            {activeInput === 'discount' && (
              <div className="indicator-dot"></div>
            )}
          </div>
        </div>

        {/* Net Input Box */}
        <div className="input-box net-input-box">
          <label className="input-label">Total Net</label>
          <div className="input-wrapper">
            <span className="input-currency">Rs</span>
            <input
              type="text"
              value={calculateNet()}
              readOnly
              className="input-field net-input"
            />
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="checkout-section">
        <button 
          className="checkout-btn"
          onClick={onCheckout}
          disabled={cartItems.length === 0}
        >
          <FiCheckCircle />
          <span>Proceed</span>
        </button>
      </div>
    </div>
  );
};

export default TotalAmount;