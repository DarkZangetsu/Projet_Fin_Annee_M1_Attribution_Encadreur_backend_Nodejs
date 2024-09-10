const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Token:', token); 
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  } 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Token décodé:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;