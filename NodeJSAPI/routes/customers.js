const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/customers');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/customers.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:customerNumber', checkAuth, controller.getOne);
router.patch('/:customerNumber', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:customerNumber', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

router.get('/getby/Salesrepemployeenumber/:salesRepEmployeeNumber', checkAuth, controller.getBySalesrepemployeenumber);
module.exports = router;
