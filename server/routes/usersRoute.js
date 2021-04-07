const express     = require('express'), 
    router        = express.Router(),
    controller    = require('../controllers/usersController');
    
router.get('/', controller.find);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/verify_token', controller.verify_token);

module.exports = router;