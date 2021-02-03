const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const Profile = require('../profile/profileModel');

const makeToken = (profile) => {
  const payload = {
    email: profile.email,
    id: profile.profile_id,
  };
  const config = {
    jwtSecret: process.env.JWT_SECRET || 'foo',
  };
  const options = {
    expiresIn: '2 weeks',
  };
  return jwt.sign(payload, config.jwtSecret, options);
};

const decodeToken = (token) => {
  const jwtSecret = process.env.JWT_SECRET || 'foo';
  return jwt.decode(token, jwtSecret);
};

const requireToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error('Missing Authorization');
    const user = decodeToken(authHeader);
    res.locals.user = await Profile.findById(user.id);
    if (!res.locals.user) throw new Error('Incorrect Authorization');
    next();
  } catch (err) {
    next(createError(401, err.message));
  }
};

module.exports = {
  requireToken,
  makeToken,
};
