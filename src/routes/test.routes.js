let express = require('express');
let router = express.Router();
let testController = require('../controllers/test.controller');

router.get('/', testController.getTests);
router.post('/', testController.addTest);

module.exports = router;