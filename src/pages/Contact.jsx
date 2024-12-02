import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import { updateTitle } from '../utils/updateTitle';
import './Contact.css'; 

const Contact = () => {
  // State variables for the form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  // Update the title of the page
  useEffect(() => {
    updateTitle("Contact");
  }, []);

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the email
    const templateParams = {
      name,
      email,
      message,
    };
    // EmailJS API
    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.REACT_APP_EMAILJS_USER_ID
    ) // Promise
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      }, (error) => {
        console.log('FAILED...', error);
        setStatus('Failed to send message. Please try again.');
      });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>Have questions or feedback? Drop us a message!</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <label htmlFor="message">Message:</label>
        <textarea 
          id="message" 
          name="message" 
          rows="5" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required 
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Contact;