import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Add from './pages/Add';
import Lists from './pages/Lists';
import Orders from './pages/Orders';
import Login from './pages/AuthPages/Login';
import { authDataContext } from './store/AuthContext';

const App = () => {

  const { admin } = useContext(authDataContext);
  console.log(admin);

  return (
    <Routes>
      <Route path='/login' element={!admin ? <Login />: <Navigate to="/"/>}/>
      <Route path='/' element={admin ? <Lists /> : <Navigate to="/login" />}/>
      <Route path='/add' element={admin ? <Add /> : <Navigate to="/login" />}/>
      <Route path='/orders' element={admin ? <Orders /> : <Navigate to="/login" />}/>
    </Routes>
  )
}

export default App