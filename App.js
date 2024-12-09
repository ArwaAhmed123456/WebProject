import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Shop from './components/Shop';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Cart from './components/Cart';
import './style.css';
import Login from './components/login';
import { AuthProvider } from './components/AuthContext';
import SignUp from './components/SignUp';
import DeliveryOptions from './components/DeliveryOptions';
import DiscountPage from './components/DiscountPage';
import Categories from './components/Category';
import AddCategoryForm from './components/AddCategory';
import UpdateCategory from './components/UpdateCategory';
import Gallery from './components/Gallery';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discount-product/:id" element={<DiscountPage />} />

          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* categories */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-category" element={<AddCategoryForm />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />

          {/* Gallery */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />

          {/* Blogs */}
          <Route path="/blogs" element={<Blog />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> 
        
          <Route path="/delivery-options" element={<DeliveryOptions />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
export default App;

