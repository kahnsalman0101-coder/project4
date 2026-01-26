import React, { useRef, useEffect, useState } from 'react';
import { FiGrid } from 'react-icons/fi';
import '../style/CategorySection.css';

const CategorySection = ({
  categories,
  selectedCategoryId,
  showForm,
  onSelectCategory,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onShowFormChange,
  onOrder1st,
  onOrder2nd,
  onTakeAway,
  onNewOrder,
  darkMode
}) => {
  const scrollContainerRef = useRef(null);
  const [hasScroll, setHasScroll] = useState(false);

  // 🔹 Auto-select "Biryani" category by default (since it has orderBy: 1)
  useEffect(() => {
    if (!selectedCategoryId && categories.length > 0) {
      const biryaniCategory = categories.find(
        cat => cat.name?.toLowerCase().includes('biryani')
      );

      if (biryaniCategory && onSelectCategory) {
        onSelectCategory(biryaniCategory.id);
      }
    }
  }, [categories, selectedCategoryId, onSelectCategory]);

  // 🔹 Check if content overflows
  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const hasOverflow =
          scrollContainerRef.current.scrollHeight >
          scrollContainerRef.current.clientHeight;
        setHasScroll(hasOverflow);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categories]);

  const getCategoryColor = (category) => {
    // Get color from category object - use the color from your array
    return category?.color || '#667eea';
  };

  const getTextColor = (backgroundColor) => {
    if (!backgroundColor) return '#FFFFFF';
    
    // Remove the # if present
    const hex = backgroundColor.replace('#', '');
    if (hex.length !== 6 && hex.length !== 3) return '#FFFFFF';
    
    // Convert 3-digit hex to 6-digit
    const fullHex = hex.length === 3 
      ? hex.split('').map(x => x + x).join('')
      : hex;
    
    const r = parseInt(fullHex.substr(0, 2), 16);
    const g = parseInt(fullHex.substr(2, 2), 16);
    const b = parseInt(fullHex.substr(4, 2), 16);
    
    // Calculate brightness (YIQ formula)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? '#000000' : '#FFFFFF';
  };

  const sortedCategories = [...categories].sort(
    (a, b) => (a.orderBy || 0) - (b.orderBy || 0)
  );

  const countDishesInCategory = (categoryId) => {
    return categories.reduce((count, cat) => {
      if (cat.id === categoryId) {
        return cat.dishCount || 0;
      }
      return count;
    }, 0);
  };

  return (
    <div className={`category-section-container ${darkMode ? 'dark-mode' : ''}`}>
      
      {/* 🔹 Category List */}
      <div
        ref={scrollContainerRef}
        className={`category-items-top ${hasScroll ? 'scrollable' : ''}`}
      >
        {sortedCategories.length > 0 ? (
          sortedCategories.map(category => {
            const dishCount = countDishesInCategory(category.id);
            const isSelected = selectedCategoryId === category.id;
            const categoryColor = getCategoryColor(category);
            const textColor = getTextColor(categoryColor);

            return (
              <div
                key={category.id}
                className={`category-item ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectCategory(category.id)}
                style={{
                  // ALWAYS use the category color from array for background
                  backgroundColor: categoryColor,  // Always show the color
                  // Text color based on background brightness
                  color: textColor,
                  // Border: none for all, selected will get a special border
                  border: 'none',
                  // Box shadow for all items
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  // Selected items get a special white border and stronger shadow
                  ...(isSelected && {
                    border: '3px solid white',
                    boxShadow: `0 4px 12px ${categoryColor}80, 0 0 0 2px ${categoryColor}`,
                    transform: 'translateY(-2px)'
                  })
                }}
              >
                <span className="category-item-name">
                  {category.name}
                </span>

                {dishCount > 0 && (
                  <span
                    className="category-item-count"
                    style={{
                      backgroundColor: textColor === '#FFFFFF' 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : 'rgba(0, 0, 0, 0.1)',
                      color: textColor === '#FFFFFF' ? categoryColor : textColor
                    }}
                  >
                    {dishCount}
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <div className="empty-categories">
            <div className="empty-icon">
              <FiGrid />
            </div>
            <h3>No Categories</h3>
            <p>Create your first category</p>
          </div>
        )}
      </div>

   {/* 🔹 Footer - Ultra compact buttons */}
<div className="categories-footer">
  <button
    className="show-popup-btn order-btn"
    onClick={() => onOrder2nd && onOrder2nd()}
    title="Switch to second order"
  >
    <span className="btn-text">Order</span>
    <span className="btn-icon">↻</span>
  </button>
  
  <button
    className="show-popup-btn takeaway-btn"
    onClick={() => onTakeAway && onTakeAway()}
    title="Set as takeaway order"
  >
    <span className="btn-text">Take Away</span>
    <span className="btn-icon">🚚</span>
  </button>
  
  <button
    className="show-popup-btn new-order-btn"
    onClick={() => onNewOrder && onNewOrder()}
    title="Clear cart and start new order"
  >
    <span className="btn-text">New</span>
    <span className="btn-icon">+</span>
  </button>
</div>
      
    </div>
  );
};

export default CategorySection;