import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import FlashMessage from 'react-flash-message'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { customInstance as axios } from '../config.js'

export default function ItemDetails(props) {
  const { match, onAdd, isAddedToCart, itemAddedToCart, setIsAddedToCart} = props

  const [item, setItem] = useState({});
  
  console.log('this is item', item)
  
  let history = useHistory()
  
  function goBack(){
    history.goBack()
  }

  useEffect(() => {
    fetchSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
      setIsAddedToCart(false)
  }, [setIsAddedToCart])

  const fetchSingleProduct = async () => {
    try {
      const response = await axios.get(`/products/product/${match.params.id}`)
      setItem(response.data.myProduct)
    } catch (error) {
      console.log("error ==>", error);
    }
  };

  // const increaseQuantity = (itemQty) => {
  //   setItem({...item, qty: itemQty + 1} )
  // }

  // const decreaseQuantity = (itemQty) => {
  //   itemQty > 1? setItem({...item, qty: itemQty - 1} ): 
  //   setItem({...item, qty: 1})
  // }

  return ( 
    <div className="product-wrapper">
      <div className="grid-2-item">
        <div>
          <img src={item.image} alt={item.title} />
        </div>
        <div className="product-details">
          <ul>
            <li><h3 className="item-title">{item.title}</h3></li>
            <li><p>{item.description}</p></li>
            <li><label><strong>Price:</strong> €{item.price} </label></li>
            <br />
            {/* <li className="quantity-wrapper">
                <button onClick={() => decreaseQuantity(item.qty)}>-</button>                    
                  {item.qty}                    
                <button onClick={() => increaseQuantity(item.qty)}>+</button>
            </li> */}
            <li>
              <button type="submit" onClick={() => onAdd(item)}>add to cart</button>
              {isAddedToCart?
              <div>
                <FlashMessage duration={3000}>
                  <p style={{color: 'red', fontSize: 'small'}}>{itemAddedToCart.title} has been added to your cart!</p>
                </FlashMessage>
                </div>: null
                }   
            </li>
          </ul>
        </div> 
      </div>
        <div className="go-back-flex">
          <ChevronLeftIcon />
          <p className="go-back" onClick={goBack}>Back To Shop</p>
        </div>      
    </div>
  );
}
