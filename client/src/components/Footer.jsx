const SOCMED = [
  { label: 'Instagram', icon: '📸', href: 'https://instagram.com/afstudio', color: 'hover:text-pink-500' },
  { label: 'TikTok',    icon: '🎵', href: 'https://tiktok.com/@afstudio',   color: 'hover:text-white' },
  { label: 'YouTube',   icon: '▶️', href: 'https://youtube.com/@afstudio',  color: 'hover:text-red-400' },
  { label: 'WhatsApp',  icon: '💬', href: 'https://wa.me/6281234567890',    color: 'hover:text-green-400' },
  { label: 'Email',     icon: '✉️', href: 'mailto:hello@afstudio.id',       color: 'hover:text-blue-400' },
]

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-14 px-5">
      <div className="container-max">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="font-display font-800 text-2xl mb-2">
              AF Studio<span className="text-primary">.</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Studio foto & video modern yang ceria, terjangkau, dan selalu bikin hasil yang keren. Untuk semua momen hidupmu!
            </p>
            {/* Socmed icons */}
            <div className="flex gap-3 mt-5">
              {SOCMED.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  title={s.label}
                  className={`w-9 h-9 bg-white/8 hover:bg-white/15 rounded-xl flex items-center justify-center text-lg transition-all ${s.color}`}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">Layanan</div>
              <div className="space-y-2">
                {['Photoshoot & Video', 'Self Photo', 'Rental Kamera & iPhone'].map(l => (
                  <div key={l} className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer">{l}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">Explore</div>
              <div className="space-y-2">
                {['Galeri & Pose Inspirasi', 'Lokasi Studio', 'Testimoni', 'Book Sekarang'].map(l => (
                  <div key={l} className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer">{l}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">Hubungi Kami</div>
            <div className="space-y-2 text-sm text-white/50">
              <div>📱 +62 812-3456-7890</div>
              <div>✉️ hello@afstudio.id</div>
              <div>📍 4 Lokasi, Sidoarjo & Surabaya</div>
              <div>🕐 Buka 7 hari, 09.00–21.00</div>
            </div>
            <a href="https://wa.me/6281234567890?text=Halo%20AF%20Studio!"
              target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-primary/80 transition-colors">
              💬 Chat Kami
            </a>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/25">
          <span>© {new Date().getFullYear()} AF Studio. All rights reserved.</span>
          <span>Made with ❤️ in Sidoarjo 🇮🇩</span>
        </div>
      </div>
    </footer>
  )
}
