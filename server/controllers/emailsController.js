const nodemailer = require('nodemailer')
const em         = require('../config.js').eml
const pwd        = require('../config.js').pw

class EmailsController {

    send_email = async (req, res) => {
    const { name , email, subject , message } = req.body

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: em,
            pass: pwd
        },
        tls:{
            rejectUnauthorized: false
        }
    })
    
    const mailOptions = {
          from: email,
          to: em,
          subject: "New message from " + name,
          html: '<p>'+ subject+ '</p><p><pre>' + message + '</pre></p>'
     }
    try{
         await transporter.sendMail(mailOptions)
         return res.json({ok:true, message:'email sent'})
    }
    catch( err ){
         return res.json({ok:false, message:err})
    }
    }

    confirmation_email = async (req, res) => {
        let { data } = req.body
        
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: em,
            pass: pwd
        },
    });

    const mailOptions = {
        from: em,
        to: data.email,
        subject: 'Order Confirmation',
        html: ` <h4>Hello ${details.name}, thank you for your order</h4>
                <p>We've received your order and will contact you as soon as your package is shipped.
                You can find your purchase information below.</p>
                <h3>Order Summary</h3>
                <p>${details.shoppingCart.map(ele=>ele.title
                )}</p>
                <p>total price: ${details.total}€</p> `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        let response;
        if (error) {
            response = false;
        } else {
            response = true;
        }
        res.send({response})
    })
    }
}


module.exports = new EmailsController();