export function DashboardFooter() {
  return (
    <footer className="mt-12 border-t border-border pt-6 pb-8">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-lg">🍎</span>
          <span>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-black text-foreground">Playful Academics</span>
          </span>
          <span>— Where Learning Comes Alive!</span>
        </div>
        <div className="flex items-center gap-4 font-semibold">
          <a
            href="https://playfulacademics.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
          >
            Visit Our Home Site →
          </a>
          <span className="hidden sm:inline text-border">|</span>
          <a
            href="/playful_academics_fall_2026_calendars.pdf"
            download
            className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
          >
            🖨️ Printable PDF Calendar
          </a>
          <span className="hidden sm:inline text-border">|</span>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent/80 transition-colors underline underline-offset-2"
          >
            Contact Fame via WhatsApp
          </a>
        </div>
      </div>
    </footer>
  )
}
