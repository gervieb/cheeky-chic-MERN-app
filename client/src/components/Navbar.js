import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className="navbar-container">
            <div className="navbar">
                    <NavLink to={"/"} className="nav" exact activeClassName="nav-active">HOME</NavLink>
                    <NavLink to={"/products"} className="nav" exact activeClassName="nav-active">SHOP</NavLink>
                    <NavLink to={"/about"} className="nav" exact activeClassName="nav-active">ABOUT</NavLink>
                    <NavLink to={"/contact"} className="nav" exact activeClassName="nav-active">CONTACT</NavLink> 
            </div> 
        </div>
    )
}