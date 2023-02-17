const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/employees');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/employees.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:employeeNumber', checkAuth, controller.getOne);
router.patch('/:employeeNumber', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:employeeNumber', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

router.get('/getby/Officecode/:officeCode', checkAuth, controller.getByOfficecode);
router.get('/getby/Reportsto/:reportsTo', checkAuth, controller.getByReportsto);
module.exports = router;
