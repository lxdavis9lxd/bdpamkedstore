const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/payments');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/payments.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:customerNumber/:transactionNumber', checkAuth, controller.getOne);
router.patch('/:customerNumber/:transactionNumber', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:customerNumber/:transactionNumber', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

router.get('/getby/Customernumber/:customerNumber', checkAuth, controller.getByCustomernumber);
module.exports = router;
