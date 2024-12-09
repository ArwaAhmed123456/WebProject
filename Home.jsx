import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [discountProducts, setDiscountProducts] = useState([]);

  useEffect(() => {
    const fetchDiscountProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/discount-products');
        console.log('Fetched products:', response.data);
        setDiscountProducts(response.data);
      } catch (error) {
        console.error('Error fetching discount products', error);
      }
    };
    fetchDiscountProducts();
  }, []);

  return (
    <>
      <Header />
      <section className="home">
        {/* Display the first image as a full-width hero image */}
        {discountProducts.length > 0 && (
          <img
            className="hero-image"
            src={`/${discountProducts[0].image}`}
            alt={discountProducts[0].name}
          />
        )}

        <h2>Exclusive Discount Products</h2>
        <div className="products-container">
          {discountProducts.slice(1).map((product) => (
            <div key={product._id} className="product-card">
              <img src={`/${product.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Discount Price: ${product.discountPrice}</p>
              <Link to={`/discount-product/${product._id}`} className="btn">
                Shop Now
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
