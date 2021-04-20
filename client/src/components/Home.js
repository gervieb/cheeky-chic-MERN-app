import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from "../customStyles.css";
import bag from "../images/bag.jpg"
import apparel from "../images/apparel.jpg"
import shoes from "../images/shoes.jpg"
import watch from "../images/watches.jpg"
import jewelry from "../images/jewelry.jpg"

export default function Home(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    featuredItems(props.productData)
  }, [props.productData])


  const featuredItems = (product)=> {
    const sliced = product.slice(0, 4);
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
        
        <h2 className="fashion-collection">OUR FASHION COLLECTION</h2>
        <div className="collection-wrapper">         
          <div className="img-box">
          <img src={apparel} alt="apparel" />
            <Link to={{pathname: "/product-by-category", data: "apparel"}}><h2 className="collection-label">Apparel</h2></Link>
          </div>
          <div className="img-box">
            <img src={shoes} alt="shoes" />
            <Link to={{pathname: "/product-by-category", data: "shoes"}}><h2 className="collection-label">Shoes</h2></Link>
          </div>
          <div className="img-box">
            <img src={watch} alt="watch" />
            <Link to={{pathname: "/product-by-category", data: "watches"}}><h2 className="collection-label">Watches</h2></Link>
          </div>
          <div className="img-box">
            <img src={bag} alt="bags" />
            <Link to={{pathname: "/product-by-category", data: "bags"}}><h2 className="collection-label">Bags</h2></Link>
          </div>
          <div className="img-box">
            <img src={jewelry} alt="jewelry" />
            <Link to={{pathname: "/product-by-category", data: "jewelry"}}><h2 className="collection-label">Jewelry</h2></Link>
          </div>
        </div> 
    </div>
  )
}
