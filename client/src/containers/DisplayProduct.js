import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { customInstance as axios } from '../config.js'


export default function DisplayProduct(props) {
    const [filteredProducts, setFilteredProducts] = useState([])
    const [sortedProducts, setSortedProducts] = useState([])

    useEffect(() => {
        const filtered = props.location.state
        setFilteredProducts(filtered)
    }, [props])

    useEffect(() => {
        const getAllProducts = async() => {
            try {
                const response = await axios.get('/products/');
                sortProducts(response.data.products)
            } catch (error) {
                console.log("error ==>", error);
            }
        }
        getAllProducts()  
    }, []) 

    const sortProducts = (allProducts) => {      
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 5);
        setSortedProducts(selected)
    }

    return (
        <div className="display">
            {(Object.keys(filteredProducts).length === 0 || filteredProducts.length === 0)?
            <div className="product-not-found">
                <h2>OOOPS! PRODUCT NOT FOUND</h2>
                <p>Please try your search again or browse our recommended products below.</p>
                <h5>RECOMMENDED</h5>
                <div className="recommended-products">
                    {sortedProducts.map(product=> {
                        return <Link to={`/products/${product._id}`} key={product._id}><img src={product.image} alt={product.title} /></Link>
                            
                    })}
                </div>
            </div>:
            <div className="filtered_list">
                {filteredProducts.map((product) => {
                    return <div key={product._id} className="display-product">
                            <img src={product.image} alt={product.title} />                      
                            <h3>{product.title}</h3>
                            <Link to={`./products/${product._id}`}>view product</Link>
                        </div>
                })}
            </div>
            }                  
        </div>
    )
}
