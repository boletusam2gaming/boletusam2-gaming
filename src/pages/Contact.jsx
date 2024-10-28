import React from 'react';
import './Contact.css';

export const Contact = () => {
  return (
        <div className="contact-container">
          <h2>Contact Us</h2>
          <p>Have questions or feedback? Drop us a message!</p>
          <form className="contact-form">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
    
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
    
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
    
            <button type="submit">Send Message</button>
          </form>
        </div>
  );
}
export default Contact;