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
        let { data, total, cart } = req.body
        
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: em,
            pass: pwd
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: em,
        to: data.email,
        subject: 'Order Confirmation',
        html: ` <h4>Hello ${data.firstName} ${data.lastName}, thank you for your order.</h4>
                <p>We've received your order and will contact you as soon as your package is shipped.
                You can find your purchase information below.</p>
                <br />
                <h3> Your Order Summary</h3>
                ${cart.map(ele => ele.title)}
                <p>Total price: ${total}€</p>`
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