import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

export default function ItemInCart(props) {
  const { cartItem, onAdd, onRemove, handleRemoveFromCart } = props;

  return (
    <div className="grid-4" key={cartItem.id}>
      <div className="grid2-checkout">
        <div>
          <img
            className="checkout-product product-image"
            src={cartItem.image}
            alt={cartItem.title}
          />
        </div>
        <div>
          <p className="checkout-product product-name">{cartItem.title}</p>
        </div>
      </div>
      <div>€{cartItem.qty * Number(cartItem.price).toFixed(2)}</div>
      <div className="quantity-wrapper">
        <button onClick={() => onRemove(cartItem)}>-</button>
        {cartItem.qty}
        <button onClick={() => onAdd(cartItem)}>+</button>
      </div>
      <div>
        <DeleteIcon onClick={() => handleRemoveFromCart(cartItem.id)} />
      </div>
    </div>
  );
}
