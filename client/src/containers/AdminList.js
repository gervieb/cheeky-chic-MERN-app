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
            <div className="userslist-wrapper">
                <div className="userslist-title">
                    <h3>FIRST NAME</h3>
                    <h3>LAST NAME</h3>
                    <h3>EMAIL</h3>
                </div>
                
                {filteredAdmins.map((el, idx)=> {
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
