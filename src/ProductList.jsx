import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

function ProductList({ onNavigateToCart, onNavigateToHome }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  // State management to track which products have been added to the cart
  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: "Aromatic Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=500&q=80",
          cost: "15",
          description: "Soothing fragrance and beautiful purple blooms."
        },
        {
          name: "Jasmine",
          image: "https://images.unsplash.com/photo-1592595896616-c37162298647?auto=format&fit=crop&w=500&q=80",
          cost: "18",
          description: "Sweet scent that fills the evening air."
        }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        {
          name: "Aloe Vera",
          image: "https://images.unsplash.com/photo-1596742578443-7682ef52516f?auto=format&fit=crop&w=500&q=80",
          cost: "10",
          description: "Great for skin care and very easy to maintain."
        },
        {
          name: "Snake Plant",
          image: "https://images.unsplash.com/photo-1599593915863-74b5c7784f47?auto=format&fit=crop&w=500&q=80",
          cost: "22",
          description: "Excellent air purifier that releases oxygen at night."
        }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        {
          name: "Spider Plant",
          image: "https://images.unsplash.com/photo-1572688484438-3430147c40d5?auto=format&fit=crop&w=500&q=80",
          cost: "12",
          description: "Resilient and perfect for beginner plant parents."
        },
        {
          name: "Peace Lily",
          image: "https://images.unsplash.com/photo-1593482892290-f563d4404b3d?auto=format&fit=crop&w=500&q=80",
          cost: "20",
          description: "Elegant white flowers and great indoor air cleaner."
        }
      ]
    }
  ];

  // Handle adding plant to cart and updating addedToCart state
  const handleAddToCart = (product) => {
    dispatch(addItem(product)); // Dispatch action to Redux store

    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true, // Mark this specific product as added
    }));
  };

  // Calculate total items for the navbar cart icon badge
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="product-list-container">
      {/* Navigation Header */}
      <nav className="navbar">
        <div className="navbar-brand" onClick={onNavigateToHome} style={{ cursor: 'pointer' }}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="navbar-links">
          <span onClick={onNavigateToHome} className="nav-link">Home</span>
          <span className="nav-link active">Plants</span>
          <div className="cart-icon-container" onClick={onNavigateToCart} style={{ cursor: 'pointer' }}>
            🛒 <span className="cart-badge">{totalCartCount}</span>
          </div>
        </div>
      </nav>

      {/* Main Product Grid Container */}
      <div className="product-grid">
        {plantsArray.map((category, index) => (
          <div key={index} className="category-section">
            <h1>
              <div>{category.category}</div>
            </h1>
            <div className="product-list">
              {category.plants.map((plant, plantIndex) => (
                <div className="product-card" key={plantIndex}>
                  <img 
                    className="product-image" 
                    src={plant.image} 
                    alt={plant.name} 
                  />
                  <div className="product-title">{plant.name}</div>
                  <div className="product-description">{plant.description}</div>
                  <div className="product-cost">${plant.cost}</div>
                  <button
                    className={`product-button ${addedToCart[plant.name] ? 'added' : ''}`}
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                  >
                    {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
