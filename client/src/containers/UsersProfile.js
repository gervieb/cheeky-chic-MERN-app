import React from 'react'

export default function UsersProfile({ user }) {
    return (
        <div className="users-profile-wrapper">
            <h1>Account Information</h1>
            <div className="user-information">
                <p>First Name: {user.firstName} </p>
                <p>Last Name: {user.lastName} </p>
                <p>Email: {user.email} </p>
                <p>Change Password</p>
                <p>Delete Account?</p>
                <button>Update Account</button>
            </div>
        </div>
    )
}
