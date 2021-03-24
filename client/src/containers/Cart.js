import React from "react";
import ItemInCart from "./ItemInCart";
import { Link } from 'react-router-dom'
import shoppingCart from '../images/cart.png'


export default function Cart(props) {
  const { cartlength, handleRemoveFromCart, onAdd, onRemove, cart } = props;
  const price = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const shippingFee = 24;
  const totalPrice = price + shippingFee;

  const renderCart = cart.map((item, idx) => (
    <ItemInCart
      key={idx}
      cartItem={item}
      onAdd={onAdd}
      onRemove={onRemove}
      handleRemoveFromCart={handleRemoveFromCart}
    />
  ));

  return (
    <div className="cart-wrapper"> 
      {cartlength === 0 ? <>
      <img src={shoppingCart} alt="empty shopping cart" />
      <p>Your shopping cart is empty.</p>
      <Link to="/products" className="shop-now-button"><h5 className="shop-now-label">ADD NOW</h5></Link>
      </>: 
      (<div className="cart-flex">
        <div className="cart">
          <div className="cart-title"> 
            <h3>Your shopping Basket</h3>
            <h3>Items {cartlength}</h3>
          </div>
          <table id="cart">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
                <th>REMOVE</th>
              </tr>
            </thead>
                {renderCart}
          </table>
        </div>
              {cart.length !== 0 && (
        <div className="price-wrapper">
          <div className="total-price">
              <h3>Summary</h3>
              <div className="cost-container reduce">
                <p>SUBTOTAL</p>
                <p><strong>€{price.toFixed(2)}</strong></p>
              </div>
              <div className="cost-container reduce">
                <p>SHIPPING COST</p>
                <p><strong>€{shippingFee}</strong></p>
              </div>
              <div className="cost-container total-cost">
                <p>TOTAL PRICE</p>
                <p><strong>€{totalPrice}</strong></p>
              </div> 
              <Link to={{ 
                pathname: "/checkout",
                state: {
                  name: 'Payment Test Mode',
                  description: 'Please enter your details',
                  label: 'PAY',
                  amount: totalPrice,
                  cartList: cart                   
                  }
                }}>CHECKOUT
            </Link>
          </div> 
        </div>
          )}
        </div>
      )}
    </div>
  );
}
