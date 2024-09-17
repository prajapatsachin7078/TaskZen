const jwt = require("jsonwebtoken");
// Load environment variables from .env file
require('dotenv').config();

// Access environment variables
const JWT_SECRET = process.env.JWT_SECRET;

function userAuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    
    if (authHeader) {
        // Extract token from header
        const token = authHeader.split(' ')[1]; // Remove 'Bearer' part if using Bearer tokens

        try {
            // Verify the token and extract the userId
            const decoded = jwt.verify(token, JWT_SECRET);

            // Attach userId to req.user (commonly used for storing authenticated user info)
            req.user = decoded.userId;

            // Proceed to the next middleware
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    } else {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }
}

module.exports = {
    userAuthMiddleware
};
