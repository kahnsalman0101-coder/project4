// src/components/TotalPrice.js
import React from 'react';

const TotalPrice = ({ total }) => {
  return (
    <div className="total-price">
      <h2>Total Inventory Value:</h2>
      <div className="price-amount">${total.toFixed(2)}</div>
    </div>
  );
};

export default TotalPrice;