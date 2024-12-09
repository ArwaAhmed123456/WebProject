// import React from 'react';
// import Header from './Header';
// import Footer from './Footer';

// const Review = () => (
//   <>
//     <Header />
//     <div className="heading">
//       <h1>Client's Review</h1>
//       <p><a href="/">Home -- </a> Review</p>
//     </div>

//     {/* Info Section */}
//     <section className="info-container">
//       <div className="info">
//         <img src={require('./images/icon-1.png')} alt="Fast Delivery" />
//         <div className="content">
//           <h3>Fast Delivery</h3>
//           <span>Within 30 minutes</span>
//         </div>
//       </div>

//       <div className="info">
//         <img src={require('./images/icon-2.png')} alt="24/7 Available" />
//         <div className="content">
//           <h3>24/7 Available</h3>
//           <span>Call us anytime</span>
//         </div>
//       </div>

//       <div className="info">
//         <img src={require('./images/icon-3.png')} alt="Easy Payments" />
//         <div className="content">
//           <h3>Easy Payments</h3>
//           <span>Cash or Credit</span>
//         </div>
//       </div>
//     </section>

//     {/* Review Section */}
//     <section className="review">
//       {[
//         {
//           img: require('./images/rock.jpeg'),
//           name: 'Roman',
//           title: "Happy Client",
//           review: "Absolutely fantastic service! The delivery was quick, and the products were fresh. I highly recommend this shop to anyone looking for quality and fast service!",
//         },
//         {
//           img: require('./images/john.jpeg'),
//           name: 'John',
//           title: "Happy Client",
//           review: "I'm impressed with the variety of organic items available. The support team is friendly, and the checkout process was seamless. I will definitely be shopping here again!",
//         },
//         {
//           img: require('./images/roman.jpeg'),
//           name: 'Roman',
//           title: "Happy Client",
//           review: "Best grocery experience ever! The quality of the produce is top-notch, and the delivery is always on time. I appreciate the attention to detail and great customer service.",
//         },
//         {
//           img: require('./images/alexa.jpeg'),
//           name: 'Alexa',
//           title: "Happy Client",
//           review: "The website is very user-friendly, and I found exactly what I needed. The delivery was quick, and the packaging was excellent. Five stars for sure!",
//         },
//         {
//           img: require('./images/banks.jpeg'),
//           name: 'Banks',
//           title: "Happy Client",
//           review: "I love that this store offers so many organic options. The customer support was very helpful when I had questions about my order. I will recommend this store to my friends.",
//         },
//         {
//           img: require('./images/lynch.jpeg'),
//           name: 'Lynch',
//           title: "Happy Client",
//           review: "Superb quality and fast delivery! The prices are reasonable, and I love the variety of products available. I am a satisfied customer and will be back for more!",
//         },
//       ].map((review, index) => (
//         <div className="box" key={index}>
//           <div className="user">
//             <img src={review.img} alt={review.name} />
//             <div className="info">
//               <h3>{review.name}</h3>
//               <span>{review.title}</span>
//             </div>
//           </div>
//           <p>{review.review}</p>
//         </div>
//       ))}
//     </section>

//     <Footer />
//   </>
// );

// export default Review;
