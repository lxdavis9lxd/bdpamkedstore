const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/orders');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/orders.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:orderNumber', checkAuth, controller.getOne);
router.patch('/:orderNumber', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:orderNumber', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

router.get('/getby/Customernumber/:customerNumber', checkAuth, controller.getByCustomernumber);
module.exports = router;
