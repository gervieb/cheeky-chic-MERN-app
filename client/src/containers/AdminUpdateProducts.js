import React from 'react'
import { customInstance as axios } from '../config.js'
import UploadImages from './UploadImages'

export default function AdminUpdateProducts(props) {
    const { 
      handleCancel, 
      updateProduct, 
      categories, 
      handleChange, 
      showProductForm, 
      productDetails,
      setProductDetails
      } = props;

      const remove_picture = async (_id) => {
        try {
              await axios.delete(`/pictures/remove/${_id}`)
              setProductDetails({...productDetails, image: null } )
        } 
        catch(error){
          console.log(error)
        }
      }
      
    return (
        <form className={showProductForm? 'show-product-form' : 'hidden-form'}>
          <div className="form-wrapper">
            <p><strong>NEW PRODUCT DETAILS</strong></p>
            <div className="label-flex">
              <p>New Title:</p>
              <input 
                className="new-product-title prev-data" 
                name="title" 
                placeholder="Enter title"
                value={productDetails.title}
                onChange={handleChange}/>
            </div>
            <div className="label-flex">
              <p>New Price €:</p>
              <input 
                className="new-product-price prev-data" 
                name="price" 
                placeholder="Enter Price"
                value={productDetails.price}
                onChange={handleChange}/>
            </div>
            <div className="label-flex">
              <p>New Category:</p>
              <select name="category" className="category" onChange={handleChange}>
                  <option value="">CHOOSE CATEGORY</option>
                  {categories.map((cat, id) => {
                  return <option key={id}>{cat.category}</option>
                })}
              </select> 
            </div>
            <div className="description-wrapper">
              <p>New Description:</p>
              <textarea 
                name="description" 
                placeholder="Enter Description"
                value={productDetails.description}
                onChange={handleChange}/>
            </div>   
            <div className="label-flex">
              <p>New Image:</p>
              <UploadImages setProductDetails={setProductDetails} productDetails={productDetails} /> 
            </div> 
            <div className='pictures_container'>
              {productDetails.image !== null &&
                  <div className='picture_container'>
                            <img className="image-upload" src={productDetails.image} alt={productDetails.title} style={{width: '40%'}} onChange={handleChange}/>
                            <button className="prev-data" type="button" onClick={()=> remove_picture(productDetails._id) }>Remove</button>
                  </div>
              }       
            </div> 
              
            <div className="submit-wrapper">
                <p onClick={handleCancel} className="cancel-button">Cancel</p>
                <p type="submit" className="submit-button" onClick={updateProduct}>Save Changes</p>
            </div>
          </div>
      </form>
    )
}
