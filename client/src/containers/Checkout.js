import React from 'react'
import { customInstance as axios } from '../config.js'
import StripeCheckout from 'react-stripe-checkout'
import { useHistory } from "react-router-dom";
import { pk_test } from '../config.js'

const STRIPE_KEY = pk_test

const CURRENCY = 'EUR'

const fromEuroToCent = amount => amount * 100

const Checkout = (props) => {
    const params = props.location.state
    const history = useHistory();

    const successPayment = data => {
        alert('Payment succesful')
        console.log(data)
        props.setCart([])
        localStorage.removeItem('cart-list');
    }
    
    const errorPayment = data => {
        alert ('Payment error')
        console.log(data)
    }
    
    const onToken = (amount, description) => token => 
    axios.post('/payment', {
        description,
        source: token.id,
        currency: CURRENCY,
        amount: fromEuroToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment)
    


    return  (
            <div className="checkout-wrapper">
                <h3>Your Order Summary</h3>
                <div className="order-summary-label">
                    <p className="item">ITEM</p>
                </div>
                <div className="order-summary-wrapper">
                    <div className="product-checkout-wrapper">
                    {params.cartList.map(el=> {
                        return <div key={el._id} className="product-checkout">
                            <div>
                                <img src={el.image} alt={el.title} />
                            </div>  
                            <div> 
                                <p><strong>{el.title}</strong></p>  
                                <p>{el.description}</p>                     
                                <p>Qty: <strong>{el.qty}</strong></p>
                                <p>Price: <strong>€{el.price}</strong></p>
                            </div>
                        </div>
                    })}
                    </div>  
                    <div className="total-right-div">
                        <div className="pay-div">
                            <div className="total-amount-container">
                                <p>Total:</p>
                                <p><strong>€{params.amount}</strong></p>
                            </div>
                            <p className="pay-text">All products are inclusive of duties and taxes.</p>
                            <StripeCheckout
                                name={params.name}
                                description={params.description}
                                amount={fromEuroToCent(params.amount)}
                                token={onToken(params.amount, params.description)}
                                currency={CURRENCY}
                                stripeKey={STRIPE_KEY}
                                label={params.label}
                                /> 
                        </div>
                        <button className="back-to-cart" onClick={() => {history.goBack(); }}>Back to Cart</button>
                    </div>
                </div>             
        </div>     

        )   
    }

export default Checkout;
