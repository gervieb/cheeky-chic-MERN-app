import React, { useState, useEffect } from 'react'
import userIcon from '../images/user-profile-icon.png'
import { HashLink as Link } from 'react-router-hash-link'

export default function UsersProfile() {
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user-data'));
        setUserData(user)
    }, [])
    

    return (
        <div className="users-profile-wrapper"> 
            <div>
                <Link smooth to="#personal-details" className="personal-info-link"><p>Personal Info</p></Link>
                <Link smooth to="#my-purchases" className="my-purchases-link"><p>My Purchases</p></Link>
            </div>
            <div>
                <div className="username-wrapper" >  
                        <img src={userIcon} alt="user icon" id="personal-details"/>
                        <h2 className="username">{userData.firstName} {userData.lastName}</h2>
                </div>                
                <div className="user-information">
                    <div className="personal-details">
                        <div className="user-label-flex">
                            <h4>PERSONAL DETAILS</h4>
                            <h4 className="edit">EDIT</h4>
                        </div>                  
                        <p><strong>First Name:</strong> {userData.firstName} </p>
                        <p><strong>Last Name:</strong> {userData.lastName} </p>
                        <p><strong>Email:</strong> {userData.email} </p>
                        <p><strong>Phone:</strong> {userData.phone} </p>
                    </div>
                    <hr />
                    <div className="billing-wrapper">
                        <div className="user-label-flex">
                            <h4>BILLING ADDRESS</h4>
                            <h4 className="edit">EDIT</h4>
                        </div>    
                            <p><strong>Street Address:</strong> {userData.street} </p>
                            <p><strong>APARTMENT/SUITE # (optional):</strong> {userData.address2} </p>
                            <p><strong>City:</strong> {userData.city} </p>
                            <p><strong>Postcode:</strong> {userData.postcode} </p>
                            <p><strong>State:</strong> {userData.state} </p>
                            <p><strong>Country:</strong> {userData.country} </p>                      
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
