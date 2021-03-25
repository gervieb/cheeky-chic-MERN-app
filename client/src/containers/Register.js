import React , { useState } from 'react'
import { customInstance as axios } from '../config.js' 

const Register = () => {
	const [passwordShown, setPasswordShown] = useState(false);
	const [form , setValues] = useState({
		email    	: '',
		password 	: '',
		password2	: '',
		firstName 	: '',
		lastName	: ''
	})

	const handleChange = e => {
       setValues({ ...form, [e.target.name]:e.target.value })
  }
  
	const handleSubmit = async (e) => {
		e.preventDefault()
		try{
			const response =  await axios.post(`/users/register`, {
				email    	: form.email,
			    password 	: form.password,
				password2	: form.password2,
				firstName 	: form.firstName,
				lastName	: form.lastName
	        })
	        alert(response.data.message)
		}
		catch( error ){
      debugger
			console.log(error)
		}
	}

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	return (
			<div className="container">
				<form className="form-container register" onSubmit={handleSubmit} onChange={handleChange}>
				<h2>CREATE YOUR ACCOUNT</h2>
				<label>First Name *</label>
				<input type="text"name="firstName"/><br />
				<label>Last Name *</label>
				<input type="text"name="lastName"/><br />
				<label>Email *</label>
				<input type="text" name="email"/><br />
				<label>Password *</label>
				<input type={passwordShown? "text": "password"} name="password"/><br />
				<label>Repeat password *</label>
				<input type={passwordShown? "text": "password"} name="password2"/>
				<div className="toggle-password">
					<input type="checkbox" onClick={togglePasswordVisiblity}/>
					<p>Show Password</p>
				</div>
				<button type="submit">REGISTER</button>
			</form>
		   </div>
	)
}

export default Register

