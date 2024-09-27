const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.login_cookie;
        if (!token) {
            throw new Error('No token found');
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        req.user = decoded._id;
        req.token = token;
        next();

    } catch (e) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};



module.exports = auth;