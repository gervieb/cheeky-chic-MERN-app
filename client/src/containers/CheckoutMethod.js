import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { customInstance as axios } from '../config.js'

export default function CheckoutMethod(props) {
    const [passwordShown, setPasswordShown] = useState(false);
	const [form , setForm] = useState({
		email    : '',
		password : ''
	})

	const handleChange = (e) => {
		setForm({...form,[e.target.name]:e.target.value})
	}

	const checkoutLogin = async (e) => {
		e.preventDefault()
		try{
			const response = await axios.post(`/users/login`, {
			email: form.email,
			password: form.password
			})
			if (response.data.ok) {
				if(response.data.admin === true) {
				alert('invalid, please log in as user')
			} else if (response.data.admin === false) {
					localStorage.setItem('user-data', JSON.stringify(response.data));
					props.admin(response.data.admin)
					props.login(response.data.token)
					props.history.push('/cart') 
				} else {
					props.history.push('/')
				}
			} 
			else {
				alert(response.data.message)
			}
		}
		catch(error){
			console.log(error)
		}
	}

    const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};



    return (
        <div className="guest-checkout-wrapper">
            <h2>HOW WOULD YOU LIKE TO CHECKOUT TODAY?</h2>
            <div className="guest-checkout-grid3">
                <form className="grid-3-box" onChange={handleChange} onSubmit={checkoutLogin} >
                    <div className="grid-3-box2 cheeky-login">
                        <h3>CHEEKY CHIC MEMBER</h3>
                        <div className="login-checkout-form">
                            <input name="email" type="text" className="email" required placeholder="Email*" /><br />
                            <input name="password" type={passwordShown? "text": "password"} required placeholder="Password*" /><br />
                            <div className="toggle-password">
                                <input type="checkbox" onClick={togglePasswordVisiblity}/>
                                <p>Show Password</p>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="checkout-login-button">SIGN IN</button>
                </form>

                <div className="grid-3-box">
                    <div className="grid-3-box2 register-checkout-method">
                        <h3>NEW CUSTOMER</h3>
                        <p>Creating an account has many benefits:</p>
                        <div className="benefits-box">
                            <ul>
                                <li>See order and shipping status</li>
                                <li>Track order history</li>
                                <li>Checkout faster</li>
                            </ul>
                        </div>
                    </div>
                    <Link to="/register">REGISTER</Link>
                </div>

                <div className="grid-3-box guest-checkout">
                    <div className="grid-3-box2">
                        <h3>GUEST CHECKOUT</h3>
                        <p className="guest-message">Continue to checkout without an account</p>
                    </div>
                    <Link to={{
                            pathname: "/guest-form",
                            state: props.location.state
                            }}>GUEST CHECKOUT</Link>
                </div>
            </div>
            
        </div>
    )
}

