import React, { useEffect } from 'react'
import SingleProduct from './SingleProduct'

export default function Products({productData, onAddToCart, showAllProducts}) {

    useEffect(() => {
       showAllProducts()
    }, [showAllProducts]) // eslint-disable-next-line react-hooks/exhaustive-deps

    return ( 
        <div className="grid-2">  
            {productData.map((product, id)=> 
                <SingleProduct key={id} product={product} onAddToCart={onAddToCart} />
                 )}  
        </div>       
    )
}



