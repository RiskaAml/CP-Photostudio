import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Layanan', href: '/#layanan' },
  { label: 'Ruangan', href: '/#ruangan' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Testimoni', href: '/#testimoni' },
  { label: 'Lokasi', href: '/#lokasi' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [location])

  const handleAnchor = (href) => {
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        window.location.href = href
      } else {
        const id = href.replace('/#', '')
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-light/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container-max px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
            <img src="/logo.png" alt="AF Studio" className="w-full h-full object-cover" onError={e => {
              e.target.parentElement.innerHTML = `<div class="w-full h-full bg-primary flex items-center justify-center text-white font-display font-800 text-sm">AF</div>`
            }} />
          </div>
          <div>
            <div className="font-display font-800 text-dark text-base leading-none">AF Studio</div>
            <div className="text-xs text-muted leading-none mt-0.5">Photo & Video</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => (
            l.href.startsWith('/#')
              ? <button key={l.href} onClick={() => handleAnchor(l.href)} className="text-sm font-medium text-dark/70 hover:text-primary transition-colors">{l.label}</button>
              : <Link key={l.href} to={l.href} className="text-sm font-medium text-dark/70 hover:text-primary transition-colors">{l.label}</Link>
          ))}
          <a href="https://wa.me/6281234567890?text=Halo%20AF%20Studio%2C%20mau%20booking%20nih!"
            target="_blank" rel="noopener noreferrer"
            className="bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-primary/85 transition-colors shadow-primary">
            📅 Book Sekarang
          </a>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-dark/5 transition-colors" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-light/98 backdrop-blur-md border-t border-dark/8 px-5 py-5 flex flex-col gap-4">
          {links.map(l => (
            l.href.startsWith('/#')
              ? <button key={l.href} onClick={() => { handleAnchor(l.href); setOpen(false) }} className="text-base font-medium text-dark text-left py-1">{l.label}</button>
              : <Link key={l.href} to={l.href} className="text-base font-medium text-dark py-1">{l.label}</Link>
          ))}
          <a href="https://wa.me/6281234567890?text=Halo%20AF%20Studio%2C%20mau%20booking%20nih!"
            target="_blank" rel="noopener noreferrer"
            className="bg-primary text-white font-semibold text-center px-5 py-3 rounded-xl mt-1">
            📅 Book Sekarang
          </a>
        </div>
      )}
    </header>
  )
}
