const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/offices');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/offices.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:officeCode', checkAuth, controller.getOne);
router.patch('/:officeCode', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:officeCode', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

module.exports = router;
