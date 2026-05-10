import { useState, useEffect } from 'react'
import { X, Loader2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import Footer from '../components/Footer'

const CATS = [
  { key: 'all', label: 'Semua' },
  { key: 'portrait', label: '🧍 Portrait' },
  { key: 'selfphoto', label: '🤳 Self Photo' },
  { key: 'couple', label: '💑 Couple' },
  { key: 'family', label: '👨‍👩‍👧 Family' },
  { key: 'product', label: '📦 Produk' },
]

const FALLBACK = [
  { id: 1, title: 'Casual & Natural', category: 'portrait', image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', tags: ['Solo', 'Natural', 'Santai'] },
  { id: 2, title: 'Fun Group Vibes', category: 'selfphoto', image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', tags: ['Grup', 'Fun', 'Energetic'] },
  { id: 3, title: 'Couple Goals', category: 'couple', image_url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80', tags: ['Couple', 'Romantic'] },
  { id: 4, title: 'Product Flatlay', category: 'product', image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', tags: ['Produk', 'UMKM'] },
  { id: 5, title: 'Graduation Glow', category: 'portrait', image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80', tags: ['Wisuda', 'Formal'] },
  { id: 6, title: 'Family Warmth', category: 'family', image_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=600&q=80', tags: ['Keluarga'] },
  { id: 7, title: 'Mirror Selfie', category: 'selfphoto', image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', tags: ['Solo', 'Mirror'] },
  { id: 8, title: 'Editorial Dark', category: 'portrait', image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', tags: ['Moody', 'Fashion'] },
]

export default function GalleryPage() {
  const [items, setItems] = useState(FALLBACK)
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length) setItems(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = cat === 'all' ? items : items.filter(i => i.category === cat)

  const prev = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length)
  const next = () => setLightbox(i => (i + 1) % filtered.length)

  useEffect(() => {
    const fn = (e) => {
      if (lightbox === null) return
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [lightbox, filtered.length])

  return (
    <>
      {/* Header */}
      <div className="bg-dark pt-24 pb-12 px-5 text-center">
        <div className="container-max">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 font-semibold text-xs px-4 py-2 rounded-full mb-5">
            <Sparkles size={12} className="text-secondary" /> Inspirasi Pose
          </div>
          <h1 className="font-display font-800 text-3xl md:text-5xl text-white mb-3">
            Gak Tau Mau Pose Apa?
          </h1>
          <p className="text-white/50 text-base max-w-md mx-auto">
            Kumpulan inspirasi pose dan konsep foto dari sesi-sesi keren di AF Studio. Cocokkan sama vibe kamu!
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="bg-light border-b border-dark/8 sticky top-16 z-30 px-5">
        <div className="container-max">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {CATS.map(c => (
              <button key={c.key} onClick={() => setCat(c.key)}
                className={`flex-shrink-0 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                  cat === c.key ? 'bg-primary text-white shadow-primary' : 'bg-dark/6 text-dark/60 hover:bg-dark/10'
                }`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="section-pad bg-light">
        <div className="container-max">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-2 text-muted">
              <Loader2 size={20} className="animate-spin" /> Memuat...
            </div>
          ) : (
            <>
              <p className="text-muted text-sm mb-6">{filtered.length} inspirasi pose ditemukan</p>
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                {filtered.map((item, i) => (
                  <div key={item.id}
                    className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer bg-dark/5 hover:shadow-card-hover transition-all duration-300"
                    onClick={() => setLightbox(i)}>
                    <img src={item.image_url} alt={item.title}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"
                      onError={e => { e.target.src = `https://via.placeholder.com/400x500/FF6B35/ffffff?text=${encodeURIComponent(item.title)}` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <p className="font-display font-700 text-white text-sm">{item.title}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.tags?.map(tag => (
                            <span key={tag} className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-16 text-muted">
                  <div className="text-4xl mb-3">🔍</div>
                  <p>Belum ada pose untuk kategori ini. Coming soon!</p>
                </div>
              )}
            </>
          )}

          {/* WA CTA */}
          <div className="mt-14 text-center bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-3xl p-8">
            <h3 className="font-display font-800 text-2xl text-dark mb-2">Ada konsep foto yang kamu impikan? 💭</h3>
            <p className="text-muted text-sm mb-5">Ceritain ke kami! Kami siap bantu wujudkan konsep fotomu.</p>
            <a href="https://wa.me/6281234567890?text=Halo%20AF%20Studio%2C%20saya%20mau%20konsultasi%20konsep%20foto%20nih!"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-primary/85 transition-all shadow-primary">
              💬 Konsultasi Gratis via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 bg-dark/95 z-50 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10">
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col items-center gap-4 px-16 max-h-screen" onClick={e => e.stopPropagation()}>
            <img src={filtered[lightbox]?.image_url} alt={filtered[lightbox]?.title}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl" />
            <div className="text-center">
              <p className="font-display font-700 text-white text-lg">{filtered[lightbox]?.title}</p>
              <div className="flex justify-center gap-1.5 mt-2">
                {filtered[lightbox]?.tags?.map(tag => (
                  <span key={tag} className="text-xs bg-white/15 text-white/80 px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <button onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10">
            <ChevronRight size={20} />
          </button>
          <button onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
            <X size={18} />
          </button>
          <div className="absolute bottom-4 text-white/30 text-xs">{lightbox + 1} / {filtered.length}</div>
        </div>
      )}

      <Footer />
    </>
  )
}
