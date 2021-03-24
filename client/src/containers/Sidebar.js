import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import { SidebarData } from './SidebarData'
import MenuIcon from '@material-ui/icons/Menu';
import CancelIcon from '@material-ui/icons/Cancel';

export default function Sidebar({isAdmin}) {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar=()=> setSidebar(!sidebar)

    return (<div className='sidebar-wrapper'>
        {isAdmin?
        <>
            <AdminHeader /> 
            <div className="admin-sidebar">  
                <nav className='sidebar-menu active'>                                     
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
                <div className="sidebar">
                    <Link to='#' className='menu-bars'>
                        <MenuIcon onClick={showSidebar}/>
                    </Link>
                </div>
                <nav className={sidebar? 'sidebar-menu active' : 'sidebar-menu'}>
                    <ul className='sidebar-menu-items' onClick={showSidebar} > 
                        <li className='sidebar-toggle'>
                        <CancelIcon onClick={showSidebar}/> 
                        </li>  
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
        </> : null}
            </div>           
    )
}
