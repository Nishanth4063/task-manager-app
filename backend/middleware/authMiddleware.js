const jwt = require('jsonwebtoken');

// Always fall back to a string if process.env.JWT_SECRET isn't initialized yet
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secure_jwt_secret_key';

module.exports = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        
        // Strict check: Ensure header exists and starts explicitly with 'Bearer '
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Access denied. Invalid or missing authentication token.' });
        }

        // Safely extract the token string
        const token = authHeader.split(' ')[1];

        // Verify token validity
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Inject user payload metadata directly into the request object
        req.user = decoded; 
        
        // Pass control to the next handler/route function
        next();
    } catch (err) {
        // This 401 response will be cleanly caught by your Angular errorInterceptor
        res.status(401).json({ error: 'Invalid or expired token.' });
    }
};