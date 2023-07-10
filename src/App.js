import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './views/Admin/Dashboard';
import Login from './views/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes for other pages */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

