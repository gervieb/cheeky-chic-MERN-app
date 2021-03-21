var jwt				 = require('jsonwebtoken'),
    config           = require('../config');

var isAdmin = (req, res, next)=>{
    var token = req.headers.authorization
    
	if(token){
	  	try {
			const decoded = jwt.verify(JSON.parse(token), config.secret) 
			req.token     = token
			req.user      = decoded;
            if(decoded.admin){
				console.log('you are an admin!')
                return next();
            }
	  	} 
	  	catch(error) { 
		  	res.json ({error:error})
	  	}	 
	}
}

module.exports = isAdmin;