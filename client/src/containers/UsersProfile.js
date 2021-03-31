import React from 'react'
import userIcon from '../images/user-profile-icon.png'
import { HashLink as Link } from 'react-router-hash-link'

export default function UsersProfile({ user, billingDetails, setBillingDetails }) {

    const handleBilling = e => {
        setBillingDetails({ ...billingDetails, [e.target.name]:e.target.value })
   }


    return (
        <div className="users-profile-wrapper"> 
            <div>
                <Link smooth to="#personal-details" className="personal-info-link"><p>Personal Info</p></Link>
                <Link smooth to="#my-purchases" className="my-purchases-link"><p>My Purchases</p></Link>
            </div>
            <div>
                <div className="username-wrapper" >  
                        <img src={userIcon} alt="user icon" id="personal-details"/>
                        <h2 className="username">{user.firstName} {user.lastName}</h2>
                </div>                
                <div className="user-information">
                    <div className="personal-details">
                        <div className="user-label-flex">
                            <h4>PERSONAL DETAILS</h4>
                            <h4 className="edit">EDIT</h4>
                        </div>                  
                        <p><strong>First Name:</strong> {user.firstName} </p>
                        <p><strong>Last Name:</strong> {user.lastName} </p>
                        <p><strong>Email:</strong> {user.email} </p>
                    </div>
                    <hr />
                    <div className="password-wrapper">
                        <div className="user-label-flex">
                            <h4>CHANGE PASSWORD</h4>
                            <h4 className="edit">EDIT</h4>
                        </div> 
                        <form>
                            <input required={true} name="oldPassword" placeholder="Old Password"/>
                            <div className="new-password">
                                <input required={true} name="newPassword" placeholder="New Password"/>
                                <input required={true} name="NewPassword" placeholder="New Password"/>
                            </div>
                        </form>
                    </div>
                    <hr />
                    <div className="billing-wrapper">
                        <div className="user-label-flex">
                            <h4>BILLING DETAILS</h4>
                            <h4 className="edit">EDIT</h4>
                        </div>                  
                        <form onChange={handleBilling} className="billing-address">
                            <div className="billing-details">
                                <input required={true} name="firstName" placeholder="FirstName"/>
                                <input required={true} name="lastName" placeholder="LastName"/>
                            </div>
                            <div className="billing-details">
                                <input required={true} name="email" placeholder="Email"/>
                                <input required={true} name="phone" placeholder="Mobile Number"/>
                            </div>
                            <div className="billing-details">
                                <input required={true} name="street" placeholder="Street"/>
                                <input required={true} name="houseNumber" placeholder="House/Building Number"/>
                            </div>
                            <div className="billing-details">
                                <input required={true} name="city" placeholder="City/Town"/>
                                <input required={true} name="zipCode" placeholder="Zip Code"/>
                            </div>
                            <div className="billing-details">
                                <input required={true} name="state" placeholder="State"/>
                                <input required={true} name="country" placeholder="Country"/>
                            </div>                           
                        </form>
                    </div>
                </div>
                <hr />
                <div>
                    <h4 id="my-purchases">MY PURCHASES</h4>
                    <p>There are no orders</p>
                </div>               
            </div>           
        </div>
    )
}
