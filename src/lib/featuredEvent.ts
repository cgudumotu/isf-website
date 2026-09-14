import { useEffect, useState } from 'react'
import { featuredEvent, gallery } from '../data/content'
import { formatEventDate, hasEnded, type IsfEvent } from './upcoming'

/* ---------------------------------------------------------------------
 *  THE FEATURED EVENT — the one with open registration, shown in the
 *  banner across the top of every page and as a live link on its card.
 *
 *  WHAT YOU EDIT WHEN A NEW EVENT OPENS FOR REGISTRATION
 *  -----------------------------------------------------
 *  Two lines in content.ts: `href` (the Eventbrite link) and `title`
 *  (copied exactly from an event in gallery.upcoming). That is all.
 *
 *  THERE IS NO "HIDE AFTER" DATE ANY MORE, ON PURPOSE
 *  --------------------------------------------------
 *  There used to be one, typed by hand. Which meant the same event had
 *  its date written down twice, in two places, and nothing forced them
 *  to agree. Change the event's date and forget the other one, and the
 *  banner outlives the event, sending students to a car park on the
 *  wrong evening. That is not a hypothetical: the pool party banner and
 *  the pool party card were already drifting apart.
 *
 *  So the banner now expires WITH its event, because it reads that
 *  event's own dates. One date, one place, no way to disagree.
 *
 *  A TITLE THAT MATCHES NOTHING SHOWS NOTHING
 *  ------------------------------------------
 *  If `title` does not name a real event, there is no banner at all.
 *  A typo therefore fails loudly and visibly, rather than producing a
 *  banner advertising an event the site does not list.
 *
 *  WHY THE BROWSER DECIDES THIS AT ALL
 *  -----------------------------------
 *  The site is static files on GitHub Pages. No server runs anywhere to
 *  check the time and send a different page, so the only clock available
 *  is the visitor's own. Fine here: the worst case is somebody with a
 *  wrong laptop clock sees a banner an hour late. It would NOT be fine
 *  for hiding a price or gating access, because a visitor can set their
 *  clock to anything. Never enforce a rule with a clock you don't own.
 * ------------------------------------------------------------------- */

const CHECK_EVERY_MS = 60_000

export interface LiveFeature {
  href: string
  title: string
  tag: string
  ctaLabel: string
  /** The matching entry from gallery.upcoming. */
  event: IsfEvent
  /** Generated from that event's dates, never typed by hand. */
  date: string
  banner: { eyebrow: string; title: string; detail: string; cta: string }
}

/**
 * Exported, and takes `now` as an argument, so the banner's behaviour can
 * be checked at any moment in history without waiting for that date to
 * arrive. A function that reads the clock itself can only be tested by
 * changing the computer's clock, which nobody ever does.
 */
export function currentFeature(now: number = Date.now()): LiveFeature | null {
  if (!featuredEvent.href) return null // the manual off switch

  const event = (gallery.upcoming as IsfEvent[]).find((e) => e.title === featuredEvent.title)
  if (!event) return null // title matches no event: show nothing rather than something wrong
  if (hasEnded(event, now)) return null

  const date = formatEventDate(event.starts, event.ends)
  const note = featuredEvent.banner.note
  return {
    href: featuredEvent.href,
    title: featuredEvent.title,
    tag: featuredEvent.tag,
    ctaLabel: featuredEvent.ctaLabel,
    event,
    date,
    banner: {
      eyebrow: featuredEvent.banner.eyebrow,
      title: featuredEvent.banner.title,
      // The date half is generated; the note is the only part Carol writes.
      detail: note ? `${date} · ${note}` : date,
      cta: featuredEvent.banner.cta,
    },
  }
}

export function useFeaturedEvent(): LiveFeature | null {
  const [live, setLive] = useState<LiveFeature | null>(currentFeature)

  useEffect(() => {
    if (!live) return
    const id = window.setInterval(() => {
      if (!currentFeature()) setLive(null)
    }, CHECK_EVERY_MS)
    return () => window.clearInterval(id)
  }, [live])

  return live
}
