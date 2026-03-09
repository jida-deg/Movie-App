import jwt from 'jsonwebtoken';

// JWT Authentication Middleware
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Session Authentication Middleware
const sessionAuthMiddleware = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'No session, authorization denied' });
    }
    req.user = req.session.userId;
    next();
};

// Combined Authentication Middleware (JWT or Session)
const combinedAuthMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.userId; // ✅ OK
            return next();
        } catch (err) {}
    }
    
    if (req.session.userId) {
        req.user = req.session.userId;
        return next();
    }
    
    return res.status(401).json({ message: 'No valid authentication' });
};

export { authMiddleware, sessionAuthMiddleware, combinedAuthMiddleware };
export default authMiddleware;