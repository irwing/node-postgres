const express = require('express');
const passport = require('passport');

const SkillService = require('./../services/skills.service');
const { checkRoles } = require('./../middlewares/auth.handler');
const validatorHandler = require('./../middlewares/validator.handler');
const { getSkillSchema, createSkillSchema, updateSkillSchema } = require('./../schemas/skill.schema');

const router = express.Router();
const service = new SkillService();

// get all skills
router.get('/', async (req, res, next) => {
  try {
    const skills = await service.find();
    res.json(skills);
  } catch (error) {
    next(error);
  }
});

// find a skill
router.get('/:id',
  validatorHandler(getSkillSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const skill = await service.findOne(id);
      res.json(skill);
    } catch (error) {
      next(error);
    }
  }
);

// create a skill
router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createSkillSchema, 'body'),
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

// update a skill
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getSkillSchema, 'params'),
  validatorHandler(updateSkillSchema, 'body'),
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

// delete a skill
router.delete('/:id', 
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
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