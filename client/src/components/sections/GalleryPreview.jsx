import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import useReveal from '../../hooks/useReveal'

const FALLBACK = [
  { id: 1, title: 'Casual & Natural', category: 'portrait', image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80', tags: ['Solo', 'Natural'] },
  { id: 2, title: 'Fun Squad Goals', category: 'selfphoto', image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80', tags: ['Grup', 'Fun'] },
  { id: 3, title: 'Couple Goals', category: 'couple', image_url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&q=80', tags: ['Couple', 'Romantic'] },
  { id: 4, title: 'Product Flatlay', category: 'product', image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', tags: ['Produk', 'UMKM'] },
  { id: 5, title: 'Graduation Glow', category: 'portrait', image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80', tags: ['Wisuda', 'Formal'] },
  { id: 6, title: 'Family Warmth', category: 'family', image_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=500&q=80', tags: ['Keluarga'] },
]

export default function GalleryPreview() {
  const [items, setItems] = useState(FALLBACK)
  const ref = useReveal()

  useEffect(() => {
    fetch('/api/gallery?limit=6')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length) setItems(data) })
      .catch(() => {})
  }, [])

  return (
    <section id="galeri" ref={ref} className="section-pad bg-light">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="reveal inline-flex items-center gap-2 bg-secondary/20 text-dark font-semibold text-xs px-4 py-2 rounded-full mb-4">
              <Sparkles size={12} className="text-primary" />
              Inspirasi Pose Buat Kamu
            </div>
            <h2 className="reveal font-display font-800 text-3xl md:text-4xl text-dark">
              Gak Tau Mau Pose <br />
              <span className="text-primary">Apa? Lihat Ini Dulu!</span>
            </h2>
          </div>
          <Link to="/galeri"
            className="reveal flex items-center gap-2 font-semibold text-sm text-dark hover:text-primary transition-colors group flex-shrink-0">
            Lihat Semua Inspirasi
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid — item pertama lebih besar */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {items.map((item, i) => (
            <Link to="/galeri" key={item.id}
              className={`reveal group relative rounded-2xl overflow-hidden cursor-pointer bg-dark/5
                ${i === 0 ? 'row-span-2' : ''}`}
              style={{ transitionDelay: `${i * 60}ms` }}>
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <p className="font-display font-700 text-white text-sm">{item.title}</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {item.tags?.map(tag => (
                      <span key={tag} className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="reveal text-center mt-8">
          <Link to="/galeri"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-primary/85 transition-all shadow-primary hover:-translate-y-0.5 duration-200">
            <Sparkles size={16} />
            Explore Semua Pose Inspirasi
          </Link>
        </div>
      </div>
    </section>
  )
}
