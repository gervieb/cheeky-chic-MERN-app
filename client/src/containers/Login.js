import React , { useState } from 'react'
import { customInstance as axios } from '../config.js'
import { Link } from 'react-router-dom' 


const Login = (props) => {
	const [passwordShown, setPasswordShown] = useState(false);
	const [ form , setForm ] = useState({
		email    : '',
		password : ''
	})

	const handleChange = (e) => {
		setForm({...form,[e.target.name]:e.target.value})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try{
			const response = await axios.post(`/users/login`, {
			email: form.email,
			password: form.password
			})
			if (response.data.ok) {
				if(response.data.admin === true) {
				localStorage.setItem('admin-name', JSON.stringify(response.data.firstName));
				props.admin(response.data.admin)
				props.login(response.data.token)
				props.history.push('/admin-dashboard')
			} else if (response.data.admin === false) {
					localStorage.setItem('user-data', JSON.stringify(response.data));
					props.admin(response.data.admin)
					props.login(response.data.token)
					props.history.push('/') 
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
		<div className="container">
			<form className="form-container login" onSubmit={handleSubmit} onChange={handleChange}>
			<h2>LOGIN</h2>
			<label>Email *</label>    
			<input type="text" required={true} name="email"/><br />
			<label>Password *</label>
			<input required={true} type={passwordShown? "text": "password"} name="password"/><br />
			<div className="toggle-password">
				<input type="checkbox" onClick={togglePasswordVisiblity}/>
				<p>Show Password</p>
			</div>
			<button type="submit">LOGIN</button>
			<div className="signup-form">
				<p>No account?</p>
				<Link to={"/register"}>Create account</Link>
			</div>
			</form>
			<div className="login-details">
				<div className="login-user">
					<h6>login as user</h6>
					<p><strong>email:</strong></p>
					<p><i>gervie.demo@gmail.com</i></p> 
					<p><strong>password:</strong></p>
					<p><i>user</i></p>
				</div>
				<div className="login-admin">
					<h6>login as admin</h6>
					<p><strong>email:</strong></p>
					<p><i>cheekychic.admin@gmail.com</i></p> 
					<p><strong>password:</strong></p> 
					<p><i>admin</i></p>
				</div>
			</div>		
		</div>
	)
}

export default Login;
