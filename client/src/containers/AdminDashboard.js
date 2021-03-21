import React, { useState, useEffect } from 'react'
import { customInstance as axios } from '../config.js'

export default function AdminDashboard() {
    const [userList, setUserList] = useState([])
    const [productList, setProductList] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
      const findUsersList = async()=> {
        try {
            const users = await axios.get(`/users/`)
            filtered(users.data)
        }catch(error){
            console.log(error)
        }
      }
      findUsersList()
    }, [])

    useEffect(() => {
      const showAllProducts = async () => {
        try {
          const response = await axios.get('/products/');
          setProductList(response.data.products)
        } catch (error) {
          console.log("error ==>", error);
        }
      }
      showAllProducts()
    }, [])

    useEffect(() => {
      const showCategories = async () => {
        try{
          const response =  await axios.get(`/categories/find_all`)
          setCategories(response.data.myCategories)    
        }
        catch( error ){
          console.log(error)
        }
      } 
      showCategories()
    }, [])

    const filtered = (userList)=> {
      let users = userList.filter(user => user.admin === false);
      setUserList(users)
    }
  
    return (
        <div className="dashboard-wrapper" >
          <h1>DASHBOARD</h1>
            <div className="dashboard-grid3">
              <div className="dashboard-div">
                  <h3>REGISTERED USER</h3>
                  {userList.length}
              </div>
              <div className="dashboard-div">
                  <h3>PRODUCTS</h3>
                  {productList.length}
              </div>
              <div className="dashboard-div">
                  <h3>CATEGORIES</h3>
                  {categories.length}
              </div>
            </div>
        </div>
    )
}
