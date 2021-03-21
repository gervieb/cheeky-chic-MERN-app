import React, { useState, useEffect } from 'react'
import { customInstance as axios } from '../config.js'

export default function UsersList() {
    const [filteredUsers, setFilteredUsers] = useState([])

   useEffect(() => {
       findUsersList()
   }, [])

   const filtered = (userList)=> {
    let users = userList.filter(user => user.admin === false);
    setFilteredUsers(users)
   }
   

    const findUsersList = async()=> {
        try {
            const users = await axios.get(`/users/`)
            filtered(users.data)
        }catch(error){
            console.log(error)
        }
    }


    return (
        <div className="userslist-main-container">
            <h1>USERS LIST</h1>
            <div className="userslist-wrapper">
                <div className="userslist-title">
                    <h3>FIRST NAME</h3>
                    <h3>LAST NAME</h3>
                    <h3>EMAIL</h3>
                </div>
            
            {filteredUsers.map((el, idx)=> {
                return <div key={idx} className="userslist-data">
                            <p>{el.firstName}</p>
                            <p>{el.lastName}</p>
                            <p>{el.email}</p>
                       </div>
            })}
            </div>
        </div>
    )
}
