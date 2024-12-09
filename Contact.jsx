import React, { useState } from 'react';
import Header from './Header';
import './Contact.css';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData);
    
    try {
      await sendEmail(formObject);
      setIsSubmitted(true);
      setShowDialog(true);
      event.target.reset();
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const sendEmail = async (data) => {
    await fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
      <Header />
      <div className="heading">
        <h1>Contact Us</h1>
        <p className="breadcrumb"><a href="/">Home --</a> Contact</p>
      </div>

      <section className="contact">
        <div className="row">
          <form onSubmit={handleSubmit}>
            <h3>Get in Touch</h3>
            <div className="inputBox">
              <input type="text" name="name" placeholder="Enter your name" className="box" required />
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                className="box" 
                required 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="inputBox">
              <input type="number" name="number" placeholder="Enter your number" className="box" required />
              <input type="text" name="subject" placeholder="Enter your subject" className="box" required />
            </div>
            <textarea name="message" placeholder="Your message" cols="30" rows="10" className="box" required></textarea>
            <button type="submit" className="btn">Send Message</button>
          </form>
        </div>

        {/* Dialog Box for Confirmation */}
        {showDialog && (
          <div className="dialog">
            <div className="dialog-content">
              <span className="close" onClick={handleCloseDialog}>&times;</span>
              <p>Your message has been sent successfully!</p>
              <p>Message sent to: {email}</p>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Contact;