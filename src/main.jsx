import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { preload } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import interFont from '@fontsource-variable/inter/files/inter-latin-opsz-normal.woff2?url'
import displayFont from '@fontsource-variable/big-shoulders/files/big-shoulders-latin-opsz-normal.woff2?url'
import './fonts.css'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'

preload(interFont, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' })
preload(displayFont, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
