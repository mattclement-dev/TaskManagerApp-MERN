import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token verification
import User from '../models/User.js'; // Import User model


//Middleware to protect routes
const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token && !token.startsWith('Bearer')) {
            token = token.split(' ')[1]; //extract token from Bearer scheme
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password'); //exclude password from user data
            next(); //Proceed to the next middleware or route handler
        } else {
            res.status(401).json({ message: 'Not authorized, no token' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Token failed', error: error.message });
    }
};

//Middleware for Admin access
const adminOnly = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); //User is admin, proceed
    } else {
        res.status(403).json({ message: 'Access denied, admin only' });
    }
};

export { protect, adminOnly };