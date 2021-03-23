import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

export default function ItemInCart(props) {
  const { cartItem, onAdd, onRemove, handleRemoveFromCart } = props;

  return (
    <tr key={cartItem.id}>
      <td className="grid2-checkout">
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
      </td>
      <td className="quantity-wrapper">
        <button onClick={() => onRemove(cartItem)}>-</button>
        {cartItem.qty}
        <button onClick={() => onAdd(cartItem)}>+</button>
      </td>
      <td>€{cartItem.qty * Number(cartItem.price).toFixed(2)}</td>
      <td>
        <DeleteIcon onClick={() => handleRemoveFromCart(cartItem.id)} />
      </td>
    </tr>
  );
}
