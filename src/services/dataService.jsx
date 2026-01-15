
export const initialCategories = [
  { 
    id: "CAT001", 
    name: "Salads & Starters", 
    color: "#ef4444",  // Red
    orderBy: 1,
    dishCount: 6
  },
  { 
    id: "CAT002", 
    name: "Biryani Specials", 
    color: "#3b82f6",  // Blue
    orderBy: 2,
    dishCount: 5
  },
  { 
    id: "CAT003", 
    name: "Pulao Varieties", 
    color: "#10b981",  // Green
    orderBy: 3,
    dishCount: 4
  },
  { 
    id: "CAT004", 
    name: "Curries & Gravies", 
    color: "#8b5cf6",  // Purple
    orderBy: 4,
    dishCount: 6
  },
  { 
    id: "CAT005", 
    name: "Breads & Rice", 
    color: "#f59e0b",  // Orange
    orderBy: 5,
    dishCount: 4
  },
  { 
    id: "CAT006", 
    name: "Desserts", 
    color: "#ec4899",  // Pink
    orderBy: 6,
    dishCount: 4
  },
  { 
    id: "CAT007", 
    name: "Beverages", 
    color: "#06b6d4",  // Cyan
    orderBy: 7,
    dishCount: 5
  }
];

// Helper function to get category color by category ID
const getCategoryColor = (categoryId) => {
  const category = initialCategories.find(cat => cat.id === categoryId);
  return category ? category.color : '#667eea'; // Default color
};

// Helper function to generate gradient colors based on category color
const generateProductColors = (categoryColor, index, totalInCategory) => {
  // Convert hex to RGB
  const hex = categoryColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Create variations based on position in category
  const position = (index) / totalInCategory;
  
  // Light variations for backgrounds
  const lightR = Math.min(255, r + 100);
  const lightG = Math.min(255, g + 100);
  const lightB = Math.min(255, b + 100);
  
  // Dark variations for text
  const darkR = Math.max(0, r - 50);
  const darkG = Math.max(0, g - 50);
  const darkB = Math.max(0, b - 50);
  
  // Generate complementary color
  const complementR = 255 - r;
  const complementG = 255 - g;
  const complementB = 255 - b;
  
  return {
    primary: categoryColor,
    light: `rgb(${lightR}, ${lightG}, ${lightB})`,
    dark: `rgb(${darkR}, ${darkG}, ${darkB})`,
    complement: `rgb(${complementR}, ${complementG}, ${complementB})`,
    gradient1: `linear-gradient(135deg, ${categoryColor} 0%, rgba(${r}, ${g}, ${b}, 0.7) 100%)`,
    gradient2: `linear-gradient(135deg, rgba(${lightR}, ${lightG}, ${lightB}, 0.8) 0%, rgba(${r}, ${g}, ${b}, 0.6) 100%)`,
    textColor: (r * 0.299 + g * 0.587 + b * 0.114) > 150 ? '#000000' : '#FFFFFF',
    accent: `hsl(${(r + g + b) % 360}, 70%, 60%)`
  };
};

// Helper function to get colors for a product
export const getProductColors = (dish) => {
  const categoryColor = getCategoryColor(dish.categoryId);
  const categoryDishes = initialDishes.filter(d => d.categoryId === dish.categoryId);
  const dishIndex = categoryDishes.findIndex(d => d.id === dish.id);
  
  return generateProductColors(categoryColor, dishIndex, categoryDishes.length);
};

// Helper function to get all colors for a category
export const getCategoryColors = (categoryId) => {
  const categoryColor = getCategoryColor(categoryId);
  const categoryDishes = initialDishes.filter(d => d.categoryId === categoryId);
  
  return categoryDishes.map((dish, index) => ({
    dishId: dish.id,
    dishName: dish.name,
    colors: generateProductColors(categoryColor, index, categoryDishes.length)
  }));
};

export const initialDishes = [
  // Salads & Starters Category (6 dishes) - Red category
  { 
    id: "DISH001", 
    categoryId: "CAT001", 
    color: "#3b82f6",  
    name: "Greek Salad", 
    price: 299,  // ₹299
    orderBy: 1,
    description: "Fresh vegetables with feta cheese and olives",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 15
  },
  { 
    id: "DISH002", 
    categoryId: "CAT001", 
    name: "Caesar Salad", 
    price: 259,  // ₹259
    orderBy: 2,
    description: "Romaine lettuce with croutons and Caesar dressing",
    isVeg: false,
    spiceLevel: 1,
    preparationTime: 10
  },
  { 
    id: "DISH003", 
    categoryId: "CAT001", 
    name: "Chicken Tikka", 
    price: 349,  // ₹349
    orderBy: 3,
    description: "Grilled chicken pieces marinated in spices",
    isVeg: false,
    spiceLevel: 3,
    preparationTime: 20
  },
  { 
    id: "DISH004", 
    categoryId: "CAT001", 
    name: "Paneer Tikka", 
    price: 329,  // ₹329
    orderBy: 4,
    description: "Grilled cottage cheese cubes with spices",
    isVeg: true,
    spiceLevel: 2,
    preparationTime: 18
  },
  { 
    id: "DISH005", 
    categoryId: "CAT001", 
    name: "Spring Rolls", 
    price: 199,  // ₹199
    orderBy: 5,
    description: "Crispy vegetable spring rolls with sauce",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 12
  },
  { 
    id: "DISH006", 
    categoryId: "CAT001", 
    name: "Chicken Wings", 
    price: 279,  // ₹279
    orderBy: 6,
    description: "Spicy chicken wings with BBQ sauce",
    isVeg: false,
    spiceLevel: 3,
    preparationTime: 15
  },
  
  // Biryani Specials Category (5 dishes) - Blue category
  { 
    id: "DISH007", 
    categoryId: "CAT002", 
    name: "Chicken Biryani", 
    price: 399,  // ₹399
    orderBy: 1,
    description: "Fragrant basmati rice with spiced chicken",
    isVeg: false,
    spiceLevel: 3,
    preparationTime: 30
  },
  { 
    id: "DISH008", 
    categoryId: "CAT002", 
    name: "Mutton Biryani", 
    price: 479,  // ₹479
    orderBy: 2,
    description: "Premium rice with tender mutton pieces",
    isVeg: false,
    spiceLevel: 3,
    preparationTime: 40
  },
  { 
    id: "DISH009", 
    categoryId: "CAT002", 
    name: "Vegetable Biryani", 
    price: 349,  // ₹349
    orderBy: 3,
    description: "Mixed vegetables with aromatic rice",
    isVeg: true,
    spiceLevel: 2,
    preparationTime: 25
  },
  { 
    id: "DISH010", 
    categoryId: "CAT002", 
    name: "Egg Biryani", 
    price: 329,  // ₹329
    orderBy: 4,
    description: "Rice with boiled eggs and spices",
    isVeg: false,
    spiceLevel: 2,
    preparationTime: 20
  },
  { 
    id: "DISH011", 
    categoryId: "CAT002", 
    name: "Hyderabadi Biryani", 
    price: 429,  // ₹429
    orderBy: 5,
    description: "Authentic Hyderabadi style biryani",
    isVeg: false,
    spiceLevel: 4,
    preparationTime: 35
  },
  
  // Pulao Varieties Category (4 dishes) - Green category
  { 
    id: "DISH012", 
    categoryId: "CAT003", 
    name: "Kashmiri Pulao", 
    price: 329,  // ₹329
    orderBy: 1,
    description: "Rice with dry fruits and saffron",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 20
  },
  { 
    id: "DISH013", 
    categoryId: "CAT003", 
    name: "Peas Pulao", 
    price: 279,  // ₹279
    orderBy: 2,
    description: "Simple rice with green peas",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 15
  },
  { 
    id: "DISH014", 
    categoryId: "CAT003", 
    name: "Jeera Rice", 
    price: 259,  // ₹259
    orderBy: 3,
    description: "Basmati rice tempered with cumin seeds",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 12
  },
  { 
    id: "DISH015", 
    categoryId: "CAT003", 
    name: "Vegetable Pulao", 
    price: 299,  // ₹299
    orderBy: 4,
    description: "Rice cooked with mixed vegetables",
    isVeg: true,
    spiceLevel: 2,
    preparationTime: 18
  },
  
  // Curries & Gravies Category (6 dishes) - Purple category
  { 
    id: "DISH016", 
    categoryId: "CAT004", 
    name: "Butter Chicken", 
    price: 449,  // ₹449
    orderBy: 1,
    description: "Creamy tomato-based curry with chicken",
    isVeg: false,
    spiceLevel: 2,
    preparationTime: 25
  },
  { 
    id: "DISH017", 
    categoryId: "CAT004", 
    name: "Paneer Tikka Masala", 
    price: 399,  // ₹399
    orderBy: 2,
    description: "Cottage cheese in rich tomato gravy",
    isVeg: true,
    spiceLevel: 3,
    preparationTime: 22
  },
  { 
    id: "DISH018", 
    categoryId: "CAT004", 
    name: "Chicken Curry", 
    price: 379,  // ₹379
    orderBy: 3,
    description: "Traditional spicy chicken curry",
    isVeg: false,
    spiceLevel: 4,
    preparationTime: 20
  },
  { 
    id: "DISH019", 
    categoryId: "CAT004", 
    name: "Dal Makhani", 
    price: 329,  // ₹329
    orderBy: 4,
    description: "Creamy black lentils cooked overnight",
    isVeg: true,
    spiceLevel: 2,
    preparationTime: 30
  },
  { 
    id: "DISH020", 
    categoryId: "CAT004", 
    name: "Palak Paneer", 
    price: 349,  // ₹349
    orderBy: 5,
    description: "Cottage cheese in spinach gravy",
    isVeg: true,
    spiceLevel: 2,
    preparationTime: 18
  },
  { 
    id: "DISH021", 
    categoryId: "CAT004", 
    name: "Fish Curry", 
    price: 429,  // ₹429
    orderBy: 6,
    description: "Coastal style fish curry",
    isVeg: false,
    spiceLevel: 3,
    preparationTime: 22
  },
  
  // Breads & Rice Category (4 dishes) - Orange category
  { 
    id: "DISH022", 
    categoryId: "CAT005", 
    name: "Butter Naan", 
    price: 99,  // ₹99
    orderBy: 1,
    description: "Soft leavened bread with butter",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 5
  },
  { 
    id: "DISH023", 
    categoryId: "CAT005", 
    name: "Garlic Naan", 
    price: 119,  // ₹119
    orderBy: 2,
    description: "Naan bread topped with garlic",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 6
  },
  { 
    id: "DISH024", 
    categoryId: "CAT005", 
    name: "Plain Rice", 
    price: 139,  // ₹139
    orderBy: 3,
    description: "Steamed basmati rice",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 10
  },
  { 
    id: "DISH025", 
    categoryId: "CAT005", 
    name: "Roti", 
    price: 69,  // ₹69
    orderBy: 4,
    description: "Whole wheat Indian bread",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 4
  },
  
  // Desserts Category (4 dishes) - Pink category
  { 
    id: "DISH026", 
    categoryId: "CAT006", 
    name: "Gulab Jamun", 
    price: 169,  // ₹169
    orderBy: 1,
    description: "Sweet milk balls in sugar syrup",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 8
  },
  { 
    id: "DISH027", 
    categoryId: "CAT006", 
    name: "Rasmalai", 
    price: 189,  // ₹189
    orderBy: 2,
    description: "Soft cheese patties in sweetened milk",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 8
  },
  { 
    id: "DISH028", 
    categoryId: "CAT006", 
    name: "Ice Cream", 
    price: 139,  // ₹139
    orderBy: 3,
    description: "Vanilla, chocolate, or strawberry",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 2
  },
  { 
    id: "DISH029", 
    categoryId: "CAT006", 
    name: "Brownie", 
    price: 199,  // ₹199
    orderBy: 4,
    description: "Chocolate brownie with ice cream",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 5
  },
  
  // Beverages Category (5 dishes) - Cyan category
  { 
    id: "DISH030", 
    categoryId: "CAT007", 
    name: "Fresh Lime Soda", 
    price: 119,  // ₹119
    orderBy: 1,
    description: "Refreshing lime soda",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 3
  },
  { 
    id: "DISH031", 
    categoryId: "CAT007", 
    name: "Mango Lassi", 
    price: 149,  // ₹149
    orderBy: 2,
    description: "Sweet yogurt mango drink",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 4
  },
  { 
    id: "DISH032", 
    categoryId: "CAT007", 
    name: "Masala Chai", 
    price: 99,  // ₹99
    orderBy: 3,
    description: "Spiced Indian tea",
    isVeg: true,
    spiceLevel: 2,
    preparationTime: 5
  },
  { 
    id: "DISH033", 
    categoryId: "CAT007", 
    name: "Cold Coffee", 
    price: 169,  // ₹169
    orderBy: 4,
    description: "Iced coffee with cream",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 4
  },
  { 
    id: "DISH034", 
    categoryId: "CAT007", 
    name: "Fresh Fruit Juice", 
    price: 149,  // ₹149
    orderBy: 5,
    description: "Orange, pineapple, or mixed fruit",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 5
  }
];

// Generate dishes with color properties
export const getDishesWithColors = () => {
  return initialDishes.map(dish => {
    const colors = getProductColors(dish);
    return {
      ...dish,
      colors: {
        primary: colors.primary,
        gradient: colors.gradient1,
        textColor: colors.textColor,
        accent: colors.accent
      }
    };
  });
};

// Get all dishes with their category colors
export const dishesWithColors = getDishesWithColors();

// Helper function to get category by ID
export const getCategoryById = (categoryId) => {
  return initialCategories.find(cat => cat.id === categoryId);
};

// Helper function to get dishes with full category info
export const getDishesWithCategoryInfo = () => {
  return dishesWithColors.map(dish => {
    const category = getCategoryById(dish.categoryId);
    return {
      ...dish,
      categoryName: category ? category.name : 'Unknown',
      categoryColor: category ? category.color : '#667eea',
      categoryOrder: category ? category.orderBy : 99
    };
  });
};

// Get dishes by category with color variations
export const getDishesByCategoryWithColors = (categoryId) => {
  const category = getCategoryById(categoryId);
  if (!category) return [];
  
  const dishes = initialDishes.filter(dish => dish.categoryId === categoryId);
  
  return dishes.map((dish, index) => {
    const colors = generateProductColors(category.color, index, dishes.length);
    return {
      ...dish,
      colors: {
        primary: colors.primary,
        background: colors.gradient2,
        text: colors.textColor,
        complement: colors.complement,
        accent: colors.accent
      }
    };
  });
};

// Generate CSS color palette for categories
export const generateCategoryPalette = () => {
  const palette = {};
  
  initialCategories.forEach(category => {
    const categoryDishes = initialDishes.filter(d => d.categoryId === category.id);
    
    palette[category.id] = {
      primary: category.color,
      dishes: categoryDishes.map((dish, index) => {
        const colors = generateProductColors(category.color, index, categoryDishes.length);
        return {
          dishId: dish.id,
          dishName: dish.name,
          primary: colors.primary,
          light: colors.light,
          dark: colors.dark,
          gradient: colors.gradient2,
          textColor: colors.textColor
        };
      })
    };
  });
  
  return palette;
};

// Get color variations for a specific dish
export const getDishColorVariations = (dishId) => {
  const dish = initialDishes.find(d => d.id === dishId);
  if (!dish) return null;
  
  return getProductColors(dish);
};

// Helper functions for data manipulation
export const generateCategoryId = (existingCategories) => {
  const maxId = existingCategories.reduce((max, cat) => {
    const num = parseInt(cat.id.replace('CAT', ''));
    return num > max ? num : max;
  }, 0);
  return `CAT${String(maxId + 1).padStart(3, '0')}`;
};

export const generateDishId = (existingDishes) => {
  const maxId = existingDishes.reduce((max, dish) => {
    const num = parseInt(dish.id.replace('DISH', ''));
    return num > max ? num : max;
  }, 0);
  return `DISH${String(maxId + 1).padStart(3, '0')}`;
};

// Additional helper function to get dishes by category
export const getDishesByCategoryId = (dishes, categoryId) => {
  return dishes.filter(dish => dish.categoryId === categoryId);
};

// Helper function to count dishes in a category
export const countDishesByCategory = (dishes, categoryId) => {
  return dishes.filter(dish => dish.categoryId === categoryId).length;
};

// Helper function to format price in Indian Rupees
export const formatPrice = (price) => {
  return `₹${price.toFixed(0)}`;
};

// Get all colors for UI usage
export const getAllColors = () => {
  const categoryColors = {};
  const dishColors = {};
  
  initialCategories.forEach(category => {
    categoryColors[category.id] = category.color;
  });
  
  initialDishes.forEach(dish => {
    dishColors[dish.id] = getProductColors(dish);
  });
  
  return {
    categories: categoryColors,
    dishes: dishColors
  };
};