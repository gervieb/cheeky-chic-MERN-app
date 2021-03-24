import React, { useState, useEffect } from 'react'
import { customInstance as axios } from '../config.js'
import { MdDelete } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'

export default function AdminCategories() {
    const [categoryList, setCategoryList] = useState([])
    const [catName, setCatName] = useState('')
    const [newCatDetails, setNewCatDetails] = useState([])
    const [showCategoryForm, setShowCategoryForm] = useState(false)

    useEffect(() => {
       showCategories()
    }, [])

    const showCategories = async () => {
        try{
          const response =  await axios.get(`/categories/find_all`)
          setCategoryList(response.data.myCategories)    
        }
        catch( error ){
          console.log(error)
        }
    } 

    const createCategory = async (e) => {
        e.preventDefault()
        try{
          const response =  await axios.post(`/categories/create`, {
                    category    : catName
                })
                alert(`${response.data.addCategory.category} is added`)
                setCatName('')
        }
        catch( error ){
          console.log(error)
        }
        showCategories();

    }

    const deleteCategory = async (id) => {
        try{
            var decision = window.confirm('Are you sure you want to delete?')
            if(decision) {
                await axios.post(`/categories/delete`, {
                            _id    : id
                        })
            setShowCategoryForm(false)
            }
        }
        catch( error ){
          console.log(error)
        }
        showCategories()
    }

    const form = (id) => {
        setShowCategoryForm(true)
        setNewCatDetails({_id: id})
    }

    const handleForm = e => {
        setNewCatDetails({...newCatDetails, [e.target.name]:e.target.value })
    }

    const handleCancel = e => {
        setShowCategoryForm(false)
    }

    const updateCategory = async () => {
        try{
           await axios.post(`/categories/update`, {
                    id    : newCatDetails._id,
            newCategory   : newCatDetails.newCategory
                })            
        }
        catch( error ){
          console.log(error)
        }
        showCategories();
        setShowCategoryForm(false)
        
    }

    return (
        <div className="category-wrapper">
            <div className="category-form-wrapper">
                <h2>CATEGORY  LIST</h2>    
                    {categoryList.map((el, id) => {
                        return <div key={id} className="category-list">
                            <div><p>{el.category}</p></div>
                            <div className="category-icons">
                                <h3 className="update-category" onClick={()=>form(el._id)}><FaRegEdit /></h3>
                                <h3 className="delete-category" onClick={()=>deleteCategory(el._id)}><MdDelete /></h3>
                            </div>         
                        </div>
                    })}
                <form 
                    onChange={handleForm}
                    className={showCategoryForm? 'show-form' : 'hidden-form'}
                    id="new-form"
                >
                    <label>New Category Name:
                    <input className="new-input-category" name="newCategory"/>
                    </label>
                    <div className="submit-wrapper">
                        <p onClick={handleCancel} className="cancel-button">Cancel</p>
                        <p className="submit-button" onClick={updateCategory}>Save</p>
                    </div>
                </form>
                <form  
                onSubmit={createCategory} >
                    <input required className="enter-category" type="text" placeholder="Enter category" name="category" value={catName} onChange={(e) => setCatName(e.target.value)}></input>
                    <button type="submit">Add Category</button>
                </form>
            </div>
        </div>
    )
}

