import React, { useState, useEffect } from 'react'
import { customInstance as axios } from '../config.js'
import StripeCheckout from 'react-stripe-checkout'
import { pk_test } from '../config.js'

const STRIPE_KEY = pk_test

const CURRENCY = 'EUR'

const fromEuroToCent = amount => amount * 100

export default function UserCheckout (props) {
    const [showForm, setShowForm] = useState(false)
    const [amount, setAmount] = useState(0)
    const [userShipping, setUserShipping] = useState({
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
        const total = JSON.parse(localStorage.getItem('total-amount'));
        setAmount(total)
    }, [])

    useEffect(() => {
        const userShippingData = JSON.parse(localStorage.getItem('user-shipping'));
        setUserShipping(userShippingData)
    }, [])


    const successPayment = async() => {
        alert('Payment succesful')

        try{
            await axios.post('/emails/confirmation_email', {
                data: userShipping,
                total: totalAmount,
                cart: props.storageCart
                })
                props.setCart([])
                props.setCart([])
                localStorage.removeItem('cart-list');
                localStorage.removeItem('user-shipping');
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

    const editUserForm =(e)=> {
        setUserShipping({ ...userShipping, [e.target.name]:e.target.value })
    }

    const saveDataToStorage =()=> {
        localStorage.setItem('user-shipping', JSON.stringify(userShipping)); 
    }

    const saveUserShipping = (e) => {
        e.preventDefault()
        saveDataToStorage();
        const newShippingData = JSON.parse(localStorage.getItem('user-shipping'));
        setUserShipping(newShippingData)          
        setShowForm(showForm? false: true)
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

                        <h4 className="shipping-details">SHIPPING ADDRESS</h4>
                        <div className="shipping-address shipping-grid2">
                                <div>                   
                                    <h3 className="shipping-label">{userShipping.firstName} {userShipping.lastName}</h3>
                                    <p>{userShipping.email}</p>
                                    <p>{userShipping.street} {userShipping.address2} </p>
                                    <p>{userShipping.city} {userShipping.postcode} </p>
                                    <p>{userShipping.state} {userShipping.country} </p>
                                    <p>Phone: {userShipping.phone}</p>                                       
                                </div>
                                <p className="shipping-edit" onClick={openForm}>Edit</p> 

                                <div id={showForm? "shipping-form-active": "shipping-form-hidden"}>                                   
                                    <form className="form-shipping-details">  
                                        <h2>Shipping Address</h2> 
                                        <div className="edit-shipping-grid2">                                  
                                            <div>
                                                <h3>FIRST NAME </h3>
                                                    <input required={true} name="firstName" placeholder="First Name*" value={userShipping.firstName} onChange={editUserForm}></input>

                                                <h3>EMAIL </h3>
                                                    <input required={true} type="email" name="email" placeholder="Email*" value={userShipping.email} onChange={editUserForm}></input>

                                                <h3>STREET ADDRESS </h3>
                                                    <input required={true} name="street" placeholder="Street*" value={userShipping.street} onChange={editUserForm}></input>

                                                <h3>CITY </h3>
                                                    <input required={true} name="city" placeholder="City*" value={userShipping.city} onChange={editUserForm}></input>

                                                <h3>STATE </h3>
                                                    <input required={true} name="state" placeholder="State*" value={userShipping.state} onChange={editUserForm}></input>
                                            </div>
                                            <div>
                                                <h3>LASTNAME </h3>
                                                        <input required={true} name="lastName" placeholder="Last Name*"  value={userShipping.lastName} onChange={editUserForm}></input> 

                                                <h3>PHONE </h3>
                                                    <input required={true} name="phone" placeholder="Mobile Number*" value={userShipping.phone} onChange={editUserForm}></input>
                                                
                                                <h3>APARTMENT/SUITE # </h3>
                                                    <input name="address2" placeholder="Apt., Suite, Bldg. (optional)" value={userShipping.address2} onChange={editUserForm}></input>
                                                
                                                <h3>POSTCODE </h3>
                                                    <input required={true} name="postcode" placeholder="Postcode*" value={userShipping.postcode} onChange={editUserForm}></input>
                                                
                                                <h3>COUNTRY </h3>
                                                    <input required={true} name="country" placeholder="Country*" value={userShipping.country} onChange={editUserForm}></input>
                                            </div>
                                        </div>  
                                        <div className="shipping-action">
                                            <p onClick={handleCancel} className="cancel-edit">Cancel</p>
                                            <button className="save-edit" onClick={saveUserShipping}>Save</button>
                                        </div>
                                    </form>  
                                </div>                                                                     
                        </div>
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
                                token={onToken(totalAmount, 'Please enter your card details', )}
                                currency={CURRENCY}
                                stripeKey={STRIPE_KEY}
                                label='PAY'
                                /> 
                        </div>
                    </div>
                </div>
                <button className="back" onClick={() => {props.history.goBack(); }}>Back</button>                                
            </div>     

    )   
}

