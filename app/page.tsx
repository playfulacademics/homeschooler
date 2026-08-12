"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { NavButtons, type ActiveView } from "@/components/nav-buttons"
import { CalendarView } from "@/components/calendar-view"
import { UnitStudyView } from "@/components/unit-study-view"
import { DashboardFooter } from "@/components/dashboard-footer"

const VIEW_LABELS: Record<ActiveView, string> = {
  calendar: "Monthly Calendar",
  kendall: "Kendall Co-Op Unit Study",
  westchester: "Westchester Co-Op Unit Study",
}

const VIEW_BORDER: Record<ActiveView, string> = {
  calendar: "border-accent/30",
  kendall: "border-primary/30",
  westchester: "border-indigo-500/30",
}

const VIEW_HEADER_BG: Record<ActiveView, string> = {
  calendar: "from-accent/10 to-transparent",
  kendall: "from-primary/10 to-transparent",
  westchester: "from-indigo-500/10 to-transparent",
}

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>("calendar")

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <DashboardHeader />

        {/* Navigation */}
        <div className="mb-6">
          <NavButtons active={activeView} onSelect={setActiveView} />
        </div>

        {/* Content display card */}
        <section
          aria-live="polite"
          aria-label={`Showing: ${VIEW_LABELS[activeView]}`}
          className={`
            rounded-3xl border-2 ${VIEW_BORDER[activeView]} bg-card shadow-lg overflow-hidden
            transition-all duration-300
          `}
        >
          {/* Card top accent strip */}
          <div className={`h-1.5 w-full bg-gradient-to-r ${VIEW_HEADER_BG[activeView]}`} />

          <div className="p-6 sm:p-8">
            <div
              key={activeView}
              className="animate-in fade-in slide-in-from-bottom-3 duration-300"
            >
              {activeView === "calendar" && <CalendarView onNavigate={setActiveView} />}
              {activeView === "kendall" && <UnitStudyView location="kendall" />}
              {activeView === "westchester" && <UnitStudyView location="westchester" />}
            </div>
          </div>
        </section>

        {/* Footer */}
        <DashboardFooter />
      </div>
    </main>
  )
}
