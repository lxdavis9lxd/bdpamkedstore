const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/jwtVerify');
const tokenController = require('../controllers/token');
const uploadController = require('../controllers/upload');

const usersRouter = require('./users');
const productsRouter = require('./products');
const productlinesRouter = require('./productlines');
const paymentsRouter = require('./payments');
const ordersRouter = require('./orders');
const orderdetailsRouter = require('./orderdetails');
const officesRouter = require('./offices');
const employeesRouter = require('./employees');
const customersRouter = require('./customers');


router.post('/token', tokenController.authLogin);
router.post('/upload', checkAuth, uploadController.uploadFile);

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/productlines', productlinesRouter);
router.use('/payments', paymentsRouter);
router.use('/orders', ordersRouter);
router.use('/orderdetails', orderdetailsRouter);
router.use('/offices', officesRouter);
router.use('/employees', employeesRouter);
router.use('/customers', customersRouter);

module.exports = router;
