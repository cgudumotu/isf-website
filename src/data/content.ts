/* =====================================================================
 *  ISF — SINGLE SOURCE OF TRUTH FOR ALL WEBSITE COPY
 * ---------------------------------------------------------------------
 *  Every headline, paragraph, label, list, story and event on the site
 *  is defined here. Pages and components import from this file, so you
 *  can update wording WITHOUT touching component code.
 *
 *  TONE GUIDE (matches the ISF postcard):
 *   ISF is a pre-evangelism club. The website leads with FRIENDSHIP and
 *   AMERICAN CULTURE. Faith is mentioned honestly but never as the
 *   headline. The postcard line is the standard:
 *     "We exist to help students build friendships with Americans and
 *      fellow students, learn about American culture, and explore
 *      following Jesus."
 *   Avoid insider words a first-time visitor would not use: ministry,
 *   gospel, Christ-centered, fellowship night, outreach, testimony.
 *   Prefer: club, community, dinners, hangouts, stories, friends.
 *
 *  WRITING RULES (Carol's note, 2026-08-07):
 *   - NO em dashes or en dashes anywhere in visible copy. They are the
 *     clearest tell that a machine wrote the sentence. Use a full stop,
 *     a comma, or the word "and".
 *   - Use contractions. "You're welcome here", not "You are welcome here".
 *   - Short sentences. Concrete nouns. Say the actual thing.
 *   - Skip the "not X, but Y" and "it's more than X, it's Y" shapes.
 *
 *  HOW TO EDIT:
 *   - Change any text by editing the strings below.
 *   - Items marked  // TODO  are placeholders to replace with real info.
 *   - After editing, run `npm run build`.
 * ===================================================================== */

export interface Cta {
  label: string
  /** internal route (React Router) */
  to?: string
  /** external/tel/sms link */
  href?: string
}

export interface NavItem {
  label: string
  to: string
}

/* ----------------------------- SITE ------------------------------ */
export const site = {
  name: 'International Student Fellowship',
  shortName: 'ISF',
  tagline: 'Free food, fun hangouts and real friends at CSULB.',
  university: 'California State University, Long Beach',
  universityShort: 'CSULB',
  location: 'Long Beach, California',
  /** Straight from the postcard. This is the official mission line. */
  missionStatement:
    'We exist to help students build friendships with Americans and fellow students, learn about American culture, and explore following Jesus.',
  clubNote: 'International Student Fellowship is a recognized CSULB club.',

  /* ---- Real contact channels (from the Fall 2025 postcard) ---- */
  contacts: {
    instagram: {
      label: 'Instagram',
      handle: '@isf.beach',
      href: 'https://www.instagram.com/isf.beach/',
    },
    facebook: {
      label: 'Facebook group',
      handle: 'International Student Fellowship at CSULB',
      // TODO: replace with the direct group URL (facebook.com/groups/XXXX).
      // Until then this opens a Facebook search for the group by name.
      href: 'https://www.facebook.com/search/groups/?q=International%20Student%20Fellowship%20at%20CSULB',
    },
    whatsapp: {
      label: 'WhatsApp group',
      handle: 'DM 562-606-6160 for the link',
      href: 'https://wa.me/15626066160',
    },
    email: {
      label: 'Email',
      handle: 'isfbeach@gmail.com',
      href: 'mailto:isfbeach@gmail.com',
    },
    phones: [
      { name: 'Arthur', display: '562-606-6160', tel: 'tel:+15626066160', sms: 'sms:+15626066160' },
      { name: 'Savannah', display: '562-526-2056', tel: 'tel:+15625262056', sms: 'sms:+15625262056' },
    ],
  },

  /** Footer/social row. */
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/isf.beach/', icon: 'instagram' },
    {
      label: 'Facebook group',
      href: 'https://www.facebook.com/search/groups/?q=International%20Student%20Fellowship%20at%20CSULB',
      icon: 'facebook',
    },
    { label: 'WhatsApp', href: 'https://wa.me/15626066160', icon: 'whatsapp' },
  ],
}

/* ----------------------------- NAV ------------------------------- */
export const nav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Events', to: '/events' },
  { label: 'Connect', to: '/connection' },
]

/* --------------------------- WORLD MAP --------------------------- */
/** Where every travel arc on the map lands. */
export const LONG_BEACH = { name: 'Long Beach, CA', lat: 33.77, lon: -118.19 }

export interface Origin {
  name: string
  lat: number
  lon: number
  /** Bigger pin, a label on the map, and a brighter arc. */
  emphasis?: boolean
  /** Nudge the map label so neighbours don't collide. Only needed in
   *  crowded corners like Western Europe and East Asia. */
  labelDx?: number
  labelDy?: number
}

/* Add a country by dropping its latitude and longitude in here. The map
   places the pin and draws the arc automatically, no component changes
   needed. Rough country-centre coordinates are fine. */
export const ORIGINS: Origin[] = [
  // ---- Asia ----
  { name: 'China', lat: 35.0, lon: 105.0, emphasis: true, labelDy: -6 },
  { name: 'India', lat: 22.0, lon: 79.0, emphasis: true, labelDx: -14, labelDy: 16 },
  { name: 'Japan', lat: 36.5, lon: 138.0, emphasis: true, labelDx: 16, labelDy: 20 },
  { name: 'South Korea', lat: 36.5, lon: 127.8, emphasis: true, labelDx: -6, labelDy: -14 },
  { name: 'Vietnam', lat: 15.5, lon: 107.5, emphasis: true, labelDx: -16, labelDy: 20 },
  { name: 'Taiwan', lat: 23.7, lon: 121.0 },
  { name: 'Indonesia', lat: -2.5, lon: 118.0 },
  { name: 'Thailand', lat: 15.0, lon: 101.0 },
  { name: 'Philippines', lat: 12.5, lon: 122.0 },
  { name: 'Singapore', lat: 1.4, lon: 103.8 },
  { name: 'Malaysia', lat: 4.2, lon: 102.0 },
  { name: 'Nepal', lat: 28.3, lon: 84.1 },
  { name: 'Bangladesh', lat: 23.7, lon: 90.3 },
  { name: 'Pakistan', lat: 30.0, lon: 70.0 },
  { name: 'Sri Lanka', lat: 7.8, lon: 80.7 },
  { name: 'Mongolia', lat: 46.8, lon: 103.8 },
  { name: 'Kazakhstan', lat: 48.0, lon: 67.0 },
  { name: 'Uzbekistan', lat: 41.4, lon: 64.5 },
  { name: 'Iran', lat: 32.4, lon: 53.7 },
  { name: 'Saudi Arabia', lat: 24.0, lon: 45.0 },
  { name: 'UAE', lat: 24.0, lon: 54.0 },
  { name: 'Turkey', lat: 39.0, lon: 35.2 },
  // ---- Europe ----
  { name: 'United Kingdom', lat: 54.0, lon: -2.5, emphasis: true, labelDx: -26, labelDy: -14 },
  { name: 'Germany', lat: 51.2, lon: 10.4, emphasis: true, labelDx: 30, labelDy: -6 },
  { name: 'France', lat: 46.6, lon: 2.4, emphasis: true, labelDx: -26, labelDy: 6 },
  { name: 'Spain', lat: 40.3, lon: -3.7, emphasis: true, labelDx: -18, labelDy: 20 },
  { name: 'Italy', lat: 42.8, lon: 12.6, emphasis: true, labelDx: 20, labelDy: 22 },
  { name: 'Netherlands', lat: 52.2, lon: 5.5 },
  { name: 'Sweden', lat: 62.0, lon: 15.0 },
  { name: 'Norway', lat: 61.0, lon: 8.5 },
  { name: 'Denmark', lat: 56.0, lon: 9.5 },
  { name: 'Poland', lat: 52.0, lon: 19.4 },
  { name: 'Czechia', lat: 49.8, lon: 15.5 },
  { name: 'Ukraine', lat: 48.9, lon: 31.3 },
  { name: 'Russia', lat: 57.0, lon: 55.0 },
  { name: 'Greece', lat: 39.0, lon: 22.0 },
  { name: 'Portugal', lat: 39.6, lon: -8.0 },
  { name: 'Switzerland', lat: 46.8, lon: 8.2 },
  { name: 'Austria', lat: 47.6, lon: 14.1 },
  { name: 'Ireland', lat: 53.3, lon: -8.0 },
  { name: 'Romania', lat: 45.9, lon: 25.0 },
  { name: 'Hungary', lat: 47.1, lon: 19.4 },
  // ---- Africa ----
  { name: 'Nigeria', lat: 9.1, lon: 8.7 },
  { name: 'Kenya', lat: 0.2, lon: 37.9 },
  { name: 'Egypt', lat: 26.8, lon: 30.8 },
  { name: 'Ghana', lat: 7.9, lon: -1.0 },
  { name: 'Ethiopia', lat: 9.1, lon: 40.5 },
  { name: 'South Africa', lat: -29.0, lon: 24.0 },
  { name: 'Morocco', lat: 31.8, lon: -7.1 },
  // ---- Americas ----
  { name: 'Mexico', lat: 23.6, lon: -102.5 },
  { name: 'Brazil', lat: -10.0, lon: -52.0 },
  { name: 'Colombia', lat: 4.6, lon: -74.3 },
  { name: 'Peru', lat: -9.2, lon: -75.0 },
  { name: 'Chile', lat: -33.0, lon: -71.0 },
  { name: 'Argentina', lat: -34.0, lon: -64.0 },
  { name: 'Canada', lat: 56.0, lon: -106.0 },
  // ---- Oceania ----
  { name: 'Australia', lat: -25.0, lon: 133.0 },
  { name: 'New Zealand', lat: -41.0, lon: 174.0 },
]

export const impactMap = {
  eyebrow: 'Where everyone comes from',
  title: 'Long flights, same destination',
  description:
    'Every semester students fly into Long Beach from all over the world, most of all from Asia and Europe. Follow the lines to see the trip they made to get here.',
  origins: ORIGINS,
}

/* ----------------------------- HOME ------------------------------ */
export const home = {
  hero: {
    eyebrow: 'A recognized CSULB club · Everyone welcome',
    title: 'Free Food, Fun Hangouts, and Friends Who Stick Around',
    subtitle:
      "We're Americans at Cal State Long Beach who help international students settle into life in the US. Come eat with us, come to a beach day, ask us anything. Dinners and hangouts are free, and everyone's welcome.",
    primaryCta: { label: 'Come to an event', to: '/events#upcoming' },
    secondaryCta: { label: 'Say hello', to: '/connection' },
    floatingTags: ['Free dinners', 'Beach & surf', 'Many nations', 'Real friendship'],
    stats: [
      { value: 'Weekly', label: 'Dinners & hangouts' },
      { value: 'Free', label: 'Every dinner' },
      { value: 'CSULB', label: 'Recognized club' },
    ],
  },
  whoWeAre: {
    eyebrow: 'Who we are',
    title: 'A warm welcome, far from home',
    body: [
      'Moving to a new country is exciting. It can also get lonely fast, especially the first few months. ISF exists so that no international student at Cal State Long Beach has to figure it all out on their own.',
      "We're American students, alumni and local families. We cook dinner, drive people to the beach, answer the questions nobody thinks to explain, and stick around long enough to become actual friends.",
    ],
    points: [
      {
        title: 'You belong here',
        text: "Students from every country, language and background are welcome. You don't have to be anything in particular.",
      },
      {
        title: 'Real friendships',
        text: 'No sign-up sheet and no attendance list. Just people who are glad when you show up.',
      },
      {
        title: 'Food and plans, every week',
        text: 'Home-cooked dinners, beach mornings, hikes, game nights and road trips. Vegetarian options at every meal, and a ride if you need one.',
      },
      {
        title: 'Where this comes from',
        text: "Jesus taught us to love our neighbors as ourselves, so that's the love we share with international students. If you have questions about faith, we'd love to have that conversation.",
      },
    ],
  },
  weeklyRhythm: {
    eyebrow: 'What we actually do',
    title: 'What a normal week looks like',
    description:
      "There's an easy way to hang out every week. A home-cooked meal with vegetarian options always there, conversations, games, and outings to local sightseeing spots. We offer car rides from CSULB and from Beverly Plaza.",
    items: [
      {
        title: 'Home dinners',
        text: "Free home-cooked meals at volunteer families' houses. Real home cooking, not cafeteria food.",
        icon: 'home',
      },
      {
        title: 'Games & snacks on campus',
        text: "Drop by between classes for free snacks and games. No need to tell us you're coming.",
        icon: 'game',
      },
      {
        title: 'Culture & conversation',
        text: "Talk Time dinners where we explain American holidays, decode slang, and answer whatever you've been wondering about.",
        icon: 'globe',
      },
      {
        title: 'Beach & outdoors',
        text: 'Surf and body board lessons, pool parties, bonfires, hikes, camping and road trips around Southern California.',
        icon: 'wave',
      },
    ],
  },
  missionPreview: {
    eyebrow: 'Our heart',
    title: 'Friendship first, always',
    body:
      "We're a group of friends who've been changed by the love of Christ, and we get to share it with the world without leaving Long Beach. That looks like dinners, conversations and fun activities. It looks like learning how to pronounce your name properly and asking about the food you grew up on. Everything good about this club started with the welcome we were given, and passing it on is the whole point.",
    cta: { label: 'See what we get up to', to: '/events' },
  },
  studentInvite: {
    eyebrow: 'For international students',
    title: 'New here? Just come.',
    body: "Whether you landed last week or last year, there's a seat for you. Nothing to pay, nothing to sign, nobody keeping track of who shows up.",
    bullets: [
      'Make friends with Americans and with students from everywhere else',
      'Eat free home-cooked meals, with vegetarian options every time',
      'Get help with school, paperwork, buses, phone plans, all of it',
      "Need a ride? Text us and we'll come get you",
    ],
    cta: { label: 'Get in touch', to: '/connection' },
  },
  finalCta: {
    title: "There's always room for one more",
    description:
      "Come eat with us, make a friend, and find out what it feels like to be expected somewhere. We'd love to meet you.",
    primaryCta: { label: 'See upcoming events', to: '/events#upcoming' },
    secondaryCta: { label: 'Message us', to: '/connection' },
  },
}

/* ----------------------------- ABOUT ----------------------------- */
export const about = {
  hero: {
    eyebrow: 'About ISF',
    title: 'A home away from home at Cal State Long Beach',
    subtitle:
      'A recognized CSULB club where Americans and international students eat together, hang out and become friends.',
  },
  intro: [
    'ISF started with a simple idea. Every international student who arrives at Cal State Long Beach should be met by somebody, not by an empty room.',
    "So we cook. We drive. We show up. We're American students, alumni and local families who open our homes and our weekends to students from all over the world, and we stay in touch long after the semester ends.",
  ],
  whyStudentsMatter: {
    title: 'Why international students matter to us',
    body: [
      'Thousands of students cross the world every year to study in the United States. They arrive full of hope and then run straight into culture shock, language barriers, homesickness, and the job of building a whole life from nothing, thousands of miles from family.',
      'Doing that takes real nerve. The students we meet are some of the bravest, most capable people we know, and getting to welcome them is easily the best part of our week.',
    ],
  },
  approach: {
    title: 'How we do things',
    body: [
      "Friendship comes first. We show up, we cook, we drive, we listen, because that's what friends do and because it's the part we enjoy most.",
      "We're followers of Jesus, and we have been blessed by Him and want to share His love with others. The love of Christ is why this club exists and why the table keeps getting longer. Some students want to talk about that and read the Bible with us, and those are some of our favorite evenings. Whatever brings you here, you're welcome at our table.",
    ],
    /* Titles read as a single sentence across the four cards:
       "We show up, we help out, we trade cultures, we share what we love."
       Keep the "We ..." shape if you ever add or reword one, or the row
       stops scanning as one thought. */
    steps: [
      {
        title: 'We show up',
        text: "We're there week after week, we learn your name, and we remember what you said last time.",
      },
      {
        title: 'We help out',
        text: 'Rides, meals, errands, paperwork, and the everyday puzzles of student life in a new country.',
      },
      {
        title: 'We trade cultures',
        text: "We'll explain American holidays and slang. Honestly, we'd rather hear about yours.",
      },
      {
        title: 'We share what we love',
        text: "Faith is part of who we are. Ask us anything about it, any time, and we'll be glad you did.",
      },
    ],
  },
  /* The pull quote beside "Why we cook so much". It carries the idea of
     Revelation 3:20 (an open door, a shared meal, both ways) WITHOUT
     quoting or citing it. A student who knows the verse will hear it. A
     student who doesn't just reads a warm invitation. That is the whole
     tone of this site in one sentence: honest about where it comes from,
     never preachy about it.

     Note the direction: WE open the door, they don't have to knock. ISF
     hosts, so the sentence should match what actually happens. An earlier
     version had us knocking on the student's door, which is a different
     and slightly pushier picture. */
  pullQuote: {
    text: 'Our door is open and the table is set. Dine with us, and we with you.',
    attribution: 'The heart of ISF',
  },
  hospitality: {
    title: 'Why we cook so much',
    body: [
      "A meal buys you a couple of hours with somebody. That's really all it is. Around our tables students aren't guests to impress, they're friends to enjoy. We treat them like relatives visiting from far-away countries.",
      'A shared dinner, a long conversation, a holiday you would otherwise have spent alone in a dorm room. Those are the things people remember years later. You were expected. Somebody saved you a seat.',
    ],
  },
  csulb: {
    title: 'Part of CSULB student life',
    body: [
      'ISF is a recognized club at California State University, Long Beach, and we meet students where they already are. On campus, near campus, and around the city.',
      "We come alongside the international student experience with friendship and practical help. It's meant to complement what the university already offers, not compete with it.",
    ],
  },
  pledge: {
    title: 'Why we keep doing this',
    body: [
      "Somebody once set a place at the table for us, and it changed the shape of our lives. Doing the same for students who've just landed in a country that isn't theirs yet is why we keep showing up.",
      'Come hungry. Bring a friend. Tell us if you need a ride.',
    ],
    line: 'Everyone welcome. Dinners are on us.',
  },
}

/* --------------------------- CONNECTION -------------------------- */
export const connection = {
  hero: {
    eyebrow: 'Get in touch',
    title: 'Come say hello',
    subtitle:
      'The fastest way to reach us is to call or text. Ask us anything. Where the next dinner is, whether to bring something, or if we can pick you up.',
  },
  intro: [
    "You don't need an invitation and you don't need to know anybody. Message one of us and we'll tell you exactly where to go and what to expect.",
  ],
  /** Big, obvious contact cards. Mirrors the postcard. */
  channels: [
    {
      title: 'Call, text or email',
      text: 'The quickest way to reach a real person. Ask about an event, or tell us you need a ride.',
      items: [
        { label: 'Arthur', value: '562-606-6160', href: 'sms:+15626066160' },
        { label: 'Savannah', value: '562-526-2056', href: 'sms:+15625262056' },
        { label: 'Email', value: 'isfbeach@gmail.com', href: 'mailto:isfbeach@gmail.com' },
      ],
      icon: 'phone',
    },
    {
      title: 'Join the WhatsApp group',
      text: 'Where we post plans, rides and reminders. DM 562-606-6160 for the invite link.',
      items: [{ label: 'WhatsApp', value: 'Message 562-606-6160', href: 'https://wa.me/15626066160' }],
      icon: 'whatsapp',
    },
    {
      title: 'Follow us online',
      text: 'Photos from recent events and whatever is coming up next.',
      items: [
        { label: 'Instagram', value: '@isf.beach', href: 'https://www.instagram.com/isf.beach/' },
        {
          label: 'Facebook group',
          value: 'International Student Fellowship at CSULB',
          href: 'https://www.facebook.com/search/groups/?q=International%20Student%20Fellowship%20at%20CSULB',
        },
      ],
      icon: 'social',
    },
  ],
  paths: [
    {
      audience: 'For international students',
      title: 'Come make some friends',
      text: "New to CSULB, or just looking for people to hang out with? Message us and we'll get you to your first dinner.",
      cta: { label: 'Message us on WhatsApp', href: 'https://wa.me/15626066160' },
    },
  ],
  rides: {
    title: 'Need a ride? Just ask.',
    body: 'Text us if you need a ride to an event. Pickup is from the International House Dorm steps in parking lot #1, or the Beverly Plaza Shuttle Stop parking lot, 30 minutes before the event starts.',
  },
  interests: [
    {
      title: 'Coming to a dinner?',
      text: "Let us know and we'll save you a seat. Vegetarian options are always available, just tell us.",
    },
    {
      title: 'Interested in an event?',
      text: "Pool parties, surf lessons, beach days, camping, culture nights. Tell us what sounds fun and we'll keep you posted.",
    },
  ],
}

/* ------------------- STUDENT QUESTIONNAIRE ----------------------- */
/*  The web version of the printed International Student Questionnaire.
 *
 *  Submissions land in the "Fall 2026" Google Sheet by way of a Google
 *  Apps Script web app. The script lives in `google-apps-script/Code.gs`
 *  in this repo and its setup steps are in the comment at the top of
 *  that file.
 *
 *  >>> PASTE THE DEPLOYED WEB APP URL INTO `endpoint` BELOW. <<<
 *  Until it's filled in, the form shows a clear "not connected" notice
 *  and refuses to submit, rather than swallowing a student's details.
 *
 *  Each `name` used by the form must match a key in the script's HEADERS
 *  table. Change one, change the other.
 */
export const questionnaire = {
  // Live endpoint: the Apps Script web app bound to the "Fall 2026" sheet.
  // If you ever redeploy with a NEW deployment (rather than a new version of
  // the existing one), the URL changes and must be updated here.
  endpoint:
    'https://script.google.com/macros/s/AKfycbzo9vkMw_NHzbWSk5YkjllZBDPO_cx0q1bhbJUbovlj5sK9YKC5qOrlrDeqSeFN1Mm9Ew/exec',

  title: 'International Student Questionnaire',
  intro:
    "Fill this in and we'll know who you are before you even turn up. It takes about two minutes, and it means we can invite you to the things you'd actually enjoy.",
  privacy:
    'We keep this to ourselves. Your details are only used to invite you to ISF events, never shared or sold, and you can ask us to delete them any time.',
  submitLabel: 'Send it in',

  /* The floating button and the pop-up dialog on the rest of the site.
   *
   * autoOpenSeconds: how long a visitor is on the home page before the
   * dialog opens by itself. It happens at most ONCE per person, ever, and
   * never on a phone or for anyone who has asked for reduced motion.
   * Set it to 0 to switch the automatic opening off and rely on the
   * floating button alone. */
  popup: {
    autoOpenSeconds: 7,
    buttonLabel: 'Fill in the student questionnaire',
    nudge: 'New here? Tell us about yourself',
  },
  dialogueQuestion:
    'I would be open to a conversation (about 30 minutes) to hear what followers of Jesus Christ believe.',
  success: {
    title: "Got it, thank you",
    body: "We'll be in touch soon about what's coming up. If you'd like to say hello sooner, message us on WhatsApp.",
  },
  options: {
    gender: ['Male', 'Female'],
    year: ['Undergraduate', "Master's", 'PhD', 'Other'],
    religions: [
      'Atheism',
      'Buddhism',
      'Catholic',
      'Christianity',
      'Hinduism',
      'Islam',
      'Jainism',
      'Meditation',
      'Sikhism',
      'Taoism',
      'Nothing',
      'Other',
    ],
    interests: [
      { name: 'interestMuseum', label: 'A visit to a space or art museum' },
      { name: 'interestHike', label: 'A day hike' },
      { name: 'interestYosemite', label: 'Yosemite and family homestay weekend' },
      { name: 'interestChurch', label: 'Visiting an American church' },
      { name: 'interestBible', label: 'Bible discussion with students' },
    ],
  },
}

/* ----------------------- GALLERY & EVENTS ------------------------ */
export const gallery = {
  hero: {
    eyebrow: 'Events & photos',
    title: 'What we get up to',
    subtitle:
      'Home dinners, surf mornings, pool parties and bonfires. Here is a look at what ISF is like and what is coming up next. Most of it is free and everyone is welcome.',
  },
  /* Say "since 2010", never "sixteen years". A count of years is a fact
     with an expiry date: right the day it was written, then quietly wrong
     every January while nobody notices. The founding year stays true
     forever and the reader does the arithmetic for free. Same rule for
     "over 200 students" or any other number that grows on its own. */
  intro: [
    'Dinners, beach days, road trips and costumes since 2010, all in one place. Every face here belonged to somebody far from home who decided to come along.',
  ],
  /** Practical notes lifted straight from the postcard. */
  eventNotes: [
    'Vegetarian food options are available at every meal.',
    'Need a ride? Text us. Pickup is from the International House Dorm steps in parking lot G1, or the Beverly Plaza Shuttle Stop parking lot, 30 minutes before the event.',
    "Most events are free, including every dinner and hangout. Road trips, camping and surf lessons cost something, and we'll always tell you the amount before you sign up.",
  ],
  /* Fall 2026, taken straight off the printed postcard (ISF_postcard_Fall_2026 WOW.pdf).
     Replace this whole list each semester from the new postcard and change
     nothing else.

     ---------------------------------------------------------------------
     HOW TO WRITE THE DATES.  Read this before adding an event.
     ---------------------------------------------------------------------
     There is NO "date" field any more. You write two timestamps and the
     website prints the pretty line for you:

         starts: '2026-09-05T17:00'   ->  Saturday, September 5, 2026 · 5 to 9pm
         ends:   '2026-09-05T21:00'

     The shape is  YEAR-MONTH-DAYThour:minute , on a 24-hour clock, so 5pm
     is 17:00 and 8am is 08:00. Always four-digit year, always two digits
     for everything else: '2026-09-05T08:00', not '2026-9-5T8:00'.

     These are LONG BEACH times, exactly as a clock on the wall here would
     read. Do not add a timezone or an offset. The site knows the zone and
     works out daylight saving on its own, which is why an event in
     November stays correct after the clocks change.

     WHY IT WORKS THIS WAY: the site hides an event by itself once the day
     is over, and to do that it has to be able to compare the date to now.
     It cannot do that with 'Saturday, September 5, 2026 · 5 to 9pm',
     because that is a sentence, not a date. Writing both a sentence and a
     timestamp would mean two things to keep in step, and one day they
     would disagree. So you write the timestamps and the sentence is
     generated. One thing to type, one thing to get wrong.

     A TRIP ACROSS SEVERAL DAYS: just let ends fall on a later day and it
     prints as a span instead, e.g.
         starts: '2026-10-02T09:00'
         ends:   '2026-10-04T16:00'
     ->  Friday, October 2 to Sunday, October 4, 2026

     WHEN IT DISAPPEARS: at midnight at the end of the day in `ends`.
     A Friday dinner is still on the page all Friday evening and is gone
     on Saturday morning. Nothing to remember, nothing to delete.
     --------------------------------------------------------------------- */
  upcoming: [
    {
      title: 'Welcome Pool Party',
      starts: '2026-09-05T17:00',
      ends: '2026-09-05T21:00',
      location: '4455 Stanbridge Avenue, Long Beach 90808',
      text: 'Splash into the new semester with the biggest pool hangout of the year. Swimming, food and everybody in one place. Free, vegetarian options provided, and parking is free. Need a ride? Ask for one when you register, first come first served.',
      tag: 'Hangout',
    },
    {
      title: 'Surf & Body Board Lessons',
      starts: '2026-09-19T08:00',
      ends: '2026-09-19T11:00',
      // Street address taken from the poster, so a student can put it
      // straight into their phone instead of searching for "the jetty".
      location: 'Seal Beach Jetty, 95 1st St, Seal Beach',
      text: 'Learn to surf, body board, swim, or just come and chill on the beach. Boards and instruction provided. ($5 per person)',
      tag: 'Outdoors',
      /* The Instagram poster. Both files live in /public/events/ as
         surf-body-board-day.webp and .jpg. ratio is width / height. */
      poster: {
        slug: 'surf-body-board-day',
        alt: 'ISF presents Surf and Body Board Day. Saturday September 19, 8 to 11am, 95 1st Street, Seal Beach. Learn to surf, body board, swim, or just come chill on the beach.',
        ratio: 0.8303,
      },
    },
    {
      title: 'Rock Climbing',
      starts: '2026-09-23T16:00',
      ends: '2026-09-23T18:00',
      location: 'CSULB Recreation Center',
      text: "Anyone can climb, but can you hang around? Learn the ropes of a challenging sport, even if you've never tried it before. It's fun, challenging and safe. Text Art on 562-606-6160 if you can't find us.",
      tag: 'Outdoors',
    },
    {
      title: 'Soularium Conversation Dinner',
      starts: '2026-09-25T18:00',
      ends: '2026-09-25T21:00',
      location: "Marty's House, 4455 Stanbridge, Long Beach 90808",
      text: 'Dinner, then a set of photo cards. You pick the images that say something true about your life, and the conversation goes from there. People usually end up on the big questions.',
      tag: 'Dinner',
    },

    /* ---- Rest of Fall 2026. Dates are confirmed, everything else is not.
            Each of these has a bare date and no `ends`, which is how you
            say "the day is set, the time is not announced yet": the card
            prints the date and no clock time. Fill in the times, location
            and description as each one is settled, and the card starts
            showing them with no other change needed. ---- */
    {
      title: 'Less Stress Dinner',
      starts: '2026-10-02',
      text: 'Details to be published soon.',
      tag: 'Dinner',
    },
    {
      title: 'Outdoor Recreation',
      starts: '2026-10-10',
      text: 'Details to be published soon.',
      tag: 'Outdoors',
    },
    {
      title: 'Parables & Dinner',
      starts: '2026-10-16',
      text: 'Details to be published soon.',
      tag: 'Dinner',
    },
    {
      title: 'International Food Dinner',
      starts: '2026-10-23',
      text: 'Details to be published soon.',
      tag: 'Dinner',
    },
    {
      title: 'Halloween Party',
      starts: '2026-10-30',
      text: 'Details to be published soon.',
      tag: 'Hangout',
    },
  ],
  cta: {
    title: 'Want to be at the next one?',
    description:
      "Our events are open to everyone and most of them are free. Message us that you're coming and we'll save you a spot, plus a ride if you need one.",
    primaryCta: { label: 'Message us on WhatsApp', href: 'https://wa.me/15626066160' },
    secondaryCta: { label: 'Email us', href: 'mailto:isfbeach@gmail.com' },
  },
}

/* ------------------------ FEATURED EVENT ------------------------- */
/*  The one event with an open registration link. Everything about it,
 *  including WHEN IT DISAPPEARS, lives here.
 *
 *  HOW TO SWAP IN THE NEXT EVENT
 *  -----------------------------
 *   1. Change the fields below (title, date, location, text, href).
 *   2. Set `hideAfter` to the moment it should vanish.
 *   3. Deploy. Nothing else on the site needs touching.
 *
 *  HOW TO TURN IT OFF EARLY
 *  ------------------------
 *   Set `href` to an empty string. The banner and the card both disappear
 *   and every event card falls back to "registration hasn't opened yet".
 *
 *  ABOUT `hideAfter`
 *  -----------------
 *  Just write the local Long Beach wall clock: "YYYY-MM-DDTHH:MM", 24-hour.
 *  9pm is 21:00. Do NOT put a timezone offset on the end.
 *
 *  `timeZone` below does the rest. Because it's a zone NAME rather than a
 *  fixed offset, the browser works out whether that date falls in daylight
 *  saving or not and adjusts on its own. Summer, winter, the weekend the
 *  clocks change: all handled, nothing for you to remember.
 */
/* =====================================================================
 *  THE FEATURED EVENT — the one with registration open.
 *
 *  It appears in the bright banner across the top of EVERY page, home
 *  page included, and its card in the events list turns into a live
 *  "Register on Eventbrite" link instead of a plain card.
 *
 *  TO POINT IT AT A NEW EVENT, EDIT TWO LINES: `href` and `title`.
 *  Nothing else. There is deliberately no end date here any more: the
 *  banner reads the dates off the matching event in gallery.upcoming, so
 *  it disappears exactly when that event does. One date, one place, no
 *  way for the two to disagree.
 * ===================================================================== */
export const featuredEvent = {
  /** Set to '' to switch the whole feature off. */
  href: 'https://www.eventbrite.com/e/surf-body-board-beach-day-tickets-2000812622414?aff=oddtdtcreator',

  /* MUST match an entry in gallery.upcoming exactly, character for
     character. That match is what turns that one card into a live
     registration link, instead of keeping a second copy of the event
     above the list. If it matches nothing, no banner shows at all, so a
     typo fails visibly instead of advertising an event the site does not
     list. */
  title: 'Surf & Body Board Lessons',

  tag: 'New',
  ctaLabel: 'Register on Eventbrite',

  /** The banner across the top of every page. */
  banner: {
    eyebrow: 'New event',
    title: 'Surf & Body Board Beach Day',
    /* The date is generated from the event, so it is never typed here and
       can never go stale. `note` is the only part you write: a few words
       on cost, rides, or anything else worth saying in the banner. */
    note: '$5 per person, rides available',
    cta: 'Save your spot',
  },

  /** Shown when somebody clicks any event that has no link yet. */
  notOpenYet:
    "Registration hasn't opened for this one yet. Text us and we'll let you know the moment it does.",
}

/* ----------------------------- FOOTER ---------------------------- */
export const footer = {
  mission:
    'Helping international students at Cal State Long Beach make friends, settle into American life, and explore following Jesus.',
  contactNote: 'Questions, or want a ride to an event? Call or text us anytime.',
  clubNote: 'A recognized club at California State University, Long Beach.',
}

/* Convenience aggregate (optional import) */
export const content = {
  site,
  nav,
  impactMap,
  home,
  about,
  connection,
  questionnaire,
  gallery,
  footer,
}

export default content
