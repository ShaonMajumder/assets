import React from 'react';
import Dashboard from './views/Admin/Dashboard';
import InventoryDashboard from './views/Admin/InventoryDashboard';
import InventoryHistory from './views/Admin/InventoryHistory';
import LogHistory from './views/Admin/LogHistory';

import Login from './views/Login';
import { FaDashcube } from 'react-icons/fa';
import CreateInventory from './views/Admin/CreateInventory';
import UpdateInventory from './views/Admin/UpdateInventory';
import Test from './views/Admin/Inventory/Test';
import Product from './views/Product';
import SurveyDashboard from './views/Admin/SurveyDashboard';

const routes = [
  {
    name: 'Login',
    path: '/login',
    component: <Login />,
    sideBar: false,
    subNav: [],
    permission: true,
    private: false, // Not a private route
  },
  {
    name: 'Dashboard',
    path: '/',
    component: <Dashboard />,
    icon: <FaDashcube />,
    sideBar: false,
    subNav: [],
    permission: true,
    private: true, // Private route
  },
  {
    name: 'Inventory',
    path: '/inventory',
    component: <InventoryDashboard />,
    sideBar: false,
    subNav: [],
    permission: true,
    private: true, // Private route
  },
  {
    name: 'Add into Inventory',
    path: '/inventory/create',
    component: <CreateInventory />,
    sideBar: false,
    subNav: [],
    permission: true,
    private: true, // Private route
  },
  {
    name: 'Edit Inventory',
    path: '/inventory/update/:id',
    component: <UpdateInventory />,
    sideBar: false,
    subNav: [],
    permission: true,
    private: true, // Private route
  },
  {
    name: 'Inventory History',
    path: '/inventory/history/:id',
    component: <InventoryHistory />,
    icon: <FaDashcube />,
    sideBar: false,
    subNav: [],
    permission: true,
    private: true, // Private route
  },
  {
    name: 'Add into Inventory',
    path: '/test',
    component: <Test />,
    sideBar: false,
    subNav: [],
    permission: true,
    private: true, // Private route
  },
  {
    name: 'Products Ecommerce',
    path: '/products',
    component: <Product />,
    sideBar: false,
    subNav: [],
    permission: true,
    private: true, // Private route
  },
  {
    name: 'Backend Logs',
    path: '/logs',
    component: <LogHistory />,
    sideBar: false,
    subNav: [],
    permission: true,
    private: true, // Private route
  },
  {
    name: 'Survey',
    path: '/survey',
    component: <SurveyDashboard />,
    icon: <FaDashcube />,
    sideBar: false,
    subNav: [],
    permission: true,
    private: true, // Private route
  },
  // Add more routes for other pages
];

export default routes;
