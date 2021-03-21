import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import FlashMessage from 'react-flash-message'
import { customInstance as axios } from '../config.js'

export default function ItemDetails({ match, onAdd, isAddedToCart, itemAddedToCart, setIsAddedToCart}) {

  const [item, setItem] = useState({});
  
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
  }, [false])

  const fetchSingleProduct = async () => {
    try {
      const response = await axios.get(`/products/product/${match.params.id}`)
      setItem(response.data.myProduct)
    } catch (error) {
      console.log("error ==>", error);
    }
  };

  return ( 
    <div className="product-wrapper grid-2">
      <div>
        <img src={item.image} alt={item.title} /><br/><br/>
        <button className="goBack" onClick={goBack}>previous</button>
      </div>
      <div className="product-details">
        <ul>
          <li><h3>{item.title}</h3></li>
          <li><p>{item.description}</p></li>
          <li><label> Price: €{item.price} </label></li>
          <br />
          <li>
            <button onClick={() => onAdd(item)}>add to cart</button>
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
  );
}
