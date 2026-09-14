/* ---------------------------------------------------------------------
 *  TIME — every clock question on this site, answered in one place.
 *
 *  WHY THIS FILE EXISTS
 *  --------------------
 *  Two features need to know "has this date passed in Long Beach?": the
 *  banner across the top of every page, and the upcoming events list.
 *  When each one owned a private copy of the answer, the two could drift,
 *  and a banner outliving its own event is exactly the kind of bug nobody
 *  notices until a student turns up to a car park.
 *
 *  So the knowledge lives here and both import it. If a rule about time
 *  ever changes, it changes once.
 *
 *  WHY A ZONE NAME AND NEVER AN OFFSET
 *  -----------------------------------
 *  California is UTC-7 in summer (PDT) and UTC-8 in winter (PST). Write
 *  '-07:00' into a date by hand and every event after the clocks change
 *  in November is wrong by an hour. A zone name carries the whole history
 *  of daylight saving; an offset is only right for half the year.
 * ------------------------------------------------------------------- */

export const SITE_TIME_ZONE = 'America/Los_Angeles'

export interface WallParts {
  y: number
  mo: number
  d: number
  h: number
  mi: number
  /** false when the source was a bare date, i.e. the time is not known yet */
  hasTime: boolean
}

const WITH_TIME = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/
const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/

/**
 * Read '2026-09-19T08:00' or '2026-09-19' into plain numbers.
 *
 * The date-only form is for an event whose date is announced but whose
 * time is not settled. Carrying that as a real state beats inventing a
 * plausible time and printing a number nobody promised.
 */
export function parseWallClock(value: string): WallParts | null {
  const s = value.trim()
  const t = WITH_TIME.exec(s)
  if (t) {
    const [, y, mo, d, h, mi] = t.map(Number)
    return { y, mo, d, h, mi, hasTime: true }
  }
  const o = DATE_ONLY.exec(s)
  if (o) {
    const [, y, mo, d] = o.map(Number)
    return { y, mo, d, h: 0, mi: 0, hasTime: false }
  }
  return null
}

/**
 * How far a zone sits from UTC at one particular instant, in milliseconds.
 *
 * There is no direct API for this, so we use the standard trick: ask Intl
 * to print that instant as wall-clock numbers in the target zone,
 * reassemble those numbers as if they were UTC, and measure the gap.
 */
function zoneOffsetMs(utcMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(new Date(utcMs))

  const f = (type: string) => Number(parts.find((p) => p.type === type)?.value)
  // hour comes back as 24 rather than 0 at midnight in some engines
  return (
    Date.UTC(f('year'), f('month') - 1, f('day'), f('hour') % 24, f('minute'), f('second')) - utcMs
  )
}

/** Turn a Long Beach wall clock into a real moment in time. */
export function zonedTimeToMs(wallClock: string, timeZone: string = SITE_TIME_ZONE): number {
  const p = parseWallClock(wallClock)
  if (!p) return NaN

  // Read the wall clock as if it were UTC, then slide it by the zone's offset.
  const asIfUtc = Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi)
  const first = asIfUtc - zoneOffsetMs(asIfUtc, timeZone)
  // Re-check once: the first guess can land on the far side of a daylight
  // saving change, in which case the offset we used was the wrong one.
  return asIfUtc - zoneOffsetMs(first, timeZone)
}

/**
 * Midnight at the END of the given day, Long Beach time. This is the
 * moment something dated that day stops being shown.
 *
 * Adding a day by writing d + 1 into Date.UTC is safe even on the 31st,
 * because Date.UTC normalises overflow: month 8 day 32 becomes October 2.
 * Hand-rolling "if the 31st then roll the month" is where calendar bugs
 * are born, and February is where they hatch.
 */
export function endOfDayMs(dateish: string, timeZone: string = SITE_TIME_ZONE): number {
  const p = parseWallClock(dateish)
  if (!p) return NaN
  const next = new Date(Date.UTC(p.y, p.mo - 1, p.d + 1))
  const wall =
    `${next.getUTCFullYear()}-` +
    `${String(next.getUTCMonth() + 1).padStart(2, '0')}-` +
    `${String(next.getUTCDate()).padStart(2, '0')}T00:00`
  return zonedTimeToMs(wall, timeZone)
}
