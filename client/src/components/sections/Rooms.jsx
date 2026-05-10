import useReveal from '../../hooks/useReveal'

const ROOMS = [
  {
    name: 'White Studio',
    img: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&q=80',
    desc: 'Backdrop putih bersih nan timeless. Cocok untuk portrait, produk, graduation, dan konten minimalis.',
    tags: ['Portrait', 'Produk', 'Minimalis'],
    border: 'border-gray-200',
  },
  {
    name: 'Vintage Corner',
    img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    desc: 'Nuansa hangat cokelat kayu dengan props retro. Vibes estetik yang selalu hits di Instagram!',
    tags: ['Estetik', 'Retro', 'Hangat'],
    border: 'border-amber-200',
  },
  {
    name: 'Neon Garden',
    img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
    desc: 'Backdrop hijau sage dengan aksen LED warna-warni. Tampil bold dan kekinian untuk konten Gen-Z.',
    tags: ['Bold', 'Colorful', 'Gen-Z'],
    border: 'border-emerald-200',
  },
  {
    name: 'Dark Moodboard',
    img: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=600&q=80',
    desc: 'Studio gelap dramatis dengan lighting moody. Perfect untuk editorial, fashion, dan karya sinematik.',
    tags: ['Editorial', 'Fashion', 'Cinematic'],
    border: 'border-slate-400',
  },
]

export default function Rooms() {
  const ref = useReveal()

  return (
    <section id="ruangan" ref={ref} className="section-pad bg-dark">
      <div className="container-max">
        <div className="text-center mb-12">
          <div className="reveal inline-flex items-center gap-2 bg-white/10 text-white/80 font-semibold text-xs px-4 py-2 rounded-full mb-4">
            🏠 Ruangan Studio
          </div>
          <h2 className="reveal font-display font-800 text-3xl md:text-4xl text-white mb-3">
            4 Vibes, Pilih yang <span className="text-secondary">Paling Kamu!</span>
          </h2>
          <p className="reveal text-white/50 text-base max-w-xl mx-auto">
            Setiap ruangan punya karakter unik. Mau yang cozy, bold, moody, atau clean — semua ada!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROOMS.map((room, i) => (
            <div key={room.name}
              className={`reveal border-2 ${room.border} rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 bg-white`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              {/* Photo */}
              <div className="h-48 overflow-hidden">
                <img src={room.img} alt={room.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy" />
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="font-display font-700 text-dark text-base mb-1">{room.name}</h3>
                <p className="text-muted text-xs leading-relaxed mb-3">{room.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {room.tags.map(tag => (
                    <span key={tag} className="text-xs bg-dark/8 text-dark/60 px-2 py-0.5 rounded-lg">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
