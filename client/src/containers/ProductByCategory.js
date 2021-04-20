import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function ProductByCategory(props) {
    const [productsByCat, setProductsByCat] = useState([])
 
    useEffect(() => {
        ProdByCategory(props.location.data)
    }, [props.location.data])


    const ProdByCategory=(catName)=> {
        const filteredProd = props.productData.filter((product) => {  
            return product.category.toLowerCase().includes(catName)          
        }); 
        setProductsByCat(filteredProd)
    }
    
    return (
        <div className="filtered_list">
            {productsByCat.map(product => {
                return <div key={product._id} className="display-product">
                    <img src={product.image} alt={product.title} />                      
                    <h3>{product.title}</h3>
                    <Link to={`./products/${product._id}`}>view product</Link>
                </div>
            })}
        </div>
    )
}
