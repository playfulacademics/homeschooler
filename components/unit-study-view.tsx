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
    topic: "Branding & Brainstorming",
    activity: "Create a Logo & Tagline",
    description:
      "Learn how real businesses catch our eye! Students brainstorm their own unique product ideas, design hand-drawn logos, and write catchy taglines.",
    icon: "🎨",
    color: "primary",
    funFact: "Fun Fact: The famous Nike 'Swoosh' logo was designed by a student for only $35 in 1971!",
  },
  {
    week: 2,
    topic: "Costs & Margins",
    activity: "Setting up a Profit Table",
    description:
      "Real-world math in action! Using Singapore Math concepts, students calculate the cost of raw materials (supplies) versus selling prices to find their profit margins.",
    icon: "📊",
    color: "accent",
    funFact: "Fun Fact: Profit is the money left over after paying for supplies. Business math makes finance exciting!",
  },
  {
    week: 3,
    topic: "Marketing & Commercial Pitches",
    activity: "Record a 30-Second Elevator Pitch",
    description:
      "Stand tall and share your passion! Students practice public speaking by drafting and recording a 30-second commercial to pitch their brand to families.",
    icon: "🎙️",
    color: "secondary",
    funFact: "Fun Fact: Good marketing is simply telling a compelling, honest story about how your product helps someone else!",
  },
  {
    week: 4,
    topic: "The Live Co-Op Marketplace",
    activity: "Selling Hand-Crafted Products",
    description:
      "Real-world trading day! Students set up mini-storefront booths to showcase and trade their actual creations using co-op play tokens with families.",
    icon: "🎪",
    color: "success",
    funFact: "Fun Fact: Many of today's most successful entrepreneurs started their very first businesses before they turned 10!",
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
          {isKendall ? "🦸‍♀️" : "💼"}
        </div>
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
            {isKendall ? "Kendall Campus Study" : "Westchester Campus Study"}
          </div>
          <h2 className={`text-2xl font-black ${titleColor}`}>
            {isKendall ? "My Community & Me" : "Little Entrepreneurs"}
          </h2>
          <p className="text-sm text-muted-foreground font-semibold mt-1">
            {isKendall
              ? "4-week hands-on journey discovering identity, collaborative community synergy, starting a business, and Florida geography!"
              : "4-week business and branding crash-course turning kids into real founders with product ideas and a live marketplace!"}
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
              {isKendall ? "Supplies for the Month" : "Action Required"}
            </h4>
            <p className="text-xs text-muted-foreground font-bold mt-0.5">
              {isKendall 
                ? "⚠️ Note: Your Co-Op Workbook is needed each week!"
                : "⚠️ Note: Please check your project supplies weekly!"}
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
          <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
            For this week's Costs & Margins exercises, please help your child list 3 simple household supplies they plan to use for their product and discuss how much those cost.
          </p>
        )}
      </div>
    </div>
  )
}
