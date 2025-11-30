'use client';

import React from 'react';
import SideBar from '../Components/SideBar/SideBar';
import Topbar from '../Components/TopBar/TopBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children}) => {
  return (
    <div className='flex items-start '>
      <SideBar/>
      <div className='flex-1 px-5'>
        <Topbar/>
        {children}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Layout;
