import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { VedioIndex } from './video-Tutorial/vedio-index.jsx'
import {CookiesProvider} from 'react-cookie'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <CookiesProvider>
    <VedioIndex/>
   </CookiesProvider>
  </StrictMode>,
)
