import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/getBlogs'); 
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <>
            <Header />
            <div className="heading">
                <h1>Our Blogs</h1>
                <p><Link to="/">Home -- </Link> Blogs</p>
            </div>

            <section className="blogs">
                <h1 className="title">Our <span>Blogs</span></h1>
                <div className="box-container">
                    {blogs.map((blog) => (
                        <div className="box" key={blog._id}>
                            <div className="image">
                                <img src={blog.image} alt={blog.title} />
                            </div>
                            <div className="content">
                                <h3>{blog.title}</h3>
                                <p>{blog.content}</p>
                                <button className="btn">Read More</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Blog;