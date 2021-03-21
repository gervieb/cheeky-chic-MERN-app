import React , { useState } from 'react'
import { customInstance as axios } from '../config.js' 

const Register = () => {
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

	return (
			<div className="container">
				<form className="form-container register" onSubmit={handleSubmit} onChange={handleChange}>
				<h2>CREATE YOUR ACCOUNT</h2>
				<label>First Name *</label>
				<input name="firstName"/><br />
				<label>Last Name *</label>
				<input name="lastName"/><br />
				<label>Email *</label>
				<input name="email"/><br />
				<label>Password *</label>
				<input name="password"/><br />
				<label>Repeat password *</label>
				<input name="password2"/>
				<button type="submit">REGISTER</button>
			</form>
		   </div>
	)
}

export default Register

