import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className="navbar-container">
            <div className="navbar">
                <NavLink to={"/"}>HOME</NavLink>
                <NavLink to={"/products"}>SHOP</NavLink>
                <NavLink to={"/about"}>ABOUT</NavLink>
                <NavLink to={"/contact"}>CONTACT</NavLink> 
            </div> 
        </div>
    )
}