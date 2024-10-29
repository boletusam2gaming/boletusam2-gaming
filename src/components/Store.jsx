import React, {useEffect} from 'react';
import './Store.css';
  import { updateTitle } from '../utils/updateTitle';

const Store = () => {
  useEffect(() => {
    updateTitle("Store")
  })



  const products = [
    { id: 1, name: "Gaming Headset", price: "$59.99", description: "High-quality sound with noise cancellation.", image: "/assets/gaming_headset.jpg" },
    { id: 2, name: "Mechanical Keyboard", price: "$89.99", description: "RGB lighting with customizable keys.", image: "/path/to/keyboard.jpg" },
    { id: 3, name: "Gaming Mouse", price: "$49.99", description: "High precision with programmable buttons.", image: "/path/to/mouse.jpg" }
  ];

  return (
    <div className="store-container">
      <h2>Store</h2>
      <p>Welcome to our gaming store! Check out our exclusive products below.</p>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">{product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
