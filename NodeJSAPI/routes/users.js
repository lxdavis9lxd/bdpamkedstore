const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/users');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/users.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:Username', checkAuth, controller.getOne);
router.patch('/:Username', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:Username', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

module.exports = router;
