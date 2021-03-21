import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleProduct({ product }) {
    
    return (
        <div>
            <img src={product.image} alt={product.title} /> 
            <Link to={`./products/${product._id}`}>                
                <p>{product.title}</p>
            </Link>
            <p>€{product.price}</p>     
        </div>
    )
}
