const router = require('express').Router();

const { register, login, getAllUsers, getUserRole, getUser, updateUser, deleteUser, getUsername} = require('../controllers/user');


router.post('/register', register);
router.post('/login', login);
router.get('/getAllUsers', getAllUsers);
router.get('/getUser/:id', getUser);
router.get('/getUsername', getUsername);
//router.get('/getUserRole/:id', getUserRole);
router.get('/getUserRole', getUserRole);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;