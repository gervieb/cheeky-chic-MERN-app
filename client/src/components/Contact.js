import React from 'react'
import { customInstance as axios } from '../config.js' 

export default function Contact() {

const handleSubmit=(e)=> {
    e.preventDefault()
    const nameInput = e.target.elements.name
    const emailInput = e.target.elements.email
    const subjectInput = e.target.elements.subject
    const messageInput = e.target.elements.message

    const data = { 
        name: nameInput.value, 
        email: emailInput.value, 
        message: messageInput.value, 
        subject: subjectInput.value 
    }

    axios.post('/emails/send_email', data)
		.then((response) => {
			nameInput.value = ""
			emailInput.value = ""
            subjectInput.value = ""
            messageInput.value = ""
			alert("Your message has been sent, thanks!")
            console.log(response)
		})
		.catch(function (error) {
			console.log(error);
		})
}


    return (
        <div className="container">           
            <form className="form-container contact" onSubmit={handleSubmit}>
                <h1>Get in Touch</h1>
                <br />
                <label>Name *</label>
                <input required={true} type="text" name="name"/>
                <br /> 
                <label>Email Address *</label>
                <input required={true} type="email" name="email"/>
                <br />
                <label>Subject *</label>
                <input required={true} type="text" name="subject"/>
                <br />
                <label>Message *</label>
                <input required={true} type="text" name="message"/>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
