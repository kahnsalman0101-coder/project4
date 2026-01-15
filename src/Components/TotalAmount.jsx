import React from 'react';
import { FiClock, FiCalendar, FiDollarSign, FiCheckCircle, FiPrinter } from 'react-icons/fi';
import '../style/TotalAmount.css';

const TotalAmount = ({
  cartItems,
  subtotal,
  tax,
  discount,
  total,
  selectedDiscount,
  onDiscountChange,
  onCheckout,
  orderHistory = []
}) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="total-amount-section">
      <div className="total-amount-header">
        <h3 className="total-title">
          <FiDollarSign />
          <span>Order Summary</span>
        </h3>
        <button className="print-btn" onClick={handlePrint}>
          <FiPrinter />
          <span>Print</span>
        </button>
      </div>

      <div className="datetime-display">
        <div className="date-item">
          <FiCalendar />
          <span>{formattedDate}</span>
        </div>
        <div className="time-item">
          <FiClock />
          <span>{formattedTime}</span>
        </div>
      </div>

      <div className="amount-breakdown">
        <div className="amount-row">
          <span>Subtotal:</span>
          <span className="amount-value">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="amount-row">
          <span>Tax (8%):</span>
          <span className="amount-value">${tax.toFixed(2)}</span>
        </div>
        
        <div className="amount-row discount-row">
          <div className="discount-control">
            <span>Discount:</span>
            <select 
              value={selectedDiscount}
              onChange={(e) => onDiscountChange(Number(e.target.value))}
              className="discount-select"
            >
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
            </select>
          </div>
          <span className="amount-value discount-value">-${discount.toFixed(2)}</span>
        </div>
        
        <div className="amount-row total-row">
          <span>Total Amount:</span>
          <span className="total-amount">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="checkout-section">
        <button 
          className="checkout-btn"
          onClick={onCheckout}
          disabled={cartItems.length === 0}
        >
          <FiCheckCircle />
          <span>Process Checkout</span>
        </button>
      </div>
    </div>
  );
};

export default TotalAmount;