import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import SectionHeader from '../ui/SectionHeader'
import { PHOTOS } from '../../data/photos'
import { accentAt } from '../../lib/accents'
import { asset } from '../../lib/asset'

/* A short row of real photos on the home page, linking through to the
   full collage on the Events page. This replaced a block of placeholder
   student quotes: real faces do the job better than invented ones. */

const PICKS = [
  'crystal-cove',
  'home-dinner',
  'yosemite',
  'thanksgiving-2025',
  'surf-morning',
  'graduation',
]

export default function PhotoStrip() {
  const photos = PICKS.map((slug) => PHOTOS.find((p) => p.slug === slug)).filter(
    (p): p is (typeof PHOTOS)[number] => Boolean(p),
  )

  return (
    <section className="bg-paper-100">
      <div className="container-ministry py-16 sm:py-20">
        <SectionHeader
          eyebrow="A few good days"
          title="This is what it actually looks like"
          description="Dinners, road trips, first time on a surfboard, and the odd graduation. We have been at this since 2010."
          tone="berry"
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
          {photos.map((photo, i) => {
            const accent = accentAt(i * 2 + 1)
            return (
              <Link
                key={photo.slug}
                to="/events"
                className="group relative overflow-hidden rounded-2xl bg-paper-200 shadow-ministry ring-1 ring-ink-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-ministry-lg"
              >
                <picture>
                  <source srcSet={asset(`gallery/thumb/${photo.slug}.webp`)} type="image/webp" />
                  <img
                    src={asset(`gallery/thumb/${photo.slug}.jpg`)}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </picture>
                <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 ${accent.solid}`} />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/85 to-transparent p-4 text-sm font-bold text-white">
                  {photo.caption}
                </span>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Button variant="secondary" to="/events">
            See all the photos
          </Button>
        </div>
      </div>
    </section>
  )
}
