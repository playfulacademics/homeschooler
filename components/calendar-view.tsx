"use client"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

type EventType = "coop" | "fieldtrip" | "tuition"

interface CalendarEvent {
  day: number
  type: EventType
  label: string
}

const EVENTS: CalendarEvent[] = [
  { day: 1, type: "tuition", label: "Tuition Due" },
  { day: 6, type: "coop", label: "Co-op Starts! Welcome Back" },
  { day: 8, type: "fieldtrip", label: "Field Trip Friday" },
  { day: 15, type: "fieldtrip", label: "Field Trip Friday" },
  { day: 22, type: "fieldtrip", label: "Field Trip Friday" },
  { day: 29, type: "fieldtrip", label: "Field Trip Friday" },
]

const EVENT_STYLES: Record<EventType, string> = {
  coop:      "bg-primary/15 border-primary/50 text-primary",
  fieldtrip: "bg-accent/15 border-accent/50 text-accent",
  tuition:   "bg-secondary/15 border-secondary/50 text-secondary",
}

const EVENT_ICONS: Record<EventType, string> = {
  coop:      "🏫",
  fieldtrip: "🌿",
  tuition:   "💳",
}

export function CalendarView() {
  // August 2026: starts on Saturday (day index 6)
  const monthName = "August 2026"
  const startDayIndex = 6  // Saturday
  const totalDays = 31

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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
          <span className="text-3xl">📅</span>
          {monthName}
        </h2>
        <div className="flex gap-3 flex-wrap">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
            <span className="w-3 h-3 rounded-full bg-primary inline-block" />
            Co-op Day
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-accent">
            <span className="w-3 h-3 rounded-full bg-accent inline-block" />
            Field Trip
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-secondary">
            <span className="w-3 h-3 rounded-full bg-secondary inline-block" />
            Tuition Due
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
            new Date().getMonth() === 7 && new Date().getFullYear() === 2026
          return (
            <div
              key={idx}
              className={`
                min-h-[80px] rounded-xl p-1.5 border transition-all
                ${day ? "bg-card border-border hover:border-primary/40 hover:shadow-md" : "bg-transparent border-transparent"}
                ${isToday ? "ring-2 ring-primary ring-offset-2" : ""}
              `}
            >
              {day && (
                <>
                  <span
                    className={`
                      text-xs font-black w-6 h-6 flex items-center justify-center rounded-full mb-1
                      ${isToday ? "bg-primary text-white" : "text-foreground"}
                    `}
                  >
                    {day}
                  </span>
                  <div className="space-y-0.5">
                    {events.map((ev, i) => (
                      <div
                        key={i}
                        className={`text-[9px] font-bold px-1 py-0.5 rounded-md border leading-tight ${EVENT_STYLES[ev.type]}`}
                        title={ev.label}
                      >
                        {EVENT_ICONS[ev.type]} {ev.label}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Event details cards */}
      <div className="grid sm:grid-cols-3 gap-4 pt-2">
        <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-4">
          <div className="text-2xl mb-2">🏫</div>
          <h3 className="font-black text-primary text-sm">First Day of Co-op</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-semibold">
            August 6th — Welcome back session! Meet your teachers, tour our space, and kick off the "My Body" unit study together.
          </p>
        </div>
        <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 p-4">
          <div className="text-2xl mb-2">🌿</div>
          <h3 className="font-black text-accent text-sm">Field Trip Fridays</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-semibold">
            Every Friday (Aug 8, 15, 22, 29) is an outdoor adventure day! Nature walks, science explorations, and community visits await.
          </p>
        </div>
        <div className="rounded-2xl border-2 border-secondary/30 bg-secondary/5 p-4">
          <div className="text-2xl mb-2">💳</div>
          <h3 className="font-black text-secondary text-sm">Tuition Due</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-semibold">
            Monthly tuition of $125 is due on the 1st of each month. Click "Pay Tuition" above to simulate your safe checkout.
          </p>
        </div>
      </div>
    </div>
  )
}
