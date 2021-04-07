import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function GuestForm(props) {
  const [guestForm, setGuestForm] = useState({
        firstName : " ",
				lastName	: " ",
				email    	: " ",
				phone		  : " ",
				street 		: " ",
				address2	: " ",
				city 	  	: " ",
				postcode 	: " ",
				state 		: " ",
        country 	: " "
  })

  const handleChange = (e) => {
    setGuestForm({ ...guestForm, [e.target.name]: e.target.value });
  };

  const saveGuestData = (e) => {
    e.preventDefault();
    sessionStorage.setItem("guest-data", JSON.stringify(guestForm));
    props.history.push({
      pathname: "/guest-checkout",
    });
  };

  return (
    <div className="guest-form-wrapper">
      <div className="guest-container">
        <form onChange={handleChange} onSubmit={saveGuestData}>
          <h2>Guest Infomation</h2>
          <hr />
          <div className="guest-form">
            <p>Personal Details</p>
            <div className="flex">
              <input
                required={true}
                name="lastName"
                placeholder="Last Name*"
              ></input>
              <input
                required={true}
                name="firstName"
                placeholder="First Name*"
              ></input>
            </div>
            <div className="flex">
              <input
                required={true}
                type="email"
                name="email"
                placeholder="Email*"
              ></input>
              <input
                required={true}
                name="phone"
                placeholder="Mobile Number*"
              ></input>
            </div>
            <p className="delivery-details">Delivery Details</p>
            <div className="flex">
              <input
                required={true}
                name="street"
                placeholder="Street*"
              ></input>
              <input
                name="address2"
                placeholder="Apt., Suite, Bldg. (optional)"
              ></input>
            </div>
            <div className="flex">
              <input required={true} name="city" placeholder="City*"></input>
              <input
                required={true}
                name="postcode"
                placeholder="Postcode*"
              ></input>
            </div>
            <div className="flex">
              <input required={true} name="state" placeholder="State*"></input>
              <input
                required={true}
                name="country"
                placeholder="Country*"
              ></input>
            </div>
          </div>
          <p>
            I have been able to read and understand the information on the use
            of my personal data explained in the{" "}
            <Link to="/privacy-policy">
              <b className="policy">Privacy Policy</b>
            </Link>
            .
          </p>

          <div className="guest-form-button">
            <p
              className="back-to-cart"
              onClick={() => {
                props.history.goBack();
              }}
            >
              RETURN
            </p>
            <button>CONTINUE</button>
          </div>
        </form>
      </div>
    </div>
  );
}
