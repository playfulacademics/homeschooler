"use client"

export type ActiveView = "calendar" | "kendall" | "westchester" | "tuition"

interface NavButtonsProps {
  active: ActiveView
  onSelect: (view: ActiveView) => void
}

const BUTTONS: { id: ActiveView; label: string; icon: string; color: string; activeColor: string; ring: string }[] = [
  {
    id: "calendar",
    label: "Monthly Calendar",
    icon: "📅",
    color: "bg-accent/10 text-accent border-accent/30 hover:bg-accent/20",
    activeColor: "bg-accent text-white border-accent shadow-lg shadow-accent/30",
    ring: "ring-accent/40",
  },
  {
    id: "kendall",
    label: "Kendall Co-Op",
    icon: "🧪",
    color: "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20",
    activeColor: "bg-primary text-white border-primary shadow-lg shadow-primary/30",
    ring: "ring-primary/40",
  },
  {
    id: "westchester",
    label: "Westchester Co-Op",
    icon: "🚀",
    color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/30 hover:bg-indigo-500/20",
    activeColor: "bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/30",
    ring: "ring-indigo-500/40",
  },
  {
    id: "tuition",
    label: "Pay Tuition",
    icon: "💳",
    color: "bg-secondary/10 text-secondary border-secondary/30 hover:bg-secondary/20",
    activeColor: "bg-secondary text-white border-secondary shadow-lg shadow-secondary/30",
    ring: "ring-secondary/40",
  },
]

export function NavButtons({ active, onSelect }: NavButtonsProps) {
  return (
    <nav aria-label="Dashboard navigation">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {BUTTONS.map((btn) => {
          const isActive = active === btn.id
          return (
            <button
              key={btn.id}
              onClick={() => onSelect(btn.id)}
              aria-pressed={isActive}
              className={`
                flex items-center justify-center gap-3 px-5 py-4 rounded-2xl border-2 font-black text-base
                transition-all duration-200
                ${isActive
                  ? `${btn.activeColor} scale-[1.02] ring-2 ${btn.ring} ring-offset-2`
                  : `${btn.color} hover:scale-[1.01] hover:-translate-y-0.5`
                }
              `}
            >
              <span className="text-2xl" role="img" aria-label={btn.label}>
                {btn.icon}
              </span>
              <span>{btn.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
