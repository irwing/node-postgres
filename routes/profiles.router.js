const express = require('express');
const passport = require('passport');

const ProfileService = require('./../services/profiles.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getProfileSchema, createProfileSchema, updateProfileSchema } = require('./../schemas/profile.schema');

const router = express.Router();
const service = new ProfileService();

// get all profiles
router.get('/', async (req, res, next) => {
  try {
    const profiles = await service.find();
    res.json(profiles);
  } catch (error) {
    next(error);
  }
});

// find a profile
router.get('/:id',
  validatorHandler(getProfileSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const profile = await service.findOne(id);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }
);

// create a profile
router.post('/',
  validatorHandler(createProfileSchema, 'body'),
  async (req, res, next) => {
    try {
      const request = req.body;
      const result = await service.create(request);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

// update a profile
router.patch('/:id',
  validatorHandler(getProfileSchema, 'params'),
  validatorHandler(updateProfileSchema, 'body'),
    async (req, res, next) => {
    try {
      const { id } = req.params;
      const request = req.body;
      const result = await service.update(id, request);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

// delete a profile
router.delete('/:id', 
  passport.authenticate('jwt', { session: false }),,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await service.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
