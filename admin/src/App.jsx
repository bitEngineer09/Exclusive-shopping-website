import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';
import Lists from './pages/Lists';
import Orders from './pages/Orders';
import CompletedOrders from './pages/CompletedOrders';
import Login from './pages/AuthPages/Login';
import { authDataContext } from './store/AuthContext';

const App = () => {

  const { admin } = useContext(authDataContext);

  return (
    <Routes>
      <Route path='/login' element={!admin ? <Login /> : <Navigate to="/" />} />
      <Route path='/' element={admin ? <Lists /> : <Navigate to="/login" />} />
      <Route path='/add' element={admin ? <Add /> : <Navigate to="/login" />} />
      <Route path='/orders' element={admin ? <Orders /> : <Navigate to="/login" />} />
      <Route path='/completed-orders' element={admin ? <CompletedOrders /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App