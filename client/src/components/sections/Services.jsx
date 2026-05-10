import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import useReveal from '../../hooks/useReveal'

const FALLBACK = [
  {
    slug: 'photoshoot',
    name: 'Photoshoot & Video',
    emoji: '📷',
    img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80',
    description: 'Dipotret oleh fotografer profesional kami. Portrait, produk, keluarga, graduation — semua bisa!',
    price: 'Mulai Rp 150.000',
    color: 'from-orange-50 to-yellow-50',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-600',
    dot: 'bg-orange-400',
  },
  {
    slug: 'selfphoto',
    name: 'Self Photo',
    emoji: '🤳',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
    description: 'Studio siap pakai, kamu yang jadi fotografernya! Perfect untuk konten sosmed dan foto bareng teman.',
    price: 'Mulai Rp 75.000',
    color: 'from-emerald-50 to-cyan-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-600',
    dot: 'bg-emerald-400',
  },
  {
    slug: 'rental',
    name: 'Rental Kamera & iPhone',
    emoji: '🎒',
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
    description: 'Sewa kamera mirrorless, DSLR, atau iPhone terbaru dengan gimbal. Harga harian & mingguan.',
    price: 'Mulai Rp 100.000',
    color: 'from-purple-50 to-pink-50',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-600',
    dot: 'bg-purple-400',
  },
]

export default function Services() {
  const [services, setServices] = useState(FALLBACK)
  const ref = useReveal()

  useEffect(() => {
    fetch('/api/services')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length) {
          // Merge API data with local fallback (untuk gambar & warna)
          setServices(FALLBACK.map((fb, i) => ({
            ...fb,
            ...(data[i] || {}),
            img: fb.img, // tetap pakai gambar lokal
            color: fb.color,
            border: fb.border,
            badge: fb.badge,
            dot: fb.dot,
          })))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="layanan" ref={ref} className="section-pad bg-light">
      <div className="container-max">
        <div className="text-center mb-12">
          <div className="reveal inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-xs px-4 py-2 rounded-full mb-4">
            ✨ Layanan Kami
          </div>
          <h2 className="reveal font-display font-800 text-3xl md:text-4xl text-dark mb-3">
            Semua Ada, Tinggal Pilih!
          </h2>
          <p className="reveal text-muted text-base max-w-xl mx-auto leading-relaxed">
            Dari foto profesional sampai sewa kamera, AF Studio siap bantu kamu tampil keren tanpa repot.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div key={svc.slug}
              className={`reveal group bg-gradient-to-br ${svc.color} border-2 ${svc.border} rounded-3xl overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              {/* Image */}
              <div className="h-52 overflow-hidden relative">
                <img src={svc.img} alt={svc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${svc.badge}`}>
                  Lihat Harga
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display font-700 text-xl text-dark mb-2">{svc.name}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">{svc.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-1.5 h-1.5 rounded-full ${svc.dot}`} />
                  <span className="text-xs text-muted font-medium">{svc.price} / sesi</span>
                </div>

                <Link to={`/layanan/${svc.slug}`}
                  className="flex items-center gap-2 font-semibold text-sm text-dark group-hover:text-primary transition-colors">
                  Lihat Detail & Harga
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
