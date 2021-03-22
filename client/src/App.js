import React, { useState, useEffect} from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Products from "./components/Products"
import About from "./components/About"
import Contact from "./components/Contact"
import Login from "./containers/Login"
import Logout from "./containers/Logout"
import Cart from "./containers/Cart"
import Checkout from "./containers/Checkout"
import Register from "./containers/Register"
import ItemDetails from "./containers/ItemDetails"
import AdminDashboard from './containers/AdminDashboard'
import AdminProductsList from "./containers/AdminProductsList"
import UsersList from "./containers/UsersList"
import UsersProfile from "./containers/UsersProfile"
import Sidebar from "./containers/Sidebar"
import AddProducts from "./containers/AddProducts"
import AdminCategories from "./containers/AdminCategories"
import AdminList from './containers/AdminList'
import AdminHeader from './components/AdminHeader'
import Footer from './components/Footer'
import { customInstance as axios } from './config.js'
import "./App.css"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [productData, setProductData] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [itemAddedToCart, setitemAddedToCart] = useState({})
  const [isAdmin, setIsAdmin] = useState(false);
  const [productDetails, setProductDetails] = useState({
    title: '',
    description: '',
    price: '',
    category: '',  
    _id: '',
    image: null,
    image_id: ''
  })

  const token = JSON.parse(localStorage.getItem('token'));
  const ad = JSON.parse(localStorage.getItem('admin'));
  const storageCart = JSON.parse(localStorage.getItem('cart-list'));
  const user = JSON.parse(localStorage.getItem('user-data'));

  useEffect(() => {
    verify_token();
    checkIfAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (storageCart) {
      setCart(storageCart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('cart-list', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setProductDetails({
      title: '',
      description: '',
      price: '',
      category: '',  
      _id: '',
      image: null
    })
  }, [])

  useEffect(() => {
    showAllProducts()
  }, [])

	const verify_token = async () => {
		if (token === null) return setIsLoggedIn(false);
		try {
			axios.defaults.headers.common['Authorization'] = token;
			const response = await axios.post(`/users/verify_token`);
			return response.data.ok ? 
      setIsLoggedIn(true) : setIsLoggedIn(false);
		} catch (error) {
			console.log(error);
		}
	};

	const login = (token) => {
		localStorage.setItem('token', JSON.stringify(token));
		setIsLoggedIn(true);
  };
  

  const checkIfAdmin = ()=> {
    if (ad === null) {
      setIsAdmin(false)
    } else {
      setIsAdmin(true)
    }
  }

  const admin = (bool) => {
    if (bool) {
    localStorage.setItem('admin', JSON.stringify(bool));
    }
  }

  const showAllProducts = async () => {
    try {
      const response = await axios.get('/products/');
      setProductData(response.data.products)
    } catch (error) {
      console.log("error ==>", error);
    }
  };

  const onAdd = (item) => {
    const exist = cart.find((cartItem) => cartItem._id === item._id);
    if (exist) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id ? { ...exist, qty: exist.qty + 1 } : cartItem
        )
      );
      setIsAddedToCart(true)
      setitemAddedToCart(item)
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
      setIsAddedToCart(true)
      setitemAddedToCart(item)
    }
  };

  const onRemove = (item) => {
    const exist = cart.find((cartItem) => cartItem.id === item.id);
    if (exist.qty === 1) {
      setCart(cart.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id ? { ...exist, qty: exist.qty - 1 } : cartItem
        )
      );
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };


  return  (            
              <Router> 
                {!isLoggedIn &&                  
                    <>
                      <div className="sticky">
                        <Header cartlength={cart.length} isLoggedIn={isLoggedIn}/>
                        <Navbar isAdmin={isAdmin} />
                      </div> 
                        <Route exact path="/" 
                            render = {props =>(<Home isLoggedIn={isLoggedIn} setCart={setCart} cart={cart} productData={productData} {...props} />)} />  
                        <Route
                          exact path="/products"
                          render={(props) => <Products {...props} onAdd={onAdd} productData={productData} showAllProducts={showAllProducts} />}/>
                        <Route exact path="/about" component={About} />
                        <Route exact path="/contact" component={Contact} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/login" 
                        render={(props)=>(<Login {...props} login={login} admin={admin}/>)} />
                      <Route
                        exact path="/products/:id"
                        render={(props) => 
                          (<ItemDetails {...props} 
                            onAdd={onAdd} isAddedToCart={isAddedToCart} 
                            itemAddedToCart={itemAddedToCart} 
                            setIsAddedToCart={setIsAddedToCart} />)} />  
                      <Route exact path="/cart"
                          render={(props) => (
                            <Cart
                              {...props}
                              cartlength={cart.length}
                              handleRemoveFromCart={handleRemoveFromCart}
                              onAdd={onAdd}
                              onRemove={onRemove}
                              cart={cart}
                              setCart={setCart} 
                              isLoggedIn={isLoggedIn}/> )} />
                      <Route exact path="/checkout" 
                          render={(props) => (
                            <Checkout {...props} setCart={setCart} /> )}/> 
                            <Footer />  
                    </>}  
                    {(!isAdmin && isLoggedIn) &&
                    <>
                      <div className="sticky">
                        <Header cartlength={cart.length} isLoggedIn={isLoggedIn}/>
                        <Navbar isAdmin={isAdmin} />
                      </div>  
                        <Route exact path="/" 
                            render = {props =>(<Home isLoggedIn={isLoggedIn} setCart={setCart} cart={cart} productData={productData} {...props} />)} />  
                        <Route
                          exact path="/products"
                          render={(props) => <Products {...props} onAdd={onAdd} productData={productData} showAllProducts={showAllProducts} />}/>
                        <Route exact path="/about" component={About} />
                        <Route exact path="/contact" component={Contact} /> 
                        <Route exact path='/logout'
                          render = {props =>(<Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCart={setCart} {...props} />)} /> 
                        <Route exact path='/profile' 
                          render = {props =>(<UsersProfile user={user} {...props} />)} /> 
                        <Route
                          exact path="/products/:id"
                          render={(props) => 
                            (<ItemDetails {...props} 
                              onAdd={onAdd} isAddedToCart={isAddedToCart} 
                              itemAddedToCart={itemAddedToCart} 
                              setIsAddedToCart={setIsAddedToCart} />)} />  
                        <Route exact path="/cart"
                            render={(props) => (
                              <Cart
                                {...props}
                                cartlength={cart.length}
                                handleRemoveFromCart={handleRemoveFromCart}
                                onAdd={onAdd}
                                onRemove={onRemove}
                                cart={cart}
                                setCart={setCart} 
                                isLoggedIn={isLoggedIn}/> )} />
                        <Route exact path="/checkout" component={Checkout} /> 
                        <Footer />         
                    </>}
                    {(isAdmin && isLoggedIn) &&
                    <>
                      <Route exact path="/admin-header" component={AdminHeader} /> 
                      <Sidebar component={Sidebar} />
                      <Route exact path='/admin-dashboard' component={AdminDashboard} />  
                      <Route exact path='/admin/admin-list' component={AdminList} />                
                      <Route exact path="/admin/users-list" 
                        render = {props =>(<UsersList {...props} />)} />
                      <Route exact path="/admin/products-list" 
                        render = {props =>(<AdminProductsList {...props} productDetails={productDetails} setProductDetails={setProductDetails} />)} /> 
                      <Route exact path="/admin/add-products" 
                         render = {props =>(<AddProducts {...props} productDetails={productDetails} setProductDetails={setProductDetails} />)} />
                      <Route exact path="/admin/categories" component={AdminCategories} />
                      <Route exact path='/logout'
                          render = {props =>(<Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCart={setCart} {...props} />)} />        
                    </> 
                    }            
              </Router>                               
          )  
}
