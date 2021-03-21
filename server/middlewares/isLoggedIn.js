const jwt        = require('jsonwebtoken');
      config     = require('../config');

const isLoggedIn =(req, res, next)=> {
    const token = req.headers.authorization

    if (token) {
        try {
            const decoded = jwt.verify(JSON.parse(token), config.secret)
            req.token = token
            req.user = decoded;
            if (decoded) {
                console.log('we are in business!')
                return next();
            }
        }catch(e) {
            res.json({error: error})
        }
    }
}

module.exports = isLoggedIn;