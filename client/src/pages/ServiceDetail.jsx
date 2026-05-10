import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Check, Star, Loader2, MessageCircle } from 'lucide-react'
import Footer from '../components/Footer'

export default function ServiceDetail() {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/services/${slug}`)
      .then(r => r.json())
      .then(data => setService(data))
      .catch(() => setService(null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center gap-3 text-muted">
      <Loader2 size={20} className="animate-spin" />
      <span>Memuat...</span>
    </div>
  )

  if (!service || service.error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-5">
      <div className="text-5xl">😕</div>
      <h1 className="font-display font-700 text-2xl text-dark">Layanan tidak ditemukan</h1>
      <Link to="/" className="text-primary font-semibold hover:underline">← Kembali ke beranda</Link>
    </div>
  )

  const waText = encodeURIComponent(`Halo AF Studio! Saya tertarik dengan layanan ${service.name}. Bisa info lebih lanjut?`)

  return (
    <>
      {/* Hero */}
      <div className="bg-dark pt-24 pb-12 px-5">
        <div className="container-max">
          <Link to="/#layanan" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={15} /> Kembali
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{service.emoji}</span>
            <div>
              <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Layanan</div>
              <h1 className="font-display font-800 text-3xl md:text-4xl text-white">{service.name}</h1>
            </div>
          </div>
          <p className="text-white/60 text-base leading-relaxed max-w-2xl">{service.description}</p>
        </div>
      </div>

      {/* Packages */}
      <div className="section-pad bg-light">
        <div className="container-max">
          <div className="text-center mb-10">
            <h2 className="font-display font-800 text-2xl md:text-3xl text-dark mb-2">
              Pilih Paket yang <span className="text-primary">Pas Buat Kamu</span>
            </h2>
            <p className="text-muted text-sm">Harga transparan, tidak ada biaya tersembunyi ✅</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.packages?.map((pkg, i) => (
              <div key={pkg.id}
                className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1
                  ${pkg.is_popular ? 'border-primary bg-dark text-white' : 'border-dark/10 bg-white'}`}>

                {pkg.is_popular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-white text-xs font-bold text-center py-1.5 flex items-center justify-center gap-1">
                    <Star size={11} fill="white" /> PALING POPULER
                  </div>
                )}

                <div className={`p-7 ${pkg.is_popular ? 'pt-10' : ''}`}>
                  {/* Name & Price */}
                  <div className="mb-5">
                    <h3 className={`font-display font-700 text-xl mb-1 ${pkg.is_popular ? 'text-white' : 'text-dark'}`}>
                      {pkg.name}
                    </h3>
                    {pkg.description && (
                      <p className={`text-sm leading-relaxed mb-4 ${pkg.is_popular ? 'text-white/60' : 'text-muted'}`}>
                        {pkg.description}
                      </p>
                    )}
                    <div className="flex items-end gap-1.5">
                      <span className={`font-display font-800 text-3xl ${pkg.is_popular ? 'text-white' : 'text-dark'}`}>
                        Rp {pkg.price?.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className={`text-xs mt-1 font-medium ${pkg.is_popular ? 'text-white/50' : 'text-muted'}`}>
                      📅 {pkg.unit}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6">
                    {pkg.features?.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${pkg.is_popular ? 'bg-primary' : 'bg-primary/15'}`}>
                          <Check size={11} className={pkg.is_popular ? 'text-white' : 'text-primary'} />
                        </div>
                        <span className={`text-sm ${pkg.is_popular ? 'text-white/80' : 'text-dark/70'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo AF Studio! Saya mau booking paket ${pkg.name} untuk layanan ${service.name}. Info lebih lanjut?`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-all text-sm
                      ${pkg.is_popular
                        ? 'bg-primary text-white hover:bg-primary/80 shadow-primary'
                        : 'bg-dark/8 text-dark hover:bg-dark hover:text-white'}`}>
                    <MessageCircle size={15} /> Pesan Paket Ini
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* General WA CTA */}
          <div className="mt-12 bg-gradient-to-r from-primary to-orange-400 rounded-3xl p-8 text-white text-center">
            <h3 className="font-display font-800 text-2xl mb-2">Masih bingung pilih paket? 🤔</h3>
            <p className="text-white/80 text-sm mb-5">Chat kami sekarang! Gratis konsultasi, tanpa tekanan.</p>
            <a href={`https://wa.me/6281234567890?text=${waText}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-white/90 transition-colors">
              💬 Chat dengan Kami
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
