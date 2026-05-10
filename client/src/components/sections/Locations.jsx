import { MapPin, Clock, Phone } from 'lucide-react'
import useReveal from '../../hooks/useReveal'

const LOCATIONS = [
  {
    id: 1,
    name: 'AF Studio — Sidoarjo Kota',
    address: 'Jl. Raya Sidoarjo No. 123, Sidoarjo',
    hours: 'Senin–Minggu, 09.00–21.00',
    phone: '+62 812-3456-7890',
    color: 'border-primary/30 bg-primary/5',
    dot: 'bg-primary',
    badge: 'Pusat',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63173.6!2d112.7!3d-7.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjcnMDAuMCJTIDExMsKwNDInMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890',
  },
  {
    id: 2,
    name: 'AF Studio — Waru',
    address: 'Jl. Raya Waru No. 45, Waru, Sidoarjo',
    hours: 'Senin–Minggu, 09.00–21.00',
    phone: '+62 812-3456-7891',
    color: 'border-secondary/40 bg-secondary/5',
    dot: 'bg-secondary',
    badge: null,
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63173.6!2d112.72!3d-7.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjInMTIuMCJTIDExMsKwNDMnMTIuMCJF!5e0!3m2!1sen!2sid!4v1234567890',
  },
  {
    id: 3,
    name: 'AF Studio — Gedangan',
    address: 'Jl. Raya Gedangan No. 78, Gedangan, Sidoarjo',
    hours: 'Selasa–Minggu, 10.00–20.00',
    phone: '+62 812-3456-7892',
    color: 'border-accent/40 bg-accent/5',
    dot: 'bg-accent',
    badge: 'Baru',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63173.6!2d112.69!3d-7.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjQnMDAuMCJTIDExMsKwNDEnMjQuMCJF!5e0!3m2!1sen!2sid!4v1234567890',
  },
  {
    id: 4,
    name: 'AF Studio — Surabaya Selatan',
    address: 'Jl. Raya Jemursari No. 12, Surabaya',
    hours: 'Senin–Sabtu, 10.00–21.00',
    phone: '+62 812-3456-7893',
    color: 'border-purple-300/40 bg-purple-50',
    dot: 'bg-purple-500',
    badge: null,
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63173.6!2d112.74!3d-7.32!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTknMTIuMCJTIDExMsKwNDQnMjQuMCJF!5e0!3m2!1sen!2sid!4v1234567890',
  },
]

export default function Locations() {
  const ref = useReveal()

  return (
    <section id="lokasi" ref={ref} className="section-pad bg-light">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal inline-flex items-center gap-2 bg-accent/15 text-dark font-semibold text-xs px-4 py-2 rounded-full mb-4">
            📍 Lokasi Kami
          </div>
          <h2 className="reveal font-display font-800 text-3xl md:text-4xl text-dark mb-3">
            Dekat dari <span className="text-primary">Mana Saja!</span>
          </h2>
          <p className="reveal text-muted text-base max-w-md mx-auto">
            4 studio tersebar di Sidoarjo & Surabaya. Pilih yang paling dekat dari kamu!
          </p>
        </div>

        {/* Location cards grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {LOCATIONS.map((loc, i) => (
            <div key={loc.id}
              className={`reveal border-2 ${loc.color} rounded-2xl p-5 hover:shadow-card transition-shadow duration-300`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${loc.dot}`} />
                  <h3 className="font-display font-700 text-dark text-sm leading-tight">{loc.name}</h3>
                </div>
                {loc.badge && (
                  <span className="text-xs font-semibold bg-primary text-white px-2 py-0.5 rounded-full flex-shrink-0">{loc.badge}</span>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2 text-xs text-muted">
                  <MapPin size={12} className="mt-0.5 flex-shrink-0 text-primary" />
                  <span>{loc.address}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Clock size={12} className="flex-shrink-0 text-primary" />
                  <span>{loc.hours}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Phone size={12} className="flex-shrink-0 text-primary" />
                  <a href={`https://wa.me/${loc.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                    className="hover:text-primary transition-colors">{loc.phone}</a>
                </div>
              </div>

              <a href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/70 transition-colors">
                <MapPin size={12} /> Buka di Google Maps →
              </a>
            </div>
          ))}
        </div>

        {/* Embedded Map - main location */}
        <div className="reveal rounded-3xl overflow-hidden border-2 border-dark/8 shadow-card">
          <div className="bg-dark/5 px-5 py-3 flex items-center gap-2 border-b border-dark/8">
            <MapPin size={14} className="text-primary" />
            <span className="text-sm font-semibold text-dark">AF Studio — Sidoarjo Kota (Lokasi Utama)</span>
          </div>
          <iframe
            src={LOCATIONS[0].map}
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi AF Studio"
          />
        </div>
      </div>
    </section>
  )
}
