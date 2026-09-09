import { useEffect, useState } from 'react'
import { gallery } from '../data/content'
import { zonedTimeToMs } from './featuredEvent'

/* ---------------------------------------------------------------------
 *  UPCOMING EVENTS — what is still ahead of us, right now.
 *
 *  Carol's rule, in her words: "as soon as the date ends w.r.t PDT
 *  remove them." So an event disappears at MIDNIGHT at the end of the
 *  day it finishes on, Long Beach time. Not the moment the dinner ends
 *  at 9pm, because somebody checking their phone at 9:30 on the night
 *  still wants to see where everyone is. The calendar day is the unit.
 *
 *  This is the same convention the top-of-page banner already uses, and
 *  that consistency is deliberate: a site where two things disappear by
 *  two different rules is a site nobody can predict.
 *
 *  WHY THE EVENT LIST STORES TIMESTAMPS AND NOT THE PRETTY STRING
 *  --------------------------------------------------------------
 *  It used to say  date: 'Saturday, September 5, 2026 · 5 to 9pm'.
 *  That is lovely for a human and useless to a program: to decide
 *  whether it has passed you would have to parse English back into a
 *  date, and every such parser eventually meets a string it does not
 *  understand and quietly guesses wrong.
 *
 *  The fix is not a cleverer parser. It is to stop throwing the
 *  information away in the first place. Each event now carries machine
 *  timestamps, and the pretty string is GENERATED from them.
 *
 *  Note the direction. The obvious alternative is to keep both fields
 *  and type each one by hand, but then they can disagree, and the day
 *  they disagree the site shows one date and hides itself on another.
 *  Derive, don't duplicate: whenever two pieces of data must always
 *  agree, store one of them and compute the other.
 *
 *  WHY THE WALL CLOCK AND A ZONE NAME, NOT AN OFFSET
 *  -------------------------------------------------
 *  '2026-09-05T17:00' is a wall clock: what the kitchen clock in Long
 *  Beach reads. It deliberately carries no offset, because California
 *  is UTC-7 in September and UTC-8 in December. zonedTimeToMs works out
 *  which one applies on that specific date. Write '-07:00' by hand and
 *  your November events are wrong by an hour.
 * ------------------------------------------------------------------- */

export const SITE_TIME_ZONE = 'America/Los_Angeles'

/** Re-check the clock this often, so a page left open overnight tidies itself. */
const CHECK_EVERY_MS = 60_000

export interface IsfEvent {
  title: string
  /** Long Beach wall clock, 'YYYY-MM-DDTHH:mm'. No offset, on purpose. */
  starts: string
  /** Long Beach wall clock. May be on a later day for trips and camping. */
  ends: string
  location: string
  text: string
  tag: string
}

/** An event plus the human-readable date line built from its timestamps. */
export type DatedEvent = IsfEvent & { date: string }

const WALL_CLOCK = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/

function parts(wallClock: string) {
  const m = WALL_CLOCK.exec(wallClock.trim())
  if (!m) return null
  const [, y, mo, d, h, mi] = m.map(Number)
  return { y, mo, d, h, mi }
}

/* Formatting the DISPLAY date needs no timezone maths at all. The numbers
   in the string are already the Long Beach numbers, so we hand them to Intl
   as if they were UTC and read the names back out. Doing it any other way
   invites an off-by-one where an evening event prints yesterday's weekday. */
function nameOf(y: number, mo: number, d: number, opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...opts }).format(
    new Date(Date.UTC(y, mo - 1, d)),
  )
}

function clock(h: number, mi: number, withSuffix: boolean) {
  const suffix = h < 12 ? 'am' : 'pm'
  const twelve = h % 12 === 0 ? 12 : h % 12
  const minutes = mi === 0 ? '' : `:${String(mi).padStart(2, '0')}`
  return `${twelve}${minutes}${withSuffix ? suffix : ''}`
}

/**
 * Build the line a visitor reads, e.g.
 *   'Saturday, September 5, 2026 · 5 to 9pm'
 *   'Saturday, September 19, 2026 · 8 to 11am'
 *   'Saturday, October 10, 2026 · 11am to 2pm'   (crosses noon)
 *   'Friday, October 2 to Sunday, October 4, 2026'   (multi-day trip)
 */
export function formatEventDate(starts: string, ends: string): string {
  const a = parts(starts)
  const b = parts(ends)
  if (!a) return ''

  const day = (p: NonNullable<ReturnType<typeof parts>>, withYear: boolean) =>
    `${nameOf(p.y, p.mo, p.d, { weekday: 'long' })}, ` +
    `${nameOf(p.y, p.mo, p.d, { month: 'long' })} ${p.d}` +
    (withYear ? `, ${p.y}` : '')

  // A trip that runs across days reads as a span and skips clock times;
  // "Friday 9am to Sunday 4pm" is more precision than anyone needs here.
  const sameDay = b && a.y === b.y && a.mo === b.mo && a.d === b.d
  if (b && !sameDay) return `${day(a, false)} to ${day(b, true)}`

  if (!b) return day(a, true)

  // Within one day: drop the am/pm from the start when both halves match,
  // so it reads "5 to 9pm" the way a person would say it out loud.
  const sameHalf = a.h < 12 === b.h < 12
  return `${day(a, true)} · ${clock(a.h, a.mi, !sameHalf)} to ${clock(b.h, b.mi, true)}`
}

/**
 * The instant an event should vanish: midnight at the end of the day it
 * finishes on, Long Beach time.
 *
 * Adding a day by writing d + 1 into a Date is safe here even at the end
 * of a month, because Date.UTC normalises overflow for us: month 8 day 32
 * becomes October 2. Hand-rolling "if the 31st then roll the month" is
 * where calendar bugs are born.
 */
export function hidesAt(ev: IsfEvent): number {
  const p = parts(ev.ends) ?? parts(ev.starts)
  if (!p) return NaN
  const nextMidnight = new Date(Date.UTC(p.y, p.mo - 1, p.d + 1))
  const wall =
    `${nextMidnight.getUTCFullYear()}-` +
    `${String(nextMidnight.getUTCMonth() + 1).padStart(2, '0')}-` +
    `${String(nextMidnight.getUTCDate()).padStart(2, '0')}T00:00`
  return zonedTimeToMs(wall, SITE_TIME_ZONE)
}

/**
 * The events still worth showing, in date order, each with its display line.
 *
 * `now` is a parameter rather than a call to Date.now() inside, so the
 * behaviour can be tested at any moment in history without touching the
 * system clock. A function that reads the clock itself is a function you
 * can only test by waiting.
 */
export function liveEvents(now: number = Date.now()): DatedEvent[] {
  return (gallery.upcoming as IsfEvent[])
    .filter((ev) => {
      const deadline = hidesAt(ev)
      // A malformed date shows the event rather than hiding it. Better to
      // leave a stale card up, which somebody will notice and report, than
      // to silently delete an event nobody can see is missing.
      return Number.isNaN(deadline) ? true : now < deadline
    })
    .slice()
    .sort((x, y) => x.starts.localeCompare(y.starts))
    .map((ev) => ({ ...ev, date: formatEventDate(ev.starts, ev.ends) }))
}

/**
 * Same list, but it keeps itself current while the page is open.
 *
 * WHY setInterval AND NOT setTimeout: the obvious version schedules one
 * timeout for the exact moment the next event expires. Browsers store that
 * delay in a signed 32-bit integer, so anything beyond about 24.8 days
 * overflows and fires IMMEDIATELY instead of later. An event two months
 * out would vanish the instant the page loaded. Polling has no such cliff.
 */
export function useUpcomingEvents(): DatedEvent[] {
  const [events, setEvents] = useState<DatedEvent[]>(() => liveEvents())

  useEffect(() => {
    const id = window.setInterval(() => {
      const next = liveEvents()
      // Only re-render when the set actually changed, so an open tab is not
      // re-rendering a list of identical cards every minute forever.
      setEvents((prev) =>
        prev.length === next.length && prev.every((p, i) => p.title === next[i].title)
          ? prev
          : next,
      )
    }, CHECK_EVERY_MS)
    return () => window.clearInterval(id)
  }, [])

  return events
}
