const jwt = require('jsonwebtoken');
const winston = require('winston');

module.exports = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;

  if (!token) {
    winston.warn('No token provided', { path: req.path });
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
    };

    winston.info(`User ${decoded.id} authenticated`, { path: req.path });
    next();
  } catch (err) {
    winston.error('JWT verification failed', {
      error: err.message,
      path: req.path
    });

    let message = 'Invalid token';
    if (err.name === 'TokenExpiredError') {
      message = 'Token expired';
    } else if (err.name === 'JsonWebTokenError') {
      message = 'Malformed token';
    }

    return res.status(401).json({
      success: false,
      message
    });
  }
};

module.exports.requireRole = (role) => {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      winston.warn(`Role ${role} required`, {
        user: req.user?.id,
        path: req.path
      });
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }
    next();
  };
};