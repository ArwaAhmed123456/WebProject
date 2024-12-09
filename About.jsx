import React from 'react';
import Header from './Header';
import Gallery from './Gallery';

const About = () => (
  <>
    <Header />
    <div className="heading">
      <h1>About Us</h1>
      <p><a href="/">Home --</a> About</p>
    </div>

    <section className="about">
      <div className="image">
        <img src='./images/about-img.png' alt="About" />
      </div>
      <div className="content">
        <span>Welcome to our shop</span>
        <h3>Fresh and Organic Groceries</h3>
        <p>Welcome to Smart X Grocery Store – your go-to destination for fresh, organic, and high-quality groceries. From farm-fresh produce to everyday essentials, we bring you the best at affordable prices. Experience smart shopping that’s fresh, convenient, and tailored for you!</p>
        <button className="btn">Read More</button>
      </div>
    </section>


    <Gallery />
    {/* <section className="gallery">
      <h1 className="title">Our <span>Gallery</span> <a href="#">(View All)</a></h1>

      <div className="box-container">
        <div className="box">
          <img src="https://images.pexels.com/photos/3962294/pexels-photo-3962294.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Gallery Image 1" />
        </div>

        <div className="box">
          <img src='./images/photos/per1.jpg' alt="Gallery Image 2" />
        </div>

        <div className="box">
          <img src='./images/photos/per2.jpg' alt="Gallery Image 3" />
        </div>

        <div className="box">
          <img src='./images/photos/per3.jpg' alt="Gallery Image 4" />
        </div>

        <div className="box">
          <img src="https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Gallery Image 5" />
        </div>

        <div className="box">
          <img src="https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Gallery Image 6" />
        </div>
      </div>
    </section> */}

  </>
);

export default About;
