"use client"

interface WeekData {
  week: number
  topic: string
  activity: string
  description: string
  icon: string
  color: string
  funFact: string
}

const KENDALL_WEEKS: WeekData[] = [
  {
    week: 1,
    topic: "Get to Know Me",
    activity: "First Day of Co-Op: Super Hero Me & Time Capsule",
    description:
      "Welcome to Co-Op! Today we create our Super Hero identities and pack our Time Capsules. We'll also study our Artist of the Month, Frida Kahlo, and paint self-portraits.",
    icon: "🦸‍♀️",
    color: "primary",
    funFact: "Artist Spotlight: Frida Kahlo is famous for her colorful self-portraits. She painted her own reality!",
  },
  {
    week: 2,
    topic: "The Community",
    activity: "City Building & Synergy (Inspired by 'Elemental')",
    description:
      "Explore community dynamics through Project-Based Learning (PBL) with 'Elemental'. Together we'll build a cooperative cardboard city, practicing true synergy, and craft Frida's 'La Casa Azul' (Blue House).",
    icon: "🏢",
    color: "accent",
    funFact: "Synergy Power: Synergy means the whole is greater than the sum of its parts—we achieve more together!",
  },
  {
    week: 3,
    topic: "Entrepreneurship Week",
    activity: "Starting My Business: Logo, Name & Idea",
    description:
      "Time to build! Brainstorm your business ideas, choose a trade name, and design your first logo. Mindful PE today is packed with coordination brain games and high-energy movement.",
    icon: "💼",
    color: "secondary",
    funFact: "Brain Fact: Cross-lateral movements (like brain games) help activate both sides of your brain!",
  },
  {
    week: 4,
    topic: "Geography",
    activity: "Florida Travelers Poster, Everglades & Squeezed OJ",
    description:
      "Journey through Florida and the Everglades! Bring your workbooks and textbooks to design a travel poster. For Practical Life Skills (PLS), we will squeeze fresh Florida orange juice and share Cuban bread.",
    icon: "🐊",
    color: "success",
    funFact: "Everglades Wonder: The Florida Everglades is a slow-moving river of grass, and the only place on Earth where alligators and crocodiles coexist!",
  },
]

const WESTCHESTER_WEEKS: WeekData[] = [
  {
    week: 1,
    topic: "About Me",
    activity: "First Week of Co-Op: Time Capsules & School Sensory Bin Ipsy",
    description:
      "Welcome to Westchester Co-Op! Explore identity through interactive time capsules, school-themed sensory bins, and parachute movement games. Paint a creative self-portrait using natural loose parts.",
    icon: "🎨",
    color: "primary",
    funFact: "Loose Parts Play: Using everyday loose items (buttons, shells, twigs) helps children develop higher-level problem solving and abstract thinking!",
  },
  {
    week: 2,
    topic: "5 Senses",
    activity: "Senses Exploration, Scavenger Hunt & Sensory Jars",
    description:
      "We learn with our whole bodies! Students will participate in a guided multi-sensory exploration, hunt for clues outdoors on a scavenger hunt, and craft custom Sensory Jars to take home.",
    icon: "👁️",
    color: "accent",
    funFact: "Fun Fact: Did you know sensory jars can help calm and soothe the nervous system? They're wonderful practical tools!",
  },
  {
    week: 3,
    topic: "My Body",
    activity: "Trace Me & My Lungs (Music & Movement)",
    description:
      "See how big we are! Children will trace each other's full bodies on butcher paper and build a working diagram model of the lungs to explore respiration. Active music and movement games keep us laughing and exercising.",
    icon: "🫁",
    color: "secondary",
    funFact: "Lung Power: Your left lung is slightly smaller than your right lung to make room for your heart!",
  },
  {
    week: 4,
    topic: "Germs & Nutrition",
    activity: "Germ Experiment & Fruit Sticks PLS",
    description:
      "Discover the power of clean hands with a magical pepper-and-soap germ experiment! For Practical Life Skills (PLS), children wash, slice, and thread colorful fruits of choice onto fruit sticks. Includes Mindful PE.",
    icon: "🦠",
    color: "success",
    funFact: "Fruit Rainbow: Squeezing, washing, and slicing fruits is a great Montessori practical life skill that strengthens fine motor control and independence!",
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
          {isKendall ? "🦸‍♀️" : "🎨"}
        </div>
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
            {isKendall ? "Kendall Co Op Study" : "Westchester Co Op Study"}
          </div>
          <h2 className={`text-2xl font-black ${titleColor}`}>
            {isKendall ? "My Community & Me" : "All About Me & My Body"}
          </h2>
          {isKendall && (
            <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/25 rounded-full px-2.5 py-0.5 text-xs font-black text-primary mt-1.5">
              🎨 Artist of the Month: Frida Kahlo
            </div>
          )}
          <p className="text-sm text-muted-foreground font-semibold mt-1.5">
            {isKendall
              ? "4-week hands-on journey discovering identity, collaborative community synergy, starting a business, and Florida geography!"
              : "4-week multi-sensory adventure exploring self-identity, the 5 senses, skeletal/lung systems, germs, and practical life skills!"}
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
          <span className="text-xs text-muted-foreground font-semibold">Week 2 in progress</span>
        </div>
      </div>

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
                      Week {week.week}
                    </span>
                    {week.week === 2 && (
                      <span className="text-xs font-black px-2.5 py-1 rounded-full bg-foreground text-background">
                        NOW
                      </span>
                    )}
                  </div>
                  <h3 className={`font-black text-base leading-tight ${c.text}`}>{week.topic}</h3>
                  <p className="text-xs font-bold text-muted-foreground mt-0.5">
                    🎨 Activity: {week.activity}
                  </p>
                </div>
              </div>
              <p className="text-sm text-foreground/80 font-semibold leading-relaxed mb-3">
                {week.description}
              </p>
              <div className={`rounded-xl ${c.bg} border ${c.border} p-2.5`}>
                <p className={`text-xs font-bold ${c.text} leading-snug`}>
                  🌟 {week.funFact}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Supplies / Action reminder */}
      <div className="rounded-2xl bg-muted border border-border p-5 space-y-4">
        <div className="flex gap-3 items-center">
          <span className="text-3xl">🎒</span>
          <div>
            <h4 className="font-black text-base text-foreground">
              {isKendall ? "Supplies for the Month" : "Supplies Needed for the Month"}
            </h4>
            <p className="text-xs text-muted-foreground font-bold mt-0.5">
              {isKendall 
                ? "⚠️ Note: Your Co-Op Workbook is needed each week!"
                : "⚠️ Note: Coordinate weekly supplies for Westchester group!"}
            </p>
          </div>
        </div>
        
        {isKendall ? (
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className="bg-card border border-border rounded-xl p-3 space-y-1">
              <span className="font-black text-primary">Week 1 Supplies:</span>
              <p className="text-muted-foreground font-semibold">Scissors, pencil, glue, tray, oil pastels</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 space-y-1">
              <span className="font-black text-accent">Week 2 Supplies:</span>
              <p className="text-muted-foreground font-semibold">Medium to large cardboard box, 2 empty paper towel or toilet paper rolls, wood glue or glue gun</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 space-y-1">
              <span className="font-black text-secondary">Week 3 Supplies:</span>
              <p className="text-muted-foreground font-semibold">Investment Activity Book</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 space-y-1">
              <span className="font-black text-success">Week 4 Supplies:</span>
              <p className="text-muted-foreground font-semibold">Passport America Book, large poster board, hand-held juicer, all-purpose glue or glue gun</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className="bg-card border border-border rounded-xl p-3 space-y-1">
              <span className="font-black text-indigo-500">Week 1 Supplies:</span>
              <p className="text-muted-foreground font-semibold">Supply Box</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 space-y-1">
              <span className="font-black text-accent">Week 2 Supplies:</span>
              <p className="text-muted-foreground font-semibold">Super glue (for parent use only)</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 space-y-1">
              <span className="font-black text-secondary">Week 3 Supplies:</span>
              <p className="text-muted-foreground font-semibold">Supply Box and 8 by 10 piece of cardboard</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 space-y-1">
              <span className="font-black text-success">Week 4 Supplies:</span>
              <p className="text-muted-foreground font-semibold">
                Bring one fruit of choice. 💬 Please communicate in the WhatsApp group chat to ensure no one brings duplicates!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
