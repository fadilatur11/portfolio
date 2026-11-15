# Creative Direction — Portfolio Redesign R2 — 2026-11-12
Dials: DESIGN_VARIANCE 8 · CONCEPT_RISK 6 · VISUAL_DENSITY 3 · MOTION_INTENSITY 8

Design Read: rekruter/hiring manager menilai portfolio dev backend (4+ thn, Probolinggo). Halaman harus membuat pengunjung mengingat owner sebagai engineering talent yang kuat dan menghubungi. Referensi: migios.com (poster brand system) + gojek.com (stats-as-structure) — mekanisme diadaptasi, bukan ditiru.

## T1 — "Living Index"
- **Thesis**: portfolio developer = *system index yang hidup*: halaman berperilaku seperti layanan yang berjalan — metrik nyata jadi struktur, karya jadi entri index, halaman "melapor status"-nya.
- **Axis** (composition/type/color/shape/image/motion/narrative): catalogue-index + poster band alternating ink/paper/accent; display besar + mono counterpoint untuk label/metrik; ink/paper inversion + satu accent; hard-edge poster, tanpa rounded card; media proyek nyata + metrik sebagai data-as-image; boot-sequence entry + status ticker + scroll reveal; manifesto → index → proof → contact.
- **Signature move**: **Status Strip** — pita status gaya log ("sistem hidup") yang membentang di halaman: setiap section diawali baris mono kecil gaya log (`> work.index — 6 shipped / 7 archived`), dan setiap work row punya status badge gaya service (`SHIPPED`, `RECENT`). Hero membuka seperti boot-sequence sebelum headline muncul.
- **Unreasonable move**: hero membuka dengan boot-sequence, bukan headline poster langsung.
- **Refusal**: tanpa gradient glow, tanpa stock image, tanpa hacker-terminal hijau-hitam.
- **Risk**: estetika terminal bisa jatuh ke klise "hacker green-on-black"; tanda kegagalan: terlihat seperti dashboard CLI generik. Mitigasi: bahasa log hanya di strip/label kecil, permukaan tetap poster editorial.
- **Fit**: identitas backend developer — index/metric/status adalah bahasa kerjanya sehari-hari; angka konten nyata (4+ thn, 6+7 proyek) menjadi proof ala gojek.

## T2 — "Poster Brand" (paling dekat migios)
- **Thesis**: perlakukan orang sebagai brand produk: poster band bergantian ink/paper/accent, screenshot proyek sebagai artifact fisik pinned/rotated, numeral raksasa per band.
- **Axis**: poster band alternating + asymmetric section heads; Archivo width-axis display, mixed fill/outline; ink/paper + satu accent loud; hard-edge poster + artifact placement system; screenshot sebagai artifact fisik; physical-drop entry + parallax artifact; bab karier per band (manifesto → bab karier → contact).
- **Signature move**: **pinned artifact cards** — screenshot proyek drop/rotate/parallax ke tempatnya, ditemani numeral raksasa per band.
- **Unreasonable move**: CV section sebagai kertas paper-inversion dengan numeral raksasa "04 / CV".
- **Refusal**: tanpa carousel, tanpa card grid — band + numeral saja.
- **Thesis-echo**: band = bab karier; numeral = tahun/urutan; artifact = karya owner sendiri.
- **Risk**: paling dekat migios → distance test berisiko: jika logo dihapus masih terlihat migios. Mitigasi: band diorganisir sebagai bab karier (numeral = tahun, bukan kategori produk), artifact = screenshot milik owner.
- **Fit**: paling langsung menjawab "mirip migios" secara permukaan; paling aman dibangun (band + numeral mudah dieksekusi rapi di React+GSAP).

## T3 — "Kinetic Story"
- **Scene**: satu panggung kontinu; IA "cerita" berurutan; proyek mengalir sebagai ticker hidup.
- **Axis**: one continuous stage + horizontal/arc work gallery; kinetic type (outline→fill di threshold); near-monochrome + color via media reveal; type-only hero + media reveal per proyek; scene transitions; manifesto→scenes→contact.
- **Signature move**: **scroll-driven scene transitions** — headline hero memecah/morf menjadi header section berikutnya, proyek bergerak melengkung (arc) saat scroll.
- **Unreasonable move**: work index dalam scroll horizontal yang dikunci vertikal, dengan fallback vertikal di mobile.
- **Refusal**: tanpa screenshot dalam frame statis — karya tampil sebagai text+media reveal.
- **Risk**: build paling berat; horizontal/arc scroll + a11y risk; konten discovery turun; performa di device low-end.
- **Fit**: paling kreatif/kinetik, paling dekat "full motion" maksimal; paling berat dibangun & dirawat.

## Skor (1–5 per kriteria; total 25)
| Territory | Fit | Distinct | Coherent | Feasible | A11y/Perf | Total |
|---|---|---|---|---|---|---|
| T1 Living Index | 5 | 4 | 5 | 4 | 4 | 22 |
| T2 Poster Brand | 4 | 3 | 4 | 5 | 4 | 20 |
| T3 Kinetic Story | 4 | 5 | 3 | 4 | 2 | 18 |

## Chosen
**T1 — Living Index** (dipilih user 2026-11-12; skor tertinggi 22/25).

## Design Thesis (terkunci)
We believe a developer's portfolio should behave like the systems they build — measured, indexed, alive.
We will build the page as a living service index: boot-sequence hero, status strip, dan metrik nyata sebagai struktur naratif.
We refuse gradient glows, stock imagery, dan klise hacker-terminal hijau-hitam.

## Distance test per territory
- T1: komposisi catalogue-index + log strip; bukan poster-band migios maupun segmented-corporate gojek; jika logo dihapus, komposisi "living index untuk orang" tetap berdiri sendiri → **pass**.
- T2: band+numeral migios-adjacent; transformasi struktural (band = bab karier, numeral = tahun) → **pass dengan transformasi wajib**.
- T3: one-stage kinetic scene; tanpa padanan langsung di referensi → **pass**.

## Clichés avoided (ledger)
- Hero gradient glow — tidak dipakai di ketiga territory.
- Bento grid tanpa makna — tidak dipakai.
- Hacker terminal hijau-hitam — T1 hanya bahasa log di strip/label kecil.
- Marquee-as-hero — ticker hanya supporting strip, bukan hero.
- Migios orange poster clone — ditolak di T2 (band = bab karier).
- Horizontal scroll tanpa fallback (T3 unreasonable move harus punya fallback vertikal mobile).

## References (adapted, not copied)
- migios.com (snapshot 2026-11-12) — poster band + numeral + artifact mechanisms, ditransformasi jadi bab-karier bands.
- gojek.com (live 2026-11-12) — stats-as-structure + precision numbers, diadaptasi ke metrik konten nyata owner.
- auge-xp.com (live 2026-11-12, SOTD 12 Nov 2026) — text-first loop mechanism, diadaptasi ke ticker arsip proyek text-first.
- recent.design + codrops (live 2026-11-12) — sinyal arah motion; mekanisme detail unverified, tidak diklaim sebagai bukti.
- Ringkasan di sini; kartu lengkap per referensi ada di reference-brief.md

---

# Re-run Divergence — R3 (2026-11-12) — T1 ditolak user

User feedback: "jelek banget... rombak total... full of motion, UI modern, smooth, full of transition". T1 Living Index ditolak; dials baru: MOTION_INTENSITY 9 (cinematic), DESIGN_VARIANCE 8, CONCEPT_RISK 7, VISUAL_DENSITY 4.

Tiga territory baru: **A. Noir Cinema** (dark cinematic, scene morph, Lenis) 23/25 · B. Color Shift (light gradient world) 21/25 · C. Kinetic Film (typographic film) 19/25.

**Chosen: A. Noir Cinema** (dipilih user 2026-11-12).
Design Thesis: We believe a portfolio can feel like a film — dark, paced, and alive. We will make every section a scene that morphs seamlessly as you scroll (Lenis smooth + GSAP scene transitions + magnetic hover). We refuse gradient-glow wallpaper, static pages, dan transisi yang hanya dekorasi.

Signature move: **Scene Morph** — background halaman bermetamorfosis per section (hero #0a0a0f → work #0d0b14 → profile #100d0a → contact #0a0a0f) dengan crossfade 700ms; di viewport pertama diperkuat spotlight glow + intro choreography; echo: hover states & glass nav.
Distance test: komposisi scene-morph + pill glass nav + badge tidak identik migios/gojek/T1 → pass. Cliché ledger: gradient glow dibudget sebagai satu spotlight hero (bukan wallpaper), tanpa bento, tanpa marquee-hero.
