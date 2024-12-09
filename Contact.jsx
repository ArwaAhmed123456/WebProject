import React from 'react';
import Header from './Header';
//import Footer from './Footer';
import './Contact.css';

const Contact = () => (
  <>
    <Header />
    <div className="heading">
      <h1>Contact Us</h1>
      <p className="breadcrumb"><a href="/">Home --</a> Contact</p>
    </div>

    <section className="contact">
      <div className="icons-container">
        <div className="icons">
          <i className="fas fa-phone"></i>
          <h3>Our Number</h3>
          <p>+111-123-7860</p>
          <p>+111-234-3789</p>
        </div>
        <div className="icons">
          <i className="fas fa-envelope"></i>
          <h3>Our Email</h3>
          <p>smartxstore@gmail.com</p>
        </div>
        <div className="icons">
          <i className="fas fa-map-marker-alt"></i>
          <h3>Our Address</h3>
          <p>Islamabad</p>
        </div>
      </div>

      <div className="row">
        {/* Contact Form */}
        <form>
          <h3>Get in Touch</h3>
          <div className="inputBox">
            <input type="text" placeholder="Enter your name" className="box" />
            <input type="email" placeholder="Enter your email" className="box" />
          </div>
          <div className="inputBox">
            <input type="number" placeholder="Enter your number" className="box" />
            <input type="text" placeholder="Enter your subject" className="box" />
          </div>
          <textarea placeholder="Your message" cols="30" rows="10" className="box"></textarea>
          <button type="submit" className="btn">Send Message</button>
        </form>

        {/* Map Image */}
        <img
          className="map"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_HbVwYQ_OCYQMLgx_CpVSnaRlxiGRFMq2Ew&usqp=CAU"
          alt="Map"
        />
      </div>
    </section>

  </>
);

export default Contact;
