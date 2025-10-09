import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import About from './pages/About';
import Collections from './pages/Collections';
// import Product from './pages/Product';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ContactPage from './pages/ContactPage';
import CollectionDetails from './pages/CollectionDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Order from './pages/Order';
import MyOrder from './pages/MyOrder';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess'
import Ai from './components/AI/Ai';


const App = () => {
   return (
      <>
         <ScrollToTop />

         <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/auth' element={<Register />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<ContactPage />} />
            {/* <Route path='/product' element={<Product />} /> */}
            <Route path='/collections' element={<Collections />} />
            <Route path="/collections/:id" element={<CollectionDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/order" element={<Order />} />
            <Route path="/myorder" element={<MyOrder />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order-success" element={<OrderSuccess />} />
         </Routes>
         <Ai />
         <ToastContainer
            position="top-center"
            autoclose={3000}
            theme="dark"
            toastClassName="bg-zinc-300 text-(--text-primary) text-lg shadow-xl"
            bodyClassName="font-medium"
            progressClassName="bg-white"
         />
      </>

   )
}

export default App