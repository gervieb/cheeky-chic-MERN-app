const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/picturesController');

router.post('/upload', controller.upload);
router.get('/get_all', controller.get_all);
router.delete('/remove/:_id', controller.remove);


module.exports = router;
