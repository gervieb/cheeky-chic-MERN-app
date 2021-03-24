import React, { useState, useEffect } from 'react'
import { customInstance as axios } from '../config.js'
import UploadImages from './UploadImages'

export default function AddProducts(props) {
  const {productDetails, setProductDetails} = props
  const {isError, setIsError} = useState(false)
  const [message, setMessage] = useState('')
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
      showCategories()
    }, [])

    useEffect(() => {
      const clearForm = () => {
        setProductDetails({
              title: '',
              description: '',
              price: '',
              category: '',  
              _id: '',
              image: null,
              image_id: ''
            })
       };
       clearForm() // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])

    const handleChange = e => {
        setProductDetails({ ...productDetails, [e.target.name]:e.target.value })
    }

    const createProduct = async (e) => {
        e.preventDefault()
      try{
          const response = await axios.post(`/products/create`, {
                  title    	  : productDetails.title,
                  description : productDetails.description,
                  price       : productDetails.price,
                  image       : productDetails.image,
                  category    : productDetails.category,
              })
              console.log(response.data.error.message)
              response.status.ok?         
              alert(`${productDetails.title} is added to your products`):
              setIsError(true)
              setMessage(response.data.error.message)
              
      }
      catch( error ){
        console.log(error)
      }

    setProductDetails({
      title: '',
      description: '',
      price: '',
      category: '',  
      image: null,
      image_id: ''         
    })
    e.target.value = null
  }

  const showCategories = async () => {
        try{
          const response =  await axios.get(`/categories/find_all`)
          setCategoryList(response.data.myCategories)      
        }
        catch( error ){
          console.log(error)
        }
    } 

    const remove_picture = async (_id) => {
      try {
            await axios.delete(`/pictures/remove/${_id}`)
            setProductDetails({...productDetails, image: null, image_id: '' })
      } 
      catch(error){
        console.log(error)
      }
    }

    return (
        <form onSubmit={createProduct} className="add-product-wrapper">
            <h1>ADD NEW PRODUCT</h1>
            <div className="left-right-wrapper">
              <div className="left-div">
                <div className="label-wrapper">
                  <h5>TITLE</h5>
                  <input required={true} onChange={handleChange} name="title" value={productDetails.title}></input>
                </div>
                <div className="label-wrapper">
                    <h5>PRICE €</h5>
                    <input required={true} onChange={handleChange} name="price" value={productDetails.price}></input> 
                </div>
                <div className="label-wrapper flex-column">
                    <h5>DESCRIPTION</h5>
                    <textarea required={true} onChange={handleChange} name="description" value={productDetails.description}></textarea>
                </div>
              </div>
              <div className="right-div">
              <div className="shadow">
                  <h5>CATEGORY</h5>
                    <select name="category" onChange={handleChange} required>
                        <option value="">CHOOSE CATEGORY</option>
                        {categoryList.map((el, id) => {
                        return <option key={id} >{el.category}</option>
                      })}
                    </select> 
              </div>
              <div className="shadow image-upload-wrapper">
                  <h5>IMAGE</h5>
                  <UploadImages productDetails={productDetails} setProductDetails={setProductDetails} />
              </div>
                  <div className='pictures_container'>
                    {productDetails.image !== null &&
                    <div className='picture_container'>
                                    <img className="image-upload" alt={productDetails.title}  src={productDetails.image} />
                                    <button type="button" onClick={()=> remove_picture(productDetails.image_id) }>Remove</button>
                    </div>}      
                  </div>                            
              </div> 
            </div> 
            <div className="clear">         
              <button type="submit">Add product</button>   
            </div>
            {isError? <p className="add-products-error-message">{message}</p> : null}
        </form>
    )
}
