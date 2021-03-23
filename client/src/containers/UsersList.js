import React, { useState, useEffect } from 'react'
import { customInstance as axios } from '../config.js'

export default function UsersList() {
    const [filteredUsers, setFilteredUsers] = useState([])

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

   const filtered = (userList)=> {
    let users = userList.filter(user => user.admin === false);
    setFilteredUsers(users)
   }


    return (
        <div className="userslist-main-container">
            <h1>USERS LIST</h1>
            <table className="userslist-table userslist-wrapper">
                <thead>
                    <tr>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th>EMAIL</th>
                    </tr>
                </thead>
            
            {filteredUsers.map((el, idx)=> {
                return <tbody key={idx}>
                            <tr>
                                <td>{el.firstName}</td>
                                <td>{el.lastName}</td>
                                <td>{el.email}</td>
                            </tr>
                       </tbody>
            })}
            </table>
        </div>
    )
}
