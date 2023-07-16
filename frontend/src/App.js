import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './views/Login';
import { useAuth } from './services/AuthContext';
import { checkLoggedInStatus } from './services/HttpService';


const PrivateRoute = ({ element: Element, privateRoute }) => {
  const { isLoggedIn } = useAuth();
  if (privateRoute && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return Element;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkLoggedInStatus());
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<PrivateRoute element={route.component} privateRoute={route.private} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;