import React from 'react';
import Dashboard from './views/Admin/Dashboard';
import InventoryDashboard from './views/Admin/InventoryDashboard';
import InventoryHistory from './views/Admin/InventoryHistory';

import Login from './views/Login';
import { FaDashcube } from 'react-icons/fa';
import CreateInventory from './views/Admin/CreateInventory';
import UpdateInventory from './views/Admin/UpdateInventory';
import Test from './views/Admin/Inventory/Test';

const routes = [
  {
    name: 'Login',
    path: '/login',
    component: <Login />,
    sideBar: false,
    subNav: [],
    permission: true,
  },
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
    name: 'Inventory',
    path: '/inventory',
    component: <InventoryDashboard />,
    sideBar: false,
    subNav: [],
    permission: true,
  },
  {
    name: 'Add into Inventory',
    path: '/inventory/create',
    component: <CreateInventory />,
    sideBar: false,
    subNav: [],
    permission: true,
  },
  {
    name: 'Edit Inventory',
    path: '/inventory/update/:id',
    component: <UpdateInventory />,
    sideBar: false,
    subNav: [],
    permission: true,
  },
  {
    name: 'Inventory History',
    path: '/inventory/history/:id',
    component: <InventoryHistory />,
    icon: <FaDashcube />,
    sideBar: false,
    subNav: [],
    permission: true,
  },
  {
    name: 'Add into Inventory',
    path: '/test',
    component: <Test />,
    sideBar: false,
    subNav: [],
    permission: true,
  },
  // Add more routes for other pages
];

export default routes;
