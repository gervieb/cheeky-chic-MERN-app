import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderConfirmation() {   

    return (
        <div>
            <p className="order-successful-text">Order placed successfully!</p>
            <div className="order-confirmation">
                <div>             
                    <h3>WE'VE RECEIVED YOUR ORDER!</h3>
                    <p>Thank you for shopping with us. We'll send a confirmation of this order to your provided email. 
                        Please allow up to 3 business days to process and ship your order. </p>
                    <p className="assistance-text">If you need assistance, we're happy to help. Reach out to us at <i>cheekychickdemo@gmail.com</i></p>
                    <Link to="/">Go to Homepage</Link>
                </div> 
            </div>
        </div>
    )
}
