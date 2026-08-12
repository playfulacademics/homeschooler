"use client"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

type EventType = "coop" | "fieldtrip" | "tuition"

interface CalendarEvent {
  day: number
  type: EventType
  label: string
}

const EVENTS: CalendarEvent[] = [
  // Kendall Co-Ops (Tuesdays)
  { day: 1, type: "coop", label: "Kendall: Get to Know Me" },
  { day: 8, type: "coop", label: "Kendall: The Community" },
  { day: 15, type: "coop", label: "Kendall: Entrepreneurship" },
  { day: 22, type: "coop", label: "Kendall: Geography" },
  // Note: Sept 29 is left blank as a free week

  // Westchester Co-Ops (Thursdays)
  { day: 3, type: "coop", label: "Westchester: About Me" },
  { day: 10, type: "coop", label: "Westchester: 5 Senses" },
  { day: 17, type: "coop", label: "Westchester: My Body" },
  { day: 24, type: "coop", label: "Westchester: Germs & Nutrition" },

  // Special Events & Due Dates
  { day: 7, type: "tuition", label: "Field Trip Funds Due" },
  { day: 11, type: "fieldtrip", label: "Salvatore Park Picnic (11am)" },
  { day: 15, type: "tuition", label: "October Tuition Due" },
  { day: 16, type: "fieldtrip", label: "DIY Squishy Party (11:30am)" },
  { day: 25, type: "fieldtrip", label: "Top Golf Field Trip (11am)" },
]

const EVENT_STYLES: Record<EventType, string> = {
  coop:      "bg-primary/15 border-primary/50 text-primary",
  fieldtrip: "bg-accent/15 border-accent/50 text-accent",
  tuition:   "bg-secondary/15 border-secondary/50 text-secondary",
}

const EVENT_ICONS: Record<EventType, string> = {
  coop:      "🏫",
  fieldtrip: "🎉",
  tuition:   "⏰",
}

export function CalendarView() {
  // September 2026: starts on Tuesday (day index 2)
  const monthName = "September 2026"
  const startDayIndex = 2  // Tuesday
  const totalDays = 30

  const cells: (number | null)[] = [
    ...Array(startDayIndex).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]

  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null)

  const getEventsForDay = (day: number) =>
    EVENTS.filter((e) => e.day === day)

  return (
    <div className="space-y-6">
      {/* Month header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
          <span className="text-3xl">📅</span>
          {monthName}
        </h2>
        <div className="flex gap-3 flex-wrap">
          <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-primary">
            <span className="w-3 h-3 rounded-full bg-primary inline-block" />
            Co-op Day
          </span>
          <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-accent">
            <span className="w-3 h-3 rounded-full bg-accent inline-block" />
            Field Trip / Party
          </span>
          <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-secondary">
            <span className="w-3 h-3 rounded-full bg-secondary inline-block" />
            Deadline / Due
          </span>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-black uppercase tracking-wider text-muted-foreground py-2"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, idx) => {
          const events = day ? getEventsForDay(day) : []
          const isToday = day === new Date().getDate() &&
            new Date().getMonth() === 8 && new Date().getFullYear() === 2026
          return (
            <div
              key={idx}
              className={`
                min-h-[90px] rounded-xl p-1.5 border transition-all flex flex-col justify-between
                ${day ? "bg-card border-border hover:border-primary/40 hover:shadow-md" : "bg-transparent border-transparent"}
                ${isToday ? "ring-2 ring-primary ring-offset-2" : ""}
              `}
            >
              {day ? (
                <>
                  <div className="flex justify-between items-start">
                    <span
                      className={`
                        text-xs font-black w-6 h-6 flex items-center justify-center rounded-full mb-1
                        ${isToday ? "bg-primary text-white" : "text-foreground"}
                      `}
                    >
                      {day}
                    </span>
                  </div>
                  <div className="space-y-0.5 mt-1 flex-grow overflow-y-auto">
                    {events.map((ev, i) => (
                      <div
                        key={i}
                        className={`text-[9px] font-black px-1 py-0.5 rounded-md border leading-tight ${EVENT_STYLES[ev.type]}`}
                        title={ev.label}
                      >
                        {EVENT_ICONS[ev.type]} {ev.label}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div />
              )}
            </div>
          )
        })}
      </div>

      {/* Event details cards */}
      <div className="grid sm:grid-cols-3 gap-4 pt-2">
        <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
          <div className="text-2xl mb-2">🏫</div>
          <h3 className="font-black text-primary text-sm">Weekly Co-Ops</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-semibold">
            <strong>Kendall Campus:</strong> Meets Tuesdays (1st, 8th, 15th, 22nd) exploring "My Community & Me". Sept 29th is a free week!
            <br />
            <strong className="mt-1 inline-block">Westchester Campus:</strong> Meets Thursdays (3rd, 10th, 17th, 24th) exploring "All About Me & My Body".
          </p>
        </div>
        <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 p-5">
          <div className="text-2xl mb-2">⛳</div>
          <h3 className="font-black text-accent text-sm">Field Trips & Gatherings</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-semibold">
            <strong>Sept 11 (11am):</strong> Salvatore Park Play Date Picnic!
            <br />
            <strong>Sept 16 (11:30am):</strong> DIY Squishy Party ($10/child) at Glades Park Doral.
            <br />
            <strong>Sept 25 (11am):</strong> Field Trip to Top Golf in Doral ($10/person).
          </p>
        </div>
        <div className="rounded-2xl border-2 border-secondary/30 bg-secondary/5 p-5">
          <div className="text-2xl mb-2">⏰</div>
          <h3 className="font-black text-secondary text-sm">Payments & Deadlines</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-semibold">
            <strong>Sept 7th:</strong> Field Trip funds ($10) are due to confirm booking.
            <br />
            <strong>Sept 15th:</strong> October Co-Op Tuition due ($125). Click the "Pay Tuition" tab above to checkout safely.
          </p>
        </div>
      </div>
    </div>
  )
}
