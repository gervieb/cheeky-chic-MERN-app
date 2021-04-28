import React from 'react'
import { NavLink } from 'react-router-dom'

export default function HamburgerNav({ navbar, showNavbar }) {

    return (
        <div id={navbar? "navbar-active" : "navbar-hidden"} className="navbar">
                    <NavLink 
                        to={"/"} 
                        className="navbar-text" 
                        exact 
                        activeClassName="nav-active" 
                        onClick={showNavbar}>
                        HOME
                    </NavLink>
                    <NavLink 
                        to={"/all-products"} 
                        className="navbar-text" 
                        exact 
                        activeClassName="nav-active" 
                        onClick={showNavbar}>
                        SHOP
                    </NavLink>
                    <NavLink 
                        to={"/about"} 
                        className="navbar-text" 
                        exact 
                        activeClassName="nav-active" 
                        onClick={showNavbar}>
                            ABOUT
                    </NavLink>
                    <NavLink 
                        to={"/contact"} 
                        className="navbar-text" 
                        exact 
                        activeClassName="nav-active" 
                        onClick={showNavbar}>
                            CONTACT
                    </NavLink> 
        </div>
    )
}
