const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/productlines');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/productlines.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:productLine', checkAuth, controller.getOne);
router.patch('/:productLine', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:productLine', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

module.exports = router;
