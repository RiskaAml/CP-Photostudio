import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Google Analytics — hanya load kalau GA_ID tersedia dan user sudah consent
export function initGA() {
  const GA_ID = import.meta.env.VITE_GA_ID
  if (!GA_ID || window._gaLoaded) return
  window._gaLoaded = true
  const s = document.createElement('script')
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  s.async = true
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { anonymize_ip: true })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
)
