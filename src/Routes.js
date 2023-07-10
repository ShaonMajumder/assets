import React from 'react';
import Dashboard from './views/Admin/Dashboard';
import InventoryDashboard from './views/Admin/InventoryDashboard';
import Login from './views/Login';
import { FaDashcube } from 'react-icons/fa';

const routes = [
  {
    name: 'Dashboard',
    path: '/',
    component: <Dashboard />,
    icon: <FaDashcube />,
    sideBar: false,
    subNav: [],
    permission: true,
  },
  {
    name: 'Login',
    path: '/login',
    component: <Login />,
    sideBar: false,
    subNav: [],
    permission: true,
  },
  {
    name: 'Inventory',
    path: '/inventory',
    component: <InventoryDashboard />,
    sideBar: false,
    subNav: [],
    permission: true,
  },
  // Add more routes for other pages
];

export default routes;
