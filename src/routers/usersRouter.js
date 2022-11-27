const Router = require('express');
const router = new Router();
const usersController = require('../controllers/usersController');

// users/
router.post('/', usersController.create); // { name, email, password }
router.get('/', usersController.getAll);
router.put('/', usersController.update);  // { id, ?name, ?email, ?password, ?about }
router.get('/:id', usersController.getOne);

router.get('/:id/directions', usersController.getUserDirections);
router.post('/:id/directions', usersController.addDirection); // { direction_id }
router.delete('/:id/directions', usersController.removeDirection); // { direction_id }

module.exports = router;