const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

exports.protect = async (req, res, next) => {
  try {
    // Get the authorization header
    const authorizationHeader = req.headers.authorization;


    // Check if authorization header exists
    if (!authorizationHeader) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: 'Access denied, no token provided',
      });
    }

    // Check if authorization header has the Bearer scheme
    if (!authorizationHeader.startsWith('Bearer')) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: 'Access Denied',
      });
    }

    // Extract the token from the authorization header
    const token = authorizationHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if user exists
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'User not found',
      });
    }

    // Set the user in the request object
    req.user = user;

    // Pass control to the next middleware
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: 'Authentication Failed', message: error.message });
  }
};

//role middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
        success: false,
        status: 403,
        message: 'Access denied, only admins can perform this operation',
        });
    }
    next();
}
