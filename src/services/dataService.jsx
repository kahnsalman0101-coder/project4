// src/services/dataService.js
import img from "../Asset/download (3).jfif";
import img1 from "../Asset/download (1).jfif";
import img2 from "../Asset/download (2).jfif";
import img3 from "../Asset/download (4).jfif";
import img4 from "../Asset/download (5).jfif";
import img5 from "../Asset/download (6).jfif";
import img6 from "../Asset/download (7).jfif";
import img7 from "../Asset/download (8).jfif";
import img8 from "../Asset/download (9).jfif";
import img9 from "../Asset/download (10).jfif";

export const initialCategories = [
  { 
    id: "CAT001", 
    name: "Salads & Starters", 
    image: img, 
    color: "#10b981", 
    orderBy: 1,
    dishCount: 6
  },
  { 
    id: "CAT002", 
    name: "Biryani Specials", 
    image: img1, 
    color: "#f59e0b", 
    orderBy: 2,
    dishCount: 5
  },
  { 
    id: "CAT003", 
    name: "Pulao Varieties", 
    image: img2, 
    color: "#8b5cf6", 
    orderBy: 3,
    dishCount: 4
  },
  { 
    id: "CAT004", 
    name: "Curries & Gravies", 
    image: img3, 
    color: "#ef4444", 
    orderBy: 4,
    dishCount: 6
  },
  { 
    id: "CAT005", 
    name: "Breads & Rice", 
    image: img4, 
    color: "#3b82f6", 
    orderBy: 5,
    dishCount: 4
  },
  { 
    id: "CAT006", 
    name: "Desserts", 
    image: img5, 
    color: "#ec4899", 
    orderBy: 6,
    dishCount: 4
  },
  { 
    id: "CAT007", 
    name: "Beverages", 
    image: img6, 
    color: "#06b6d4", 
    orderBy: 7,
    dishCount: 5
  }
];

export const initialDishes = [
  // Salads & Starters Category (6 dishes)
  { 
    id: "DISH001", 
    categoryId: "CAT001", 
    name: "Greek Salad", 
    image: img, 
    price: 12.99, 
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
    image: img1, 
    price: 10.99, 
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
    image: img2, 
    price: 14.99, 
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
    image: img3, 
    price: 13.99, 
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
    image: img4, 
    price: 8.99, 
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
    image: img5, 
    price: 11.99, 
    orderBy: 6,
    description: "Spicy chicken wings with BBQ sauce",
    isVeg: false,
    spiceLevel: 3,
    preparationTime: 15
  },
  
  // Biryani Specials Category (5 dishes)
  { 
    id: "DISH007", 
    categoryId: "CAT002", 
    name: "Chicken Biryani", 
    image: img6, 
    price: 16.99, 
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
    image: img7, 
    price: 19.99, 
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
    image: img8, 
    price: 14.99, 
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
    image: img9, 
    price: 13.99, 
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
    image: img, 
    price: 17.99, 
    orderBy: 5,
    description: "Authentic Hyderabadi style biryani",
    isVeg: false,
    spiceLevel: 4,
    preparationTime: 35
  },
  
  // Pulao Varieties Category (4 dishes)
  { 
    id: "DISH012", 
    categoryId: "CAT003", 
    name: "Kashmiri Pulao", 
    image: img1, 
    price: 13.99, 
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
    image: img2, 
    price: 11.99, 
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
    image: img3, 
    price: 10.99, 
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
    image: img4, 
    price: 12.99, 
    orderBy: 4,
    description: "Rice cooked with mixed vegetables",
    isVeg: true,
    spiceLevel: 2,
    preparationTime: 18
  },
  
  // Curries & Gravies Category (6 dishes)
  { 
    id: "DISH016", 
    categoryId: "CAT004", 
    name: "Butter Chicken", 
    image: img5, 
    price: 18.99, 
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
    image: img6, 
    price: 16.99, 
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
    image: img7, 
    price: 15.99, 
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
    image: img8, 
    price: 13.99, 
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
    image: img9, 
    price: 14.99, 
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
    image: img, 
    price: 17.99, 
    orderBy: 6,
    description: "Coastal style fish curry",
    isVeg: false,
    spiceLevel: 3,
    preparationTime: 22
  },
  
  // Breads & Rice Category (4 dishes)
  { 
    id: "DISH022", 
    categoryId: "CAT005", 
    name: "Butter Naan", 
    image: img1, 
    price: 3.99, 
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
    image: img2, 
    price: 4.99, 
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
    image: img3, 
    price: 5.99, 
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
    image: img4, 
    price: 2.99, 
    orderBy: 4,
    description: "Whole wheat Indian bread",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 4
  },
  
  // Desserts Category (4 dishes)
  { 
    id: "DISH026", 
    categoryId: "CAT006", 
    name: "Gulab Jamun", 
    image: img5, 
    price: 6.99, 
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
    image: img6, 
    price: 7.99, 
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
    image: img7, 
    price: 5.99, 
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
    image: img8, 
    price: 8.99, 
    orderBy: 4,
    description: "Chocolate brownie with ice cream",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 5
  },
  
  // Beverages Category (5 dishes)
  { 
    id: "DISH030", 
    categoryId: "CAT007", 
    name: "Fresh Lime Soda", 
    image: img9, 
    price: 4.99, 
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
    image: img, 
    price: 5.99 , 
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
    image: img1, 
    price: 3.99, 
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
    image: img2, 
    price: 6.99, 
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
    image: img3, 
    price: 5.99, 
    orderBy: 5,
    description: "Orange, pineapple, or mixed fruit",
    isVeg: true,
    spiceLevel: 1,
    preparationTime: 5
  }
];

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