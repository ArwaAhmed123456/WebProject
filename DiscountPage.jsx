import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DiscountPage.css';

const DiscountPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/discount-products/${id}`);
        console.log('API Response:', response.data); // Debugging log
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="discount-container">
      <div className="product-card">
      <img src={`/${product.image}`} alt={product.name} />
        <div className="product-details">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-category">Category: {product.category}</p>
          <p className="product-discount">Discount: {product.discount}</p>
        </div>
      </div>
    </div>
  );
};

export default DiscountPage;
