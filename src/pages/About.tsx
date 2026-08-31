import PageHero from '../components/ui/PageHero'
import Button from '../components/ui/Button'
import ImpactMap from '../components/sections/ImpactMap'
import Card from '../components/ui/Card'
import CallToAction from '../components/sections/CallToAction'
import { about, home } from '../data/content'
import { accentAt } from '../lib/accents'

export default function About() {
  const { missionPreview } = home

  return (
    <>
      <PageHero tone="grass" eyebrow={about.hero.eyebrow} title={about.hero.title} description={about.hero.subtitle} />

      <section className="container-ministry py-16 sm:py-20">
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          {about.intro.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-ink-600">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-paper-100">
        <div className="container-ministry py-16 sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            <h2 className="text-3xl font-extrabold sm:text-[2.6rem]">{about.whyStudentsMatter.title}</h2>
            {about.whyStudentsMatter.body.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-ink-600">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="container-ministry py-16 sm:py-20">
        <ImpactMap />
      </section>

      <section className="container-ministry py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="ministry-tag bg-teal-50 text-teal-800">Our approach</span>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{about.approach.title}</h2>
          <div className="mx-auto mt-5 flex max-w-2xl flex-col gap-4">
            {about.approach.body.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-ink-600">
                {p}
              </p>
            ))}
          </div>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {about.approach.steps.map((step, i) => (
            <li key={step.title}>
              <Card hover className="relative flex h-full flex-col gap-3 overflow-hidden">
                <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 ${accentAt(i * 2 + 1).solid}`} />
                <span className={`flex h-11 w-11 items-center justify-center rounded-2xl font-display text-lg font-extrabold text-white ${accentAt(i * 2 + 1).solid}`}>
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold text-ink-900">{step.title}</h3>
                <p className="leading-relaxed text-ink-600">{step.text}</p>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      {/* Moved here from the home page: this is the "why", and About is
          where somebody has actually asked for it. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-indigo-800 text-white">
        <div className="container-ministry grid items-center gap-8 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="ministry-tag w-fit bg-white/15 text-sun-200">{missionPreview.eyebrow}</span>
            <h2 className="text-3xl font-extrabold text-white sm:text-[2.6rem]">{missionPreview.title}</h2>
            <p className="text-lg leading-relaxed text-white/85">{missionPreview.body}</p>
          </div>
          <div className="lg:justify-self-end">
            <Button to={missionPreview.cta.to} className="!bg-white !text-brand-700 hover:!bg-sun-300 hover:!text-ink-900">
              {missionPreview.cta.label}
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-paper-100">
        <div className="container-ministry grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-extrabold sm:text-[2.6rem]">{about.hospitality.title}</h2>
            {about.hospitality.body.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-ink-600">
                {p}
              </p>
            ))}
          </div>
          <Card className="relative overflow-hidden bg-white p-8 lg:p-10">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 rule-rainbow" />
            <p className="font-display text-2xl font-bold leading-snug text-ink-800 sm:text-3xl">
              &ldquo;{about.pullQuote.text}&rdquo;
            </p>
            <p className="mt-4 text-sm font-bold uppercase tracking-wider text-coral-600">
              {about.pullQuote.attribution}
            </p>
          </Card>
        </div>
      </section>

      <section className="container-ministry py-16 sm:py-20">
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          <h2 className="text-3xl font-extrabold sm:text-[2.6rem]">{about.csulb.title}</h2>
          {about.csulb.body.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-ink-600">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-brand-700 to-indigo-800 text-white">
        <div className="container-ministry py-16 text-center sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            <h2 className="text-3xl font-extrabold text-white sm:text-[2.6rem]">{about.pledge.title}</h2>
            {about.pledge.body.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-white/85">
                {p}
              </p>
            ))}
            <p className="mx-auto mt-4 max-w-2xl border-t border-white/25 pt-7 font-display text-2xl font-extrabold text-sun-200 sm:text-3xl">
              {about.pledge.line}
            </p>
          </div>
        </div>
      </section>

      <CallToAction
        title="Come and see for yourself"
        description="The best way to understand ISF is to eat dinner with us. Turn up, bring a friend, and see for yourself."
        primaryCta={{ label: 'See upcoming events', to: '/events#upcoming' }}
        secondaryCta={{ label: 'Get in touch', to: '/connection' }}
      />
    </>
  )
}
