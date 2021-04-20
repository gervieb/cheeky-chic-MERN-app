import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

export default function AdminHeader({ showSidebar }) {
    const [adminName, setAdminName] = useState('')

    useEffect(() => {
       const name = JSON.parse(localStorage.getItem('admin-name'));
       setAdminName(name)
    }, [])

    return (
        <div className="admin-header-wrapper header-flex">
            <div className="sidebar">
                <Link to='#' className='menu-bars'>
                    <MenuIcon onClick={showSidebar}/>
                </Link>
            </div>
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
