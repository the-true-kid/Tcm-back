const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader); // Log Authorization header for debugging

  // Extract the token from the 'Authorization' header (Bearer <token>)
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Extracted Token:', token); // Log token for debugging

  if (!token) {
    console.log('No token provided'); // Log the absence of a token
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Log decoded token

    req.user = decoded; // Attach the decoded token payload to `req.user`
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log('Invalid or expired token:', error.message); // Log the error message
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authenticateToken;
