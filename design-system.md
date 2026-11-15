# Design System — Portfolio "Noir Cinema" (PFR-002, R3)
Thesis trace: halaman = film — scene morph, spotlight, glass. Dials: VARIANCE 8 · RISK 7 · DENSITY 4 · MOTION 9.

## 1. Keputusan inti
| Keputusan | Kenapa | Trade-off |
|---|---|---|
| Dark-first #0a0a0f dengan scene colors (#0d0b14/#100d0a) | Sinematik: bg bermetamorfosis per section = signature | Tanpa light mode (reason: identitas film; semua teks di dark terverifikasi AA) |
| Accent periwinkle #8FA3FF + secondary #B7A6FF | 8.32/9.32:1 di dark — AA body; bukan orange migios/lime lama/biru T1 | Dua step accent untuk gradient underline & hover |
| Glass nav (blur 14px + color-mix) + pill buttons | Bahasa modern 2026; target ≥44px | backdrop-filter = paint statis, bukan animasi |
| Lenis smooth scroll (lerp 0.09) + GSAP ticker sync | "Smooth" yang diminta user; ScrollTrigger tetap sumber kebenaran | +3KB gzip; reduced-motion → Lenis off |
| Glow sebagai satu spotlight hero (opacity entry + parallax) | Budgeted exception (bukan loop, bukan wallpaper) | Kalau glow muncul di section lain = pelanggaran budget |
| Radius pill/md-lg family + surface kartu | Modern; kontras dengan hard-edge T1 | Inner radius < outer dijaga |

## 2. Token block
Semua di `src/styles/tokens.css` (79 baris): color roles (bg/scene/surface/text/muted/accent/glow/border/ok), type scale (clamp, --text-3xl sampai 7rem), spacing 8-base, radius family, motion tokens (dur-1..4, --dur-scene 700ms, ease-out/in-out/spring, stagger 70ms, lerp 0.09). Reduced-motion → semua durasi 0ms.

## 3. Kontras ledger (terverifikasi antislop-contrast tool 2026-11-12)
| Pasangan | Rasio | Verdict |
|---|---|---|
| text #F5F4F0 di bg #0A0A0F | 17.95 | AA ✅ |
| muted #A8A8B3 di bg | 8.39 | AA ✅ |
| accent #8FA3FF di bg | 8.32 | AA ✅ |
| accent-contrast #0A0A0F di accent (CTA) | 8.32 | AA ✅ |
| text di surface #14141C | 16.64 | AA ✅ |
| accent-2 #B7A6FF di bg | 9.32 | AA ✅ |

## 4. Motion budget (dial 9)
- Maks 12 elemen/viewport; 2 sekuens; **2 loop**: ticker arsip (pause off-screen via IO) + scroll-cue pulse (repeat yoyo kecil).
- Hanya transform/opacity; glow = opacity + static paint (budgeted, tidak loop); scene morph = backgroundColor tween 700ms di body (paint, non-loop, per transisi scene — dianggap transisi, bukan animasi kontinu).
- Hover semua dalam @media (hover:hover); magnetic CTA = pointer-driven transform (hover:hover + motion allowed).
- Reduced-motion: semua durasi 0ms, Lenis off, useGsap off, halaman fungsional penuh.

## 5. Kontrak komponen (perubahan dari R2)
Nav glass + pill links + status pill; Hero spotlight + 2 CTA (primary/ghost) + scroll cue; work-row badge accent; skills kartu border + hover translateX; contact-email underline gradient scaleX; social pill; dialog rounded surface; ticker di archive card. Kontrak lain (K4-K11 R2) tetap berlaku dengan token baru.

## 6. Known limits
- Scene morph & Lenis = enhancement JS-only; tanpa JS halaman dark statis fungsional.
- color-mix + backdrop-filter butuh browser modern (fallback: bg solid).
