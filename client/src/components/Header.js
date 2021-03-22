import React from 'react'
import { BsSearch } from 'react-icons/bs'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


export default function Header({cartlength, isLoggedIn }) {

    return (
        <div className="header-container"> 
        {!isLoggedIn ? <>
            <Link to="/">         
                <h1 className="shop-title">Cheeky-Chic</h1>
            </Link> 
            <div className="search-bar-wrapper">
                <BsSearch />
                <input className="search-bar" type="text" placeholder="Search"></input>              
                <Link to={"/cart"}>
                    <div className="cart-icon">
                        <ShoppingCartIcon />  
                        <span className="basketCount">{cartlength}</span>  
                    </div>           
                </Link>
                <Link to={"/login"}>LOG IN</Link>
            </div>
                 </> : 
                 <>
            <Link to="/">         
                <h1 className="shop-title">Cheeky-Chic</h1>
            </Link> 
            <div className="searchbar">
                <BsSearch />
                <input type="text" placeholder="Search"></input>              
                <Link to={"/cart"}>
                    <div className="cart-icon">
                        <ShoppingCartIcon />  
                        <span className="basketCount">{cartlength}</span>  
                    </div>           
                </Link>
                <Link to={"/profile"}><AccountCircleIcon /> </Link>
                <Link to={"/logout"}>LOG OUT</Link> 
            </div>              
                </> 
                }                     
        </div>
    )
}
