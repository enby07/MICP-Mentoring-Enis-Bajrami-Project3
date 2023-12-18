const router = require('express').Router();

const {createUser, getUsersTasks} = require('../controllers/user');
const {  createUserValidation, getUsersTasksValidation, validate } = require('../validation/userValidation');

router.post('/createUser', createUserValidation, validate, createUser);
router.get('/:userId/tasks',  getUsersTasksValidation, validate, getUsersTasks);
//router.get('/:userId/tasks', assignTaskToUser);
//router.get('/assign/:taskId/:userId', assignTaskToUser);

module.exports = router;