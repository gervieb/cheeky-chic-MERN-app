import React from 'react'
import { Link } from 'react-router-dom'
import StoreIcon from '@material-ui/icons/Store';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import ScheduleIcon from '@material-ui/icons/Schedule';

export default function Footer({ isLoggedIn }) {
    return (
        <div>
            <footer>
                <div>
                    <h4>CONTACT INFORMATION</h4>
                        <div className="contact-footer">
                            <StoreIcon />
                            <h6>123 Street, Warsaw, Poland</h6>
                        </div>
                        <div className="contact-footer">
                            <PhoneIcon />
                            <h6> 123-456-789</h6>
                        </div>
                        <div className="contact-footer">
                            <EmailIcon />
                            <h6>cheekychicdemo@gmail.com</h6>
                        </div>
                        <div className="contact-footer">
                            <ScheduleIcon />
                            <h6>Mon - Fri / 9:00AM - 8:00PM</h6>
                        </div>                     
                </div>
                <div>
                    <h4>MY ACCOUNT</h4>
                        <Link to={"/about"}><h6 className="footerText">About us</h6></Link>                         
                        <Link to={"/contact"}><h6 className="footerText">Contact us</h6></Link> 
                        {isLoggedIn?
                        <Link to="/profile"><h6>My Account</h6>                       
                        <h6>Order history</h6>
                        </Link> : null
                        }
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
