const express     = require('express'), 
    router        = express.Router(),
       controller = require('../controllers/emailsController')

router.post('/send_email', controller.send_email)
router.post('/confirmation_email', controller.confirmation_email)

module.exports = router
