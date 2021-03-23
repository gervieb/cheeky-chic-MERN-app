import React, { useState, useEffect } from 'react'
import { customInstance as axios } from '../config.js'

export default function AdminList() {
    const [filteredAdmins, setFilteredAdmins] = useState([])

    useEffect(() => {
        findUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
 
    const filtered = (adminList) => {
        let admins = adminList.filter(user => user.admin === true);
        setFilteredAdmins(admins)
       }
    
    const findUsers = async()=> {
        try {
            const admins = await axios.get(`/users/`)
            filtered(admins.data)
        }catch(error){
            console.log(error)
            }
    }

    return (
        <div className="userslist-main-container">
            <h1>ADMIN LIST</h1>
            <table className="userslist-table userslist-wrapper">
                <thead>
                    <tr>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th>EMAIL</th>
                    </tr>
                </thead>
                
                {filteredAdmins.map((el, idx)=> {
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
