const createError = require('http-errors');

const authRequired = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) throw new Error('Missing idToken');

    //const idToken = match[1];

    next();
  } catch (err) {
    next(createError(401, err.message));
  }
};

module.exports = authRequired;
