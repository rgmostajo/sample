const express = require('express');
const loginController = require('../controllers/login-controller');
const router = express.Router();

router.post('/signup/customer', loginController.signup);
router.put('/deactivate/customer/:username', loginController.deactivate);
router.post('/login/customer', loginController.login);
router.get('/list/customers', loginController.listUsers);
router.delete('/list/customer', loginController.deleteUser);
router.delete('/list/customers', loginController.deleteUsers);

module.exports = router;