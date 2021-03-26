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
		})
		.catch(function (error) {
			console.log(error);
		})
}


    return (
        <div className="container"> 
            <div className="contact-container">          
                <form className="contact" onSubmit={handleSubmit}>
                    <h1>GET IN TOUCH</h1>
                    <p>Got a question? We'd love to hear from you.
                        Send us a message and we'll respond as soon as possible.
                    </p>
                    <div className="flex-input">
                        <input required={true} type="text" name="name" placeholder="Your Name"/>
                        <input required={true} type="email" name="email" placeholder="Your Email"/>
                    </div>
                    <input className="subject" required={true} type="text" name="subject" placeholder="Subject"/>
                    <textarea required={true} type="text" name="message" placeholder="Your Message"/>
                    <button type="submit">Send Message </button>
                </form>
            </div>
        </div>
    )
}
