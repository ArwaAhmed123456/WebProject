import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCategory = () => {
  const { id } = useParams(); 
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch existing data from backend
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        console.log('Fetching category with ID:', id);
        const result = await axios.get(`http://localhost:5000/api/categories/${id}`);
        const { name, image, description, status } = result.data; // Destructure the response
        setName(name);
        setImage(image);
        setDescription(description);
        setStatus(status);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching category:', error);
        alert('Failed to fetch category data');
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting updated category data');
      console.log('ID:',id);
      console.log('Payload:', { name, image, description, status });
  
      // Send PUT request with proper payload
      const response = await axios.put(`http://localhost:5000/api/categories/update-category/${id}`, {
        name,
        image,
        description,
        status,
      });
  
      console.log('Response from server:', response.data);
  
      alert('Category updated successfully');

      navigate('/'); // Navigate back after successful submission
    } catch (error) {
      console.error('Error updating category:', error);
      
  
      if (error.response) {
        console.error('Server Response Data:', error.response.data);
        alert(`Failed to update category: ${error.response.data.message || 'Unknown error'}`);
      } else {
        alert('Failed to connect to server');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Update Category</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit">Update Category</button>
      </form>
    </div>
  );
};

export default UpdateCategory;