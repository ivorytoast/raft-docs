import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CredentialsProvider } from './context/CredentialsContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CredentialsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CredentialsProvider>
  </React.StrictMode>
)
