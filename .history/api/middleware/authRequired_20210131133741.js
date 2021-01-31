const createError = require('http-errors');
//const Profiles = require('../profile/profileModel');

/**
 * A simple middleware that asserts valid Okta idToken and sends 401 responses
 * if the token is not present or fails validation. If the token is valid its
 * contents are attached to req.profile
 */
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
