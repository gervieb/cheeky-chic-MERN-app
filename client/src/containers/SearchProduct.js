import React from 'react'
import { BiSearch } from 'react-icons/bi'

export default function SearchProduct() {

    return (
        <div className="searchProd">
            <BiSearch/>
            <input type="text" name="searchProduct" placeholder="Search Products"></input>
        </div>
    )
}
