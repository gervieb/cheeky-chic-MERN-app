import React from 'react'
import AppsIcon from '@material-ui/icons/Apps';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PostAddIcon from '@material-ui/icons/PostAdd';
import HomeIcon from '@material-ui/icons/Home';
import { RiAdminLine } from 'react-icons/ri'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/admin-dashboard',
        icon: <HomeIcon />,
        className: 'sidebar-text'
    },
    {
        title: 'Admin',
        path: '/admin/admin-list',
        icon: <RiAdminLine />,
        className: 'sidebar-text'
    },
    {
        title: 'Users',
        path: '/admin/users-list',
        icon: <PeopleIcon />,
        className: 'sidebar-text'
    },
    {
        title: 'Post',
        path: '/admin/add-products',
        icon: <PostAddIcon />,
        className: 'sidebar-text'
    },
    {
        title: 'Products',
        path: '/admin/products-list',
        icon: <ShoppingBasketIcon />,
        className: 'sidebar-text'
    },
    {
        title: 'Categories',
        path: '/admin/categories',
        icon: <AppsIcon />,
        className: 'sidebar-text'
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <PowerSettingsNewIcon />,
        className: 'sidebar-text'
    },
]
