import { useState, useRef } from 'react';
import * as React from "react";
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import "./Sidebar.css"
import "../App.css"
import Footer from '../pages/Footer';
import Box from "@mui/material/Box";
// import BottomNavigation from "@mui/material/BottomNavigation";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import RestoreIcon from "@mui/icons-material/Restore";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";


const Sidebar = ({children}) => {
    const [value, setValue] = React.useState(0);
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/profile",
            name:"Profile",
            icon:<FaUserAlt/>
        },
        {
            path:"/signup",
            name:"SignUp",
            icon:<FaRegChartBar/>
        },
        {
            path:"/signin",
            name:"SignIn",
            icon:<FaCommentAlt/>
        },
      
    ]
    return (
        <div className="sidebar-container" >
           
           <div style={{width: isOpen ? "200px" : "50px", backgroundColor: "#03045e"}} className="sidebar">
               <div className="top_section">
                   {/* <h1 style={{display: isOpen ? "block" : "none", color:"#fff"}} className="logo">MoiApp</h1> */}
                   <div className="logo"></div>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
         
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
          
           </div>
           <main>{children}</main>
           <div className='footer'>
           <Footer className="footer"/>
           </div>
        
        </div>
    );
};

export default Sidebar;