const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pk_test = require('./config.js');  
const stripe  = require('stripe')(pk_test.pk);
const port = process.env.port || 4001;
const mongoUN  = require('./config.js').mongoUN;
const mongoPW  = require('./config.js').mongoPW;
require('dotenv').config();
const cors = require('cors');    
    
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	next();
});

async function connecting(){
    try {
        await mongoose.connect(`mongodb+srv://${mongoUN}:${mongoPW}@cheekychic.y2rsb.mongodb.net/ecommerce?retryWrites=true&w=majority`, { useUnifiedTopology: true , useNewUrlParser: true })
        console.log('Connected to the DB') 
        
    } catch ( error ) {
        console.log('ERROR: Seems like your DB is not running, please start it up.');
    }
    }

connecting()  
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false); 

postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
        res.status(500).send({error, stripeErr})
    }else {
        res.status(200).send({ success: stripeRes})
    }
}
app.use('/users', require('./routes/usersRoute'));
app.use('/emails', require('./routes/emailsRoute'))
app.use('/categories', require('./routes/categoriesRoute'))
app.use('/products', require('./routes/productsRoute'))
app.use('/', require('./routes/index'))
app.post('/payment', function(req, res){
    stripe.charges.create(req.body, postStripeCharge(res))
})
app.use("/assets", express.static(__dirname + "/public"));
app.use('/pictures', require('./routes/picturesRoute'))

const path = require('path');

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/*', function (req, res) {
    res.sendFile('../client/build/index.html' , { root: __dirname});
});
 
app.listen(port, () => 
    console.log(`server listening on port ${port}`
));
