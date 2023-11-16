import React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

function HomePage(props) {
    return (
        <div className='home-container'>
            <Header />
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default HomePage;