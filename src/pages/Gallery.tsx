import { useState } from 'react'
import PageHero from '../components/ui/PageHero'
import Card from '../components/ui/Card'
import CallToAction from '../components/sections/CallToAction'
import SectionHeader from '../components/ui/SectionHeader'
import PhotoCollage from '../components/sections/PhotoCollage'
import { featuredEvent, gallery } from '../data/content'
import { useFeaturedEvent } from '../lib/featuredEvent'
import { accentAt, accentByName } from '../lib/accents'

const toneGradient: Record<string, string> = {
  red: 'from-red-300 to-red-500',
  coral: 'from-coral-300 to-coral-500',
  sun: 'from-sun-300 to-sun-500',
  grass: 'from-grass-300 to-grass-500',
  teal: 'from-teal-300 to-teal-500',
  sky: 'from-sky-300 to-sky-500',
  indigo: 'from-indigo-300 to-indigo-500',
  grape: 'from-grape-300 to-grape-500',
  berry: 'from-berry-300 to-berry-500',
}

function ImageIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10" r="1.6" />
      <path d="m21 16-4.5-4.5L7 19" />
    </svg>
  )
}

function MetaRow({ icon, children }: { icon: 'date' | 'pin'; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-ink-500">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {icon === 'date' ? (
          <>
            <rect x="3" y="4.5" width="18" height="16" rx="2" />
            <path d="M3 9h18M8 2.5v4M16 2.5v4" />
          </>
        ) : (
          <>
            <path d="M12 21s-6.5-5.6-6.5-10.3A6.5 6.5 0 0 1 18.5 10.7C18.5 15.4 12 21 12 21Z" />
            <circle cx="12" cy="10.5" r="2.3" />
          </>
        )}
      </svg>
      {children}
    </span>
  )
}

export default function Gallery() {
  const live = useFeaturedEvent()
  /* Which card's "not open yet" note is showing. One value rather than an
     array of booleans, so opening one closes the last. Two cards explaining
     the same thing at once is noise. */
  const [noteFor, setNoteFor] = useState<string | null>(null)

  return (
    <>
      <PageHero
        tone="sun"
        eyebrow={gallery.hero.eyebrow}
        title={gallery.hero.title}
        description={gallery.hero.subtitle}
      />

      {/* ORDER: what's coming up comes before what already happened.
          Somebody arriving from the Instagram bio or the email banner is
          deciding whether to turn up on Saturday, and that decision is
          made by the dates. The photos are what convince them it will be
          fun, but they only need convincing after they know there is
          something to turn up TO. Put the actionable thing first and the
          persuasive thing second.

          id + scroll-mt is what makes /gallery#upcoming land here with
          the sticky header clear of the heading. */}
      <section id="upcoming" className="scroll-mt-24">
        <div className="container-ministry py-16 sm:py-20">
          <SectionHeader eyebrow="Save the date" title="Upcoming events" align="left" />

          <ul className="mt-8 flex flex-col gap-2.5">
            {gallery.eventNotes.map((note, i) => (
              <li key={note} className="flex items-start gap-2.5 leading-relaxed text-ink-600">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: accentByName(['sun', 'grass', 'sky'][i % 3]).hex }}
                  aria-hidden="true"
                />
                <span>{note}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {gallery.upcoming.map((ev, i) => {
              const accent = accentAt(i * 2)
              /* One event in the list has open registration, and it is named
                 in featuredEvent.title. Matching by title rather than keeping
                 a second copy of the event above the list means there is one
                 card per event and one place to edit when the next one opens. */
              const registerable = live && live.title === ev.title
              const open = noteFor === ev.title

              const head = (
                <>
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-xl font-bold text-ink-900">{ev.title}</span>
                    {registerable ? (
                      <span className="flex shrink-0 items-center gap-2 rounded-full bg-coral-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-coral-800">
                        <span className="relative flex h-2 w-2" aria-hidden="true">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral-500 opacity-75 motion-reduce:hidden" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-coral-600" />
                        </span>
                        {live.tag}
                      </span>
                    ) : (
                      <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${accent.chip}`}>
                        {ev.tag}
                      </span>
                    )}
                  </span>
                  <span className="flex flex-wrap gap-x-5 gap-y-1">
                    <MetaRow icon="date">{ev.date}</MetaRow>
                    <MetaRow icon="pin">{ev.location}</MetaRow>
                  </span>
                  <span className="leading-relaxed text-ink-600">{ev.text}</span>
                </>
              )

              /* ---- the one with an open link: a real <a>, so middle-click
                      and "open in new tab" behave the way people expect ---- */
              if (registerable) {
                return (
                  <a
                    key={ev.title}
                    href={live.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col gap-3 overflow-hidden rounded-ministry bg-white p-7 shadow-ministry ring-2 ring-coral-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-ministry-lg focus-visible:-translate-y-1 md:col-span-2"
                  >
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 rule-rainbow" />
                    {head}
                    <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold tracking-wide text-white shadow-ministry transition-colors duration-200 group-hover:bg-brand-700">
                      {live.ctaLabel}
                      {/* the arrow leaving the box is the convention for "this
                          opens somewhere else", which the new tab makes true */}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                      </svg>
                    </span>
                    <span className="sr-only">(opens Eventbrite in a new tab)</span>
                  </a>
                )
              }

              /* ---- everything else: a button, because there is nowhere to
                      go yet. An <a href="#"> would promise navigation and
                      then not deliver it. ---- */
              return (
                <Card key={ev.title} hover className="relative flex flex-col gap-3 overflow-hidden bg-white p-0">
                  <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1.5 ${accent.solid}`} />
                  <button
                    type="button"
                    onClick={() => setNoteFor(open ? null : ev.title)}
                    aria-expanded={open}
                    className="flex w-full flex-col gap-3 rounded-ministry p-7 text-left"
                  >
                    {head}
                    {/* aria-live so a screen reader announces the note appearing.
                        Without it the message is invisible to anyone not looking
                        at the screen, and the click seems to do nothing. */}
                    <span aria-live="polite" className="block">
                      {open && (
                        <span className="mt-1 block rounded-2xl bg-sun-50 px-4 py-3 text-sm font-semibold leading-relaxed text-ink-700 ring-1 ring-sun-200">
                          {featuredEvent.notOpenYet}
                        </span>
                      )}
                    </span>
                  </button>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* The photos now carry the tinted background the events section used
          to have. The page alternates plain / tinted / plain so each block
          reads as its own thing; swapping the order without swapping the
          backgrounds would have left the collage and the call-to-action
          running together as one undivided stretch of white. */}
      <section className="bg-paper-100">
        <div className="container-ministry py-16 sm:py-20">
          <SectionHeader eyebrow="From our albums" title="Photos" align="left" tone="sky" />

          {/* These paragraphs describe the PHOTOS, so they travel with them.
              Left-aligned now, to sit under the heading the same way the
              event notes sit under theirs. */}
          <div className="mt-6 flex max-w-3xl flex-col gap-4">
            {gallery.intro.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-ink-600">
                {p}
              </p>
            ))}
            <p className="text-sm font-semibold text-ink-400">Click any photo to see it bigger.</p>
          </div>

          <div className="mt-10">
            <PhotoCollage />
          </div>
        </div>
      </section>

      <CallToAction
        title={gallery.cta.title}
        description={gallery.cta.description}
        primaryCta={gallery.cta.primaryCta}
        secondaryCta={gallery.cta.secondaryCta}
      />
    </>
  )
}
