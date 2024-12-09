const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming 'Bearer <token>'
    
    if (!token) {
        return res.status(401).json({ error: "Authorization token missing." });
    }

    try {
        // Attempt to verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decoded.userId }; // Assuming token includes `userId`
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            console.error("Token has expired.");
            return res.status(401).json({ error: "Token has expired. Please log in again." });
        }

        console.error("Invalid token:", error);
        return res.status(401).json({ error: "Invalid token." });
    }
};

module.exports = authenticateUser;
