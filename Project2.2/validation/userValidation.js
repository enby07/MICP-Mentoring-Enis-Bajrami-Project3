const { body, param, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createUserValidation = [
  body('username').notEmpty().withMessage('Username cannot be empty'),
];

const getUsersTasksValidation = [
  param('userId').isInt().withMessage('User ID must be an integer'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

module.exports = {
  createUserValidation,
  getUsersTasksValidation,
  validate,
};
