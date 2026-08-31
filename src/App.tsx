import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'

// Every page is code-split and lazy-loaded; the <Suspense> boundary lives
// in Layout so the header/footer stay put while a page chunk loads.
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Connection = lazy(() => import('./pages/Connection'))
const Gallery = lazy(() => import('./pages/Gallery'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/events" element={<Gallery />} />

        {/* The page used to live at /gallery. That address is already out in
            the world: printed on the postcard, pasted into Instagram, sitting
            in the inbox of everyone who got a past newsletter. Deleting it
            would turn all of those into a 404 with no way to fix them after
            the fact.

            So /gallery keeps working and quietly forwards here. `replace`
            swaps the entry in the browser's history instead of adding one,
            so the Back button returns to wherever they came from rather
            than to /gallery, which would forward them straight here again
            and trap them in a loop.

            Rule of thumb: you own a URL forever once you have published it.
            You can move what it points at, but you should never make it
            simply stop existing. */}
        <Route path="/gallery" element={<Navigate to="/events" replace />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
