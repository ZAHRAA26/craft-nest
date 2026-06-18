import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
<<<<<<< HEAD
import './index.css'

import App from './App.jsx'
import { BrowserRouter } from "react-router";
=======
import './i18n'
import './index.css'

import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
