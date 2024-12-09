// src/components/Gallery.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './gallery.css'; // Ensure this path is correct
import { FaDownload, FaTrashAlt } from 'react-icons/fa';

const Gallery = () => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  const handleUpload = () => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('file', file);
    });

    axios.post('http://localhost:5000/api/images/uploadImage', formData)
      .then(res => {
        fetchImages();
        alert('Image uploaded successfully');
      })
      .catch(err => console.log(err));
  };

  const fetchImages = () => {
    axios.get('http://localhost:5000/api/images/getImage')
      .then(res => {
        setImages(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleDownloadAll = () => {
    window.location.href = 'http://localhost:5000/api/images/download-all-images';
    alert('Zip file downloaded successfully');
  };

  const deleteImage = (imageName) => {
    axios.delete(`http://localhost:5000/api/images/deleteImage/${imageName}`)
      .then(res => {
        fetchImages();
        alert('Image deleted successfully');
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <section className="gallery">
      <h1 className="title">Our <span>Gallery</span> <a href="#">(View All)</a></h1>

      <div className="gallery-container">
        <input 
          type="file"
          multiple
          onChange={e => setFiles(Array.from(e.target.files))}
          className="gallery-input-btn"
        />
        <button className="gallery-upload-btn" onClick={handleUpload}> 
          Upload 
        </button>
        <button className="download-all-btn" onClick={handleDownloadAll}> 
          Download Zip 
        </button>
        <br />
      </div>

      <div className="box-container">
        {images.map((img, index) => (
          <div className="image-container" key={index}>
            <img 
              src={`http://localhost:5000/uploads/${img.filename}`}
              alt="uploaded" 
              className="gallery-images"
            />
            <div className="action-buttons">
              <a 
                href={`http://localhost:5000/api/images/download/${img.filename}`}
                download={img.filename}
                className="download-link"
              >
                <FaDownload /> Download
              </a>
              <button 
                className="delete-button"
                onClick={() => deleteImage(img.filename)}
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;