const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/orderdetails');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/orderdetails.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:orderNumber/:productCode', checkAuth, controller.getOne);
router.patch('/:orderNumber/:productCode', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:orderNumber/:productCode', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

router.get('/getby/Ordernumber/:orderNumber', checkAuth, controller.getByOrdernumber);
router.get('/getby/Productcode/:productCode', checkAuth, controller.getByProductcode);
module.exports = router;
