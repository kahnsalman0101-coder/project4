import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Components/Sidebar';
import CategorySection from './Components/CategorySection';
import ProductSection from './Components/ProductSection';
import CartTable from './Components/CartTable';
import Calculator from './Components/Calculator';
import TotalAmount from './Components/TotalAmount';
import { initialCategories, initialDishes } from './services/dataService';
import './App.css';

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
  
  const [cartItems, setCartItems] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(10);
  const [showCheckoutPanel, setShowCheckoutPanel] = useState(true);
  const [orderHistory, setOrderHistory] = useState([]);
  
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
      quantity: Math.floor(Math.random() * 50) + 1,
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
    const totalValue = dishes.reduce((sum, dish) => 
      sum + (dish.price || 0) * (dish.quantity || 0), 0
    );
    
    const averagePrice = dishes.length > 0 
      ? dishes.reduce((sum, dish) => sum + (dish.price || 0), 0) / dishes.length 
      : 0;
    
    setStats({
      totalCategories: categories.length,
      totalDishes: dishes.length,
      lowStock: dishes.filter(d => d.quantity < 10 && d.quantity > 0).length,
      outOfStock: dishes.filter(d => d.quantity === 0).length,
      totalValue: totalValue,
      averagePrice: averagePrice
    });
    
    setTotalPrice(totalValue);
  }, [dishes, categories]);

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
        filtered = filtered.filter(dish => dish.quantity < 10 && dish.quantity > 0);
        break;
      case 'out-of-stock':
        filtered = filtered.filter(dish => dish.quantity === 0);
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

  const handleAddCategory = (category) => {
    const newCategory = {
      ...category,
      id: category.id || `CAT${String(categories.length + 1).padStart(3, '0')}`,
      dishCount: 0,
      createdAt: new Date().toISOString()
    };
    setCategories([...categories, newCategory]);
    
    setNotifications(prev => [{
      id: Date.now(),
      message: `Category "${category.name}" added`,
      type: 'success',
      time: 'Just now'
    }, ...prev.slice(0, 4)]);
  };

  const handleUpdateCategory = (updatedCategory) => {
    setCategories(categories.map(cat => 
      cat.id === updatedCategory.id ? updatedCategory : cat
    ));
  };

  const handleDeleteCategory = (categoryId) => {
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
      quantity: dish.quantity || 0,
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
    
    setNotifications(prev => [{
      id: Date.now(),
      message: `Dish "${dish.name}" added`,
      type: 'success',
      time: 'Just now'
    }, ...prev.slice(0, 4)]);
  };

  const handleUpdateDish = (updatedDish) => {
    setDishes(dishes.map(dish => 
      dish.id === updatedDish.id ? updatedDish : dish
    ));
  };

  const handleDeleteDish = (dishId) => {
    setDishes(dishes.filter(dish => dish.id !== dishId));
  };

  const handleAddToCart = (dish) => {
    setDishes(dishes.map(d => 
      d.id === dish.id 
        ? { 
            ...d, 
            inCart: true, 
            cartQuantity: d.cartQuantity + 1 
          }
        : d
    ));
  };

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

  const handleUpdateCartQuantity = (dishId, quantity) => {
    if (quantity < 0) return;
    
    const dish = dishes.find(d => d.id === dishId);
    if (dish && quantity > dish.quantity) {
      alert(`Only ${dish.quantity} items available in stock`);
      return;
    }
    
    setDishes(dishes.map(dish => 
      dish.id === dishId 
        ? { 
            ...dish, 
            cartQuantity: quantity,
            inCart: quantity > 0
          }
        : dish
    ));
  };

  const handleClearCart = () => {
    setDishes(dishes.map(dish => ({
      ...dish,
      inCart: false,
      cartQuantity: 0
    })));
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
    return calculateSubtotal() * (selectedDiscount / 100);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const discount = calculateDiscount();
    return subtotal + tax - discount;
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Please add items to cart first');
      return;
    }
    
    // Create order record
    const order = {
      id: `ORD${Date.now()}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
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
    
    // Add to order history
    setOrderHistory(prev => [order, ...prev]);
    
    // Update stock after checkout
    const updatedDishes = dishes.map(dish => {
      if (dish.inCart && dish.cartQuantity > 0) {
        return {
          ...dish,
          quantity: Math.max(0, dish.quantity - dish.cartQuantity),
          inCart: false,
          cartQuantity: 0
        };
      }
      return dish;
    });
    
    setDishes(updatedDishes);
    
    // Clear cart
    handleClearCart();
    
    setNotifications(prev => [{
      id: Date.now(),
      message: `Order #${order.id} completed successfully`,
      type: 'success',
      time: 'Just now'
    }, ...prev.slice(0, 4)]);
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
    if (window.confirm('Are you sure you want to clear all data?')) {
      setCategories([]);
      setDishes([]);
      setSelectedCategoryId(null);
      setCartItems([]);
      setOrderHistory([]);
    }
  };

  const toggleCheckoutPanel = () => {
    setShowCheckoutPanel(!showCheckoutPanel);
  };

  const handleClearNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

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
        cartCount={cartItems.length}
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
        <div className="background-effects">
          <div className="gradient-blob blob-1"></div>
          <div className="gradient-blob blob-2"></div>
          <div className="gradient-blob blob-3"></div>
        </div>
        
        <div className="inventory-container">
          <div className="main-layout-grid">
            {/* Left Column */}
            <div className="left-column">
              {/* Product Section - 60% height */}
              <div className="products-section" style={{ height: '60vh' }}>
                <ProductSection
                  products={getFilteredDishes()}
                  selectedCategory={categories.find(cat => cat.id === selectedCategoryId)}
                  showForm={showProductForm}
                  selectedCategoryId={selectedCategoryId}
                  onAddProduct={handleAddDish}
                  onUpdateProduct={handleUpdateDish}
                  onDeleteProduct={handleDeleteDish}
                  onAddToCart={handleAddToCart}
                  onShowFormChange={setShowProductForm}
                  darkMode={darkMode}
                />
              </div>
              
              {/* Category Section - 40% height */}
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
                  darkMode={darkMode}
                />
              </div>
            </div>
            
            {/* Right Column */}
            <div className="right-column">
              {/* Cart Table - 15% height */}
              <div className="cart-table-section" style={{ height: '15vh' }}>
                <CartTable
                  cartItems={cartItems}
                  onRemoveFromCart={handleRemoveFromCart}
                  onUpdateQuantity={handleUpdateCartQuantity}
                />
              </div>
              
              {/* Calculator - 7% height */}
              <div className="calculator-section" style={{ height: '7vh' }}>
                <Calculator
                  onCalculate={(result) => {
                    // Handle calculation result if needed
                  }}
                  onClear={handleClearCart}
                />
              </div>
              
              {/* Total Amount - Remaining height */}
              <div className="total-section" style={{ height: '78vh' }}>
                <TotalAmount
                  cartItems={cartItems}
                  subtotal={calculateSubtotal()}
                  tax={calculateTax()}
                  discount={calculateDiscount()}
                  total={calculateTotal()}
                  selectedDiscount={selectedDiscount}
                  onDiscountChange={setSelectedDiscount}
                  onCheckout={handleCheckout}
                  orderHistory={orderHistory}
                />
              </div>
            </div>
          </div>
          
          {isMobile && (
            <button 
              className="mobile-checkout-toggle"
              onClick={toggleCheckoutPanel}
            >
              <span className="cart-icon">🛒</span>
              <span className="cart-count">{cartItems.length}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;