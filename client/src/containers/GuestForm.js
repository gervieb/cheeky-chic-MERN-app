import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function GuestForm(props) {

    const [guestForm, setGuestForm] = useState({})

    // useEffect(() => {
    //    props.isLoggedIn &&
    //    props.history.push({
    //        pathname: "/checkout",
    //         state: props.location.state})
    // }, [])


    const handleChange = e => {
        setGuestForm({ ...guestForm, [e.target.name]:e.target.value })
   }

    return (
        <div className="guest-form-wrapper">
            <div className="guest-container">
                <div className="go-to-login">
                    <h3>Have a Cheeky Chic account?</h3>
                    <Link to="/login">LOG IN</Link>
                </div>
                <form onChange={handleChange} >
                    <p>Or, continue as <strong>guest</strong></p>
                    <hr />
                    <div className="guest-form">
                        <p>Personal Details</p>
                        <div className="flex">
                            <input required={true} type="email" name="email" placeholder="Email*"></input>
                            <input required={true} name="firstName" placeholder="First Name*"></input>
                        </div>
                        <div className="flex">
                            <input required={true} name="lastName" placeholder="Last Name*"></input>
                            <input required={true} name="phone" placeholder="Mobile Number*"></input>
                        </div>
                        <p>Delivery Details</p>
                        <div className="flex">
                            <input required={true} name="street" placeholder="Street*"></input>
                            <input required={true} name="houseNumber" placeholder="Building/House Number*"></input>
                        </div>
                        <div className="flex">
                            <input required={true} name="city" placeholder="City*"></input>
                            <input required={true} name="zipCode" placeholder="Zip Code*"></input>
                        </div>
                        <div className="flex">
                            <input required={true} name="state" placeholder="State*"></input>
                            <input required={true} name="country" placeholder="Country*"></input>
                        </div>
                    </div>  
                    <p>I have been able to read and understand the information on the use of my personal data explained in the Privacy Policy.</p>  
                    <button className="back-to-cart" onClick={() => {props.history.goBack(); }}>RETURN</button>                      
                    <Link to={{ 
                            pathname: "/checkout",
                            state: props.location.state,
                            guestDetails: guestForm
                            }}>CONTINUE
                        </Link>
                </form>
            </div>
        </div>
    )
}
