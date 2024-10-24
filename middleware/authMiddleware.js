const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader); // Log Authorization header

  const token = authHeader && authHeader.split(' ')[1];
  console.log('Extracted Token:', token); // Log token

  if (!token) {
    console.log('No token provided'); // Log if no token is present
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Log decoded token
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Invalid or expired token:', error.message); // Log verification error
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authenticateToken;
