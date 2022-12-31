const express = require('express') 
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const userController = require('../controller/userController')

router.route('/').get(userController.getAlluser).post(jsonParser, userController.createUser);
router.route('/:id').patch(jsonParser, userController.updatingUser).get(jsonParser, userController.createUser);

module.exports = router;