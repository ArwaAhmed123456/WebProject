import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    });
    setProducts(products.filter(product => product._id !== id));
  };

  return (
    <>
      <Header />
      <div className="heading">
        <h1>Our Shop</h1>
        <p>
          <Link to="/">Home --</Link> Shop
        </p>
      </div>

      <section className="products">
        <h1 className="title">
          Our <span>Products</span>
        </h1>
        <div className="add-product-button">
          <Link to="/add-product">
            <button>Add New Product</button>
          </Link>
        </div>
        <div className="box-container">
          {products.map((product) => (
            <div className="box" key={product._id}>
              <div className="image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="content">
                <h3>{product.name}</h3>
                <div className="price">${product.price}</div>
                <Link to={`/edit-product/${product._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Shop;