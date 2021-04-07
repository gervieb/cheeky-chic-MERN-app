import React, { useState, useEffect } from 'react'
import { customInstance as axios } from '../config.js'
import StripeCheckout from 'react-stripe-checkout'
import { pk_test } from '../config.js'

const STRIPE_KEY = pk_test

const CURRENCY = 'EUR'

const fromEuroToCent = amount => amount * 100

export default function Checkout (props) {
    const [showForm, setShowForm] = useState(false)
    const [amount, setAmount] = useState(0)
    const [guestDetails, setGuestDetails] = useState({
                firstName 	: " ",
				lastName	: " ",
				email    	: " ",
				phone		: " ",
				street 		: " ",
				address2	: " ",
				city 		: " ",
				postcode 	: " ",
				state 		: " ",
                country 	: " "
    })
    const shippingFee = 14;
    const totalAmount = amount + shippingFee

    useEffect(() => {
        let guestData = JSON.parse(sessionStorage.getItem('guest-data'));
        setGuestDetails(guestData)
    }, [])

    useEffect(() => {
        const total = JSON.parse(localStorage.getItem('total-amount'));
        setAmount(total)
    }, [])

    const successPayment = async()=> {
        alert('Payment successful')

        try{
            await axios.post('/emails/confirmation_email', {
                data: guestDetails,
                total: totalAmount,
                cart: props.storageCart
                })
                props.setCart([])
                localStorage.removeItem('cart-list');
                sessionStorage.removeItem('guest-data');
                localStorage.removeItem('total-amount');
                props.history.push('/order-confirmation')
        }catch(error){
            console.log(error)
        }
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
    
    const openForm = ()=> {
        setShowForm(true)
    }

    const editGuestForm =(e)=> {
        setGuestDetails({ ...guestDetails, [e.target.name]:e.target.value })
    }

    const saveGuestShipping = (e)=> {
        e.preventDefault()
        sessionStorage.setItem('guest-data', JSON.stringify(guestDetails));
        setShowForm(false)
    }

    const handleCancel =()=> {
        setShowForm(showForm? false: true)
    }
    
    return  (
        <div className="checkout-wrapper">
            <h3>Your Order Summary</h3>
            <div className="order-summary-label">
                <p className="item">ITEM</p>
            </div>
            
            <div className="order-summary-wrapper">
                <div className="product-checkout-wrapper">
                    
                    {props.storageCart.map(el=> {
                        return <div key={el._id} className="product-checkout">
                            <div>
                                <img src={el.image} alt={el.title} />
                            </div>  
                            <div> 
                                <p><strong>{el.title}</strong></p>  
                                <p>{el.description}</p>                     
                                <p>Qty: <strong>{el.qty}</strong></p>
                                <p>Price: <strong>€{el.qty * Number(el.price).toFixed(2)} </strong></p>
                            </div>
                        </div>
                    })}

                    <h4 className="shipping-details">SHIPPING DETAILS</h4>
                    <div className="shipping-address shipping-grid2">
                            <div>
                                <h3 className="shipping-label">{guestDetails.firstName} {guestDetails.lastName}</h3>
                                <p>{guestDetails.email}</p>
                                <p>{guestDetails.street} {guestDetails.houseNumber} </p>
                                <p>{guestDetails.city} {guestDetails.postcode} </p>
                                <p>{guestDetails.state} {guestDetails.country} </p>
                                <p>Phone: {guestDetails.phone}</p>
                            </div>
                            <p className="shipping-edit" onClick={openForm}>Edit</p> 
                            
                            <div id={showForm? "shipping-form-active": "shipping-form-hidden"}>
                                <form className="form-shipping-details">  
                                    <h2>Shipping Details</h2> 
                                    <div className="edit-shipping-grid2">                                  
                                        <div>
                                            <h3>FIRST NAME </h3>
                                                <input required={true} name="firstName" placeholder="First Name*" value={guestDetails.firstName} onChange={editGuestForm}></input>

                                            <h3>EMAIL </h3>
                                                <input required={true} type="email" name="email" placeholder="Email*" value={guestDetails.email} onChange={editGuestForm}></input>

                                            <h3>STREET ADDRESS </h3>
                                                <input required={true} name="street" placeholder="Street*" value={guestDetails.street} onChange={editGuestForm}></input>

                                            <h3>CITY </h3>
                                                <input required={true} name="city" placeholder="City*" value={guestDetails.city} onChange={editGuestForm}></input>

                                            <h3>STATE </h3>
                                                <input required={true} name="state" placeholder="State*" value={guestDetails.state} onChange={editGuestForm}></input>
                                        </div>
                                        <div>
                                            <h3>LASTNAME </h3>
                                                    <input required={true} name="lastName" placeholder="Last Name*"  value={guestDetails.lastName} onChange={editGuestForm}></input> 

                                            <h3>PHONE </h3>
                                                <input required={true} name="phone" placeholder="Mobile Number*" value={guestDetails.phone} onChange={editGuestForm}></input>
                                            
                                            <h3>APARTMENT/SUITE # </h3>
                                                <input name="address2" placeholder="Apt., Suite, Bldg. (optional)" value={guestDetails.address2} onChange={editGuestForm}></input>
                                            
                                            <h3>POSTCODE </h3>
                                                <input required={true} name="postcode" placeholder="Postcode*" value={guestDetails.postcode} onChange={editGuestForm}></input>
                                            
                                            <h3>COUNTRY </h3>
                                                <input required={true} name="country" placeholder="Country*" value={guestDetails.country} onChange={editGuestForm}></input>
                                        </div>
                                    </div>  
                                    <div className="shipping-action">
                                        <p onClick={handleCancel} className="cancel-edit">Cancel</p>
                                        <button className="save-edit" onClick={saveGuestShipping}>Save</button>
                                    </div>
                                </form>  
                            </div>                                                                     
                    </div>
                    <button className="back-to-cart" onClick={() => {props.history.goBack(); }}>Back</button>
                </div>  

                <div className="total-right-div">
                    <div className="pay-div">
                        <div className="checkout-amount-wrapper">
                            <div className="total-amount-container subtotal">
                                <p>Subtotal:</p>
                                <p>€{amount}</p>
                            </div>
                            <div className="total-amount-container">
                                <p>Standard Shipping</p>
                                <p>€{shippingFee}</p>
                            </div>
                            <div className="total-amount-container total-amount">
                                <p>Total:</p>
                                <p><strong>€{totalAmount}</strong></p>  
                            </div>                                   
                        </div>
                        <p className="pay-text">All products are inclusive of duties and taxes.</p>                         
                        <StripeCheckout
                            name='Payment Test Mode'
                            description='Please enter your card details'
                            amount={fromEuroToCent(totalAmount)}
                            token={onToken(totalAmount, 'Please enter your card details', guestDetails, props.storageCart)}
                            currency={CURRENCY}
                            stripeKey={STRIPE_KEY}
                            label='PAY'
                            /> 
                    </div>
                </div>
            </div>                            
    </div>     
    )   
}

