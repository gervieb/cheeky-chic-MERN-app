import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Products({productData, onAdd, showAllProducts}) {

    useEffect(() => {
       showAllProducts()
    }, []) // eslint-disable-next-line react-hooks/exhaustive-deps

    return ( 
        <div className="grid-2">  
            {productData.map((product, id)=> 
                <div key={id} className="img-wrap">                   
                        <img src={product.image} alt={product.title} /> 
                        <p className="img-add-cart" onClick={() => onAdd(product)}>Add To Cart</p>
                   
                    <Link to={`./products/${product._id}`}>                
                        <h4 className="product-title">{product.title}</h4>
                    </Link>
                    <p>€{product.price}</p>     
                </div>
                 )}  
        </div>       
    )
}



