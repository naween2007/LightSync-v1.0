# LightSync website performance pass

## What was optimized
- Replaced repeated card-level backdrop blur with opaque/translucent glass surfaces.
- Removed sticky-navbar backdrop blur.
- Removed the continuous floating animation from the large hero Producer Studio mockup.
- Reduced large glow radius/size in the hero and download area.
- Added `content-visibility: auto` with an intrinsic-size fallback for below-the-fold sections.
- Added `prefers-reduced-motion` handling.
- Kept the screenshot carousel native-scroll/snap based with no autoplay.
- Replaced layout-heavy per-scroll carousel measurements with `IntersectionObserver`.
- Screenshot images remain lazy loaded; the lightbox mounts only when opened and does not priority-preload the full image.
- Hardware calculations continue to use memoized derived values.
- Interactive components remain isolated client components while the main page stays server-rendered.

## Test
Development mode (includes HMR/dev tooling):

```bash
npm run dev:8000
```

Production comparison:

```bash
npm run build
npm run start:8000
```

Then open http://localhost:8000.
