import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showSearchForm, setShowSearchForm] = useState(isHomePage);

  // Toggle search bar visibility on scroll only on the home page
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      if (window.scrollY > 50) setShowSearchForm(false);
      else setShowSearchForm(true);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <header className="header">
      <Link to="/" className="logo">SmartX</Link>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/categories">Category</Link>
        <Link to="/delivery-options">Delivery</Link>
        <Link to="/gallery">Gallery</Link>

        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
        <Link to="/login">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        {/* Display search form only on the home page and when showSearchForm is true */}
        {isHomePage && showSearchForm && <SearchForm active={true} />}
      </nav>
      {/* Display search icon to toggle search form visibility on non-home pages */}
      {!isHomePage && (
        <FontAwesomeIcon
          icon={faSearch}
          className="icon-button"
          onClick={() => setShowSearchForm((prev) => !prev)}
        />
      )}
    </header>
  );
};

function SearchForm({ active }) {
  return (
    <form action="" className={`search-form ${active ? 'active' : ''}`}>
      <label htmlFor="search-box">
        <input type="search" placeholder="Search here..." id="search-box" />
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
      </label>
    </form>
  );
}

SearchForm.propTypes = {
  active: PropTypes.bool,
};

export default Header;
