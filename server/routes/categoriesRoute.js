const express     = require('express'), 
    router        = express.Router(),
    controller    = require('../controllers/categoriesController');

router.get('/find_all', controller.findAll);

router.get('/findOne', controller.findOne);

router.post('/create', controller.create);

router.post('/delete', controller.delete);

router.post('/update', controller.update);

module.exports = router;