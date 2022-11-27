const Router = require('express');
const router = new Router();
const authController = require('../controllers/authController');

// auth/
router.post('/', authController.login);

module.exports = router;