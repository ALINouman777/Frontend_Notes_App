import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { useContext } from 'react';
import Context from "./Context/ContextApi"


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Context>
      <App />
    </Context>
  </BrowserRouter>
)
