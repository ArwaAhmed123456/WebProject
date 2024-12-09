import React from 'react';
import './Footer.css'; 



const Footer = () => (
  <section className="footer">
    <div className="credit">
      contact +111-234-3789       email smartxstore@gmail.com
    </div>
    <div className="social-media">
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
        <i className="fab fa-instagram"></i> {}
      </a>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
        <i className="fab fa-facebook-f"></i>
      </a>
    </div>
  </section>
);

export default Footer;
