import { useLocation } from 'react-router-dom'
import { asset } from '../../lib/asset'

/* ---------------------------------------------------------------------
 *  PageBackdrop — the Walter Pyramid, sitting quietly behind the page.
 *
 *  Three things keep it from getting in the way of reading:
 *
 *   1. The image file itself is already desaturated and lightened, so the
 *      browser isn't running an expensive filter on every paint.
 *   2. A mask fades it out toward the bottom, so body copy further down
 *      the page sits on clean paper.
 *   3. It's `fixed`, so it stays put while the page scrolls. That reads as
 *      depth rather than as a picture you're trying to look at.
 *
 *  It lives behind everything except the page background colour, so any
 *  section with its own fill (white cards, the dark blue bands) simply
 *  covers it. The pyramid shows through in the open, neutral stretches.
 *
 *  ON THE PER-PAGE STRENGTHS
 *  -------------------------
 *  Home carries it strongest: it's the first thing a student sees and the
 *  page with the most open space, so the pyramid has room to be a picture
 *  rather than a texture. About is a shade lighter. Events and Connect are
 *  lighter still, because both are pages people came to READ (a schedule,
 *  a form), and a photo competing with a form field is a photo doing
 *  damage. Same image, different job on each page.
 *
 *  TO TUNE IT: change the numbers in STRENGTH. 0 is invisible, 1 is the
 *  full photograph. Anything past about 0.25 and text starts to fight it.
 * ------------------------------------------------------------------- */

const STRENGTH: Record<string, number> = {
  '/': 0.26,           // Home       — most visible
  '/about': 0.22,      // About
  '/events': 0.15,    // Events     — kept lighter, people read this page
  '/connection': 0.15, // Connect    — kept lighter, there's a form on it
}

export default function PageBackdrop() {
  const { pathname } = useLocation()
  const strength = STRENGTH[pathname]

  // A page not listed above simply has no backdrop. Reading the value and
  // checking it is the same lookup, so there's no separate list of routes
  // to keep in sync with this one. Two lists that must agree are two lists
  // that will eventually disagree.
  if (!strength) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden"
    >
      <picture>
        <source srcSet={asset('csulb-pyramid.webp')} type="image/webp" />
        <img
          src={asset('csulb-pyramid.jpg')}
          alt=""
          className="h-full w-full object-cover object-[38%_45%]"
          /* Opacity is set here rather than as a Tailwind `opacity-[...]`
             class on purpose. Tailwind only generates the classes it can
             literally find in your source, so a class built from a
             variable produces no CSS at all and fails silently. Values
             that change at runtime belong in `style`. */
          style={{
            opacity: strength,
            WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 34%, transparent 82%)',
            maskImage: 'linear-gradient(to bottom, #000 0%, #000 34%, transparent 82%)',
          }}
        />
      </picture>
      {/* a wash of brand blue over the top ties the photo to the palette */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-100/25 via-transparent to-paper-50/60" />
    </div>
  )
}
