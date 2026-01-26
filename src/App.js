import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Components/Sidebar';
import CategorySection from './Components/CategorySection';
import ProductSection from './Components/ProductSection';
import CartTable from './Components/CartTable';
import Calculator from './Components/Calculator';
import TotalAmount from './Components/TotalAmount';
import { initialCategories, initialDishes } from './services/dataService';
import TableSelectionPopup from './Components/TableSelectionPopup';
import './App.css';
import { FiX, FiShoppingCart, FiCheckCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [calculatorQuantity, setCalculatorQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [showCheckoutPanel, setShowCheckoutPanel] = useState(true);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showTablePopup, setShowTablePopup] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  
  // Calculator state management
  const [calculatorMode, setCalculatorMode] = useState('quantity');
  const [calculatorValue, setCalculatorValue] = useState('1');
  const [pendingQuantity, setPendingQuantity] = useState(1);
  
  // Toast notifications state
  const [toasts, setToasts] = useState([]);
  
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalDishes: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0,
    averagePrice: 0
  });
  
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Greek Salad stock is low (5 remaining)', type: 'warning', time: '10 min ago' },
    { id: 2, message: 'New dish "Chicken Biryani" added', type: 'info', time: '1 hour ago' },
    { id: 3, message: 'Category "Salads & Starters" updated', type: 'success', time: '2 hours ago' }
  ]);
  
  const mainContentRef = useRef(null);
  const calculatorRef = useRef(null);
  const discountInputRef = useRef(null);

  // Click outside handler - Simplified
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click is inside calculator, do nothing
      if (calculatorRef.current && calculatorRef.current.contains(event.target)) {
        return;
      }
      
      // If click is on discount input in TotalAmount, switch to discount mode
      const discountElement = event.target.closest('.discount-input-wrapper');
      if (discountElement) {
        setCalculatorMode('discount');
        setCalculatorValue(selectedDiscount > 0 ? selectedDiscount.toString() : '0');
        return;
      }
      
      // If click is on a product AND we have a pending quantity, add to cart
      const productElement = event.target.closest('.product-card');
      if (productElement && calculatorMode === 'quantity' && pendingQuantity > 0) {
        const productId = productElement.dataset.productId;
        if (productId) {
          handleAddToCartWithQuantity(productId, pendingQuantity);
          // RESET calculator after adding to cart
          setTimeout(() => {
            resetCalculatorToDefault();
          }, 100);
          return;
        }
      }
      
      // For any other click, stay in quantity mode
      if (calculatorMode === 'discount') {
        setCalculatorMode('quantity');
        setCalculatorValue(pendingQuantity.toString());
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [calculatorMode, pendingQuantity, selectedDiscount]);

  // Function to reset calculator to default
  const resetCalculatorToDefault = () => {
    if (calculatorMode === 'quantity') {
      setCalculatorValue('1');
      setPendingQuantity(1);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      
      if (mobile) {
        setSidebarWidth(0);
        setSidebarCollapsed(true);
        setShowCheckoutPanel(false);
      } else if (sidebarCollapsed) {
        setSidebarWidth(80);
      } else {
        setSidebarWidth(280);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [sidebarCollapsed]);

  useEffect(() => {
    setCategories(initialCategories);
    
    const dishesWithDetails = initialDishes.map(d => ({
      ...d,
      sku: `SKU${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      lastUpdated: new Date().toISOString().split('T')[0],
      featured: Math.random() > 0.7,
      inCart: false,
      cartQuantity: 0
    }));
    
    setDishes(dishesWithDetails);
    
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    }
    
    const savedTheme = localStorage.getItem('themeColor') || '#8b5cf6';
    document.documentElement.style.setProperty('--primary-color', savedTheme);
  }, []);

  useEffect(() => {
    const averagePrice = dishes.length > 0 
      ? dishes.reduce((sum, dish) => sum + (dish.price || 0), 0) / dishes.length 
      : 0;
    
    setStats({
      totalCategories: categories.length,
      totalDishes: dishes.length,
      lowStock: 0,
      outOfStock: 0,
      totalValue: 0,
      averagePrice: averagePrice
    });
    
    setTotalPrice(0);
  }, [dishes, categories]);

  // Update cart items whenever dishes change
  useEffect(() => {
    const itemsInCart = dishes.filter(d => d.inCart && d.cartQuantity > 0);
    setCartItems(itemsInCart);
  }, [dishes]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Toast notification functions
  const showToast = (message, type = 'warning') => {
    const id = Date.now();
    const newToast = {
      id,
      message,
      type,
      timestamp: new Date()
    };
    
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const getFilteredDishes = () => {
    let filtered = dishes;
    
    if (selectedCategoryId) {
      filtered = filtered.filter(dish => dish.categoryId === selectedCategoryId);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(dish => 
        dish.name.toLowerCase().includes(query) || 
        dish.id.toLowerCase().includes(query) ||
        dish.sku?.toLowerCase().includes(query)
      );
    }
    
    switch (activeTab) {
      case 'low-stock':
        filtered = filtered.filter(dish => false);
        break;
      case 'out-of-stock':
        filtered = filtered.filter(dish => false);
        break;
      case 'featured':
        filtered = filtered.filter(dish => dish.featured);
        break;
      case 'in-cart':
        filtered = filtered.filter(dish => dish.inCart);
        break;
      default:
        break;
    }
    
    return filtered;
  };

  // Handle calculator input
  const handleCalculatorInput = (value) => {
    if (calculatorMode === 'discount') {
      const discountValue = parseFloat(value) || 0;
      const maxDiscount = calculateSubtotal() + calculateTax();
      
      if (discountValue > maxDiscount) {
        setSelectedDiscount(maxDiscount);
        setCalculatorValue(maxDiscount.toString());
      } else {
        setSelectedDiscount(discountValue);
        setCalculatorValue(value.toString());
      }
    } else if (calculatorMode === 'quantity') {
      const quantityValue = parseInt(value) || 1;
      setCalculatorValue(value.toString());
      setPendingQuantity(quantityValue);
    }
  };

  // Handle calculator clear
  const handleClearCalculator = () => {
    if (calculatorMode === 'discount') {
      setSelectedDiscount(0);
      setCalculatorValue('0');
    } else if (calculatorMode === 'quantity') {
      setCalculatorValue('1');
      setPendingQuantity(1);
    }
  };

  // Handle calculator delete (backspace)
  const handleCalculatorDelete = () => {
    if (calculatorValue.length > 1) {
      const newValue = calculatorValue.slice(0, -1);
      setCalculatorValue(newValue);
      
      if (calculatorMode === 'discount') {
        const discountValue = newValue ? parseFloat(newValue) : 0;
        setSelectedDiscount(discountValue);
      } else if (calculatorMode === 'quantity') {
        const quantityValue = newValue ? parseInt(newValue) : 1;
        setPendingQuantity(quantityValue);
      }
    } else {
      // If display has only one digit
      setCalculatorValue('1');
      if (calculatorMode === 'discount') {
        setSelectedDiscount(0);
      } else if (calculatorMode === 'quantity') {
        setPendingQuantity(1);
      }
    }
  };

  // Simple add to cart with quantity - UPDATED to reset calculator
  const handleAddToCartWithQuantity = (productId, quantity) => {
    const product = dishes.find(d => d.id === productId);
    if (!product) return;
    
    handleAddToCart(product, quantity);
    
    
    // Reset calculator to default after adding to cart
    resetCalculatorToDefault();
  };

  // Handle adding to cart
  const handleAddToCart = (dish, quantityToAdd = 1) => {
    const existingDishIndex = dishes.findIndex(d => d.id === dish.id);
    
    if (existingDishIndex >= 0) {
      const updatedDishes = [...dishes];
      const dishToUpdate = updatedDishes[existingDishIndex];
      
      const newQuantity = dishToUpdate.cartQuantity + quantityToAdd;
      
      updatedDishes[existingDishIndex] = {
        ...dishToUpdate,
        inCart: true,
        cartQuantity: newQuantity
      };
      
      setDishes(updatedDishes);
      
      // Check if quantity is high and show warning
      if (newQuantity >= 10) {
        showToast(`High quantity: ${newQuantity}x ${dish.name} in cart`);
      }
    }
  };

  // Handle updating cart quantity (only from cart table)
  const handleUpdateCartQuantity = (dishId, newQuantity) => {
    if (newQuantity < 0) return;
    
    const updatedDishes = dishes.map(dish => 
      dish.id === dishId 
        ? { 
            ...dish, 
            cartQuantity: newQuantity,
            inCart: newQuantity > 0
          }
        : dish
    );
    
    setDishes(updatedDishes);
    
    // Check if quantity is high and show warning
    if (newQuantity >= 10) {
      const dish = dishes.find(d => d.id === dishId);
      if (dish) {
        showToast(`High quantity: ${newQuantity}x ${dish.name} in cart`);
      }
    }
  };

  // Handle removing from cart
  const handleRemoveFromCart = (dishId) => {
    setDishes(dishes.map(dish => 
      dish.id === dishId 
        ? { 
            ...dish, 
            inCart: false, 
            cartQuantity: 0 
          }
        : dish
    ));
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) {
      return;
    }
    
    setDishes(dishes.map(dish => ({
      ...dish,
      inCart: false,
      cartQuantity: 0
    })));
    
    // Reset calculator
    resetCalculatorToDefault();
    
  };

  const handleAddCategory = (category) => {
    const newCategory = {
      ...category,
      id: category.id || `CAT${String(categories.length + 1).padStart(3, '0')}`,
      dishCount: 0,
      createdAt: new Date().toISOString()
    };
    setCategories([...categories, newCategory]);
  };

  const handleUpdateCategory = (updatedCategory) => {
    setCategories(categories.map(cat => 
      cat.id === updatedCategory.id ? updatedCategory : cat
    ));
  };

  const handleDeleteCategory = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    
    if (!category) return;
    
    const dishesInCategory = dishes.filter(dish => dish.categoryId === categoryId);
    if (dishesInCategory.length > 0) {
      return;
    }
    
    setDishes(dishes.filter(dish => dish.categoryId !== categoryId));
    setCategories(categories.filter(cat => cat.id !== categoryId));
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
    }
  };

  const handleAddDish = (dish) => {
    const newDish = {
      ...dish,
      id: dish.id || `DISH${String(dishes.length + 1).padStart(3, '0')}`,
      featured: dish.featured || false,
      sku: dish.sku || `SKU${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      lastUpdated: new Date().toISOString().split('T')[0],
      inCart: false,
      cartQuantity: 0
    };
    setDishes([...dishes, newDish]);
    
    const category = categories.find(cat => cat.id === dish.categoryId);
    if (category) {
      handleUpdateCategory({
        ...category,
        dishCount: (category.dishCount || 0) + 1
      });
    }
    
  };

  const handleUpdateDish = (updatedDish) => {
    setDishes(dishes.map(dish => 
      dish.id === updatedDish.id ? updatedDish : dish
    ));
  };

  const handleDeleteDish = (dishId) => {
    const dish = dishes.find(d => d.id === dishId);
    setDishes(dishes.filter(dish => dish.id !== dishId));
    
    const category = categories.find(cat => cat.id === dish?.categoryId);
    if (category) {
      handleUpdateCategory({
        ...category,
        dishCount: Math.max(0, (category.dishCount || 0) - 1)
      });
    }
    
    if (dish) {
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => 
      sum + (item.price * item.cartQuantity), 0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  const calculateDiscount = () => {
    const totalBeforeDiscount = calculateSubtotal() + calculateTax();
    let discountAmount = parseFloat(selectedDiscount) || 0;
    
    if (discountAmount > totalBeforeDiscount) {
      discountAmount = totalBeforeDiscount;
    }
    
    if (discountAmount < 0) {
      discountAmount = 0;
    }
    
    return discountAmount;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const discount = calculateDiscount();
    return subtotal + tax - discount;
  };

  const handleDiscountChange = (discountValue) => {
    const discountAmount = discountValue === '' ? 0 : parseFloat(discountValue);
    
    if (isNaN(discountAmount)) {
      setSelectedDiscount(0);
      setCalculatorValue('0');
    } else {
      setSelectedDiscount(Math.max(0, discountAmount));
      setCalculatorValue(discountAmount.toString());
    }
    
    setCalculatorMode('discount');
  };

  const handleDiscountFocus = () => {
    setCalculatorMode('discount');
    setCalculatorValue(selectedDiscount.toString());
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Cannot checkout with an empty cart', 'warning');
      return;
    }
    
    // Create order with table information
    const order = {
      id: `ORD${Date.now()}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      table: selectedTable ? `${selectedTable.name} (${selectedTable.location})` : 'No Table Selected',
      tableId: selectedTable?.id || null,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.cartQuantity,
        price: item.price,
        total: item.price * item.cartQuantity
      })),
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      discount: calculateDiscount(),
      total: calculateTotal(),
      status: 'Completed'
    };
    
    setOrderHistory(prev => [order, ...prev]);
    
    const updatedDishes = dishes.map(dish => {
      if (dish.inCart && dish.cartQuantity > 0) {
        return {
          ...dish,
          inCart: false,
          cartQuantity: 0
        };
      }
      return dish;
    });
    
    setDishes(updatedDishes);
    
    handleClearCart();
    setSelectedDiscount(0);
    setCalculatorValue('1');
    setPendingQuantity(1);
    setCalculatorMode('quantity');
    
    // Show toast with table information
    const tableInfo = selectedTable ? ` for Table ${selectedTable.name}` : '';
  };

  const handleExport = () => {
    const data = { 
      categories, 
      dishes,
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hotel-menu-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const changeThemeColor = (color) => {
    document.documentElement.style.setProperty('--primary-color', color);
    localStorage.setItem('themeColor', color);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      setCategories([]);
      setDishes([]);
      setSelectedCategoryId(null);
      setCartItems([]);
      setOrderHistory([]);
      setCalculatorValue('1');
      setSelectedDiscount(0);
      setPendingQuantity(1);
      setCalculatorMode('quantity');
      setSelectedTable(null);
    }
  };

  const toggleCheckoutPanel = () => {
    setShowCheckoutPanel(!showCheckoutPanel);
  };

  const handleClearNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  // Table selection functions
  const handleOrder1st = () => {
  };

  const handleOrder2nd = () => {
  };

  const handleTakeAway = () => {
    // Set table to takeaway mode
    setSelectedTable({
      id: 'takeaway',
      name: 'Take Away',
      location: 'Counter',
      isAvailable: true
    });
  };

  const handleNewOrder = () => {
    if (cartItems.length > 0) {
      if (window.confirm('Start a new order? Current cart will be cleared.')) {
        handleClearCart();
        setShowTablePopup(true);
      }
    } else {
      setShowTablePopup(true);
    }
  };

  // Handle table selection from popup
  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setShowTablePopup(false);
  };

  // Handle opening table popup from ProductSection textbox
  const handleTableTextboxClick = () => {
    setShowTablePopup(true);
  };

  // Toast Container Component
  const ToastContainer = () => (
    <div className="toast-container">
      {toasts.map(toast => {
        let borderColor = '#ef4444';
        let bgColor = '#fef2f2';
        let iconColor = '#ef4444';
        
        if (toast.type === 'success') {
          borderColor = '#10b981';
          bgColor = '#ecfdf5';
          iconColor = '#10b981';
        } else if (toast.type === 'info') {
          borderColor = '#3b82f6';
          bgColor = '#eff6ff';
          iconColor = '#3b82f6';
        }
        
        return (
          <div 
            key={toast.id}
            className="toast"
            style={{ borderLeftColor: borderColor, backgroundColor: bgColor }}
            onClick={() => removeToast(toast.id)}
          >
            <div className="toast-icon" style={{ color: iconColor }}>
              {toast.type === 'success' ? <FiCheckCircle /> : toast.type === 'info' ? <FiInfo /> : <FiAlertTriangle />}
            </div>
            <div className="toast-content">
              <div className="toast-message" style={{ color: '#111827', fontWeight: '600' }}>
                {toast.message}
              </div>
              <div className="toast-time" style={{ color: '#6b7280' }}>
                {new Date(toast.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <button className="toast-close" onClick={(e) => {
              e.stopPropagation();
              removeToast(toast.id);
            }}>
              <FiX style={{ color: '#9ca3af' }} />
            </button>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onChangeThemeColor={changeThemeColor}
        stats={stats}
        notifications={notifications}
        onClearNotification={handleClearNotification}
        cartCount={cartItems.reduce((sum, item) => sum + item.cartQuantity, 0)}
        onToggleCheckout={toggleCheckoutPanel}
        showCheckoutPanel={showCheckoutPanel}
        onExport={handleExport}
        onClearAll={handleClearAll}
      />
      
      <div 
        className="main-content" 
        ref={mainContentRef}
        style={{ 
          marginLeft: isMobile ? '0' : `${sidebarWidth}px`,
          width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
        }}
      >
        <ToastContainer />
        
        <div className="background-effects">
          <div className="gradient-blob blob-1"></div>
          <div className="gradient-blob blob-2"></div>
          <div className="gradient-blob blob-3"></div>
        </div>
        
        <div className="inventory-container">
          <div className="main-layout-grid">
            <div className="left-column">
              <div className="products-section" style={{ height: '60vh' }}>
                <ProductSection
                  products={getFilteredDishes()}
                  selectedCategory={categories.find(cat => cat.id === selectedCategoryId)}
                  showForm={showProductForm}
                  selectedCategoryId={selectedCategoryId}
                  onAddProduct={handleAddDish}
                  onUpdateProduct={handleUpdateDish}
                  onDeleteProduct={handleDeleteDish}
                  onAddToCart={handleAddToCartWithQuantity}
                  darkMode={darkMode}
                  pendingQuantity={pendingQuantity}
                  calculatorMode={calculatorMode}
                  selectedTable={selectedTable}
                  onTableTextboxClick={handleTableTextboxClick}
                />
              </div>
              
              <div className="categories-section" style={{ height: '40vh' }}>
                <CategorySection
                  categories={categories}
                  selectedCategoryId={selectedCategoryId}
                  showForm={showCategoryForm}
                  onSelectCategory={setSelectedCategoryId}
                  onAddCategory={handleAddCategory}
                  onUpdateCategory={handleUpdateCategory}
                  onDeleteCategory={handleDeleteCategory}
                  onShowFormChange={setShowCategoryForm}
                  onOrder1st={handleOrder1st}
                  onOrder2nd={handleOrder2nd}
                  onTakeAway={handleTakeAway}
                  onNewOrder={handleNewOrder}
                  darkMode={darkMode}
                />
              </div>
            </div>
            
            <div className="right-column">
              <div className="cart-table-section" style={{ height: '15vh' }}>
                <CartTable
                  cartItems={cartItems}
                  onRemoveFromCart={handleRemoveFromCart}
                  onUpdateQuantity={handleUpdateCartQuantity}
                />
              </div>
              
              <div className="calculator-section" style={{ height: '7vh' }}>
                <div ref={calculatorRef}>
                  <Calculator
                    onNumberSelect={handleCalculatorInput}
                    onClear={handleClearCalculator}
                    onDelete={handleCalculatorDelete}
                    currentValue={calculatorValue}
                    calculatorMode={calculatorMode}
                    pendingQuantity={pendingQuantity}
                    onResetTrigger={resetCalculatorToDefault} // Pass reset function
                  />
                </div>
              </div>
              
              <div className="total-section" style={{ height: '78vh' }}>
                <TotalAmount
                  cartItems={cartItems}
                  subtotal={calculateSubtotal()}
                  tax={calculateTax()}
                  discount={calculateDiscount()}
                  total={calculateTotal()}
                  selectedDiscount={selectedDiscount}
                  onDiscountChange={handleDiscountChange}
                  onDiscountFocus={handleDiscountFocus}
                  onCheckout={handleCheckout}
                  onClearCart={handleClearCart}
                  orderHistory={orderHistory}
                  discountInputRef={discountInputRef}
                  pendingQuantity={pendingQuantity}
                  selectedTable={selectedTable}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Selection Popup */}
      <TableSelectionPopup
        isOpen={showTablePopup}
        onClose={() => setShowTablePopup(false)}
        onTableSelect={handleTableSelect}
        currentTableId={selectedTable?.id}
      />
    </div>
  );
}

export default App;