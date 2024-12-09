import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch products from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data || []))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Fetch cart data
  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/api/cart", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setCart(data?.products || []))
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }, [token]);

  // Add product to cart or update quantity
  const addToCart = (product) => {
    if (!token) {
      alert("Please login to add items to the cart.");
      navigate("/login");
      return;
    }

    const existingProduct = cart.find(item => item.productId?._id === product._id);

    if (existingProduct) {
      const updatedCart = cart.map(item =>
        item.productId._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      // Update the server data accordingly...
    } else {
      const updatedCart = [...cart, { productId: product, quantity: 1 }];
      setCart(updatedCart);
      // Update the server data accordingly...
    }
  };

  const removeFromCart = (productId) => {
    if (!token) {
      alert("Please login to remove items from the cart.");
      navigate("/login");
      return;
    }

    const existingProduct = cart.find(item => item.productId?._id === productId);

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        const updatedCart = cart.map(item =>
          item.productId._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        setCart(updatedCart);
        // Update the server data accordingly...
      } else {
        const updatedCart = cart.filter(item => item.productId._id !== productId);
        setCart(updatedCart);
        // Update the server data accordingly...
      }
    }
  };

  const getTotalPrice = () =>
    cart.reduce((total, item) =>
      total + (item?.quantity || 0) * (item?.productId?.price || 0), 0
    );

  const filteredProducts = products.filter(product =>
    product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const proceedToCheckout = () => {
    navigate("/delivery-options");
  };

  return (
    <>
      <header>
        <h1>SmartX</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <div className="heading">
        <h1>Our Cart</h1>
        <p>
          <Link to="/">Home --</Link> Cart
        </p>
      </div>

      <div className="container">
        <h2>Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-item">
                <img
                  src={product.image}
                  alt={product.name || "Unnamed Product"}
                  className="product-image"
                />
                <h3>{product.name || "Unnamed Product"}</h3>
                <p>Price: ${product.price || "N/A"}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>

        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.productId._id} className="cart-item">
                <img
                  src={item.productId?.image || "default-image.jpg"} // Fallback image
                  alt={item.productId?.name || "Product"}
                  className="cart-image"
                />
                <h3>{item.productId?.name || "Product"}</h3>
                <p>Price: ${item.productId?.price || 0}</p>
                <p>Quantity: {item.quantity || 0}</p>
                <button onClick={() => removeFromCart(item.productId._id)}>
                  Remove
                </button>
              </div>
            ))}
            <h3>Total Price: ${getTotalPrice()}</h3>
          </div>
        )}

        {cart.length > 0 && (
          <button className="checkout-button" onClick={proceedToCheckout}>
            Proceed to Delivery Checkout
          </button>
        )}
      </div>
    </>
  );
};

export default Cart;