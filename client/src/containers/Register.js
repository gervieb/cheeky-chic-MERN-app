import React , { useState } from 'react'
import { Link } from 'react-router-dom';
import { customInstance as axios } from '../config.js' 

const Register = (props) => {
	const [passwordShown, setPasswordShown] = useState(false);
	const [form , setForm] = useState({})

	const handleChange = e => {
       setForm({ ...form, [e.target.name]:e.target.value })
  }
  
	const handleSubmit = async (e) => {
		e.preventDefault()
		try{
			const response =  await axios.post(`/users/register`, {
				firstName 	: form.firstName,
				lastName	: form.lastName,
				email    	: form.email,
				phone		: parseInt(form.phone),
				street 		: form.street,
				address2	: form.address2,
				city 		: form.city,
				postcode 	: form.postcode,
				state 		: form.state,
				country 	: form.country,
			    password 	: form.password,
				password2	: form.password2,
				
	        })
			if (response.data.ok) {
				alert(response.data.message)
				props.history.push('/login')
			} else 
				alert(response.data.message)
		}
		catch( error ){
			console.log(error)
		}
	}

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	return (
			<div className="container">
				<form className="register-container register" onSubmit={handleSubmit} onChange={handleChange}>
				<h2>CREATE YOUR ACCOUNT</h2>

				<div className="flex-register">
					<input required type="text"name="firstName" placeholder="First Name*"/><br />
					<input required type="text"name="lastName" placeholder="Last Name*"/><br />
				</div>

				<div className="flex-register">
					<input required type="email" name="email" placeholder="Email*" /><br />
					<input required type="text" name="phone" placeholder="Mobile Number*" /><br />
				</div>

				<div className="flex-register">
					<input required type="text" name="street" placeholder="Street Address*"/><br />
					<input type="text" name="address2" placeholder="Apt., Suite, Bldg. (optional)"/><br />
				</div>

				<div className="flex-register">
					<input required type="text" name="city" placeholder="City/Town*" /><br />
					<input required type="text" name="postcode" placeholder="Postcode*" /><br />					
				</div>

				<div className="flex-register">
					<input required type="text" name="state" placeholder="State*" /><br />
					<input required type="text" name="country" placeholder="Country*" /><br />
				</div>

				<div className="flex-register">
					<input required type={passwordShown? "text": "password"} name="password" placeholder="Password*" /><br />
					<input required type={passwordShown? "text": "password"} name="password2" placeholder="Repeat Password*" /><br />
				</div>

				<div className="toggle-password">
					<input type="checkbox" onClick={togglePasswordVisiblity}/>
					<p>Show Password</p>
				</div>
				<div className="flex-checkbox">
					<input required type="checkbox" />
					<p>I accept <Link to="/terms-and-condition"><b className="policy">Terms and Condition</b></Link> and <Link to="/privacy-policy"><b className="policy">Privacy Policy</b></Link></p>
				</div>
				<button type="submit">REGISTER</button>
			</form>
		   </div>
	)
}

export default Register

