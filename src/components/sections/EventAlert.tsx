import { useFeaturedEvent } from '../../lib/featuredEvent'

/* ---------------------------------------------------------------------
 *  EventAlert — the announcement bar at the very top of every page.
 *
 *  WHY THE TOP OF THE PAGE AND NOT INSIDE THE HERO
 *  -----------------------------------------------
 *  It sits ABOVE the header, so it is the first thing on the page and
 *  physically cannot be scrolled past without being seen. Anything placed
 *  below the hero competes with the headline for the same glance, and the
 *  headline wins, because that is what a hero is designed to do.
 *
 *  It also lives in the Layout rather than on the Home page, so it shows
 *  on every route. A student who lands on /events from an Instagram link
 *  never sees the home page at all, and they are exactly the person most
 *  likely to want a ticket.
 *
 *  It renders NOTHING once the event is past. Not a greyed-out bar, not
 *  "this event has ended". An empty space says nothing; a stale banner
 *  says nobody is looking after this website.
 *
 *  ON THE COLOURS
 *  --------------
 *  The gradient uses the 700 shades, not the brighter 600s. White text on
 *  coral-600 measures 4.43:1, just under the 4.5:1 that WCAG AA asks for.
 *  coral-700 is 6.15:1. The difference is invisible to most people and
 *  decisive for someone reading on a phone in Long Beach sunshine.
 * ------------------------------------------------------------------- */

export default function EventAlert() {
  const event = useFeaturedEvent()
  if (!event) return null

  return (
    <aside className="relative z-30 bg-gradient-to-r from-coral-700 via-berry-700 to-grape-700 text-white">
      <a
        href={event.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group container-ministry flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-2.5 text-center focus-visible:outline-none sm:py-3"
      >
        <span className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70 motion-reduce:hidden" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.16em]">
            {event.banner.eyebrow}
          </span>
        </span>

        <span className="text-sm font-bold sm:text-base">{event.banner.title}</span>

        {/* The date is the first thing to go when space runs out on a phone.
            The title and the button are what earn the tap; the exact date is
            on the Eventbrite page they're one tap away from. */}
        <span className="hidden text-sm font-medium text-white/85 lg:inline">
          {event.banner.detail}
        </span>

        {/* Looks like a button, is not one. This whole bar is already a single
            link, and a <button> nested inside an <a> is invalid HTML that
            keyboards and screen readers both handle badly. */}
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-ink-900 shadow-sm transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105"
        >
          {event.banner.cta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>

        <span className="sr-only">(opens Eventbrite in a new tab)</span>
      </a>
    </aside>
  )
}
