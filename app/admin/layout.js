import React from 'react';
import SideBar from '../Components/SideBar/SideBar';
import Topbar from '../Components/TopBar/TopBar';

const Layout = ({children}) => {
  return (
    <div className='flex items-start '>
      <SideBar/>
      <div className='flex-1 px-5'>
<Topbar/>
      {children}
      </div>
    </div>
  );
}

export default Layout;
