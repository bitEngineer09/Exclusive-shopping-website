import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './store/AuthContext.jsx'
import ProductContext from './store/ProductContext.jsx'
import CartContext from './store/CartContext.jsx'
import OrderContext from './store/OrderContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <ProductContext>
        <CartContext>
          <OrderContext>
            <App />
          </OrderContext>
        </CartContext>
      </ProductContext>
    </AuthContext>
  </BrowserRouter>,
)
