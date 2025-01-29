import React from 'react';
import './SidePanel.css';


// IMport images for items
import bgLngSlvShrt from '../assets/merch/bg_lng_slv_shrt.jpg';



const SidePanel = ({ isOpen, onClose, cartItems }) => {
  return (
    // Add the side-panel class to the div element
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      <div className="side-panel-header">
        <h2>Shopping Cart</h2>
        <button onClick={onClose} className="close-button">✖</button>
      </div>
      <div className="side-panel-content">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="product-item">
              <img src={item.image || bgLngSlvShrt} alt={item.name} />
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SidePanel;