"use client"

export function DashboardHeader() {
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-8 text-white shadow-xl mb-8">
      {/* Decorative circles */}
      <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute top-10 -right-2 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -bottom-8 -left-6 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute bottom-4 left-24 w-10 h-10 rounded-full bg-white/10 pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl" role="img" aria-label="apple">🍎</span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-balance">
              Playful Academics
              <br />
              <span className="text-white/90">Co Op Hub</span>
            </h1>
          </div>
          <p className="text-white/80 text-lg font-semibold">
            {greeting}, homeschool families! ✨ Ready to learn something amazing today?
          </p>
        </div>

        <div className="flex gap-3 flex-wrap sm:flex-nowrap">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center min-w-[90px]">
            <div className="text-2xl font-black">{new Date().getDate()}</div>
            <div className="text-xs font-bold text-white/75 uppercase tracking-wide">
              {new Date().toLocaleDateString("en-US", { month: "short" })}
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center min-w-[90px]">
            <div className="text-sm font-black leading-tight">Month</div>
            <div className="text-xs font-bold text-white/75">September</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center min-w-[90px]">
            <div className="text-sm font-black leading-tight">Due</div>
            <div className="text-xs font-bold text-white/75">Sept 15th</div>
          </div>
        </div>
      </div>
    </header>
  )
}
