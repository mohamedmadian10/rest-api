const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not Authenticated.');
    error.status = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1]; // Bearer token
  let decodedToken;
  try {
    // const token = req.headers.authorization.split(' ')[1];
    decodedToken = jwt.verify(token, 'secret_This_should_be_longer');
  } catch (err) {
    err.statusCode = 500;
    throw err;
    // res.status(401).json({ message: 'Auth failed!' });
  }
  if (!decodedToken) {
    const error = new Error('Not Authenticated.');
    error.statusCode = 401;
    throw error;
  }
  req.userData = { email: decodedToken.email, userId: decodedToken.userId };
  next();
};
