const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/products');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/products.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:productCode', checkAuth, controller.getOne);
router.patch('/:productCode', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:productCode', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

router.get('/getby/Productline/:productLine', checkAuth, controller.getByProductline);
module.exports = router;
