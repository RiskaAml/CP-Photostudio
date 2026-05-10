import { useEffect, useRef, useState } from 'react'
import { MapPin, ArrowDown } from 'lucide-react'

const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    label: 'Portrait Session',
    sub: 'Tampil natural & percaya diri',
  },
  {
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    label: 'Self Photo',
    sub: 'Seru bareng teman-teman',
  },
  {
    img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    label: 'Couple & Family',
    sub: 'Abadikan momen spesial',
  },
  {
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    label: 'Rental Kamera',
    sub: 'Peralatan pro, harga bersahabat',
  },
]

export default function Hero() {
  const [slide, setSlide] = useState(0)
  const timerRef = useRef()

  useEffect(() => {
    timerRef.current = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 4000)
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark pt-20">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max w-full px-5 py-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-xs font-semibold px-4 py-2 rounded-full mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Studio Foto & Video — Sidoarjo
          </div>

          <h1 className="font-display font-800 text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mb-5 animate-fade-up">
            Bikin Foto
            <br />
            <span className="text-primary">Kamu </span>
            <span className="text-secondary">Makin</span>
            <br />
            <span className="italic font-600 text-white/80">Keren! ✨</span>
          </h1>

          <p className="text-white/60 text-base leading-relaxed mb-3 max-w-md animate-fade-up">
            AF Studio hadir untuk kamu yang mau foto keren tanpa ribet. Studio modern, harga bersahabat, hasil yang selalu bikin puas!
          </p>

          <div className="flex items-center gap-1.5 text-white/50 text-sm mb-8">
            <MapPin size={14} className="text-primary flex-shrink-0" />
            <span>4 Lokasi di Sidoarjo & Surabaya</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 animate-fade-up">
            <a href="https://wa.me/6281234567890?text=Halo%20AF%20Studio%2C%20mau%20booking%20nih!"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-7 py-3.5 rounded-xl hover:bg-primary/85 transition-all shadow-primary hover:-translate-y-0.5 duration-200">
              📅 Book via WhatsApp
            </a>
            <a href="#layanan"
              onClick={e => { e.preventDefault(); document.getElementById('layanan')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-colors">
              Lihat Layanan
            </a>
          </div>

          <div className="flex gap-8 mt-10">
            {[['1000+', 'Klien Puas'], ['4', 'Lokasi Studio'], ['4.9★', 'Google Rating']].map(([val, label]) => (
              <div key={label}>
                <div className="font-display font-800 text-2xl text-white">{val}</div>
                <div className="text-xs text-white/40 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Slideshow */}
        <div className="hidden lg:block animate-fade-in">
          <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl">
            {SLIDES.map((s, i) => (
              <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === slide ? 'opacity-100' : 'opacity-0'}`}>
                <img src={s.img} alt={s.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="font-display font-700 text-white text-xl">{s.label}</div>
                  <div className="text-white/60 text-sm mt-1">{s.sub}</div>
                </div>
              </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-6 right-6 flex gap-1.5">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`} />
              ))}
            </div>

            {/* Floating badge */}
            <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-lg">
              <div className="font-display font-800 text-primary text-lg leading-none">4.9 ★</div>
              <div className="text-xs text-dark/50 mt-0.5">Google Rating</div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            {SLIDES.map((s, i) => (
              <button key={i} onClick={() => setSlide(i)}
                className={`relative h-16 rounded-xl overflow-hidden transition-all ${i === slide ? 'ring-2 ring-primary scale-95' : 'opacity-60 hover:opacity-100'}`}>
                <img src={s.img} alt={s.label} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <a href="#layanan"
        onClick={e => { e.preventDefault(); document.getElementById('layanan')?.scrollIntoView({ behavior: 'smooth' }) }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors">
        <span className="text-xs font-medium">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  )
}
