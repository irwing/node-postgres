const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('./../config/config');

const router = express.Router();

router.post('/login', 
  passport.authenticate('local', {session: false}), 
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        userId: user.id,
        rolId: user.profile.rolId,
      }
      const token = jwt.sign(payload, config.jwtSecret);

      delete user.dataValues.id;

      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;