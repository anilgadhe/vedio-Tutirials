import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { VedioIndex } from './video-Tutorial/vedio-index.jsx'
import { CookiesProvider } from 'react-cookie'
import store from "./store/store.jsx"
import { Provider } from "react-redux"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <VedioIndex />
      </Provider>
    </CookiesProvider>
  </StrictMode>,
)
