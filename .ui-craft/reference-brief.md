# Reference Brief — R6 "Cinematic Code Review" — sampled 2026-11-13
Referensi EKSPLISIT user: https://vhphat2206.github.io/cinematic-motion-ui/examples/dark-code-review-hero.html (unduh + dibedah dari sumber; 48KB single file).

## DNA Sieve (bukti dari kode sumber)
- Archetype: dark monochrome tech, product-as-image. bg #0b0d0e, teks #e8ebe8-ish, **amber #f2b33d = "the flag"** — dipakai HANYA di: gutter flag, bug highlight, "blocking:" prefix, logo tick.
- Type: Archivo (display wdth 82, UI wdth 100) + IBM Plex Mono (kode, komentar, micro-copy).
- Struktur hero: grain overlay (.06) → H1 3 masked lines → lede + 2 CTA (solid+ghost dgn arrow SVG) → PR meta ("Pull request #2291 · ledger-api" + judul + stat files/±/verdict) → **STAGE = file kode TS tanpa border** bleeding off right edge: gutter nomor baris dgn read-wave (--i stagger), scan band, pointer reading-ruler (baris dekat pointer cerah --lit), 1 baris flagged amber, **thread comment unfold di gap** (before/after split, tinggi gap = --split-h terukur).
- Motion-kit (dependency-free, semua respect reduced-motion + failsafe 4s): masked lines rise 105%, letter rise + kerning, SVG stroke draw dari midpoint, clip wipes (left/center/bottom), magnet cursor drift, scroll reveal opt-in, opposing scroll rows, char scroll reveal, mobile menu.
- Choreography: measure comment height → set --split-h → entrance orchestration menunggu fonts (hardStart 1200ms) → read-wave → ruler pointer.

## Adaptasi ke portfolio (bukan copy konten Sieve)
- Stage = file kode milik owner (ilustratif, aria-hidden) — mis. `src/services/shipment.ts` bergaya kode backend nyata; 1 baris flagged amber = baris `availability: "open-for-work"`; comment reviewer unfold: "approved — ships under real load. 4+ years in production." (fakta nyata).
- PR meta → "profile: fadilatur11 · fullstack" + stat nyata (4+ yrs · 6 featured · 7 archived).
- Work section → "case files": kartu gaya diff (file header repo://, ± stats dari konten nyata, verdict badge), klik → dialog.
- H1 masked lines; amber hanya di flag/prefix/verdict; sisanya monokrom.

## Rules
Mekanisme diadaptasi via framer-motion (bukan copy file); konten Sieve (nama produk/PR/kode) tidak disalin; kode ilustratif owner-flavored; reduced-motion fungsional.
