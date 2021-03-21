import React, { useState, useEffect } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function AdminHeader() {
    const [adminName, setAdminName] = useState('')

    useEffect(() => {
       const name = JSON.parse(localStorage.getItem('admin-name'));
       setAdminName(name)
    }, [])

    return (
        <div className="admin-header-wrapper header-flex">
            <div>
                <h1>Cheeky-Chic</h1>
            </div>
            <div className="admin-profile">
                <AccountCircleIcon />
                <p className="admin-name">{adminName}</p>
            </div>
        </div>
    )
}
