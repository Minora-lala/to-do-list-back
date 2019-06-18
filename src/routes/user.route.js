let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user.controller');

router.get('/', usersController.getUsers);
router.post('/', usersController.addUser);

module.exports = router;