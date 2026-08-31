import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Handles scroll position on navigation.
 *
 * A single-page app doesn't reload, so the browser keeps you wherever you
 * were on the previous page. Two cases to cover:
 *
 *   /events           -> jump to the top, like a normal page load
 *   /events#upcoming  -> jump to that section instead
 *
 * The hash case needs a beat before the element exists: pages are lazily
 * loaded, so the target usually isn't in the DOM on the first render.
 * We retry on the next animation frame and then once more shortly after,
 * which covers both an already-cached chunk and one still arriving.
 *
 * `scroll-mt-*` on the target (see Gallery.tsx) keeps the sticky header
 * from covering the heading we just scrolled to.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const id = hash.slice(1)
    let cancelled = false

    const jump = () => {
      if (cancelled) return true
      const el = document.getElementById(id)
      if (!el) return false
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return true
    }

    if (jump()) return
    const raf = requestAnimationFrame(() => {
      if (!jump()) setTimeout(jump, 220)
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [pathname, hash])

  return null
}
