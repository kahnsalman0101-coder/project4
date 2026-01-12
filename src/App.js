import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Components/Sidebar';
import CategorySection from './Components/CategorySection';
import ProductSection from './Components/ProductSection';
import { initialCategories, initialProducts } from './services/dataService';
import './App.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  
  // Inventory states
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Checkout states
  const [cartItems, setCartItems] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(10); // 10% default
  const [showCheckoutPanel, setShowCheckoutPanel] = useState(true);
  
  // Initialize stats with default values
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0,
    averagePrice: 0
  });
  
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Laptop stock is low (5 remaining)', type: 'warning', time: '10 min ago' },
    { id: 2, message: 'New product "Wireless Mouse" added', type: 'info', time: '1 hour ago' },
    { id: 3, message: 'Category "Electronics" updated', type: 'success', time: '2 hours ago' }
  ]);
  
  const mainContentRef = useRef(null);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      
      if (mobile) {
        setSidebarWidth(0);
        setSidebarCollapsed(true);
        setShowCheckoutPanel(false); // Hide checkout panel on mobile by default
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

  // Load initial data
  useEffect(() => {
    setCategories(initialCategories);
    
    // Initialize products with quantity, sku, and date
    const productsWithDetails = initialProducts.map(p => ({
      ...p,
      quantity: Math.floor(Math.random() * 50) + 1,
      sku: `SKU${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      lastUpdated: new Date().toISOString().split('T')[0],
      featured: Math.random() > 0.7,
      inCart: false,
      cartQuantity: 0
    }));
    
    setProducts(productsWithDetails);
    
    // Check for saved preferences
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    }
    
    const savedTheme = localStorage.getItem('themeColor') || '#8b5cf6';
    document.documentElement.style.setProperty('--primary-color', savedTheme);
  }, []);

  // Calculate stats
  useEffect(() => {
    const totalValue = products.reduce((sum, product) => 
      sum + (product.price || 0) * (product.quantity || 0), 0
    );
    
    const averagePrice = products.length > 0 
      ? products.reduce((sum, product) => sum + (product.price || 0), 0) / products.length 
      : 0;
    
    setStats({
      totalCategories: categories.length,
      totalProducts: products.length,
      lowStock: products.filter(p => p.quantity < 10 && p.quantity > 0).length,
      outOfStock: products.filter(p => p.quantity === 0).length,
      totalValue: totalValue,
      averagePrice: averagePrice
    });
    
    setTotalPrice(totalValue);
  }, [products, categories]);

  // Update cart items when products change
  useEffect(() => {
    const itemsInCart = products.filter(p => p.inCart && p.cartQuantity > 0);
    setCartItems(itemsInCart);
  }, [products]);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Filter products
  const getFilteredProducts = () => {
    let filtered = products;
    
    if (selectedCategoryId) {
      filtered = filtered.filter(product => product.categoryId === selectedCategoryId);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.id.toLowerCase().includes(query) ||
        product.sku?.toLowerCase().includes(query)
      );
    }
    
    switch (activeTab) {
      case 'low-stock':
        filtered = filtered.filter(product => product.quantity < 10 && product.quantity > 0);
        break;
      case 'out-of-stock':
        filtered = filtered.filter(product => product.quantity === 0);
        break;
      case 'featured':
        filtered = filtered.filter(product => product.featured);
        break;
      case 'in-cart':
        filtered = filtered.filter(product => product.inCart);
        break;
      default:
        break;
    }
    
    return filtered;
  };

  // Category CRUD
  const handleAddCategory = (category) => {
    const newCategory = {
      ...category,
      id: category.id || `CAT${String(categories.length + 1).padStart(3, '0')}`,
      productCount: 0,
      createdAt: new Date().toISOString()
    };
    setCategories([...categories, newCategory]);
    
    // Add notification
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
    setProducts(products.filter(product => product.categoryId !== categoryId));
    setCategories(categories.filter(cat => cat.id !== categoryId));
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
    }
  };

  // Product CRUD
  const handleAddProduct = (product) => {
    const newProduct = {
      ...product,
      id: product.id || `PROD${String(products.length + 1).padStart(3, '0')}`,
      quantity: product.quantity || 0,
      featured: product.featured || false,
      sku: product.sku || `SKU${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      lastUpdated: new Date().toISOString().split('T')[0],
      inCart: false,
      cartQuantity: 0
    };
    setProducts([...products, newProduct]);
    
    // Update category product count
    const category = categories.find(cat => cat.id === product.categoryId);
    if (category) {
      handleUpdateCategory({
        ...category,
        productCount: (category.productCount || 0) + 1
      });
    }
    
    // Add notification
    setNotifications(prev => [{
      id: Date.now(),
      message: `Product "${product.name}" added`,
      type: 'success',
      time: 'Just now'
    }, ...prev.slice(0, 4)]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(prod => 
      prod.id === updatedProduct.id ? updatedProduct : prod
    ));
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(prod => prod.id !== productId));
  };

  // Cart Functions
  const handleAddToCart = (productId) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { 
            ...product, 
            inCart: true, 
            cartQuantity: product.cartQuantity + 1 
          }
        : product
    ));
  };

  const handleRemoveFromCart = (productId) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { 
            ...product, 
            inCart: false, 
            cartQuantity: 0 
          }
        : product
    ));
  };

  const handleUpdateCartQuantity = (productId, quantity) => {
    if (quantity < 0) return;
    
    const product = products.find(p => p.id === productId);
    if (product && quantity > product.quantity) {
      alert(`Only ${product.quantity} items available in stock`);
      return;
    }
    
    setProducts(products.map(product => 
      product.id === productId 
        ? { 
            ...product, 
            cartQuantity: quantity,
            inCart: quantity > 0
          }
        : product
    ));
  };

  const handleClearCart = () => {
    setProducts(products.map(product => ({
      ...product,
      inCart: false,
      cartQuantity: 0
    })));
  };

  // Checkout Functions
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => 
      sum + (item.price * item.cartQuantity), 0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
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
    
    // Update stock after checkout
    const updatedProducts = products.map(product => {
      if (product.inCart && product.cartQuantity > 0) {
        return {
          ...product,
          quantity: Math.max(0, product.quantity - product.cartQuantity),
          inCart: false,
          cartQuantity: 0
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    
    const total = calculateTotal();
    alert(`Checkout successful! Total: $${total.toFixed(2)}`);
    
    // Add notification
    setNotifications(prev => [{
      id: Date.now(),
      message: `Checkout completed for ${cartItems.length} items`,
      type: 'success',
      time: 'Just now'
    }, ...prev.slice(0, 4)]);
  };

  // Export
  const handleExport = () => {
    const data = { 
      categories, 
      products,
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `inventory-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  // Theme
  const changeThemeColor = (color) => {
    document.documentElement.style.setProperty('--primary-color', color);
    localStorage.setItem('themeColor', color);
  };

  // Clear All
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      setCategories([]);
      setProducts([]);
      setSelectedCategoryId(null);
      setCartItems([]);
    }
  };

  // Toggle checkout panel
  const toggleCheckoutPanel = () => {
    setShowCheckoutPanel(!showCheckoutPanel);
  };

  // Get selected category name
  const getSelectedCategoryName = () => {
    const category = categories.find(cat => cat.id === selectedCategoryId);
    return category ? category.name : 'All Categories';
  };

  // Clear notification
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
          {/* Main Layout Grid */}
          <div className="main-layout-grid">
            {/* Left Column: Products and Categories */}
            <div className="left-column">
              {/* Products Section - TOP */}
              <div className="products-top-section">
                <ProductSection
                  products={getFilteredProducts()}
                  selectedCategory={categories.find(cat => cat.id === selectedCategoryId)}
                  showForm={showProductForm}
                  selectedCategoryId={selectedCategoryId}
                  onAddProduct={handleAddProduct}
                  onUpdateProduct={handleUpdateProduct}
                  onDeleteProduct={handleDeleteProduct}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                  onUpdateCartQuantity={handleUpdateCartQuantity}
                  onShowFormChange={setShowProductForm}
                  darkMode={darkMode}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>
              
              {/* Categories Section - BELOW Products */}
              <div className="categories-bottom-section">
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
            
            
          </div>
          
          {/* Floating Action Button for Mobile */}
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