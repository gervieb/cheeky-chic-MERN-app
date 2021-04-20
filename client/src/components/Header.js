import React, { useState, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, useHistory } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { customInstance as axios } from '../config.js'
import CloseIcon from '@material-ui/icons/Close';


export default function Header({ cartLength, isLoggedIn }) {
    const [search, setSearch] = useState("");
    const [allProducts, setAllProducts] = useState([])
    const [searchbar, setSearchbar] = useState(false)
    let history = useHistory();

    useEffect(() => {
        getAllProducts()
    }, [])


    const showSearchbar =()=> {
        setSearchbar(searchbar? false: true)
    }


    const getAllProducts = async() => {
        try {
            const response = await axios.get('/products/');
            setAllProducts(response.data.products)
          } catch (error) {
            console.log("error ==>", error);
          }
    }     

    const handleSearch =(e)=> {
        setSearch(e.target.value.toLowerCase())
    }

    const searchProduct = async(e) => {
        e.preventDefault()
        filtered(allProducts);  
    }

    const filtered = (allProducts) => {
        let filteredProd = allProducts.filter((product) => {  
            return (
            product.title.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search)
        )
    }); 

        history.push({
            pathname: "/display",
            state: filteredProd,
            products: allProducts}) 
    }

    const clearSearch =()=> {
        setSearch("");
    }


    return (
        <div className="header-container"> 
            <Link to="/">         
                <h1 className="shop-title">Cheeky-Chic</h1>
            </Link> 
            <div className="search-bar-wrapper">
                <form onSubmit={searchProduct}>
                    {!searchbar?
                    <BsSearch onClick={showSearchbar} className="search-bar-icon"/>:
                    <CloseIcon onClick={showSearchbar}/>
                    }
                    <div className={searchbar? "show-searchbar" : "searchbar-hidden"}>
                        <input className="search-bar" placeholder="What are you searching for?" value={search} onChange={handleSearch}/>
                        {search.length > 0 &&
                        <span onClick={clearSearch}>Clear</span>
                        }
                        <span onClick={searchProduct}><BsSearch /> </span>
                    </div>  
                </form>      
                <Link to={"/cart"}>
                    <div className="cart-icon">
                        <ShoppingCartIcon />  
                        <span className="basketCount">{cartLength}</span>  
                    </div>           
                </Link>
                {!isLoggedIn?
                <Link to={"/login"}>LOG IN</Link>:
                <>
                <Link to={"/profile"}><AccountCircleIcon /> </Link>
                <Link to={"/logout"}>LOG OUT</Link> 
                </>
                    }
            </div>
        </div>
    )
}
