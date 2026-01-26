import React, { useState, useEffect } from 'react';
import '../style/Calculator.css';

const Calculator = ({ 
  onNumberSelect, 
  onClear, 
  onDelete,
  currentValue, 
  calculatorMode,
  pendingQuantity
}) => {
  const [displayValue, setDisplayValue] = useState('1');

  useEffect(() => {
    // Always show current value
    if (currentValue !== undefined && currentValue !== null) {
      setDisplayValue(currentValue.toString());
    } else if (calculatorMode === 'quantity') {
      setDisplayValue('1');
    } else {
      setDisplayValue('0');
    }
  }, [currentValue, calculatorMode]);

  const handleNumberClick = (num) => {
    let newValue;
    
    // Always start fresh if display is 0 or 1
    if (displayValue === '0' || displayValue === '1' || displayValue === '') {
      newValue = num;
    } else {
      newValue = displayValue + num;
    }
    
    const maxLength = calculatorMode === 'quantity' ? 3 : 8;
    if (newValue.length <= maxLength) {
      setDisplayValue(newValue);
      
      let parsedValue;
      if (calculatorMode === 'quantity') {
        parsedValue = parseInt(newValue, 10);
        if (isNaN(parsedValue) || parsedValue < 1) parsedValue = 1;
        if (parsedValue > 999) parsedValue = 999;
      } else {
        parsedValue = parseFloat(newValue);
        if (isNaN(parsedValue)) parsedValue = 0;
      }
      
      if (onNumberSelect) {
        onNumberSelect(parsedValue);
      }
    }
  };

  const handleClear = () => {
    if (calculatorMode === 'discount') {
      setDisplayValue('0');
      if (onNumberSelect) {
        onNumberSelect(0);
      }
    } else {
      // For quantity mode, reset to 1
      setDisplayValue('1');
      if (onNumberSelect) {
        onNumberSelect(1);
      }
    }
    
    if (onClear) {
      onClear();
    }
  };

  const handleDelete = () => {
    if (displayValue.length > 1) {
      const newValue = displayValue.slice(0, -1);
      setDisplayValue(newValue);
      
      let parsedValue;
      if (calculatorMode === 'quantity') {
        parsedValue = newValue ? parseInt(newValue, 10) : 1;
        if (isNaN(parsedValue) || parsedValue < 1) parsedValue = 1;
      } else {
        parsedValue = newValue ? parseFloat(newValue) : 0;
        if (isNaN(parsedValue)) parsedValue = 0;
      }
      
      if (onNumberSelect) {
        onNumberSelect(parsedValue);
      }
    } else {
      // If display has only one digit
      if (calculatorMode === 'quantity') {
        setDisplayValue('1');
        if (onNumberSelect) {
          onNumberSelect(1);
        }
      } else {
        setDisplayValue('0');
        if (onNumberSelect) {
          onNumberSelect(0);
        }
      }
    }
    
    if (onDelete) {
      onDelete();
    }
  };

  // Get mode text
  const getModeText = () => {
    if (calculatorMode === 'quantity') {
      if (pendingQuantity > 1) {
        return `Add ${pendingQuantity} Items`;
      }
      return 'Add 1 Item';
    } else {
      return 'Set Discount';
    }
  };

  // Get display label
  const getDisplayLabel = () => {
    if (calculatorMode === 'quantity') {
      return 'Quantity:';
    }
    return 'Discount:';
  };

  return (
    <div className="calculator-section">
      <div className="calculator-header">
        <div className={`mode-indicator ${calculatorMode}`}>
          {getModeText()}
        </div>
      </div>
      
      <div className="calculator-display">
        <div className="display-label">
          {getDisplayLabel()}
        </div>
        <div className="display-value">
          {displayValue}
        </div>
      </div>

      <div className="calculator-buttons">
        <div className="button-row">
          <button className="calc-btn number" onClick={() => handleNumberClick('7')}>
            7
          </button>
          <button className="calc-btn number" onClick={() => handleNumberClick('8')}>
            8
          </button>
          <button className="calc-btn number" onClick={() => handleNumberClick('9')}>
            9
          </button>
        </div>

        <div className="button-row">
          <button className="calc-btn number" onClick={() => handleNumberClick('4')}>
            4
          </button>
          <button className="calc-btn number" onClick={() => handleNumberClick('5')}>
            5
          </button>
          <button className="calc-btn number" onClick={() => handleNumberClick('6')}>
            6
          </button>
        </div>

        <div className="button-row">
          <button className="calc-btn number" onClick={() => handleNumberClick('1')}>
            1
          </button>
          <button className="calc-btn number" onClick={() => handleNumberClick('2')}>
            2
          </button>
          <button className="calc-btn number" onClick={() => handleNumberClick('3')}>
            3
          </button>
        </div>

        <div className="button-row">
          <button className="calc-btn control clear" onClick={handleClear}>
            C
          </button>
          <button className="calc-btn number zero-btn" onClick={() => handleNumberClick('0')}>
            0
          </button>
          <button className="calc-btn control delete" onClick={handleDelete}>
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;