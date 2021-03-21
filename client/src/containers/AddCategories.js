import React, { useState } from 'react'
import { customInstance as axios } from '../config.js'

export default function AddCategories() {  
    const [categoryName, setCategoryName] = useState('')

    const handleChange = e => {
        setCategoryName({[e.target.name]:e.target.value })
    }

    const createCategory = async () => {
    try{
      const response =  await axios.post(`/categories/create`, {
                category    : categoryName
            })
            setCategoryName(response.data.category)
    }
    catch( error ){
      console.log(error)
    }
}

    return (
        <div>
                <input onChange={handleChange} placeholder="Add new category" name="category"></input>
                <p>{categoryName}</p>
                <h4 onClick={createCategory}>+ ADD</h4>
        </div>
    )
}
