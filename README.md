# Minanul Aziz — Portofolio Personal

Website personal branding modern, elegan, dan interaktif yang dibangun dengan
HTML, CSS, dan JavaScript murni — tanpa proses build apa pun.

> "Pemikir yang penasaran, merangkai pengalaman yang tenang dan bermakna
> di persimpangan teknologi, desain, dan vibe coding."

## Fitur

- **UI dark & minimalis** dengan glassmorphism, gradien halus, dan orb gradient yang beranimasi
- **Smooth scroll**, scroll-progress bar, dan deteksi link aktif (active spy)
- Animasi **muncul saat scroll** (fade/slide) dan progress bar skill yang terisi otomatis
- **Custom cursor** (desktop) dengan efek hover pada elemen interaktif
- Efek **tilt-light** (cahaya mengikuti kursor) pada kartu skill
- **Responsif** — drawer menu untuk mobile
- **Aksesibel**: menghormati `prefers-reduced-motion`, HTML semantik, label ARIA

## Section

1. **Hero** — nama besar, tagline, tombol CTA, meta strip, indikator scroll
2. **Tentang** — bio singkat + kartu animasi `about.json`
3. **Keahlian** — enam kartu interaktif dengan progress bar dan chip teknologi
4. **Proyek** — grid modern dengan cover gradien dan hover effect
5. **Kontak** — WhatsApp, Email, dan media sosial dalam glass card

## Teknologi

- HTML5 / CSS3 (CSS variables, grid, backdrop-filter)
- JavaScript vanilla (IntersectionObserver, requestAnimationFrame)
- Google Fonts: **Inter** + **Space Grotesk**

## Cara menjalankan

Website ini sepenuhnya statis. Cukup buka `index.html` di browser modern,
atau jalankan server lokal:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Lalu buka <http://localhost:8000>.

## Struktur proyek

```
.
├── index.html   # Markup untuk semua section
├── styles.css   # Design token, layout, animasi
├── script.js    # Interaktivitas (scroll, cursor, reveal)
└── README.md
```

## Kustomisasi

- Ubah link sosial media, nomor WhatsApp, dan email di `index.html`
  (section `#contact`).
- Ganti empat project card di `#projects` dengan karya kamu sendiri.
- Ubah warna brand di `styles.css` melalui CSS variable
  `--grad-1`…`--grad-4` di bagian atas file.
