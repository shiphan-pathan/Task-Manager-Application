require('dotenv').config();
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];

    if (!auth) {
        return res.status(403).json({
            message: 'Unauthorized, JWT token is required',
            success: false,
        });
    }

    try {
        const token = auth.split(' ')[1]; // Authorization header should be in the format: Bearer <token>
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id, // Ensure _id is available in the payload
            email: decoded.email,
        };
        next();
    } catch (error) {
        return res.status(403).json({
            message: 'Unauthorized, JWT token is invalid or expired',
            success: false,
        });
    }
};

module.exports = ensureAuthenticated;
