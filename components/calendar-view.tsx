"use client"

import { useState } from "react"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

type EventType = "coop" | "fieldtrip" | "tuition"

interface CalendarEvent {
  day: number
  type: EventType
  label: string
}

interface FieldTripDetails {
  title: string
  date: string
  time: string
  cost: string
  location: string
  description: string
  bring: string
  icon: string
}

const EVENTS: CalendarEvent[] = [
  // Kendall Co-Ops (Tuesdays)
  { day: 1, type: "coop", label: "Kendall: Get to Know Me" },
  { day: 8, type: "coop", label: "Kendall: The Community" },
  { day: 15, type: "coop", label: "Kendall: Entrepreneurship" },
  { day: 22, type: "coop", label: "Kendall: Geography" },
  { day: 29, type: "fieldtrip", label: "M&H Merge Day (12pm)" },

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

const FIELD_TRIPS: Record<number, FieldTripDetails> = {
  11: {
    title: "Salvatore Park Play Date Picnic",
    date: "Friday, September 11, 2026",
    time: "11:00 AM",
    cost: "FREE",
    location: "Salvatore Park, Coral Gables",
    description: "Pack a cozy blanket and your favorite snacks for our welcoming Co-Op Play Date Picnic! It's the perfect opportunity for children to bond, play on the playground, and for parents to chat and share homeschool rhythms. Sibling-friendly!",
    bring: "Picnic blanket, lunch/snacks, water bottles, and sunscreen.",
    icon: "🧺",
  },
  16: {
    title: "DIY Squishy Party",
    date: "Wednesday, September 16, 2026",
    time: "11:30 AM",
    cost: "$10 per child",
    location: "Larry & Penny Park",
    description: "Let's get creative and tactile! Kids will design, paint, and customize their very own slow-rising squishy toys. All paint, decorations, and squishy bases are included in the fee.",
    bring: "Wear messy-friendly clothes (acrylic paints will be used) and a creative spirit!",
    icon: "🧸",
  },
  25: {
    title: "Field Trip Friday: Top Golf Doral",
    date: "Friday, September 25, 2026",
    time: "11:00 AM",
    cost: "$10 per person",
    location: "Topgolf Doral (10611 NW 19th St, Doral, FL 33172)",
    description: "Tee off with your co-op friends! We have reserved bays for private group play where kids can learn basic golf swing coordination, play fun target games, and enjoy child-friendly lunch options. Great for all skill levels!",
    bring: "Comfortable active wear, sneakers, and sports water bottle.",
    icon: "⛳",
  },
  29: {
    title: "Miami & Homestead Homeschoolers Merge Day",
    date: "Tuesday, September 29, 2026",
    time: "12:00 PM",
    cost: "FREE",
    location: "Co-Op Meetup Ground / Park",
    description: "Our co op will be merging with the Miami & Homestead Homeschoolers group to socialize, do a scavenger hunt, and enjoy a good time together! It's a wonderful opportunity to build wider community connections, make new friends, and share resources.",
    bring: "Comfortable running shoes for the scavenger hunt, water bottles, snacks, and a big smile!",
    icon: "🤝",
  },
}

const EVENT_STYLES: Record<EventType, string> = {
  coop:      "bg-primary/15 border-primary/50 text-primary hover:bg-primary/25",
  fieldtrip: "bg-accent/15 border-accent/50 text-accent hover:bg-accent/25",
  tuition:   "bg-secondary/15 border-secondary/50 text-secondary hover:bg-secondary/25",
}

const EVENT_ICONS: Record<EventType, string> = {
  coop:      "🏫",
  fieldtrip: "🎉",
  tuition:   "⏰",
}

interface CalendarViewProps {
  onNavigate?: (view: "calendar" | "kendall" | "westchester") => void
}

export function CalendarView({ onNavigate }: CalendarViewProps) {
  const [selectedTrip, setSelectedTrip] = useState<FieldTripDetails | null>(null)

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

  const handleEventClick = (ev: CalendarEvent) => {
    if (ev.type === "fieldtrip") {
      const trip = FIELD_TRIPS[ev.day]
      if (trip) {
        setSelectedTrip(trip)
      }
    } else {
      if (ev.type === "coop" && onNavigate) {
        const isKendall = ev.label.toLowerCase().includes("kendall")
        onNavigate(isKendall ? "kendall" : "westchester")
      } else if (ev.type === "tuition" || ev.label.toLowerCase().includes("funds due")) {
        window.open("https://www.playfulacademics.com/product/co-op-monthly-fee/YLTMXKQUGHIHFYPCJKNHU7VD", "_blank")
      }
    }
  }

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
            Co-op Day (Opens study)
          </span>
          <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-accent">
            <span className="w-3 h-3 rounded-full bg-accent inline-block" />
            Field Trip (Click to open bubble)
          </span>
          <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-secondary">
            <span className="w-3 h-3 rounded-full bg-secondary inline-block" />
            Deadline / Pay (Opens Website)
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
                    {events.map((ev, i) => {
                      return (
                        <button
                          key={i}
                          onClick={() => handleEventClick(ev)}
                          className={`
                            w-full text-left text-[9px] font-black px-1 py-0.5 rounded-md border leading-tight block
                            transition-all duration-150 cursor-pointer active:scale-95 shadow-sm
                            ${EVENT_STYLES[ev.type]}
                          `}
                          title={`${ev.label} (Click to open)`}
                        >
                          {EVENT_ICONS[ev.type]} {ev.label}
                        </button>
                      )
                    })}
                  </div>
                </>
              ) : (
                <div />
              )}
            </div>
          )
        })}
      </div>

      {/* Field Trip Modal Pop-up Bubble */}
      {selectedTrip && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={selectedTrip.title}
        >
          <div className="bg-card rounded-3xl shadow-2xl max-w-md w-full p-6 relative border-2 border-accent/30 animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setSelectedTrip(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted hover:bg-muted-foreground/10 flex items-center justify-center font-bold text-foreground text-lg transition-colors border border-border"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Content header */}
            <div className="flex gap-4 items-start mb-4 pr-8">
              <div className="w-16 h-16 rounded-2xl bg-accent/15 border-2 border-accent/30 flex items-center justify-center text-4xl flex-shrink-0 shadow-sm">
                {selectedTrip.icon}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">
                  Field Trip / Outing
                </span>
                <h3 className="text-xl font-black text-foreground mt-1.5 leading-snug">{selectedTrip.title}</h3>
              </div>
            </div>

            {/* Quick Details Box */}
            <div className="bg-muted rounded-2xl p-4 text-xs space-y-2.5 mb-4 border border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-black uppercase">🗓️ Date</span>
                <span className="text-foreground font-black">{selectedTrip.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-black uppercase">⏰ Time</span>
                <span className="text-foreground font-black">{selectedTrip.time}</span>
              </div>
              <div className="flex justify-between items-center font-bold">
                <span className="text-accent font-black uppercase">💰 Cost</span>
                <span className="text-accent font-black text-sm bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full">
                  {selectedTrip.cost}
                </span>
              </div>
              <div className="flex justify-between items-start gap-2 pt-1 border-t border-border/60">
                <span className="text-muted-foreground font-black uppercase flex-shrink-0">📍 Location</span>
                <span className="text-foreground font-black text-right">{selectedTrip.location}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 mb-6">
              <div>
                <h4 className="text-xs font-black text-foreground uppercase tracking-wider">About the Event</h4>
                <p className="text-xs text-muted-foreground font-semibold mt-1 leading-relaxed">
                  {selectedTrip.description}
                </p>
              </div>
              <div className="border-t border-border pt-3">
                <h4 className="text-xs font-black text-foreground uppercase tracking-wider flex items-center gap-1">
                  🎒 What to Bring
                </h4>
                <p className="text-xs text-muted-foreground font-semibold mt-1 leading-relaxed">
                  {selectedTrip.bring}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {selectedTrip.cost !== "FREE" && (
                <a
                  href="https://www.playfulacademics.com/product/co-op-monthly-fee/YLTMXKQUGHIHFYPCJKNHU7VD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow py-3 rounded-2xl bg-secondary text-white font-black text-xs hover:opacity-95 transition-all text-center flex items-center justify-center shadow-md active:scale-98"
                >
                  💳 Pay Field Trip Fee
                </a>
              )}
              <button
                onClick={() => setSelectedTrip(null)}
                className={`py-3 rounded-2xl font-black text-xs hover:bg-muted-foreground/10 transition-colors border border-border text-center ${
                  selectedTrip.cost === "FREE" ? "bg-accent text-white hover:opacity-95 border-none flex-grow" : "px-6 bg-card text-foreground"
                }`}
              >
                {selectedTrip.cost === "FREE" ? "Can't Wait! 🎉" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event details cards */}
      <div className="grid sm:grid-cols-3 gap-4 pt-2">
        <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
          <div className="text-2xl mb-2">🏫</div>
          <h3 className="font-black text-primary text-sm">Weekly Co-Ops</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-semibold">
            <strong>Kendall Campus:</strong> Meets Tuesdays (1st, 8th, 15th, 22nd, 29th). Sept 29th is our exciting Miami & Homestead Merge Day!
            <br />
            <strong className="mt-1 inline-block">Westchester Campus:</strong> Meets Thursdays (3rd, 10th, 17th, 24th) exploring "All About Me & My Body".
            <br />
            <span className="text-[10px] text-primary/80 font-bold block mt-1">💡 Click any Co-Op badge on the calendar to open its study details!</span>
          </p>
        </div>
        <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 p-5">
          <div className="text-2xl mb-2">⛳</div>
          <h3 className="font-black text-accent text-sm">Field Trips & Gatherings</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-semibold">
            <strong>Sept 11 (11am):</strong> Salvatore Park Play Date Picnic!
            <br />
            <strong>Sept 16 (11:30am):</strong> DIY Squishy Party ($10/child) at Larry & Penny Park.
            <br />
            <strong>Sept 25 (11am):</strong> Field Trip to Top Golf in Doral ($10/person).
            <br />
            <span className="text-[10px] text-accent/80 font-bold block mt-1">💡 Click any Field Trip badge on the calendar to see full details!</span>
          </p>
        </div>
        <div className="rounded-2xl border-2 border-secondary/30 bg-secondary/5 p-5">
          <div className="text-2xl mb-2">⏰</div>
          <h3 className="font-black text-secondary text-sm">Payments & Deadlines</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-semibold">
            <strong>Sept 7th:</strong> Field Trip funds ($10) are due to confirm booking.
            <br />
            <strong>Sept 15th:</strong> October Co-Op Tuition due ($125). Click to open the main site to make payments.
            <br />
            <span className="text-[10px] text-secondary/80 font-bold block mt-1">💡 Click any deadline badge on the calendar to open our website!</span>
          </p>
        </div>
      </div>
    </div>
  )
}
