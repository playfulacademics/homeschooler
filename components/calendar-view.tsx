"use client"

import { useState } from "react"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

type EventType = "coop" | "fieldtrip" | "tuition"

interface CalendarEvent {
  day: number
  type: EventType
  label: string
}

interface EventDetails {
  title: string
  date: string
  time: string
  cost: string
  location: string
  description: string
  bring: string
  icon: string
  actionUrl?: string
}

const SEPTEMBER_EVENTS: CalendarEvent[] = [
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
  { day: 25, type: "fieldtrip", label: "Top Golf Field Trip (12:15pm)" },
]

const OCTOBER_EVENTS: CalendarEvent[] = [
  // Kendall Co-Ops (Tuesdays)
  { day: 6, type: "coop", label: "Kendall: Perception & PE" },
  { day: 13, type: "coop", label: "Kendall: STEM & California" },
  { day: 20, type: "coop", label: "Kendall: Business Study" },
  { day: 27, type: "coop", label: "Kendall: Gacavi Farm Day" },

  // Westchester Co-Ops (Thursdays)
  { day: 1, type: "coop", label: "Westchester: Helpers Intro" },
  { day: 8, type: "fieldtrip", label: "Fire Station Tour (12pm)" },
  { day: 15, type: "coop", label: "Westchester: Doctor Day" },
  { day: 22, type: "coop", label: "Westchester: Farm Day" },
  { day: 29, type: "fieldtrip", label: "Westchester: Toy Story Day" },

  // Special Events & Due Dates
  { day: 10, type: "tuition", label: "All Field Trip Funds Due" },
  { day: 14, type: "fieldtrip", label: "Sprouts Field Trip (12pm)" },
  { day: 15, type: "tuition", label: "November Tuition Due" },
  { day: 16, type: "fieldtrip", label: "Grounded Hacienda Trip" },
]

const EVENTS_DETAILS: Record<string, EventDetails> = {
  // September Events Details
  "september-1": {
    title: "Kendall Co-Op: Get to Know Me",
    date: "Tuesday, September 1, 2026",
    time: "During Co-Op Hours",
    cost: "Included in Tuition",
    location: "Kendall Co-Op Campus",
    description: "Welcome to our first day of Co-Op! Today we create our custom Super Hero identities and pack our creative Time Capsules. We'll also begin studying our Artist of the Month, Frida Kahlo, and start working on our self-portraits.",
    bring: "Scissors, pencil, glue, tray, oil pastels, and your Co-Op Workbook.",
    icon: "🦸‍♀️",
  },
  "september-3": {
    title: "Westchester Co-Op: About Me",
    date: "Thursday, September 3, 2026",
    time: "During Co-Op Hours",
    cost: "Included in Tuition",
    location: "Westchester Co-Op Campus",
    description: "Welcome Westchester families! Explore identity through interactive time capsules, school-themed sensory bins, and parachute movement games. Paint a creative self-portrait using natural loose parts.",
    bring: "Supply Box and Co-Op Workbook.",
    icon: "🎨",
  },
  "september-7": {
    title: "Field Trip Funds Due",
    date: "Monday, September 7, 2026",
    time: "All Day",
    cost: "$10.00",
    location: "Online Checkout",
    description: "Field trip funds of $10 are due to secure bookings for our upcoming September outings (DIY Squishy Party & Top Golf). Please click the payment button below to submit.",
    bring: "A credit/debit card to pay online.",
    icon: "⏰",
    actionUrl: "https://www.playfulacademics.com/product/co-op-monthly-fee/YLTMXKQUGHIHFYPCJKNHU7VD",
  },
  "september-8": {
    title: "Kendall Co-Op: The Community",
    date: "Tuesday, September 8, 2026",
    time: "During Co-Op Hours",
    cost: "Included in Tuition",
    location: "Kendall Co-Op Campus",
    description: "Explore community dynamics through Project-Based Learning (PBL) with 'Elemental'. Together we'll build a cooperative cardboard city, practicing true synergy, and craft Frida's 'La Casa Azul' (Blue House).",
    bring: "Medium to large cardboard box, 2 empty paper towel or toilet paper rolls, wood glue or glue gun, and Co-Op Workbook.",
    icon: "🏢",
  },
  "september-10": {
    title: "Westchester Co-Op: 5 Senses",
    date: "Thursday, September 10, 2026",
    time: "During Co-Op Hours",
    cost: "Included in Tuition",
    location: "Westchester Co-Op Campus",
    description: "We learn with our whole bodies! Students will participate in a guided multi-sensory exploration, hunt for clues outdoors on an exciting scavenger hunt, and craft custom Sensory Jars to take home.",
    bring: "Super glue (for parent use only) and Co-Op Workbook.",
    icon: "👁️",
  },
  "september-11": {
    title: "Salvatore Park Play Date Picnic",
    date: "Friday, September 11, 2026",
    time: "11:00 AM",
    cost: "FREE",
    location: "Salvatore Park, Coral Gables",
    description: "Pack a cozy blanket and your favorite snacks for our welcoming Co-Op Play Date Picnic! It's the perfect opportunity for children to bond, play on the playground, and for parents to chat and share homeschool rhythms. Sibling-friendly!",
    bring: "Picnic blanket, lunch/snacks, water bottles, and sunscreen.",
    icon: "🧺",
  },
  "september-15": {
    title: "Kendall Co-Op: Entrepreneurship Week",
    date: "Tuesday, September 15, 2026",
    time: "During Co-Op Hours",
    cost: "Included in Tuition",
    location: "Kendall Co-Op Campus",
    description: "Time to build! Brainstorm your business ideas, choose a trade name, and design your first logo. Mindful PE today is packed with coordination brain games and high-energy movement.",
    bring: "Investment Activity Book and Co-Op Workbook.",
    icon: "💼",
  },
  "september-15-tuition": {
    title: "October Tuition Due",
    date: "Tuesday, September 15, 2026",
    time: "All Day",
    cost: "$125.00",
    location: "Online Checkout",
    description: "Monthly co-op tuition of $125.00 is due on the 15th of each month for the upcoming October cycle. All fees are 100% non-refundable. Click below to check out securely on our main website.",
    bring: "Credit/debit card for online payment.",
    icon: "⏰",
    actionUrl: "https://www.playfulacademics.com/product/co-op-monthly-fee/YLTMXKQUGHIHFYPCJKNHU7VD",
  },
  "september-16": {
    title: "DIY Squishy Party",
    date: "Wednesday, September 16, 2026",
    time: "11:30 AM",
    cost: "$10 per child",
    location: "Larry & Penny Park",
    description: "Let's get creative and tactile! Kids will design, paint, and customize their very own slow-rising squishy toys. All paint, decorations, and squishy bases are included in the fee.",
    bring: "Wear messy-friendly clothes (acrylic paints will be used) and a creative spirit!",
    icon: "🧸",
  },
  "september-17": {
    title: "Westchester Co-Op: My Body",
    date: "Thursday, September 17, 2026",
    time: "During Co-Op Hours",
    cost: "Included in Tuition",
    location: "Westchester Co-Op Campus",
    description: "See how big we are! Children will trace each other's full bodies on butcher paper and build a working diagram model of the lungs to explore respiration. Active music and movement games keep us laughing and exercising.",
    bring: "Supply Box, 8 by 10 piece of cardboard, and Co-Op Workbook.",
    icon: "🫁",
  },
  "september-22": {
    title: "Kendall Co-Op: Geography",
    date: "Tuesday, September 22, 2026",
    time: "During Co-Op Hours",
    cost: "Included in Tuition",
    location: "Kendall Co-Op Campus",
    description: "Journey through Florida and the Everglades! Bring your workbooks and textbooks to design a travel poster. For Practical Life Skills (PLS), we will squeeze fresh Florida orange juice and share Cuban bread.",
    bring: "Passport America Book, large poster board, hand-held juicer, all-purpose glue or glue gun, and Co-Op Workbook.",
    icon: "🐊",
  },
  "september-24": {
    title: "Westchester Co-Op: Germs & Nutrition",
    date: "Thursday, September 24, 2026",
    time: "During Co-Op Hours",
    cost: "Included in Tuition",
    location: "Westchester Co-Op Campus",
    description: "Discover the power of clean hands with a magical pepper-and-soap germ experiment! For Practical Life Skills (PLS), children wash, slice, and thread colorful fruits of choice onto fruit sticks. Includes Mindful PE.",
    bring: "Bring one fruit of choice (coordinate in WhatsApp) and Co-Op Workbook.",
    icon: "🦠",
  },
  "september-25": {
    title: "Field Trip Friday: Top Golf Doral",
    date: "Friday, September 25, 2026",
    time: "12:15 PM",
    cost: "$10 per person",
    location: "Topgolf Doral (10611 NW 19th St, Doral, FL 33172)",
    description: "Tee off with your co-op friends! We have reserved bays for private group play where kids can learn basic golf swing coordination, play fun target games, and enjoy child-friendly lunch options. Great for all skill levels!",
    bring: "Comfortable active wear, sneakers, and sports water bottle.",
    icon: "⛳",
  },
  "september-29": {
    title: "Miami & Homestead Homeschoolers Merge Day",
    date: "Tuesday, September 29, 2026",
    time: "12:00 PM",
    cost: "FREE",
    location: "Co-Op Meetup Ground / Park",
    description: "Our co op will be merging with the Miami & Homestead Homeschoolers group to socialize, do a scavenger hunt, and enjoy a good time together! It's a wonderful opportunity to build wider community connections, make new friends, and share resources.",
    bring: "Comfortable running shoes for the scavenger hunt, water bottles, snacks, and a big smile!",
    icon: "🤝",
  },

  // October Events Details
  "october-1": {
    title: "Westchester Co-Op: Helpers Intro",
    date: "Thursday, October 1, 2026",
    time: "During Co-Op Hours",
    cost: "Included in Tuition",
    location: "Westchester Co-Op Campus",
    description: "Kick off our brand new Community Helpers unit study! Interactive introductory activities exploring the heroes who keep our neighborhoods safe, clean, and connected.",
    bring: "Supply Box and Co-Op Workbook.",
    icon: "🧑‍🤝‍🧑",
  },
  "october-6": {
    title: "Kendall Co-Op: Perception & PE",
    date: "Tuesday, October 6, 2026",
    time: "During Co-Op Hours",
    cost: "Included in Tuition",
    location: "Kendall Co-Op Campus",
    description: "Deep dive into sensory perception and awareness. We will study our Artist of the Month, Victoria Villasana, exploring colorful fiber art and embroidery on photographs. Followed by active, coordination-boosting Mindful PE games.",
    bring: "Co-Op Workbook, personal craft supply kit, and running sneakers.",
    icon: "👁️",
  },
  "october-8": {
    title: "Fire Fighters & Fire Station Tour",
    date: "Thursday, October 8, 2026",
    time: "12:00 PM",
    cost: "FREE",
    location: "Local Doral Fire Station",
    description: "Sound the sirens! Westchester co-op kids are touring the fire station, meeting local firefighter heroes, learning essential fire safety, and exploring a real-life fire truck!",
    bring: "Co-Op Workbook and your favorite firefighter question!",
    icon: "👨‍🚒",
  },
  "october-10": {
    title: "All Field Trip Funds Due",
    date: "Saturday, October 10, 2026",
    time: "All Day",
    cost: "Varies by Trip",
    location: "Online Checkout",
    description: "All October field trip registration fees (including Grounded Hacienda and any other paid activities) are strictly due today to finalize co-op group bookings. Please click below to submit payment on our main website.",
    bring: "Credit/debit card for online payment.",
    icon: "⏰",
    actionUrl: "https://www.playfulacademics.com/product/co-op-monthly-fee/YLTMXKQUGHIHFYPCJKNHU7VD",
  },
  "october-13": {
    title: "Kendall Co-Op: STEM & California",
    date: "Tuesday, October 13, 2026",
    time: "During Co-Op Hours",
    cost: "Included in Tuition",
    location: "Kendall Co-Op Campus",
    description: "Shockingly fun science! Hands-on STEM exploration building electrical circuits. In Geography, we journey west to explore the diverse landscapes, history, and wonders of California.",
    bring: "Co-Op Workbook and geography textbook.",
    icon: "⚡",
  },
  "october-14": {
    title: "Sprouts Field Trip in Kendall",
    date: "Wednesday, October 14, 2026",
    time: "12:00 PM",
    cost: "FREE",
    location: "Sprouts Farmers Market (Kendall)",
    description: "An interactive educational grocery tour! Kids learn about healthy nutrition, explore organic produce, and participate in a fun grocery scavenger hunt. ⚠️ STRICTLY limited to 12 kids total! Sibling RSVPs are required.",
    bring: "Comfortable sneakers and a hungry tummy for healthy samples!",
    icon: "🌱",
  },
  "october-15": {
    title: "Westchester Co-Op: Doctor Day & PE",
    date: "Thursday, October 15, 2026",
    time: "During Co-Op Hours",
    cost: "Included in Tuition",
    location: "Westchester Co-Op Campus",
    description: "Explore the medical profession, how doctors help us stay healthy, and the tools they use. Followed by energetic, cooperative sports and coordination exercises during PE.",
    bring: "Supply Box and running sneakers.",
    icon: "🩺",
  },
  "october-15-tuition": {
    title: "November Tuition Due",
    date: "Thursday, October 15, 2026",
    time: "All Day",
    cost: "$125.00",
    location: "Online Checkout",
    description: "Monthly co-op tuition of $125.00 is due on the 15th of each month for the upcoming November cycle. All fees are 100% non-refundable. Click below to check out securely on our main website.",
    bring: "Credit/debit card for online payment.",
    icon: "⏰",
    actionUrl: "https://www.playfulacademics.com/product/co-op-monthly-fee/YLTMXKQUGHIHFYPCJKNHU7VD",
  },
  "october-16": {
    title: "Field Trip: Grounded Hacienda",
    date: "Friday, October 16, 2026",
    time: "11:00 AM (Check-in)",
    cost: "$25 per child",
    location: "Grounded Hacienda",
    description: "Escape to the beautiful Grounded Hacienda! Explore nature trails, pet farm animals, and enjoy a gorgeous outdoor group class with co-op friends. A beautiful experiential farm day.",
    bring: "Wear long pants, closed-toe sneakers/boots, sunscreen, water bottle, and a sack lunch.",
    icon: "🏡",
    actionUrl: "https://www.playfulacademics.com/product/co-op-monthly-fee/YLTMXKQUGHIHFYPCJKNHU7VD",
  },
  "october-20": {
    title: "Kendall Co-Op: Business Study",
    date: "Tuesday, October 20, 2026",
    time: "During Co-Op Hours",
    cost: "Included in Tuition",
    location: "Kendall Co-Op Campus",
    description: "Focus on entrepreneurship, starting a business, and analyzing margins (using real-world math). Plus our continuing Artist of the Month study exploring Victoria Villasana's photo-embroidery designs.",
    bring: "Co-Op Workbook and Investment Activity Book.",
    icon: "💼",
  },
  "october-22": {
    title: "Westchester Co-Op: Farm Day & Crafts",
    date: "Thursday, October 22, 2026",
    time: "During Co-Op Hours",
    cost: "Included in Tuition",
    location: "Westchester Co-Op Campus",
    description: "A cozy autumn harvest and farm themed day! Children will explore agricultural concepts and paint, mold, or construct beautiful farm-inspired arts and crafts.",
    bring: "Supply Box and natural crafting items (leaves, twigs, small pinecones).",
    icon: "🚜",
  },
  "october-27": {
    title: "Kendall Co-Op: Gacavi Farm Day",
    date: "Tuesday, October 27, 2026",
    time: "During Co-Op Hours",
    cost: "Included in Tuition",
    location: "Gacavi Farm Grounds (Kendall)",
    description: "Our Nature & Farm unit study in action! Explore agricultural sciences, local farming ecosystems, animal habitats, and hands-on farm activities designed to connect academics with the land.",
    bring: "Wear closed-toe shoes/boots, long pants, and bring your nature notebook.",
    icon: "🌾",
  },
  "october-29": {
    title: "Westchester: Toy Story Day",
    date: "Thursday, October 29, 2026",
    time: "All Day during Co-Op",
    cost: "Free for members / $35 non-members",
    location: "Westchester Co-Op Campus",
    description: "To infinity and beyond! A special themed, play-based free day celebrating Toy Story. Westchester Co-Op members attend for free. Sibling or non-co-op guests are welcome for a guest fee of $35.",
    bring: "Bring your favorite Toy Story toy (labeled with your name) and wear a themed outfit or costume!",
    icon: "🤠",
    actionUrl: "https://www.playfulacademics.com/product/co-op-monthly-fee/YLTMXKQUGHIHFYPCJKNHU7VD",
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
  month?: "september" | "october"
  onNavigate?: (view: "calendar" | "october" | "kendall" | "westchester") => void
}

export function CalendarView({ month = "september", onNavigate }: CalendarViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null)

  const isSeptember = month === "september"
  const monthName = isSeptember ? "September 2026" : "October 2026"
  const startDayIndex = isSeptember ? 2 : 4  // Sept: Tue (2), Oct: Thu (4)
  const totalDays = isSeptember ? 30 : 31
  const eventsList = isSeptember ? SEPTEMBER_EVENTS : OCTOBER_EVENTS

  const cells: (number | null)[] = [
    ...Array(startDayIndex).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]

  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null)

  const getEventsForDay = (day: number) =>
    eventsList.filter((e) => e.day === day)

  const handleEventClick = (ev: CalendarEvent) => {
    // If it's the tuition event on Sept 15 or Oct 15, distinguish it from co-op using unique keys
    let lookupKey = `${month}-${ev.day}`
    if (ev.type === "tuition" && ev.day === 15) {
      lookupKey = `${month}-15-tuition`
    }

    const details = EVENTS_DETAILS[lookupKey]
    if (details) {
      setSelectedEvent(details)
    } else if (onNavigate) {
      // Fallback if no specific details found
      if (ev.type === "coop") {
        const isKendall = ev.label.toLowerCase().includes("kendall")
        onNavigate(isKendall ? "kendall" : "westchester")
      } else if (ev.type === "tuition") {
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
            Co-op Day (Click for details)
          </span>
          <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-accent">
            <span className="w-3 h-3 rounded-full bg-accent inline-block" />
            Field Trip (Click for details)
          </span>
          <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-secondary">
            <span className="w-3 h-3 rounded-full bg-secondary inline-block" />
            Deadline / Pay (Click for details)
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
          const activeMonthIndex = isSeptember ? 8 : 9 // September is index 8, October is index 9
          const isToday = day === new Date().getDate() &&
            new Date().getMonth() === activeMonthIndex && new Date().getFullYear() === 2026
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
                          title={`${ev.label} (Click to open details)`}
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

      {/* Dynamic Pop-up Bubble Modal for ALL Events */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={selectedEvent.title}
        >
          <div className="bg-card rounded-3xl shadow-2xl max-w-md w-full p-6 relative border-2 border-accent/30 animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted hover:bg-muted-foreground/10 flex items-center justify-center font-bold text-foreground text-lg transition-colors border border-border"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Content header */}
            <div className="flex gap-4 items-start mb-4 pr-8">
              <div className="w-16 h-16 rounded-2xl bg-accent/15 border-2 border-accent/30 flex items-center justify-center text-4xl flex-shrink-0 shadow-sm">
                {selectedEvent.icon}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">
                  Co-Op Hub Information
                </span>
                <h3 className="text-xl font-black text-foreground mt-1.5 leading-snug">{selectedEvent.title}</h3>
              </div>
            </div>

            {/* Quick Details Box */}
            <div className="bg-muted rounded-2xl p-4 text-xs space-y-2.5 mb-4 border border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-black uppercase">🗓️ Date</span>
                <span className="text-foreground font-black">{selectedEvent.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-black uppercase">⏰ Time</span>
                <span className="text-foreground font-black">{selectedEvent.time}</span>
              </div>
              <div className="flex justify-between items-center font-bold">
                <span className="text-accent font-black uppercase">💰 Cost</span>
                <span className="text-accent font-black text-sm bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full">
                  {selectedEvent.cost}
                </span>
              </div>
              <div className="flex justify-between items-start gap-2 pt-1 border-t border-border/60">
                <span className="text-muted-foreground font-black uppercase flex-shrink-0">📍 Location</span>
                <span className="text-foreground font-black text-right">{selectedEvent.location}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 mb-6">
              <div>
                <h4 className="text-xs font-black text-foreground uppercase tracking-wider">Details & Activities</h4>
                <p className="text-xs text-muted-foreground font-semibold mt-1 leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>
              <div className="border-t border-border pt-3">
                <h4 className="text-xs font-black text-foreground uppercase tracking-wider flex items-center gap-1">
                  🎒 What to Bring / Prepare
                </h4>
                <p className="text-xs text-muted-foreground font-semibold mt-1 leading-relaxed">
                  {selectedEvent.bring}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {selectedEvent.actionUrl ? (
                <a
                  href={selectedEvent.actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow py-3 rounded-2xl bg-secondary text-white font-black text-xs hover:opacity-95 transition-all text-center flex items-center justify-center shadow-md active:scale-98"
                >
                  💳 Proceed to Payment Link
                </a>
              ) : (
                selectedEvent.title.toLowerCase().includes("kendall") || selectedEvent.title.toLowerCase().includes("westchester") ? (
                  <button
                    onClick={() => {
                      setSelectedEvent(null)
                      if (onNavigate) {
                        const isKendall = selectedEvent.title.toLowerCase().includes("kendall")
                        onNavigate(isKendall ? "kendall" : "westchester")
                      }
                    }}
                    className="flex-grow py-3 rounded-2xl bg-primary text-white font-black text-xs hover:opacity-95 transition-all text-center shadow-md active:scale-98"
                  >
                    📖 View Campus Curriculum
                  </button>
                ) : null
              )}
              <button
                onClick={() => setSelectedEvent(null)}
                className={`py-3 rounded-2xl font-black text-xs hover:bg-muted-foreground/10 transition-colors border border-border text-center flex-grow bg-card text-foreground`}
              >
                Close
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
            {isSeptember ? (
              <>
                <strong>Kendall Campus:</strong> Meets Tuesdays (1st, 8th, 15th, 22nd, 29th). Sept 29th is our exciting Miami & Homestead Merge Day!
                <br />
                <strong className="mt-1 inline-block">Westchester Campus:</strong> Meets Thursdays (3rd, 10th, 17th, 24th) exploring "All About Me & My Body".
              </>
            ) : (
              <>
                <strong>Kendall Campus:</strong> Meets Tuesdays (6th, 13th, 20th, 27th) continuing our Co-Op studies.
                <br />
                <strong className="mt-1 inline-block">Westchester Campus:</strong> Meets Thursdays (1st, 8th, 15th, 22nd, 29th) continuing our Co-Op studies.
              </>
            )}
            <br />
            <span className="text-[10px] text-primary/80 font-bold block mt-1">💡 Click any Co-Op badge on the calendar to open its study details!</span>
          </p>
        </div>
        <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 p-5">
          <div className="text-2xl mb-2">⛳</div>
          <h3 className="font-black text-accent text-sm">Field Trips & Gatherings</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-semibold">
            {isSeptember ? (
              <>
                <strong>Sept 11 (11am):</strong> Salvatore Park Play Date Picnic!
                <br />
                <strong>Sept 16 (11:30am):</strong> DIY Squishy Party ($10/child) at Larry & Penny Park.
                <br />
                <strong>Sept 25 (12:15pm):</strong> Field Trip to Top Golf in Doral ($10/person).
              </>
            ) : (
              <>
                <strong>Oct 14 (12:00pm):</strong> Sprouts Field Trip ($10 Co-Op Fee, Max 12 Kids).
                <br />
                <strong>Oct 16 (11:00am):</strong> Grounded Hacienda Farm Outing ($25/child).
                <br />
                <strong>Oct 29 (All Day):</strong> Westchester Toy Story Day! 🤠
              </>
            )}
            <br />
            <span className="text-[10px] text-accent/80 font-bold block mt-1">💡 Click any Field Trip badge on the calendar to see full details!</span>
          </p>
        </div>
        <div className="rounded-2xl border-2 border-secondary/30 bg-secondary/5 p-5">
          <div className="text-2xl mb-2">⏰</div>
          <h3 className="font-black text-secondary text-sm">Payments & Deadlines</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-semibold">
            {isSeptember ? (
              <>
                <strong>Sept 7th:</strong> Field Trip funds ($10) are due to confirm booking.
                <br />
                <strong>Sept 15th:</strong> October Co-Op Tuition due ($125). Click to open the main site to make payments.
              </>
            ) : (
              <>
                <strong>Oct 10th:</strong> All October Field Trip Funds are strictly due!
                <br />
                <strong>Oct 15th:</strong> November Co-Op Tuition due ($125). Click any deadline card to pay on our website.
              </>
            )}
            <br />
            <span className="text-[10px] text-secondary/80 font-bold block mt-1">💡 Click any deadline badge on the calendar to open our website!</span>
          </p>
        </div>
      </div>
    </div>
  )
}
