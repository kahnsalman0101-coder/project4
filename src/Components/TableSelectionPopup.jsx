import React, { useState } from 'react';
import { FiX, FiCheck, FiMapPin } from 'react-icons/fi';
import '../style/TableSelectionPopup.css';

const TableSelectionPopup = ({ isOpen, onClose, onTableSelect, currentTableId }) => {
  const [selectedTable, setSelectedTable] = useState(null);

  // Simplified table data
  const tablesData = [
    { id: 1, name: "Table 1", location: "Window Side", isAvailable: true },
    { id: 2, name: "Table 2", location: "Center", isAvailable: true },
    { id: 3, name: "Table 3", location: "Corner", isAvailable: false },
    { id: 4, name: "Table 4", location: "Near Entrance", isAvailable: false },
    { id: 5, name: "Table 5", location: "Garden View", isAvailable: true },
    { id: 6, name: "Table 6", location: "VIP Section", isAvailable: false },
    { id: 7, name: "Table 7", location: "Center", isAvailable: false },
    { id: 8, name: "Table 8", location: "Window Side", isAvailable: true },
    { id: 9, name: "Table 9", location: "Corner", isAvailable: true },
    { id: 10, name: "Table 10", location: "Family Section", isAvailable: false },
    { id: 11, name: "Table 11", location: "Bar Side", isAvailable: true },
    { id: 12, name: "Table 12", location: "Center", isAvailable: true },
    { id: 13, name: "Table 13", location: "Window Side", isAvailable: true },
    { id: 14, name: "Table 14", location: "Center", isAvailable: false },
    { id: 15, name: "Table 15", location: "Corner", isAvailable: true },
    { id: 16, name: "Table 16", location: "Near Entrance", isAvailable: true },
    { id: 17, name: "Table 17", location: "Family Section", isAvailable: false },
    { id: 18, name: "Table 18", location: "Bar Side", isAvailable: true },
    { id: 19, name: "Table 19", location: "Center", isAvailable: true },
    { id: 20, name: "Table 20", location: "Window Side", isAvailable: true },
    { id: 21, name: "Table 21", location: "Center", isAvailable: false },
    { id: 22, name: "Table 22", location: "Corner", isAvailable: true },
    { id: 23, name: "Table 23", location: "Near Entrance", isAvailable: true }
  ];

  const handleTableClick = (table) => {
    if (table.isAvailable) {
      setSelectedTable(table.id);
    }
  };

  const handleConfirmSelection = () => {
    if (selectedTable) {
      const table = tablesData.find(t => t.id === selectedTable);
      onTableSelect(table);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="table-popup-overlay">
      <div className="table-popup-container">
        {/* Header */}
        <div className="table-popup-header">
          <div className="table-popup-header-left">
            <h2>Select a Table</h2>
            <p className="table-popup-subtitle">Choose an available table for your order</p>
          </div>
          <button className="table-popup-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* Tables Grid - Updated to 8 columns */}
        <div className="tables-grid">
          {tablesData.map((table) => (
            <div
              key={table.id}
              className={`table-card 
                ${table.isAvailable ? 'available' : 'booked'}
                ${selectedTable === table.id ? 'selected' : ''}
                ${!table.isAvailable ? 'disabled' : ''}
              `}
              onClick={() => handleTableClick(table)}
            >
              {/* Table Status Indicator */}
              <div className={`table-status-indicator ${table.isAvailable ? 'available' : 'booked'}`}>
                {table.isAvailable ? 'Available' : 'Booked'}
              </div>

              {/* Table Info */}
              <div className="table-info">
                <h3 className="table-name">{table.name}</h3>
                <div className="table-location">
                  <FiMapPin />
                  <span>{table.location}</span>
                </div>
              </div>

              {/* Selection Indicator */}
              {selectedTable === table.id && (
                <div className="selection-indicator">
                  <FiCheck />
                  <span>Selected</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="table-popup-footer">
          <div className="table-legend">
            <div className="legend-item">
              <div className="legend-color available"></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="legend-color booked"></div>
              <span>Booked</span>
            </div>
          </div>
          
          <div className="table-action-buttons">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button 
              className={`confirm-btn ${selectedTable ? 'active' : 'disabled'}`}
              onClick={handleConfirmSelection}
              disabled={!selectedTable}
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSelectionPopup;