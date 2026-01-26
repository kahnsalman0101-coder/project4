const generateProductColor = (categoryColor, index, totalInCategory) => {
  // Convert hex to RGB
  const hex = categoryColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Create variations based on position in category
  const position = (index) / totalInCategory;
  
  // Generate gradient colors
  const gradient1 = `linear-gradient(135deg, ${categoryColor} 0%, rgba(${r}, ${g}, ${b}, 0.7) 100%)`;
  const gradient2 = `linear-gradient(135deg, rgba(${r + 50}, ${g + 50}, ${b + 50}, 0.8) 0%, rgba(${r}, ${g}, ${b}, 0.6) 100%)`;
  
  return {
    gradient1,
    gradient2,
    primary: categoryColor,
    textColor: (r * 0.299 + g * 0.587 + b * 0.114) > 150 ? '#000000' : '#FFFFFF'
  };
};

export const initialCategories = [
  { 
    id: "CAT001", 
    name: "Salads", 
    color: "#ef4444",  // Red
    orderBy: 2,
  },
  { 
    id: "CAT002", 
    name: "Biryani", 
    color: "#3b82f6",  // Blue
    orderBy: 1,
  },
  { 
    id: "CAT003", 
    name: "Pulao", 
    color: "#10b981",  // Green
    orderBy: 3,
  },
  { 
    id: "CAT004", 
    name: "Curries", 
    color: "#8b5cf6",  // Purple
    orderBy: 4,
  },
  { 
    id: "CAT005", 
    name: "Breads", 
    color: "#f59e0b",  // Orange
    orderBy: 5,
  },
  { 
    id: "CAT006", 
    name: "Desserts", 
    color: "#ec4899",  // Pink
    orderBy: 6,
  },
  { 
    id: "CAT007", 
    name: "Beverages", 
    color: "#06b6d4",  // Cyan
    orderBy: 7,
  },
  { 
    id: "CAT008", 
    name: "Fast Food", 
    color: "#f97316",  // Orange-2
    orderBy: 8,
  },
  { 
    id: "CAT009", 
    name: "Seafood", 
    color: "#0ea5e9",  // Sky Blue
    orderBy: 9,
  },
  { 
    id: "CAT010", 
    name: "Vegetarian", 
    color: "#22c55e",  // Green-2
    orderBy: 10,
  },
];

export const initialDishes = [
  // Salads Category (CAT001)
  { 
    id: "DISH001", 
    categoryId: "CAT001", 
    name: "Greek Salad with Feta", 
    price: 299,
    orderBy: 1,
    description: "Fresh vegetables with feta cheese and olives",
    color: generateProductColor("#ef4444", 0, 6).gradient1,
  },
  { 
    id: "DISH002", 
    categoryId: "CAT001", 
    name: "Caesar Salad", 
    price: 259,
    orderBy: 2,
    description: "Romaine lettuce with croutons and Caesar dressing",
    color: generateProductColor("#ef4444", 1, 6).gradient1,
  },
  { 
    id: "DISH003", 
    categoryId: "CAT001", 
    name: "Chicken Tikka", 
    price: 349,
    orderBy: 3,
    description: "Grilled chicken pieces marinated in spices",
    color: generateProductColor("#ef4444", 2, 6).gradient1,
  },
  { 
    id: "DISH004", 
    categoryId: "CAT001", 
    name: "Paneer Tikka", 
    price: 329,
    orderBy: 4,
    description: "Grilled cottage cheese cubes with spices",
    color: generateProductColor("#ef4444", 3, 6).gradient1,
  },
  { 
    id: "DISH005", 
    categoryId: "CAT001", 
    name: "Spring Rolls", 
    price: 199,
    orderBy: 5,
    description: "Crispy vegetable spring rolls with sauce",
    color: generateProductColor("#ef4444", 4, 6).gradient1,
  },
  { 
    id: "DISH006", 
    categoryId: "CAT001", 
    name: "Chicken Wings", 
    price: 279,
    orderBy: 6,
    description: "Spicy chicken wings with BBQ sauce",
    color: generateProductColor("#ef4444", 5, 6).gradient1,
  },
  
  // Biryani Specials Category (CAT002)
  { 
    id: "DISH007", 
    categoryId: "CAT002", 
    name: "Chicken Biryani", 
    price: 399,
    orderBy: 1,
    description: "Fragrant basmati rice with spiced chicken",
    color: generateProductColor("#3b82f6", 0, 5).gradient1,
  },
  { 
    id: "DISH008", 
    categoryId: "CAT002", 
    name: "Mutton Biryani", 
    price: 479,
    orderBy: 2,
    description: "Premium rice with tender mutton pieces",
    color: generateProductColor("#3b82f6", 1, 5).gradient1,
  },
  { 
    id: "DISH009", 
    categoryId: "CAT002", 
    name: "Vegetable Biryani", 
    price: 349,
    orderBy: 3,
    description: "Mixed vegetables with aromatic rice",
    color: generateProductColor("#3b82f6", 2, 5).gradient1,
  },
  { 
    id: "DISH010", 
    categoryId: "CAT002", 
    name: "Egg Biryani", 
    price: 329,
    orderBy: 4,
    description: "Rice with boiled eggs and spices",
    color: generateProductColor("#3b82f6", 3, 5).gradient1,
  },
  { 
    id: "DISH011", 
    categoryId: "CAT002", 
    name: "Hyderabadi Biryani", 
    price: 429,
    orderBy: 5,
    description: "Authentic Hyderabadi style biryani",
    color: generateProductColor("#3b82f6", 4, 5).gradient1,
  },
  
  // Pulao Varieties Category (CAT003)
  { 
    id: "DISH012", 
    categoryId: "CAT003", 
    name: "Kashmiri Pulao", 
    price: 329,
    orderBy: 1,
    description: "Rice with dry fruits and saffron",
    color: generateProductColor("#10b981", 0, 4).gradient1,
  },
  { 
    id: "DISH013", 
    categoryId: "CAT003", 
    name: "Peas Pulao", 
    price: 279,
    orderBy: 2,
    description: "Simple rice with green peas",
    color: generateProductColor("#10b981", 1, 4).gradient1,
  },
  { 
    id: "DISH014", 
    categoryId: "CAT003", 
    name: "Jeera Rice", 
    price: 259,
    orderBy: 3,
    description: "Basmati rice tempered with cumin seeds",
    color: generateProductColor("#10b981", 2, 4).gradient1,
  },
  { 
    id: "DISH015", 
    categoryId: "CAT003", 
    name: "Vegetable Pulao", 
    price: 299,
    orderBy: 4,
    description: "Rice cooked with mixed vegetables",
    color: generateProductColor("#10b981", 3, 4).gradient1,
  },
  
  // Curries & Gravies Category (CAT004)
  { 
    id: "DISH016", 
    categoryId: "CAT004", 
    name: "Butter Chicken", 
    price: 449,
    orderBy: 1,
    description: "Creamy tomato-based curry with chicken",
    color: generateProductColor("#8b5cf6", 0, 6).gradient1,
  },
  { 
    id: "DISH017", 
    categoryId: "CAT004", 
    name: "Paneer Tikka Masala", 
    price: 399,
    orderBy: 2,
    description: "Cottage cheese in rich tomato gravy",
    color: generateProductColor("#8b5cf6", 1, 6).gradient1,
  },
  { 
    id: "DISH018", 
    categoryId: "CAT004", 
    name: "Chicken Curry", 
    price: 379,
    orderBy: 3,
    description: "Traditional spicy chicken curry",
    color: generateProductColor("#8b5cf6", 2, 6).gradient1,
  },
  { 
    id: "DISH019", 
    categoryId: "CAT004", 
    name: "Dal Makhani", 
    price: 329,
    orderBy: 4,
    description: "Creamy black lentils cooked overnight",
    color: generateProductColor("#8b5cf6", 3, 6).gradient1,
  },
  { 
    id: "DISH020", 
    categoryId: "CAT004", 
    name: "Palak Paneer", 
    price: 349,
    orderBy: 5,
    description: "Cottage cheese in spinach gravy",
    color: generateProductColor("#8b5cf6", 4, 6).gradient1,
  },
  { 
    id: "DISH021", 
    categoryId: "CAT004", 
    name: "Fish Curry", 
    price: 429,
    orderBy: 6,
    description: "Coastal style fish curry",
    color: generateProductColor("#8b5cf6", 5, 6).gradient1,
  },
  
  // Breads & Rice Category (CAT005)
  { 
    id: "DISH022", 
    categoryId: "CAT005", 
    name: "Butter Naan", 
    price: 99,
    orderBy: 1,
    description: "Soft leavened bread with butter",
    color: generateProductColor("#f59e0b", 0, 4).gradient1,
  },
  { 
    id: "DISH023", 
    categoryId: "CAT005", 
    name: "Garlic Naan", 
    price: 119,
    orderBy: 2,
    description: "Naan bread topped with garlic",
    color: generateProductColor("#f59e0b", 1, 4).gradient1,
  },
  { 
    id: "DISH024", 
    categoryId: "CAT005", 
    name: "Plain Rice", 
    price: 139,
    orderBy: 3,
    description: "Steamed basmati rice",
    color: generateProductColor("#f59e0b", 2, 4).gradient1,
  },
  { 
    id: "DISH025", 
    categoryId: "CAT005", 
    name: "Roti", 
    price: 69,
    orderBy: 4,
    description: "Whole wheat Indian bread",
    color: generateProductColor("#f59e0b", 3, 4).gradient1,
  },
  
  // Desserts Category (CAT006)
  { 
    id: "DISH026", 
    categoryId: "CAT006", 
    name: "Gulab Jamun", 
    price: 169,
    orderBy: 1,
    description: "Sweet milk balls in sugar syrup",
    color: generateProductColor("#ec4899", 0, 4).gradient1,
  },
  { 
    id: "DISH027", 
    categoryId: "CAT006", 
    name: "Rasmalai", 
    price: 189,
    orderBy: 2,
    description: "Soft cheese patties in sweetened milk",
    color: generateProductColor("#ec4899", 1, 4).gradient1,
  },
  { 
    id: "DISH028", 
    categoryId: "CAT006", 
    name: "Ice Cream", 
    price: 139,
    orderBy: 3,
    description: "Vanilla, chocolate, or strawberry",
    color: generateProductColor("#ec4899", 2, 4).gradient1,
  },
  { 
    id: "DISH029", 
    categoryId: "CAT006", 
    name: "Brownie", 
    price: 199,
    orderBy: 4,
    description: "Chocolate brownie with ice cream",
    color: generateProductColor("#ec4899", 3, 4).gradient1,
  },
  
  // Beverages Category (CAT007)
  { 
    id: "DISH030", 
    categoryId: "CAT007", 
    name: "Fresh Lime Soda", 
    price: 119,
    orderBy: 1,
    description: "Refreshing lime soda",
    color: generateProductColor("#06b6d4", 0, 5).gradient1,
  },
  { 
    id: "DISH031", 
    categoryId: "CAT007", 
    name: "Mango Lassi", 
    price: 149,
    orderBy: 2,
    description: "Sweet yogurt mango drink",
    color: generateProductColor("#06b6d4", 1, 5).gradient1,
  },
  { 
    id: "DISH032", 
    categoryId: "CAT007", 
    name: "Masala Chai", 
    price: 99,
    orderBy: 3,
    description: "Spiced Indian tea",
    color: generateProductColor("#06b6d4", 2, 5).gradient1,
  },
  { 
    id: "DISH033", 
    categoryId: "CAT007", 
    name: "Cold Coffee", 
    price: 169,
    orderBy: 4,
    description: "Iced coffee with cream",
    color: generateProductColor("#06b6d4", 3, 5).gradient1,
  },
  { 
    id: "DISH034", 
    categoryId: "CAT007", 
    name: "Fresh Fruit Juice", 
    price: 149,
    orderBy: 5,
    description: "Orange, pineapple, or mixed fruit",
    color: generateProductColor("#06b6d4", 4, 5).gradient1,
  }
];

// Helper function to get SORTED categories
export const getSortedCategories = () => {
  return [...initialCategories].sort((a, b) => a.orderBy - b.orderBy);
};

// Helper function to get SORTED dishes by category
export const getSortedDishesByCategory = (categoryId) => {
  const dishes = initialDishes.filter(dish => dish.categoryId === categoryId);
  return dishes.sort((a, b) => a.orderBy - b.orderBy);
};

// Helper function to get ALL dishes sorted by orderBy
export const getSortedDishes = () => {
  return [...initialDishes].sort((a, b) => a.orderBy - b.orderBy);
};

// Helper function to get category color by category ID
const getCategoryColor = (categoryId) => {
  const category = initialCategories.find(cat => cat.id === categoryId);
  return category ? category.color : '#667eea'; // Default color
};

// Helper function to get all dishes with full color object (not just gradient1)
export const getDishesWithFullColors = () => {
  return getSortedDishes().map(dish => {
    const categoryColor = getCategoryColor(dish.categoryId);
    const categoryDishes = getSortedDishesByCategory(dish.categoryId);
    const dishIndex = categoryDishes.findIndex(d => d.id === dish.id);
    
    return {
      ...dish,
      colors: generateProductColor(categoryColor, dishIndex, categoryDishes.length)
    };
  });
};

// Helper function to get category by ID
export const getCategoryById = (categoryId) => {
  return initialCategories.find(cat => cat.id === categoryId);
};

// Helper function to get dishes with full category info
export const getDishesWithCategoryInfo = () => {
  return getSortedDishes().map(dish => {
    const category = getCategoryById(dish.categoryId);
    return {
      ...dish,
      categoryName: category ? category.name : 'Unknown',
      categoryColor: category ? category.color : '#667eea',
      categoryOrder: category ? category.orderBy : 99
    };
  }).sort((a, b) => a.orderBy - b.orderBy);
};

// Get dishes by category with full color objects
export const getDishesByCategoryWithColors = (categoryId) => {
  const category = getCategoryById(categoryId);
  if (!category) return [];
  
  const dishes = getSortedDishesByCategory(categoryId);
  
  return dishes.map((dish, index) => {
    return {
      ...dish,
      colors: generateProductColor(category.color, index, dishes.length)
    };
  });
};

// Generate CSS color palette for categories
export const generateCategoryPalette = () => {
  const palette = {};
  
  getSortedCategories().forEach(category => {
    const categoryDishes = getSortedDishesByCategory(category.id);
    
    palette[category.id] = {
      primary: category.color,
      dishes: categoryDishes.map((dish, index) => {
        const colors = generateProductColor(category.color, index, categoryDishes.length);
        return {
          dishId: dish.id,
          dishName: dish.name,
          primary: colors.primary,
          gradient: colors.gradient1,
          textColor: colors.textColor
        };
      })
    };
  });
  
  return palette;
};

// Get color variations for a specific dish (full object)
export const getDishColorVariations = (dishId) => {
  const dish = initialDishes.find(d => d.id === dishId);
  if (!dish) return null;
  
  const categoryColor = getCategoryColor(dish.categoryId);
  const categoryDishes = getSortedDishesByCategory(dish.categoryId);
  const dishIndex = categoryDishes.findIndex(d => d.id === dish.id);
  
  return generateProductColor(categoryColor, dishIndex, categoryDishes.length);
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
  return dishes.filter(dish => dish.categoryId === categoryId).sort((a, b) => a.orderBy - b.orderBy);
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
  
  getSortedCategories().forEach(category => {
    categoryColors[category.id] = category.color;
  });
  
  getSortedDishes().forEach(dish => {
    dishColors[dish.id] = getDishColorVariations(dish.id);
  });
  
  return {
    categories: categoryColors,
    dishes: dishColors
  };
};

export const getCategoryModalData = (categoryId) => {
  const category = getCategoryById(categoryId);
  if (!category) return null;
  
  const dishes = getSortedDishesByCategory(categoryId);
  
  return {
    categoryName: category.name,
    categoryColor: category.color,
    totalDishes: dishes.length,
    dishes: dishes.map(dish => ({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      color: dish.color,
      description: dish.description
    }))
  };
};
