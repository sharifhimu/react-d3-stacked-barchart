import React from 'react';
import {Route,  Routes, Outlet } from "react-router-dom";
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'


function Layout() {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

const routes = () => {
    return (
        <div>
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<SignIn />} />
            <Route path="dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
        </div>
    );
};

export default routes;