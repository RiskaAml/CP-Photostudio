import { useState, useEffect } from 'react'
import useReveal from '../../hooks/useReveal'

const FALLBACK = [
  { id: 1, name: 'Ayu Maharani', role: 'Content Creator', content: 'Self photo di AF Studio hasilnya keren banget! Lighting oke, backdrop banyak pilihan. Udah jadi langganan tiap bulan 😍', rating: 5, service: 'Self Photo' },
  { id: 2, name: 'Reza & Dinda', role: 'Couple', content: 'Foto prewedding kami hasilnya beyond expectation! Fotografernya sabar banget. Highly recommended!', rating: 5, service: 'Photoshoot' },
  { id: 3, name: 'Citra Dewi', role: 'Mahasiswi', content: 'Foto wisuda di AF Studio hasilnya natural dan cantik. Tim-nya friendly banget ✨', rating: 5, service: 'Photoshoot' },
  { id: 4, name: 'Budi Santoso', role: 'Owner UMKM', content: 'Foto produk jualanku jadi jauh lebih profesional. Penjualan naik setelah ganti foto!', rating: 5, service: 'Photoshoot' },
  { id: 5, name: 'KKN UMSIDA', role: 'Mahasiswa', content: 'Sewa kamera seminggu untuk dokumentasi KKN. Harga terjangkau, kameranya bagus!', rating: 5, service: 'Rental' },
  { id: 6, name: 'Nadia Putri', role: 'Influencer', content: 'Lokasi AF Studio instagramable banget! Props-nya lengkap dan hasilnya konsisten bagus 😄', rating: 5, service: 'Self Photo' },
]

const SERVICE_COLORS = {
  'Self Photo': 'bg-emerald-100 text-emerald-700',
  'Photoshoot': 'bg-orange-100 text-orange-700',
  'Rental':     'bg-purple-100 text-purple-700',
}

export default function Testimonials() {
  const [items, setItems] = useState(FALLBACK)
  const ref = useReveal()

  useEffect(() => {
    fetch('/api/testimonials')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length) setItems(data) })
      .catch(() => {})
  }, [])

  return (
    <section id="testimoni" ref={ref} className="section-pad bg-gradient-to-br from-primary/5 via-light to-secondary/5">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-xs px-4 py-2 rounded-full mb-4">
            💬 Kata Mereka
          </div>
          <h2 className="reveal font-display font-800 text-3xl md:text-4xl text-dark mb-3">
            Ribuan Klien Sudah <br />
            <span className="text-primary">Buktiin Sendiri!</span>
          </h2>
          <div className="reveal flex items-center justify-center gap-2 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => <span key={i} className="text-secondary text-xl">★</span>)}
            </div>
            <span className="font-display font-700 text-dark text-lg">4.9</span>
            <span className="text-muted text-sm">dari 1000+ review</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <div key={t.id}
              className="reveal bg-white border border-dark/6 rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
              style={{ transitionDelay: `${i * 60}ms` }}>
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating || 5)].map((_, j) => <span key={j} className="text-secondary text-sm">★</span>)}
              </div>
              {/* Content */}
              <p className="text-dark/70 text-sm leading-relaxed mb-4 italic">"{t.content}"</p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-dark/6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg font-bold text-primary flex-shrink-0">
                  {t.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-dark text-sm truncate">{t.name}</div>
                  <div className="text-muted text-xs">{t.role}</div>
                </div>
                {t.service && (
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${SERVICE_COLORS[t.service] || 'bg-gray-100 text-gray-600'}`}>
                    {t.service}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
