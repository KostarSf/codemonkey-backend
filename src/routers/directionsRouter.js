const Router = require('express');
const router = new Router();
const directionsController = require('../controllers/directionsController');

// directions/
router.post('/', directionsController.create);
router.get('/', directionsController.getAll);
router.put('/', directionsController.update);
router.get('/:id', directionsController.getOne);

module.exports = router;