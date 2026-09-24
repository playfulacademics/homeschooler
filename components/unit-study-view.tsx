"use client"

interface WeekData {
  week: number
  topic: string
  activity: string
  description: string
  icon: string
  color: string
  funFact: string
  date?: string
  supplies?: string[]
}

const KENDALL_WEEKS: WeekData[] = [
  {
    week: 1,
    date: "October 6th",
    topic: "Perception",
    activity: "Yarn Art (Fiber Art Project)",
    description:
      "Because learning is about more than memorizing facts. It's about teaching children how to think. In October, our students will explore perception through hands-on activities, optical illusions, art, and thought-provoking challenges that encourage them to look beyond what they see at first glance.",
    icon: "👁️",
    color: "primary",
    funFact: "Fun Fact: Victoria's artwork has been featured in the Academy Awards campaign and galleries around the world!",
    supplies: ["8 x 10 inch piece of cardboard", "Pencil"],
  },
  {
    week: 2,
    date: "October 13th",
    topic: "Geography: The California Gold Rush",
    activity: "PE with Coach Jose",
    description:
      "Through this unit, children will explore how geography influences where people live, how natural resources can shape communities, and how opportunity can inspire people to take risks and pursue their dreams.",
    icon: "🗺️",
    color: "accent",
    funFact: "Fun Fact: The Gold Rush transformed California — over 300,000 people rushed west to find their dreams!",
    supplies: ["Binder and US Geography books", "A cleaning brush — a toothbrush, fruit brush, or nail brush"],
  },
  {
    week: 3,
    date: "October 20th",
    topic: "Entrepreneurial Study & Electrical Currents",
    activity: "Art Project: Yarn Turtle",
    description:
      "This week in entrepreneurship, we are learning the cost of how to structure our businesses — what it really takes (in money, time, and materials) to build something of our own. Children connect math, planning, and creativity as they think like real founders. Our STEM exploration this week is all about electricity! Students build and test real circuits — and discover the invisible force that powers their world.",
    icon: "💼",
    color: "secondary",
    funFact: "Art Focus: A hands-on fiber-art project! Children wrap, weave, and wind yarn to create their own turtle friend — building fine motor strength and patience along the way.",
    supplies: ["Money investment book", "Binder (please bring both to co-op)"],
  },
  {
    week: 4,
    date: "October 27th",
    topic: "Quality Enrichment Day — Farm Day!",
    activity: "Gacavi Farm Ranch Day & Picnic",
    description:
      "A full immersion quality enrichment day at the farm/ranch! We'll spend the day enjoying the outdoors and a picnic lunch together under the large gazebo. All supplies will be provided — no co-op supply box needed today. Just boots and lunch!",
    icon: "🌾",
    color: "success",
    funFact: "What to Wear: Old clothes or clothes you don't mind getting dirty — we'll be out on the ranch. Cowboy boots, farm boots, rain boots, or comfy sneakers are all great! (No crocs, sandals, or open-toed shoes)",
    supplies: ["Pack a lunch (we picnic under the gazebo)", "Boots (cowboy, farm, rain, or comfy sneakers) — No crocs, sandals, or open-toed shoes"],
  },
]

const WESTCHESTER_WEEKS: WeekData[] = [
  {
    week: 1,
    date: "October 1st",
    topic: "Introduction to Community Helpers",
    activity: "Role-Play, Movement Games & Mini Challenges",
    description:
      "During our Community Helpers experience, children will learn by doing! They'll participate in engaging hands-on activities, pretend-play scenarios, movement games, and mini challenges that allow them to step into the roles of different community helpers. From rescuing and building to delivering, caring for, sorting, and solving problems, children will discover what these helpers do and why their jobs are important to our community.",
    icon: "🧑‍🤝‍🧑",
    color: "primary",
    funFact: "Learning by Doing: Pretend-play builds empathy, problem-solving, and real-world awareness — all while having a blast!",
    supplies: ["1 water spray bottle"],
  },
  {
    week: 2,
    date: "October 8th",
    topic: "Fire Day",
    activity: "PE at Tropical Park & Fire Station Tour",
    description:
      "Meet at Tropical Park! We'll start the day with PE at the park from 11:00 AM, then leave together for the fire station tour at 11:45 AM. Kids will meet real firefighter heroes, learn fire safety, and explore a real fire truck up close!",
    icon: "👨‍🚒",
    color: "accent",
    funFact: "Field Trip Alert: Meet at Tropical Park (PE at 11am) — we leave for the fire station promptly at 11:45 AM!",
    supplies: ["Comfortable sneakers for PE", "Water bottle and sunscreen"],
  },
  {
    week: 3,
    date: "October 15th",
    topic: "Doctors Day",
    activity: "Patient Care Pretend-Play",
    description:
      "Today, children will step into the role of a doctor and learn through hands-on pretend play and problem-solving. Each child will receive a patient — a Barbie, doll, or stuffed animal — along with a patient chart. They'll observe their patient, figure out what might be wrong, and decide how they can help care for them. This activity encourages children to practice observation, communication, critical thinking, empathy, decision-making, and sequencing while developing an understanding of how doctors care for and help others.",
    icon: "🩺",
    color: "secondary",
    funFact: "Skill Building: Observation, communication, critical thinking, empathy, decision-making, and sequencing — all through caring play!",
    supplies: ["A pencil or marker", "A clipboard"],
  },
  {
    week: 4,
    date: "October 29th",
    topic: "Farmers Market Day",
    activity: "Create Your Own Market Stand",
    description:
      "Children will create their own farmers market stand! You can partner with one other friend or do it alone. You must MAKE it yourself — it can be a baked good (no peanuts), a craft (like bracelets or necklaces), a made homegood item (candles, body butter, soap), or something special: an art piece, fresh lemonade, fruit cups... the possibilities are endless!",
    icon: "🧺",
    color: "success",
    funFact: "Entrepreneur Day: Partner up or fly solo — make your product, set your stand, and sell to your co-op community!",
    supplies: ["Your handmade product(s) to sell", "Any stand/table decorations you'd like"],
  },
]

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string; badgeText: string }> = {
  primary: {
    bg: "bg-primary/8",
    border: "border-primary/30",
    text: "text-primary",
    badge: "bg-primary",
    badgeText: "text-white",
  },
  accent: {
    bg: "bg-accent/8",
    border: "border-accent/30",
    text: "text-accent",
    badge: "bg-accent",
    badgeText: "text-white",
  },
  secondary: {
    bg: "bg-secondary/8",
    border: "border-secondary/30",
    text: "text-secondary",
    badge: "bg-secondary",
    badgeText: "text-white",
  },
  success: {
    bg: "bg-success/8",
    border: "border-success/30",
    text: "text-success",
    badge: "bg-success",
    badgeText: "text-white",
  },
  indigo: {
    bg: "bg-indigo-500/8",
    border: "border-indigo-500/30",
    text: "text-indigo-500",
    badge: "bg-indigo-500",
    badgeText: "text-white",
  },
}

const KENDALL_FIELD_TRIPS = [
  { icon: "🚒", name: "Fire Station", date: "October 8th @ 12:00 PM" },
  { icon: "🌱", name: "Sprouts Market", date: "October 14th @ 12:00 PM" },
  { icon: "🏡", name: "Grounded Hacienda", date: "October 16th @ 11:30 AM" },
  { icon: "🎾", name: "PE Enrichment: Tennis", date: "Date TBA" },
]

const KENDALL_MONTH_AT_A_GLANCE = [
  { week: "Week 1", focus: "Perception & Art" },
  { week: "Week 2", focus: "The California Gold Rush & PE" },
  { week: "Week 3", focus: "Entrepreneurial Studies, Electrical Currents & Art" },
  { week: "Week 4", focus: "Farm Day" },
]

const WESTCHESTER_FIELD_TRIPS = [
  { icon: "🚒", name: "Fire Station", date: "Oct 8 at 12:00 PM — 3911 SW 82nd Ave, Miami, FL 33155" },
  { icon: "🌱", name: "Sprout", date: "Oct 14 at 12:00 PM — in Kendall" },
  { icon: "🏡", name: "Grounded Farm", date: "Oct 16 at 11:30 AM — $25 per child (parents & siblings free)" },
]

const WESTCHESTER_SPECIAL_EVENTS = [
  { icon: "🐴", name: "Equestrian Day at Gacavi", date: "Oct 27 — $25 per child (Step Up funds may be used with FLEX)" },
]

interface UnitStudyViewProps {
  location?: "kendall" | "westchester"
}

export function UnitStudyView({ location = "kendall" }: UnitStudyViewProps) {
  const isKendall = location === "kendall"
  const weeks = isKendall ? KENDALL_WEEKS : WESTCHESTER_WEEKS

  const headerGradient = isKendall
    ? "from-primary/10 via-accent/10 to-secondary/10"
    : "from-indigo-500/10 via-accent/10 to-success/10"

  const titleColor = isKendall ? "text-primary" : "text-indigo-500"

  return (
    <div className="space-y-6">
      {/* Unit header */}
      <div className={`rounded-2xl bg-gradient-to-r ${headerGradient} border border-border p-5 flex flex-col sm:flex-row sm:items-center gap-4`}>
        <div className="text-5xl" role="img" aria-label="unit-icon">
          {isKendall ? "🍂" : "🚀"}
        </div>
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
            {isKendall ? "Kendall Leadership Co Op" : "Westchester Co Op"}
          </div>
          <h2 className={`text-2xl font-black ${titleColor}`}>
            {isKendall ? "October — Welcome to Fall!" : "October — Community Helpers"}
          </h2>
          {isKendall && (
            <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/25 rounded-full px-2.5 py-0.5 text-xs font-black text-primary mt-1.5">
              🎨 Artist of the Month: Victoria Villasana
            </div>
          )}
          <p className="text-sm text-muted-foreground font-semibold mt-1.5">
            {isKendall
              ? "4-week hands-on October journey exploring perception, California geography, entrepreneurship & electrical currents — ending with a Farm Day enrichment!"
              : "4-week October journey stepping into the roles of our community helpers — firefighters, doctors, and young entrepreneurs at our very own Farmers Market!"}
          </p>
        </div>
        <div className="sm:ml-auto flex flex-col items-start sm:items-end gap-1">
          <span className="text-xs font-black uppercase tracking-wide text-muted-foreground">Progress</span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((w) => (
              <div
                key={w}
                className={`w-8 h-3 rounded-full ${
                  w === 1
                    ? isKendall ? "bg-primary" : "bg-indigo-500"
                    : w === 2
                    ? "bg-accent"
                    : "bg-border"
                }`}
                title={`Week ${w}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-semibold">Week 1 in progress</span>
        </div>
      </div>

      {/* Field Trips quick strip (Kendall only) */}
      {isKendall && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {KENDALL_FIELD_TRIPS.map((trip) => (
            <div key={trip.name} className="rounded-2xl border-2 border-accent/30 bg-accent/5 p-3 flex items-center gap-2.5">
              <span className="text-2xl">{trip.icon}</span>
              <div className="min-w-0">
                <div className="text-xs font-black text-accent leading-tight">{trip.name}</div>
                <div className="text-[10px] font-bold text-muted-foreground">{trip.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Week cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {weeks.map((week) => {
          // Adjust color mapping dynamically for Westchester to give it an elegant custom theme
          let colorKey = week.color
          if (!isKendall && week.color === "primary") {
            colorKey = "indigo"
          }
          const c = COLOR_MAP[colorKey] || COLOR_MAP.primary

          return (
            <div
              key={week.week}
              className={`rounded-2xl border-2 ${c.border} ${c.bg} p-5 transition-all hover:shadow-lg hover:-translate-y-0.5`}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl" role="img" aria-label={week.topic}>
                  {week.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className={`text-xs font-black px-2.5 py-1 rounded-full ${c.badge} ${c.badgeText}`}
                    >
                      Week {week.week}{week.date ? ` — ${week.date}` : ""}
                    </span>
                    {week.week === 1 && (
                      <span className="text-xs font-black px-2.5 py-1 rounded-full bg-foreground text-background">
                        NOW
                      </span>
                    )}
                  </div>
                  <h3 className={`font-black text-base leading-tight ${c.text}`}>{week.topic}</h3>
                  <p className="text-xs font-bold text-muted-foreground mt-0.5">
                    Additional Activity: {week.activity}
                  </p>
                </div>
              </div>
              <p className="text-sm text-foreground/80 font-semibold leading-relaxed mb-3">
                {week.description}
              </p>
              <div className={`rounded-xl ${c.bg} border ${c.border} p-2.5 mb-3`}>
                <p className={`text-xs font-bold ${c.text} leading-snug`}>
                  🌟 {week.funFact}
                </p>
              </div>
              {week.supplies && (
                <div className="rounded-xl bg-muted border border-border p-2.5">
                  <p className="text-[10px] font-black text-foreground uppercase tracking-wider mb-1">
                    🎒 Supplies Needed
                  </p>
                  {week.supplies.map((s) => (
                    <p key={s} className="text-xs text-muted-foreground font-semibold flex gap-1.5">
                      <span className="text-foreground">•</span> {s}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Field Trips & Special Events (Westchester only) */}
      {!isKendall && (
        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 p-5 space-y-3">
            <div className="flex gap-3 items-center">
              <span className="text-3xl">🚌</span>
              <h4 className="font-black text-base text-accent">Field Trips</h4>
            </div>
            <div className="space-y-2">
              {WESTCHESTER_FIELD_TRIPS.map((trip) => (
                <div key={trip.name} className="bg-card border border-border rounded-xl p-3 flex items-start gap-2.5">
                  <span className="text-xl">{trip.icon}</span>
                  <div>
                    <div className="text-xs font-black text-foreground">{trip.name}</div>
                    <div className="text-xs text-muted-foreground font-semibold">{trip.date}</div>
                  </div>
                </div>
              ))}
              <p className="text-[11px] text-muted-foreground font-bold pt-1">
                💳 Step Up funds may be used with FLEX.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-secondary/30 bg-secondary/5 p-5 space-y-3">
            <div className="flex gap-3 items-center">
              <span className="text-3xl">🌟</span>
              <h4 className="font-black text-base text-secondary">Special Events</h4>
            </div>
            {WESTCHESTER_SPECIAL_EVENTS.map((ev) => (
              <div key={ev.name} className="bg-card border border-border rounded-xl p-3 flex items-start gap-2.5">
                <span className="text-xl">{ev.icon}</span>
                <div>
                  <div className="text-xs font-black text-foreground">{ev.name}</div>
                  <div className="text-xs text-muted-foreground font-semibold">{ev.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Box: Month at a glance (Kendall) / none needed (Westchester) */}
      {isKendall && (
        <div className="rounded-2xl border-2 border-secondary/30 bg-secondary/5 p-5 space-y-4">
          <div className="flex gap-3 items-center">
            <span className="text-3xl">🗓️</span>
            <div>
              <h4 className="font-black text-base text-foreground">Month at a Glance</h4>
              <p className="text-xs text-muted-foreground font-bold mt-0.5">
                ⚠️ Field trip funds for Grounded Hacienda are due October 1st. Pay via Cash, Zelle, Apple Pay, or through Step Up using our FLEX option!
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            {KENDALL_MONTH_AT_A_GLANCE.map((m) => (
              <div key={m.week} className="bg-card border border-border rounded-xl p-3 space-y-1">
                <span className="font-black text-secondary">{m.week}:</span>
                <p className="text-muted-foreground font-semibold">{m.focus}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
