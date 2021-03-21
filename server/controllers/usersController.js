const User       = require('../models/usersModel'); 
const bcrypt     = require('bcrypt');
const jwt        = require('jsonwebtoken');
const config     = require('../config');
const saltRounds = 10;
 
class UsersController {

        find(req, res){
            User.find({},(err, users)=> !err ? res.status(200).send(users) : {err});
        }


        register = async (req, res) => {
            const { email, password, password2, firstName, lastName } = req.body;
                if( !email || !password || !password2 || !firstName || !lastName) {
                    return res.json({ ok: false, message: 'All fields are required' });
                }if( password !== password2) {
                    return res.json({ ok: false, message: 'passwords must match' });
                } 
            try{
                const user = await User.findOne({ email })
                if (user) return res.json({ ok: false, message: 'email already in use' });
                const hash = await bcrypt.hash(password, saltRounds)
                
                const newUser = {
                    email     : email,
                    password  : hash,
                    password2 : hash,
                    firstName : firstName,
                    lastName  : lastName

                }
                await User.create(newUser)
                res.json({ ok: true, message: 'successful registration' })
            }catch(error){
                res.json({ ok: false, error })
            }
        }


        login = async (req, res) => {
            const { email , password } = req.body;
            if( !email || !password ) res.json({ ok: false, message: 'All fields are required'});
            try{
                const user = await User.findOne({ email });
                if( !user ) {
                    return res.json({ ok: false, message: 'invalid email' });
                }
                const match = await bcrypt.compare(password, user.password);
                if(match) {
                const token = jwt.sign(user.toJSON(), config.pk, { expiresIn:100080 });
                const decoded   = jwt.verify(token, config.pk)
                res.json({ ok:true, token: token, email: email, admin: decoded.admin, firstName: decoded.firstName, lastName: decoded.lastName}) 
                }else {
                return res.json({ ok: false, message: 'invalid password' })
                }
            }catch( error ){
                res.json({ ok: false, error })
            }
        }

        verify_token = (req, res) => {
            const token = req.headers.authorization;
            jwt.verify(token, config.pk, (err, succ) => {
                err ? res.json({ ok: false, message: 'something went wrong' }) : res.json({ ok: true, succ });
            });
        };
        

}
module.exports = new UsersController;


