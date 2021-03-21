import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div>
            <footer>
                <div>
                    <h4>CONTACT INFORMATION</h4>
                        <h5>ADDRESS</h5>
                        <h6>123 Street Name, Warsaw, Poland</h6>
                        <h5>PHONE</h5>
                        <h6>123-456-789</h6>
                        <h5>EMAIL</h5>
                        <h6>cheekychic@gmail.com</h6>
                        <h5>WORKING DAYS/HOURS</h5>
                        <h6>Mon - Fri / 9:00AM - 8:00PM</h6>
                </div>
                <div>
                    <h4>MY ACCOUNT</h4>
                        <Link to={"/about"}><h6 className="footerText">About us</h6></Link>                         
                        <Link to={"/contact"}><h6 className="footerText">Contact us</h6></Link>                      
                        <h6>My Account</h6>                        
                        <h6>Order history</h6>
                </div>
                <div>
                    <h4>FOLLOW US</h4>
                        <h6>Facebook</h6>                        
                        <h6>Instagram</h6>                       
                </div>
            </footer>
        </div>
    )
}
