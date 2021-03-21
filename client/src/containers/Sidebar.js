import React from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import { SidebarData } from "./SidebarData"

export default function Sidebar() {
    // const [sidebar, setSidebar] = useState(true)

    return (<div className="sidebar-wrapper">
                <AdminHeader />        
                <nav className="sidebar-menu active">
                    <ul className='sidebar-menu-items'  >   
                            <h1>Admin Panel</h1>
                        {SidebarData.map((item, i)=> {
                            return (
                                <li key={i} className={item.className}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
        </div>
    )
}
