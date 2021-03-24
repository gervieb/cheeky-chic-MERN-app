const express     = require('express'), 
    router        = express.Router(),
    controller    = require('../controllers/productsController');

router.get('/', controller.findAll);

router.get('/product/:id', controller.findOne);

router.get('/products_by_category/:categoryID', controller.findByCategory);

router.post('/create', controller.create);

// router.post('/createFromAPI', controller.createFromAPI);

router.post('/delete', controller.delete);

router.post('/update', controller.update);

module.exports = router;