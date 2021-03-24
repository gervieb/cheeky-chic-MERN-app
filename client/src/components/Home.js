import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from "../customStyles.css";

export default function Home({ productData }) {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    feauturedItems(productData)
  }, [productData])
  
  

  const feauturedItems = (prod)=> {
    const sliced = prod.slice(0, 4);
    setData(sliced)
  } 

  return (
    <div className="featured-products">    
        <Carousel>
          {data.map((el, id) => (
            <div key={id}>
              <img src={el.image} alt={el.title} style={style} /> 
              <Link to="/products"><p className="shop-now">Shop Now</p></Link>
                <div className="tagline">
                  <p>DISCOVER & SHOP</p>
                  <p>THE TREND</p>  
                </div>         
            </div>
          ))}
        </Carousel>
    </div>
  );
}
