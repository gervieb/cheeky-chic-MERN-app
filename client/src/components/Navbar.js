import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import HamburgerNav from './HamburgerNav';

export default function Navbar() {
    const [navbar, setNavbar] = useState(false)

    const showNavbar=()=> {
        setNavbar(!navbar)
      }
   
    return (
        <div className="navbar-container">
            <div className="navbar">
                    <NavLink to={"/"} className="nav" exact activeClassName="nav-active">HOME</NavLink>
                    <NavLink to={"/products"} className="nav" exact activeClassName="nav-active">SHOP</NavLink>
                    <NavLink to={"/about"} className="nav" exact activeClassName="nav-active">ABOUT</NavLink>
                    <NavLink to={"/contact"} className="nav" exact activeClassName="nav-active">CONTACT</NavLink> 
            </div>

            <div className="hidden-nav-wrapper">
                <div className="hidden-nav">
                    <div className="hidden-hamburger">
                        <MenuIcon onClick={showNavbar} />
                    </div>
                </div>
                <HamburgerNav navbar={navbar} showNavbar={showNavbar}/>
            </div>
        </div>
    )
}