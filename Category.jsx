import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]); // State for categories
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Handle errors
  const [deletingId, setDeletingId] = useState(null); // State to track which category is being deleted

  const navigate = useNavigate(); // Hook for navigation

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        console.log('Frontend response:', response.data);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Unable to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle navigation to the Add Category page
  const handleAddCategoryPage = () => {
    navigate('/add-category'); // Navigate to the Add Category page
  };

  // Handle navigation to the Update Category page
  const handleUpdateCategoryPage = (id) => {
    navigate(`/update-category/${id}`); // Navigate to the Update Category page with the ID
  };

  // Handle Delete Category
  const handleDeleteCategory = (id) => {
    axios.delete(`http://localhost:5000/api/categories/deleteCategory/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload(); // Reload the page after delete
      })
      .catch(err => console.log(err));
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="category">
      <h1 className="title">
        Our <span>Categories</span>
      </h1>

      {/* Button now navigates to the Add Category page */}
      <button className="btn btn-add" onClick={handleAddCategoryPage}>
        Add Category
      </button>

      <div className="box-container">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div className="box" key={category._id}>
              {/* Display the fetched image */}
              <img src={category.image || 'https://via.placeholder.com/150'} alt={category.name} />
              <h3>{category.name}</h3>
              <p>{category.description || 'No description available'}</p>

              {/* Update Button */}
              <button
                className="btn btn-update"
                onClick={() => handleUpdateCategoryPage(category._id)}
              >
                Update
              </button>

              {/* Delete Button */}
              <button
                className="btn btn-delete"
                onClick={() => handleDeleteCategory(category._id)}
                disabled={deletingId === category._id} // Disable while deleting
              >
                {deletingId === category._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))
        ) : (
          <div>No categories found.</div>
        )}
      </div>
    </section>
  );
};

export default Categories;