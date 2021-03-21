import React from "react";
import ItemInCart from "./ItemInCart";
import { Link } from 'react-router-dom'

export default function Cart(props) {
  const { cartlength, handleRemoveFromCart, onAdd, onRemove, cart } = props;

  const totalPrice = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0)

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
      {cartlength === 0 ? (<p>Your shopping basket is empty</p>): 
      (<div>
          <h3>Your shopping Basket</h3>
          <div className="grid-4 grid-4-title">
              <div><h4>PRODUCT</h4></div>
              <div><h4>PRICE</h4></div>
              <div><h4>QUANTITY</h4></div>
              <div><h4>REMOVE</h4></div>
          </div>
              {renderCart}
              {cart.length !== 0 && (
              <><hr></hr>
                <div className="total-price">
                    <p>Total:</p>
                    <p className="total"><strong>€{totalPrice.toFixed(2)}</strong></p>
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
                <Link to="/products"><p className="continue-shopping">Continue shopping</p></Link> 
            </>
          )}
        </div>
      )}
    </div>
  );
}
