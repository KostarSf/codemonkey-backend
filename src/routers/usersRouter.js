const Router = require('express');
const router = new Router();
const usersController = require('../controllers/usersController');

// users/
router.post('/', usersController.create);
router.get('/', usersController.getAll);
router.put('/', usersController.update);
router.get('/:id', usersController.getOne);
// router.get('/:id/directions', usersController.getDirections);

module.exports = router;