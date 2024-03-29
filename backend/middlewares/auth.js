const jwt = require('jsonwebtoken');

const { SECRET_KEY = 'token' } = process.env;

const { UnAuthorizedError } = require('../errors/UnAuthorizedError');

// console.log(SECRET_KEY);

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnAuthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // payload = jwt.verify(token, 'mesto-key');
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnAuthorizedError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
