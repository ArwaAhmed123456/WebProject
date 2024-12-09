// Import necessary packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./db"); // MongoDB connection
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");
const deliveryRoutes = require("./routes/delivery");
const discountProductRoutes = require('./routes/discountProductRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); 
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const rateLimit = require("express-rate-limit");
const imageRoutes = require('./routes/ImageRoute');
const blogRoutes = require('./routes/blogRoutes'); 
const nodemailer = require('nodemailer');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

// Middleware - Rate Limiting
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
}));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Use the image routes
app.use('/api/images', imageRoutes);

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB()
    .then(() => console.log("MongoDB connection successful"))
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    });

// API Routes
app.use("/api/products", productRoutes);
app.use('/api/discount-products', discountProductRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/delivery-options", deliveryRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api', blogRoutes); 

// Email Sending Route
app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: `You have a new message from ${name} (${email}): ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error); // Log the specific error
        res.status(500).send(`Error sending email: ${error.message}`); // Send error message back
    }
});

// Health check route
app.get("/", (req, res) => res.send("API is running..."));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});