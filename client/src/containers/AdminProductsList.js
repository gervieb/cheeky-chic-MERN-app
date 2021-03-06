import React, { useState, useEffect } from 'react'
import { customInstance as axios } from '../config.js'
import { MdDelete } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import AdminUpdateProducts from './AdminUpdateProducts'

export default function AdminProductsList(props) {
    const [productList, setProductList] = useState([])
    const [categories, setCategories] = useState([])
    const [showProductForm, setShowProductForm] = useState(false)
    const {productDetails, setProductDetails} = props

    useEffect(() => {
        showAllProducts();
      }, []);

    useEffect(() => {
      showCategories();
    }, [])
 
    const showAllProducts = async () => {
        try {
          const response = await axios.get('/products/');
          setProductList(response.data.products)
        } catch (error) {
          console.log("error ==>", error);
        }
      };

    const showCategories = async () => {
      try{
        const response =  await axios.get(`/categories/find_all`)
        setCategories(response.data.myCategories)    
      }
      catch( error ){
        console.log(error)
      }
    } 

    const form = () => {
      setShowProductForm(true)
    }

    const handleChange = e => {
      setProductDetails({...productDetails, [e.target.name]:e.target.value })
      }

    const handleCancel = e => {
        setShowProductForm(false)
    }

    const findProduct = async (_id)=> {
      try{
          const response =  await axios.get(`/products/product/${_id}`)
            setProductDetails(response.data.myProduct)  
            form()            
      }
      catch( error ){
        console.log(error)
      }
    }

    const updateProduct = async () => {
      try{
        await axios.post(`/products/update`, {
              newTitle      : productDetails.title,
              newPrice      : productDetails.price,
              newDescription: productDetails.description,
              newCategory   : productDetails.category,
              id            : productDetails._id,
              newImage      : productDetails.image
              })
              alert('product updated')    
      }
      catch( error ){
        console.log(error)
      } 
      setProductDetails({
        title: '',
        description: '',
        price: '',
        category: '',  
        _id: '',
        image: null
      })
      setShowProductForm(false) 
      showAllProducts()  
    }

    const deleteProduct = async (id) => {
        try{
          var decision = window.confirm('Are you sure you want to delete this item?')
          if(decision) {
            await axios.post(`/products/delete`, {
            product_id: id,
            })
          }
        } catch (error) {
          console.log("error ==>", error);
        }
        showAllProducts()
      };

    return (
        <div className="admin-product-wrapper">
            <div>
                <h1>ALL PRODUCTS</h1>                       
                <div className="all-products-wrapper">
                  <div className="product-title-wrapper">
                    <div className="products-grid-5 title">
                        <div><h5>PRODUCT</h5></div>
                        <div><h5>CATEGORY</h5></div>
                        <div><h5>PRODUCT ID</h5></div>
                        <div><h5>PRICE</h5></div>
                        <div><h5>ACTION</h5></div>
                    </div>
                  </div>
                
                {productList.map((el, id) => (
                    <div key={id} className="products-grid-5 all-products">
                        <div className="image-title">
                          <img className="product-img" src={el.image} alt={el.title} />
                          <p><i>{el.title}</i></p>
                        </div>
                        <p><strong>{el.category}</strong></p>
                        <p>{el._id}</p>
                        <p>???{el.price}</p>
                        <div className="action">
                          <h3 className="update-product" onClick={()=>findProduct(el._id)}><FaRegEdit /></h3>
                         <h3 className="delete-button" onClick={()=> deleteProduct(el._id)}><MdDelete/></h3>
                        </div>
                    </div>                  
                ))}
                <AdminUpdateProducts 
                              handleCancel={handleCancel} 
                              updateProduct ={updateProduct} 
                              productDetails ={productDetails}
                              setProductDetails={setProductDetails}
                              categories={categories} 
                              handleChange={handleChange} 
                              showProductForm={showProductForm} />
                </div>
            </div>
        </div>
    )
}