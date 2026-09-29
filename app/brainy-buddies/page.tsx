"use client"

import Link from "next/link"

const STEPS = [
  { icon: "⭐", title: "Choose a Brainy Buddy", desc: "Pick your favorite plush pal from the Buddy Basket!", color: "from-amber-300 to-yellow-400", emoji: "🧸" },
  { icon: "🏠", title: "Pick your little Buddy Home", desc: "Every Buddy needs a cozy place to think and dream.", color: "from-sky-300 to-blue-400", emoji: "🏠" },
  { icon: "✏️", title: "Name your Buddy", desc: "Give your new best friend a super fun name!", color: "from-pink-300 to-rose-400", emoji: "💜" },
  { icon: "🎒", title: "Take your Buddy on learning adventures", desc: "Bring your Buddy to co-op, field trips & story time!", color: "from-emerald-300 to-green-400", emoji: "🌟" },
]

const HOMES = [
  { emoji: "🏠", name: "Cozy Cottage", color: "bg-orange-100 border-orange-300" },
  { emoji: "🛖", name: "Tiny Tipi", color: "bg-amber-100 border-amber-300" },
  { emoji: "🏰", name: "Castle Fort", color: "bg-violet-100 border-violet-300" },
  { emoji: "⛺", name: "Camp Tent", color: "bg-green-100 border-green-300" },
  { emoji: "🚀", name: "Rocket Pod", color: "bg-sky-100 border-sky-300" },
  { emoji: "🐝", name: "Bumble Hive", color: "bg-yellow-100 border-yellow-300" },
]

const BUDDIES = ["🧸", "🐰", "🐻", "🦊", "🐸", "🐼", "🐧", "🦁", "🐨", "🐢"]

export default function BrainyBuddiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-200 via-purple-100 to-pink-100 overflow-hidden relative">
      {/* Floating background shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {["⭐", "✨", "🌈", "🎈", "💫", "🌸", "☀️", "🦋"].map((e, i) => (
          <span
            key={i}
            className="absolute text-4xl opacity-40 animate-float"
            style={{
              left: `${(i * 13 + 5) % 95}%`,
              top: `${(i * 17 + 8) % 90}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-10">
        {/* Banner */}
        <header className="text-center mb-10">
          <div className="inline-block bg-white/80 rounded-full px-6 py-2 shadow-lg border-4 border-dashed border-amber-400 animate-wiggle">
            <span className="font-black text-lg tracking-wide text-slate-700">🍎 PLAYFUL ACADEMICS</span>
          </div>
          <h1 className="mt-4 text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 drop-shadow-lg animate-pop">
            Brainy Buddies
          </h1>
          <p className="mt-2 text-xl font-black text-slate-600 animate-bounce-soft">
            Little Pals. Big Thinking. 🐾
          </p>
        </header>

        {/* The 10-Star Challenge Reward */}
        <section className="bg-white/90 rounded-3xl shadow-2xl border-4 border-yellow-300 p-6 sm:p-8 mb-8 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 text-6xl animate-spin-slow" aria-hidden="true">🌟</div>
          <div className="text-center mb-6">
            <span className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
              The 10-Star Challenge Reward
            </span>
            <h2 className="text-3xl font-black text-slate-800 mt-3">
              Earn Your Brainy Buddy! 🎉
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`rounded-2xl bg-gradient-to-br ${step.color} p-4 shadow-lg border-2 border-white animate-bounce-soft`}
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl animate-wiggle inline-block" style={{ animationDelay: `${i * 0.5}s` }}>
                    {step.icon}
                  </span>
                  <div>
                    <h3 className="font-black text-slate-800 leading-tight">{step.title}</h3>
                    <p className="text-xs font-bold text-slate-700/80 mt-0.5">{step.desc}</p>
                  </div>
                  <span className="ml-auto text-3xl" aria-hidden="true">{step.emoji}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Buddy parade */}
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            {BUDDIES.map((b, i) => (
              <span
                key={i}
                className="text-4xl inline-block animate-hop cursor-pointer hover:scale-125 transition-transform"
                style={{ animationDelay: `${i * 0.15}s` }}
                role="img"
                aria-label="brainy buddy plush"
              >
                {b}
              </span>
            ))}
          </div>
        </section>

        {/* Buddy Homes */}
        <section className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl shadow-2xl p-6 sm:p-8 mb-8 border-4 border-green-200">
          <div className="text-center mb-5">
            <h2 className="text-3xl font-black text-white drop-shadow-md animate-pop">
              🏡 Brainy Buddy Homes
            </h2>
            <p className="text-white/90 font-bold mt-1">
              Every Brainy Buddy needs a cozy place to think!
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {HOMES.map((home, i) => (
              <div
                key={i}
                className={`${home.color} border-2 rounded-2xl p-3 text-center shadow-md animate-float hover:scale-110 transition-transform`}
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <div className="text-3xl">{home.emoji}</div>
                <div className="text-[10px] font-black text-slate-700 mt-1">{home.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Cut-out card */}
        <section className="bg-white rounded-3xl shadow-2xl border-4 border-dashed border-pink-400 p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute top-2 left-2 text-2xl animate-float" aria-hidden="true">✂️</div>
          <span className="text-xs font-black uppercase tracking-widest text-pink-500 bg-pink-100 rounded-full px-3 py-1">
            ✂️ Cut Me Out!
          </span>
          <h2 className="text-2xl font-black text-slate-800 mt-3">MY BRAINY BUDDY</h2>
          <div className="text-6xl my-4 animate-bounce-soft">🧸</div>
          <div className="max-w-xs mx-auto space-y-3 text-left">
            <div className="border-b-2 border-dashed border-slate-300 pb-1">
              <span className="text-xs font-black text-slate-500">BUDDY&apos;S NAME:</span>
              <span className="block h-6"></span>
            </div>
            <div className="border-b-2 border-dashed border-slate-300 pb-1">
              <span className="text-xs font-black text-slate-500">MY NAME:</span>
              <span className="block h-6"></span>
            </div>
            <div className="border-b-2 border-dashed border-slate-300 pb-1">
              <span className="text-xs font-black text-slate-500">OUR FAVORITE ADVENTURE:</span>
              <span className="block h-6"></span>
            </div>
          </div>
        </section>

        <div className="text-center mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="/brainy_buddies_playful.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-black px-6 py-3 rounded-2xl shadow-lg transition-all hover:-translate-y-0.5"
          >
            🖨️ Print the Buddy PDF
          </a>
          <Link
            href="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-black px-6 py-3 rounded-2xl shadow-lg transition-all hover:-translate-y-0.5"
          >
            ← Back to Co Op Hub
          </Link>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-14px) rotate(3deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes pop {
          0% { transform: scale(0.6); opacity: 0; }
          70% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bounceSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes hop {
          0%, 100% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-10px) scale(1.1); }
          60% { transform: translateY(0) scale(0.95); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        .animate-pop { animation: pop 0.7s ease-out both; }
        .animate-bounce-soft { animation: bounceSoft 2.4s ease-in-out infinite; }
        .animate-hop { animation: hop 1.8s ease-in-out infinite; }
        .animate-spin-slow { animation: spinSlow 9s linear infinite; display: inline-block; }
      `}</style>
    </main>
  )
}
