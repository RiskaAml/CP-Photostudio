import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// ─── Static Data (no database needed) ─────────────────────────

const SERVICES = [
  {
    id: 1, slug: 'photoshoot', name: 'Photoshoot & Video', emoji: '📷',
    description: 'Dipotret oleh fotografer profesional kami. Portrait, produk, keluarga, graduation — semua bisa!',
    packages: [
      { id: 1, name: 'Mini Session', price: 150000, unit: 'per sesi (1 jam)', is_popular: false, description: 'Sesi singkat untuk 1 orang, cocok untuk foto profil atau headshot.', features: ['1 orang', '10 foto editing terbaik', 'Backdrop pilihan', 'File digital HD'] },
      { id: 2, name: 'Standard', price: 300000, unit: 'per sesi (2 jam)', is_popular: true, description: 'Sesi lengkap untuk perorangan atau pasangan, dengan konsultasi konsep.', features: ['1–2 orang', '20 foto editing', '2 outfit change', 'Konsultasi konsep gratis', 'File digital HD'] },
      { id: 3, name: 'Family / Group', price: 500000, unit: 'per sesi (3 jam)', is_popular: false, description: 'Untuk keluarga atau grup hingga 6 orang dengan multiple setup.', features: ['Hingga 6 orang', '30 foto editing', '3 setup berbeda', 'Props tersedia', 'File digital HD'] },
      { id: 4, name: 'Video Reels', price: 350000, unit: 'per sesi (2 jam)', is_popular: false, description: 'Shoot konten video untuk Instagram Reels, TikTok, atau iklan produk.', features: ['1–2 orang', '3 video clip edited', 'Background music', 'Vertical & horizontal format', 'Siap upload'] },
    ]
  },
  {
    id: 2, slug: 'selfphoto', name: 'Self Photo', emoji: '🤳',
    description: 'Studio siap pakai, kamu yang jadi fotografernya! Cocok banget untuk konten sosmed dan foto bareng teman. Tidak perlu skill foto — studio kami sudah didesain agar hasilnya selalu bagus.',
    packages: [
      { id: 5, name: '30 Menit', price: 75000, unit: 'per 30 menit', is_popular: false, description: 'Sesi singkat untuk 1–2 orang. Cukup untuk 50–100 foto.', features: ['1–2 orang', 'Semua backdrop tersedia', 'Ring light & lighting', 'Free props', 'Tidak include editing'] },
      { id: 6, name: '1 Jam', price: 120000, unit: 'per jam', is_popular: true, description: 'Sesi santai untuk grup kecil, bisa ganti outfit dan berganti backdrop.', features: ['Hingga 4 orang', 'Semua backdrop tersedia', 'Ring light & lighting', 'Free props', 'Bisa ganti outfit'] },
      { id: 7, name: '2 Jam', price: 200000, unit: 'per 2 jam', is_popular: false, description: 'Puas-puasan! Untuk grup besar atau yang mau eksplor semua backdrop.', features: ['Hingga 6 orang', 'Semua backdrop tersedia', 'Full akses semua props', 'Bisa ganti outfit bebas', 'Bonus: 5 foto basic editing'] },
    ]
  },
  {
    id: 3, slug: 'rental', name: 'Rental Kamera & iPhone', emoji: '🎒',
    description: 'Sewa peralatan foto/video berkualitas tanpa harus beli. Tersedia kamera mirrorless, DSLR, hingga iPhone terbaru dengan gimbal. Semua dalam kondisi prima dan siap pakai.',
    packages: [
      { id: 8, name: 'iPhone + Gimbal', price: 100000, unit: 'per hari', is_popular: true, description: 'iPhone 15 Pro Max + DJI OM6 Gimbal. Terbaik untuk konten vertikal & vlog.', features: ['iPhone 15 Pro Max', 'DJI OM6 Gimbal', 'Charger & kabel', 'Memory kosong (simpan ke cloud)', 'Garansi ganti unit jika bermasalah'] },
      { id: 9, name: 'Mirrorless Basic', price: 150000, unit: 'per hari', is_popular: false, description: 'Kamera mirrorless entry-level dengan lensa kit 18–55mm.', features: ['Sony A6400 / Fuji X-T30', 'Lensa kit 18–55mm', 'Memori card 64GB', 'Battery cadangan', 'Tas kamera'] },
      { id: 10, name: 'Mirrorless Pro', price: 250000, unit: 'per hari', is_popular: false, description: 'Kamera mirrorless pro dengan lensa portrait 50mm f/1.8.', features: ['Sony A7III / A7IV', 'Lensa 50mm f/1.8', 'Lensa 24–70mm', 'Memori card 128GB', 'Battery x2 + charger', 'Tas kamera'] },
      { id: 11, name: 'Weekly Package', price: 900000, unit: 'per minggu (7 hari)', is_popular: false, description: 'Hemat 40% dibanding sewa harian. Untuk project jangka panjang.', features: ['Pilihan semua unit', 'Diskon 40% dari harga harian', 'Gratis antar-jemput (area Sidoarjo)', 'Prioritas booking'] },
    ]
  }
]

const TESTIMONIALS = [
  { id: 1, name: 'Ayu Maharani', role: 'Content Creator', content: 'Self photo di AF Studio hasilnya keren banget! Lighting oke, backdrop banyak pilihan. Udah jadi langganan tiap bulan 😍', rating: 5, service: 'Self Photo' },
  { id: 2, name: 'Reza & Dinda', role: 'Couple', content: 'Foto prewedding kami hasilnya beyond expectation! Fotografernya sabar banget. Highly recommended!', rating: 5, service: 'Photoshoot' },
  { id: 3, name: 'Citra Dewi', role: 'Mahasiswi', content: 'Foto wisuda di AF Studio hasilnya natural dan cantik. Tim-nya friendly banget ✨', rating: 5, service: 'Photoshoot' },
  { id: 4, name: 'Budi Santoso', role: 'Owner UMKM', content: 'Foto produk jualanku jadi jauh lebih profesional. Penjualan naik setelah ganti foto!', rating: 5, service: 'Photoshoot' },
  { id: 5, name: 'KKN UMSIDA', role: 'Mahasiswa', content: 'Sewa kamera seminggu untuk dokumentasi KKN. Harga terjangkau, kameranya bagus!', rating: 5, service: 'Rental' },
  { id: 6, name: 'Nadia Putri', role: 'Influencer', content: 'Lokasi AF Studio instagramable banget! Props-nya lengkap dan hasilnya konsisten bagus 😄', rating: 5, service: 'Self Photo' },
]

const GALLERY = [
  { id: 1, title: 'Casual & Natural', category: 'portrait', image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', tags: ['Solo', 'Natural'] },
  { id: 2, title: 'Fun Squad Goals', category: 'selfphoto', image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', tags: ['Grup', 'Fun'] },
  { id: 3, title: 'Couple Goals', category: 'couple', image_url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80', tags: ['Couple', 'Romantic'] },
  { id: 4, title: 'Product Flatlay', category: 'product', image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', tags: ['Produk', 'UMKM'] },
  { id: 5, title: 'Graduation Glow', category: 'portrait', image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80', tags: ['Wisuda', 'Formal'] },
  { id: 6, title: 'Family Warmth', category: 'family', image_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=600&q=80', tags: ['Keluarga'] },
  { id: 7, title: 'Mirror Selfie', category: 'selfphoto', image_url: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&q=80', tags: ['Solo', 'Mirror'] },
  { id: 8, title: 'Editorial Dark', category: 'portrait', image_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', tags: ['Moody', 'Fashion'] },
]

// ─── API Routes ────────────────────────────────────────────────

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.get('/api/services', (req, res) => res.json(SERVICES))

app.get('/api/services/:slug', (req, res) => {
  const service = SERVICES.find(s => s.slug === req.params.slug)
  if (!service) return res.status(404).json({ error: 'Not found' })
  res.json(service)
})

app.get('/api/testimonials', (req, res) => res.json(TESTIMONIALS))

app.get('/api/gallery', (req, res) => {
  const { category, limit } = req.query
  let data = GALLERY
  if (category) data = data.filter(g => g.category === category)
  if (limit) data = data.slice(0, Number(limit))
  res.json(data)
})

app.post('/api/track', (req, res) => res.json({ ok: true }))

// ─── Serve React ───────────────────────────────────────────────
const distPath = path.join(__dirname, '../client/dist')
app.use(express.static(distPath))
app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')))

app.listen(PORT, () => console.log(`🎯 AF Studio → http://localhost:${PORT}`))
