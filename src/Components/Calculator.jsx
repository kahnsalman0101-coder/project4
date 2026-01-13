import React, { useState } from 'react';
import { FiDivide, FiX, FiMinus, FiPlus, FiPercent, FiDelete } from 'react-icons/fi';
import '../style/Calculator.css';

const Calculator = ({ onCalculate, onClear }) => {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);

  const handleNumberClick = (num) => {
    if (display === '0') {
      setDisplay(num.toString());
    } else {
      setDisplay(display + num.toString());
    }
  };

  const handleOperationClick = (op) => {
    if (operation && previousValue !== null) {
      calculateResult();
    }
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setDisplay('0');
  };

  const calculateResult = () => {
    if (!operation || previousValue === null) return;

    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = previousValue + current;
        break;
      case '-':
        result = previousValue - current;
        break;
      case '×':
        result = previousValue * current;
        break;
      case '÷':
        result = previousValue / current;
        break;
      case '%':
        result = previousValue * (current / 100);
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setOperation(null);
    setPreviousValue(null);
    
    if (onCalculate) {
      onCalculate(result);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setOperation(null);
    setPreviousValue(null);
    
    if (onClear) {
      onClear();
    }
  };

  const handleDelete = () => {
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="calculator-section">
      <div className="calculator-display">
        <div className="display-value">{display}</div>
        <div className="display-operation">
          {previousValue && `${previousValue} ${operation || ''}`}
        </div>
      </div>

      <div className="calculator-buttons">
        <div className="button-row">
          <button className="calc-btn operator" onClick={handleClear}>
            C
          </button>
          <button className="calc-btn operator" onClick={handleDelete}>
            <FiDelete />
          </button>
          <button className="calc-btn operator" onClick={() => handleOperationClick('%')}>
            <FiPercent />
          </button>
          <button className="calc-btn operator" onClick={() => handleOperationClick('÷')}>
            <FiDivide />
          </button>
        </div>

        <div className="button-row">
          <button className="calc-btn number" onClick={() => handleNumberClick(7)}>
            7
          </button>
          <button className="calc-btn number" onClick={() => handleNumberClick(8)}>
            8
          </button>
          <button className="calc-btn number" onClick={() => handleNumberClick(9)}>
            9
          </button>
          <button className="calc-btn operator" onClick={() => handleOperationClick('×')}>
            <FiX />
          </button>
        </div>

        <div className="button-row">
          <button className="calc-btn number" onClick={() => handleNumberClick(4)}>
            4
          </button>
          <button className="calc-btn number" onClick={() => handleNumberClick(5)}>
            5
          </button>
          <button className="calc-btn number" onClick={() => handleNumberClick(6)}>
            6
          </button>
          <button className="calc-btn operator" onClick={() => handleOperationClick('-')}>
            <FiMinus />
          </button>
        </div>

        <div className="button-row">
          <button className="calc-btn number" onClick={() => handleNumberClick(1)}>
            1
          </button>
          <button className="calc-btn number" onClick={() => handleNumberClick(2)}>
            2
          </button>
          <button className="calc-btn number" onClick={() => handleNumberClick(3)}>
            3
          </button>
          <button className="calc-btn operator" onClick={() => handleOperationClick('+')}>
            <FiPlus />
          </button>
        </div>

        <div className="button-row">
          <button className="calc-btn number zero" onClick={() => handleNumberClick(0)}>
            0
          </button>
          <button className="calc-btn number" onClick={handleDecimal}>
            .
          </button>
          <button className="calc-btn equals" onClick={calculateResult}>
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;