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
    name: "Electronics", 
    image: img, 
    color: "#8b5cf6", 
    orderBy: 1,
    productCount: 4
  },
  { 
    id: "CAT002", 
    name: "Clothing", 
    image: img1, 
    color: "#10b981", 
    orderBy: 2,
    productCount: 4
  },
  { 
    id: "CAT003", 
    name: "Books", 
    image: img2, 
    color: "#f59e0b", 
    orderBy: 3,
    productCount: 4
  },
  { 
    id: "CAT004", 
    name: "Home & Garden", 
    image: img3, 
    color: "#ef4444", 
    orderBy: 4,
    productCount: 4
  }
];

export const initialProducts = [
  // Electronics Category (4 products)
  { 
    id: "PROD001", 
    categoryId: "CAT001", 
    name: "Laptop Pro", 
    image: img4, 
    price: 1299.99, 
    orderBy: 1,
    description: "High-performance laptop with 16GB RAM"
  },
  { 
    id: "PROD002", 
    categoryId: "CAT001", 
    name: "Smartphone X", 
    image: img5, 
    price: 899.99, 
    orderBy: 2,
    description: "Latest smartphone with 5G support"
  },
  { 
    id: "PROD003", 
    categoryId: "CAT001", 
    name: "Wireless Earbuds", 
    image: img6, 
    price: 129.99, 
    orderBy: 3,
    description: "Noise-cancelling wireless earbuds"
  },
  { 
    id: "PROD004", 
    categoryId: "CAT001", 
    name: "Smart Watch", 
    image: img7, 
    price: 249.99, 
    orderBy: 4,
    description: "Fitness tracker with heart rate monitor"
  },
  
  // Clothing Category (4 products)
  { 
    id: "PROD005", 
    categoryId: "CAT002", 
    name: "Premium T-Shirt", 
    image: img8, 
    price: 29.99, 
    orderBy: 1,
    description: "100% cotton premium t-shirt"
  },
  { 
    id: "PROD006", 
    categoryId: "CAT002", 
    name: "Designer Jeans", 
    image: img9, 
    price: 79.99, 
    orderBy: 2,
    description: "Slim fit designer denim jeans"
  },
  { 
    id: "PROD007", 
    categoryId: "CAT002", 
    name: "Hoodie", 
    image: img4, 
    price: 49.99, 
    orderBy: 3,
    description: "Comfortable cotton hoodie"
  },
  { 
    id: "PROD008", 
    categoryId: "CAT002", 
    name: "Running Shoes", 
    image: img5, 
    price: 99.99, 
    orderBy: 4,
    description: "Lightweight running shoes"
  },
  
  // Books Category (4 products)
  { 
    id: "PROD009", 
    categoryId: "CAT003", 
    name: "Best-Selling Novel", 
    image: img6, 
    price: 19.99, 
    orderBy: 1,
    description: "Award-winning fiction novel"
  },
  { 
    id: "PROD010", 
    categoryId: "CAT003", 
    name: "Tech Guide", 
    image: img7, 
    price: 34.99, 
    orderBy: 2,
    description: "Complete guide to modern web development"
  },
  { 
    id: "PROD011", 
    categoryId: "CAT003", 
    name: "Cookbook", 
    image: img8, 
    price: 24.99, 
    orderBy: 3,
    description: "100 easy recipes for beginners"
  },
  { 
    id: "PROD012", 
    categoryId: "CAT003", 
    name: "Self-Help Book", 
    image: img9, 
    price: 16.99, 
    orderBy: 4,
    description: "Guide to personal development"
  },
  
  // Home & Garden Category (4 products)
  { 
    id: "PROD013", 
    categoryId: "CAT004", 
    name: "Garden Tool Set", 
    image: img4, 
    price: 59.99, 
    orderBy: 1,
    description: "Complete garden tool set"
  },
  { 
    id: "PROD014", 
    categoryId: "CAT004", 
    name: "Indoor Plant", 
    image: img5, 
    price: 29.99, 
    orderBy: 2,
    description: "Low-maintenance indoor plant"
  },
  { 
    id: "PROD015", 
    categoryId: "CAT004", 
    name: "Kitchen Utensils", 
    image: img6, 
    price: 39.99, 
    orderBy: 3,
    description: "Stainless steel kitchen utensil set"
  },
  { 
    id: "PROD016", 
    categoryId: "CAT004", 
    name: "Decorative Lamp", 
    image: img7, 
    price: 45.99, 
    orderBy: 4,
    description: "Modern decorative table lamp"
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

export const generateProductId = (existingProducts) => {
  const maxId = existingProducts.reduce((max, prod) => {
    const num = parseInt(prod.id.replace('PROD', ''));
    return num > max ? num : max;
  }, 0);
  return `PROD${String(maxId + 1).padStart(3, '0')}`;
};