import React, { useState } from 'react'

export default function ShippingAndBilling(props) {
    const [showShippingData, setShowShippingData] = useState(false)
    const [userShippingDetails, setUserShippingDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        address2: '',
        city: '',
        postcode: '',
        state: '',
        country: ''
    })

    const { user } = props


    const makeBillingAsShipping =()=> {
        setShowShippingData(showShippingData ? false : true);
    }

    const handleUserShipping =(e)=> {
        setUserShippingDetails({ ...userShippingDetails, [e.target.name]:e.target.value })
    }

    const saveUserShipping = (e) => {
        e.preventDefault()
        if (!showShippingData) {
        localStorage.setItem('user-shipping', JSON.stringify(userShippingDetails));
        props.history.push({
            pathname: "/user-checkout",
          });
        } else {
            localStorage.setItem('user-shipping', JSON.stringify(user));
            props.history.push({
                pathname: "/user-checkout",
            }); 
        }
    }


    return (
        <div className="shipping-billing-wrapper">
            <div>
                <h2 className="billing-label">BILLING ADDRESS</h2>
                <div> 
                    <p>{user.firstName} {user.lastName}</p>
                    <p>{user.street} {user.houseNumber} </p>
                    <p>{user.city} {user.postcode} </p>
                    <p>{user.state} {user.country} </p>
                    <p>Phone: {user.phone}</p>                               
                </div>
                <div className="billing-checkbox-wrapper">
                    <input type="checkbox" onClick={makeBillingAsShipping} />
                    <p>My billing and shipping are the same</p>
                </div>
            </div>
            <div>
                <h2>SHIPPING ADDRESS</h2>
                <div className={showShippingData? "shipping-data-active": "shipping-data-hidden"}>
                    <div  > 
                        <p>{user.firstName} {user.lastName}</p>
                        <p>{user.street} {user.houseNumber} </p>
                        <p>{user.city} {user.postcode} </p>
                        <p>{user.state} {user.country} </p>
                        <p>Phone: {user.phone}</p>                               
                    </div>
                    <button type="submit" className="save-edit shipping-continue-button" onClick={saveUserShipping}>Continue</button>
                </div>

                <form onSubmit={saveUserShipping} className={showShippingData? "shipping-form-hidden": "shipping-billing-active"}>  
                    <div className="shipping-billing-grid2">                                  
                        <div>
                            <h4>FIRST NAME </h4>
                                <input required={true} name="firstName" placeholder="First Name*" value={userShippingDetails.firstName || ''} onChange={handleUserShipping} />

                            <h4>EMAIL </h4>
                                <input required={true} type="email" name="email" placeholder="Email*" value={userShippingDetails.email || ''} onChange={handleUserShipping} />

                            <h4>STREET ADDRESS </h4>
                                <input required={true} name="street" placeholder="Street*" value={userShippingDetails.street || ''} onChange={handleUserShipping} />

                            <h4>CITY </h4>
                                <input required={true} name="city" placeholder="City*" value={userShippingDetails.city || ''} onChange={handleUserShipping} />

                            <h4>STATE </h4>
                                <input required={true} name="state" placeholder="State*" value={userShippingDetails.state || ''} onChange={handleUserShipping} />
                        </div>
                        <div>
                            <h4>LASTNAME </h4>
                                    <input required={true} name="lastName" placeholder="Last Name*"  value={userShippingDetails.lastName || ''} onChange={handleUserShipping} />

                            <h4>PHONE </h4>
                                <input required={true} name="phone" placeholder="Mobile Number*" value={userShippingDetails.phone || ''} onChange={handleUserShipping} />
                            
                            <h4>APARTMENT/SUITE # </h4>
                                <input name="houseNumber" placeholder="Apt., Suite, Bldg. (optional)" value={userShippingDetails.houseNumber || ''} onChange={handleUserShipping} />
                            
                            <h4>POSTCODE </h4>
                                <input required={true} name="postcode" placeholder="Postcode*" value={userShippingDetails.postcode || ''} onChange={handleUserShipping} />
                            
                            <h4>COUNTRY </h4>
                                <input required={true} name="country" placeholder="Country*" value={userShippingDetails.country || ''} onChange={handleUserShipping} />
                        </div>
                    </div>  
                    <div className="shipping-action billing-shipping-continue">
                        <button type="submit" className="save-edit" onClick={saveUserShipping}>Continue</button>
                    </div>                                      
                </form>  
            </div>
   
        </div>
    )
}
