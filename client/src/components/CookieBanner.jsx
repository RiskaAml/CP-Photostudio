import { useState, useEffect } from 'react'
import { initGA } from '../main'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('af_cookie_consent')
    if (!consent) setTimeout(() => setShow(true), 2000)
    else if (consent === 'accepted') initGA()
  }, [])

  const accept = () => {
    localStorage.setItem('af_cookie_consent', 'accepted')
    setShow(false)
    initGA()
  }

  const decline = () => {
    localStorage.setItem('af_cookie_consent', 'declined')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:w-96 z-50 animate-fade-up">
      <div className="bg-dark text-white rounded-2xl p-5 shadow-2xl border border-white/10">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-3xl flex-shrink-0">🍪</span>
          <div>
            <p className="font-display font-700 text-white text-base mb-1">Kami pakai Cookie</p>
            <p className="text-sm text-white/60 leading-relaxed">
              Kami menggunakan cookie untuk analitik pengunjung dan meningkatkan pengalaman kamu di website ini. Data kamu aman dan tidak dijual ke pihak manapun.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={accept}
            className="flex-1 bg-primary text-white font-semibold py-2.5 rounded-xl hover:bg-primary/80 transition-colors text-sm">
            Terima Semua
          </button>
          <button
            onClick={decline}
            className="flex-1 bg-white/10 text-white/70 font-semibold py-2.5 rounded-xl hover:bg-white/20 transition-colors text-sm">
            Tolak
          </button>
        </div>
      </div>
    </div>
  )
}
